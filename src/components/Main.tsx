import { useEffect, useState } from "react";

// components
import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";
import io from "socket.io-client";

// dummy
import { userlist } from "../dummy/userlist";

interface MainProps {
    token: string| null,
    setToken: Function
}



const Main:React.FC<MainProps> = ({
    token,
    setToken
}) => {

    const socket = io("ws://localhost:5050");

    const [room, setRoom] = useState<object[]>([]);

    // get rooms from socket
    useEffect(() => {
        //emit chat page to server to get room list
        socket.emit("chat page", {
            token
        });

        socket.on("chat page", data => {

            // set roooms
            setRoom(data);
        })
    
    }, []);

    //current room
    const [chat, setChat] = useState<number | null>(null);

    

    return (
        <>
        {chat ? <ChatRoom chat={chat} setChat={setChat} socket={socket} token={token} /> : <ChatList token={token} rooms={room} setChat={setChat} socket={socket} />}
        </>
    )
}

export default Main;