import { useState } from "react";
import useFetch from "../hooks/useFetch";

interface ChatRoomProps {
    token: String | null,
    rooms: object[],
    setChat: Function
}

const ChatList:React.FC<ChatRoomProps> = ({ rooms, setChat }) => {

    return (
        <>
        <div>
            <div>
                <h1>Chat rooms</h1>
            </div>
            <div>
                {rooms && rooms.map((data:any) => (
                    <div key={data.room_id} onClick={() => {setChat(data.room_id)}}>
                        <h2>{data.room_id}</h2>
                    </div>
                ))}
            </div>
            <div className="add">+</div>
        </div>
        </>
    )
}

export default ChatList;