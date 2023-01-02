import { useEffect, useRef, useState } from "react";
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

    // auto scroll
    const scrollRef:any = useRef(null);

    // messages
    const [message, setMessage] = useState<object[]>([]);

    useEffect(() => {
        scrollRef.current.scrollIntoView({
            behavior: "smooth"
        });
    }, [message])

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
            token,
            room_id: chat
        });

        // clear text input
        setText("");
    }

    useEffect(() => {
        //emit to join a room
        socket.emit("join", {
            room_id: chat,
        });

        socket.on('error', data => {
            console.log(data);
        })

        return () => {
            socket.emit("leave", {
                room_id:chat
            });
        }
    }, [socket]);

    // use EFFECT FOR GETTING MESSAGES
    useEffect(() => {
        //set data
        socket.on("message", data => {

            console.log("RECEIVED DATA",data);

            setMessage((current) => [...current, ...data.messages]);
            
            
        });
    }, [socket])

    // LEAVE ROOM
    const leaveRoom = () => {
        setChat(null);
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
                    <div className="box" key={index}>
                        <h2>{data.user_id.username}</h2>
                        <div>{data.message}</div>
                    </div>
                ))}
                <div ref={scrollRef} ></div>
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