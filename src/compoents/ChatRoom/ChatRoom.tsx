import {useEffect, useRef, useState} from "react";
import {Message} from "../../entities.ts";
import {useNavigate} from "react-router-dom";
import {FaArrowDown} from "react-icons/fa";

interface Props {
    messages: Message[];
    sendMessage: (message: string) => void;
}

function ChatRoom(props: Props) {
    const [message, setMessage] = useState("");
    const messageListRef = useRef<HTMLDivElement>(null);
    const [chatBoxState, setChatBoxState] = useState(true)

    const navigate = useNavigate();

    const handleSendMessage = () => {
        props.sendMessage(message);
        // clear chat box
        setMessage('');
    }

    const handleSettings = () => {
        navigate("/settings");
    }

    const toggleChatBox = () => {
        setChatBoxState(!chatBoxState);
    }

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [props.messages]);

    return (<>
        <div
            className="relative lg:fixed bottom-0 right-0 lg:bottom-3 lg:right-3 w-full lg:max-w-md p-4 bg-gray-800 rounded-3xl shadow-lg transition-all">
            <div className={"flex flex-row justify-between select-none"}>
                <div className={"flex flex-row gap-3"}>
                    <div className="text-lg font-semibold">直播聊天室</div>
                    <div className={"text-lg hover:underline hover:text-blue-500"} onClick={handleSettings}>设置</div>
                </div>
                <div className={"flex flex-row gap-2"}>
                    <div className={`rounded-full p-1 border ${!chatBoxState && 'rotate-180'} transition duration-200 hover:bg-[#222]`} onClick={toggleChatBox}><FaArrowDown size={20}/></div>
                </div>
            </div>
            <div ref={messageListRef} className={`${chatBoxState ? 'h-64' : 'h-14'} transition-all duration-200 overflow-y-auto p-2 border-b border-gray-600`}>
                {props.messages.map((msg, index) => (
                    <div key={index} className="mb-2 p-2 bg-gray-700 rounded">
                        <span className="font-semibold text-purple-400">{msg.user}</span>: {msg.content}
                    </div>
                ))}
            </div>
            <div className="flex mt-2">
                <input
                    type="text"
                    className="flex-1 p-2 bg-gray-700 rounded-l outline-none"
                    placeholder="输入消息..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button className="px-4 bg-purple-500 rounded-r" onClick={handleSendMessage}>
                    发送
                </button>
            </div>
        </div>
    </>);
}

export default ChatRoom;