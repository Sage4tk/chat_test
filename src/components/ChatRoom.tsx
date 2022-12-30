import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface ChatRoomProp {
    chat: number | null,
    setChat: Function,
    socket: Socket,
    token: string | null
}

const ChatRoom:React.FC<ChatRoomProp> = ({ 
    chat, 
    setChat, 
    socket, 
    token 
}) => {

    // messages
    const [message, setMessage] = useState<object[]>([]);

    // text form
    const [text, setText] = useState<string>("");

    // listener
    const textListener = (e:any) => {
        setText(e.target.value);
    }

    //send text
    const sendText = (e:any) => {
        e.preventDefault();

        // emit to backend
        socket.emit("message", {
            message: text,
            token
        });

        // clear text input
        setText("");
    }

    useEffect(() => {
        //emit to join a room
        socket.emit("join room", {
            room_id: chat,
        });

        //set data
        socket.on("message", data => {
           setMessage([
            ...message,
            data
           ]);
        });
    }, []);

    // LEAVE ROOM
    const leaveRoom = () => {
        setChat(null);
        
        // emit leave with the room
        socket.emit("leave", {
            room_id: chat
        });
    }

    return (
        <>
        <div>
            <button onClick={leaveRoom}>Back</button>
            <p>{chat}</p>
        </div>
        <div>
            <div className="chat__message">
                {message && message.map((data:any, index:number) => (
                    <div key={index}>
                        <div>{data.message}</div>
                    </div>
                ))}
            </div>
            <form className="chat__form" onSubmit={sendText}>
                <input value={text} onChange={textListener} />
                <input value="send" type="submit" />
            </form>
        </div>
        </>
    )
}

export default ChatRoom;