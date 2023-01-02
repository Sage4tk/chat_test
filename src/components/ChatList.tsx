import { useState } from "react";
import useFetch from "../hooks/useFetch";

// components
import CreateModal from "./CreateModal";

interface ChatRoomProps {
    token: String | null,
    rooms: object[],
    setChat: Function,
    socket: any
}

const ChatList:React.FC<ChatRoomProps> = ({ rooms, setChat }) => {

    // create modal
    const [create, setCreate] = useState<boolean>(false);

    return (
        <>
        <div>
            <div>
                <h1>Chat rooms</h1>
            </div>
            <div>
                {rooms && rooms.map((data:any) => (
                    <div key={data.room_id} onClick={() => {setChat(data.room_id)}}>
                        <h2>{`${data.with.user_id.first_name} ${data.with.user_id.last_name}`}</h2>
                    </div>
                ))}
            </div>
            <div className="add" onClick={() => {setCreate(true)}}>+</div>
        </div>
        <CreateModal create={create} setCreate={setCreate} />
        </>
    )
}

export default ChatList;