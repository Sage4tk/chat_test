import { useState } from "react";

// components
import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";

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

    const [room, setRoom] = useState<object[]>([...userlist]);

    //current room
    const [chat, setChat] = useState<number | null>(null);

    return (
        <>
        {chat ? <ChatRoom chat={chat} setChat={setChat} /> : <ChatList token={token} rooms={room} setChat={setChat} />}
        </>
    )
}

export default Main;