import { useEffect, useState } from "react";
import io from "socket.io-client";

interface ChatRoomProp {
    chat: number | null,
    setChat: Function
}

const socket = io("");

const ChatRoom:React.FC<ChatRoomProp> = ({ chat, setChat }) => {

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
            token: ""
        });

        //add text
            setMessage([
            ...message,
            {
                message: text
            }
        ]);

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

    return (
        <>
        <div>
            <button onClick={() => {setChat(null)}}>Back</button>
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