import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Client, IMessage } from "@stomp/stompjs"
import { useEffect, useMemo, useState, useContext, useRef } from "react"
import AuthContext from "@/context/AuthProvider"
import { DateTime } from 'luxon';



interface ChatMessage {
    type: string,
    sender: string,
    content: string,
    timestamp: string
}

export default function Chat() {
    const [sentMessage, setSentMessage] = useState("")
    const [receivedMessages, setReceivedMessages] = useState<ChatMessage[]>([])   
    const domain: string  = window.location.hostname === "localhost" ? "ws://localhost:8080/ws" : "wss://api-canopus.dpeter.tech/ws"
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

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
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
    // const { username } = authContext; //TODO AJEITAR ISSO

    function onMessageReceived(payload: IMessage) {
        console.log(payload)
        const message = JSON.parse(payload.body)
        message.timestamp = DateTime.fromISO(message.timestamp + 'Z').setZone('local').toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
        setReceivedMessages(prevMessages => [...prevMessages, message])
    }
    
    function sendMessage(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        client.publish({destination: '/app/chat.sendMessage', body: JSON.stringify({
            // sender: username, //TODO MUDAR ISSO AI
            type: "CHAT",
            content: sentMessage,
        })})
        setSentMessage("")
    }

    return (
        <div className="grid h-screen grid-cols-[300px_1fr] gap-4 p-4">
            <div className="rounded-lg shadow overflow-hidden">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">Canais</h2>
                </div>
                <nav className="px-4 py-2 space-y-1">
                    <a className="block px-3 py-2 rounded-md text-sm font-medium" href="#">Geral</a>
                </nav>
            </div>
            <div className="flex flex-col h-full rounded-lg shadow overflow-hidden">
                <div className="flex-grow overflow-auto">
                    <ScrollArea className="p-4 space-y-4 h-full">
                        {receivedMessages.map((message, index) => (
                            <div className="flex items-start space-x-3" key={index}>
                                <Avatar>
                                    <AvatarFallback>{message.sender[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                <p className="text-sm text-gray-500">{message.sender}</p>
                                <p className="text-sm bg-gray-200 dark:bg-gray-700 p-2 rounded-md">
                                    {message.content}
                                </p>
                                <p className="text-sm text-gray-400">{message.timestamp}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </ScrollArea>
                </div>
                <div className="border-t">
                    <form className="p-4 flex space-x-3" onSubmit={sendMessage}>
                        <Input
                            className="flex-grow dark:bg-muted/30 dark:border-input/30 dark:text-primary-foreground"
                            placeholder="Escreva uma mensagem"
                            value={sentMessage}
                            onChange={(e) => setSentMessage(e.target.value)}
                        />
                        <Button className="text-lg" type="submit">
                            Enviar
                        </Button>
                    </form>
                </div>
            </div>  
        </div>
    )
}