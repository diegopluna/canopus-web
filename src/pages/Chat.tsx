import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react";

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');


    // useEffect(() => {
    //     const socket = new WebSocket('ws://localhost:8080/ws');
      
    //     socket.onopen = () => {
    //       console.log('WebSocket connection established.');
    //     };
      
    //     socket.onmessage = (event) => {
    //       const receivedMessage = JSON.parse(event.data);
    //       setMessages([...messages, receivedMessage]);
    //     };
      
    //     return () => {
    //       socket.close();
    //     };
    // }, [messages]);

    // const sendMessage = () => {
    //     if (messageInput.trim() !== '') {
    //       const message = {
    //         text: messageInput,
    //         timestamp: new Date().toISOString(),
    //       };
    //       socket.send(JSON.stringify(message));
    //       setMessageInput('');
    //     }
    // };
      

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
                    <div className="p-4 space-y-4 overflow-y-scroll h-full">
                        
                    </div>
                </div>
                <div className="border-t">
                    <div className="p-4 flex space-x-3">
                        <Input
                            className="flex-grow dark:bg-muted/30 dark:border-input/30 dark:text-primary-foreground"
                            placeholder="Type a message"
                        />
                        <Button className="text-lg">
                            Send
                        </Button>

                    </div>
                </div>
            </div>  
        </div>
    )
}