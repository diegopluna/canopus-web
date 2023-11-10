import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Client, IMessage } from "@stomp/stompjs"
import { useEffect, useMemo, useState, useContext, useRef } from "react"
import AuthContext from "@/context/AuthProvider"

interface ChatMessage {
    type: string,
    sender: string,
    content: string
}

export default function Chat() {
    const [sentMessage, setSentMessage] = useState("")
    const [receivedMessages, setReceivedMessages] = useState<ChatMessage[]>([])   
    // const [messages, setMessages] = useState([]);
    // const [messageInput, setMessageInput] = useState('');
    const domain: string  = window.location.hostname === "localhost" ? "ws://localhost:8000/ws" : "wss://api-canopus.dpeter.tech/ws"
    // const domain = "wss://api-canopus.dpeter.tech/ws"
    const client = useMemo(() => {
        return new Client({
            brokerURL: domain,
            debug: function (str) {
                console.log(str);
            },
        });
    }, [domain])
    client.onConnect = () => {
        client.subscribe('/topic/public', onMessageReceived)
    }

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [receivedMessages]);

    useEffect(() => {
        if (!client.active) {
            client.activate()
        }
    }, [client])

    const authContext = useContext(AuthContext)
    if (authContext === undefined) {
        return null
    }
    const { username } = authContext;

    function onMessageReceived(payload: IMessage) {
        console.log(payload)
        const message = JSON.parse(payload.body)
        console.log(`${message.sender} : ${message.content}`)
        setReceivedMessages(prevMessages => [...prevMessages, message])
        // setMessages(prevMessages => [...prevMessages, message])
    }
    
    function sendMessage(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        client.publish({destination: '/topic/public', body: JSON.stringify({
            sender: username,
            type: "CHAT",
            content: sentMessage
        })})
        setSentMessage("")
    }

    return (
        <div className="grid h-screen grid-cols-[300px_1fr] gap-4 p-4">
            <div className="rounded-lg shadow overflow-hidden">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">Channels</h2>
                </div>
                <nav className="px-4 py-2 space-y-1">
                    <a className="block px-3 py-2 rounded-md text-sm font-medium" href="#">General</a>
                </nav>
            </div>
            <div className="flex flex-col h-full rounded-lg shadow overflow-hidden">
                <div className="flex-grow overflow-auto">
                    <div className="p-4 space-y-4 overflow-y-scroll h-full" ref={scrollRef}>
                        {receivedMessages.map(message => (
                            <div className="flex items-start space-x-3">
                                {/* <Avatar>
                                    <AvatarFallback>{message.sender[0]}</AvatarFallback>
                                </Avatar> */}
                                <Avatar>

                                    <AvatarFallback>{message.sender[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                <p className="text-sm text-gray-500">{message.sender}</p>
                                <p className="text-sm bg-gray-200 dark:bg-gray-700 p-2 rounded-md">
                                    {message.content}
                                </p>
                                {/* <p className="text-sm text-gray-400">10:17 AM, Oct 29, 2023</p> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border-t">
                    <form className="p-4 flex space-x-3" onSubmit={sendMessage}>
                        <Input
                            className="flex-grow dark:bg-muted/30 dark:border-input/30 dark:text-primary-foreground"
                            placeholder="Type a message"
                            value={sentMessage}
                            onChange={(e) => setSentMessage(e.target.value)}
                        />
                        <Button className="text-lg" type="submit">
                            Send
                        </Button>
                    </form>
                </div>
            </div>  
        </div>
    )
}