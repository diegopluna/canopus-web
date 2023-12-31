import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Client, IMessage } from "@stomp/stompjs"
import { useEffect, useMemo, useState, useContext, useRef } from "react"
import AuthContext from "@/context/AuthProvider"
import { DateTime } from 'luxon';



interface ChatMessage {
    type: string,
    sender: string,
    content: string,
    timestamp: string,
    avatar: string,
    id: string
}

export default function Chat() {
    const [sentMessage, setSentMessage] = useState("")
    const [receivedMessages, setReceivedMessages] = useState<ChatMessage[]>([])   
    const domain: string  = window.location.hostname === "localhost" ? "ws://localhost:8080/ws" : "wss://api-canopus.dpeter.tech/ws"

    const authContext = useContext(AuthContext)
    if (authContext === undefined) {
        return null
    }
    const { user } = authContext;


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

    function onMessageReceived(payload: IMessage) {
        console.log(payload)
        const message = JSON.parse(payload.body)
        message.timestamp = DateTime.fromISO(message.timestamp + 'Z').setZone('local').toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
        setReceivedMessages(prevMessages => [...prevMessages, message])
    }
    
    function sendMessage(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        client.publish({destination: '/app/chat.sendMessage', body: JSON.stringify({
            sender: user?.fullName, //TODO MUDAR ISSO AI
            type: "CHAT",
            content: sentMessage,
            avatar: user?.avatar,
            id: user?.jti
        })})
        setSentMessage("")
    }

    return (
        <div className="grid h-screen  gap-4 p-4">
            <div className="flex flex-col h-full rounded-lg shadow overflow-hidden">
                <div className="flex-grow overflow-auto">
                    <ScrollArea className="p-4 space-y-4 h-full">
                        {receivedMessages.map((message, index) => {
                            if ( message.id === user?.jti) {
                                return (
                                    <div className="flex items-start space-x-3 justify-end" key={index}>
                                        <div>
                                            <p className="text-sm text-gray-500 text-right">{message.sender}</p>
                                            <p className="text-sm bg-gray-200 dark:bg-gray-700 p-2 rounded-md">
                                                {message.content}
                                            </p>
                                            <p className="text-sm text-gray-400 text-right">{message.timestamp}</p>
                                        </div>
                                        <Avatar>
                                            <AvatarImage src={message.avatar} />
                                            <AvatarFallback>{message.sender[0].toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                )            
                            }
                            return (
                                <div className="flex items-start space-x-3" key={index}>
                                    <Avatar>
                                        <AvatarImage src={message.avatar} />
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
                            )                           
                        })}
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