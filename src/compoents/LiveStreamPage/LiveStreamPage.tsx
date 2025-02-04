import {useEffect, useRef, useState} from "react";
import DPlayer from "dplayer";
import ChatRoom from "../ChatRoom/ChatRoom.tsx";
import OnlineStatus from "../OnlineStatus/OnlineStatus.tsx";
import {useLocalStorage} from "../../utils.ts";

function LiveStreamPage() {
    const playerRef = useRef<HTMLDivElement>(null);
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<{ user: string; time: string; content: string }[]>([]);
    const [onlineCount, setOnlineCount] = useState(0);
    const [connectionStatus, setConnectionStatus] = useState("connecting");

    const [username, setUsername] = useLocalStorage('live.username');
    const [chatServer] = useLocalStorage('live.chat.server');
    const [streamAddress] = useLocalStorage('live.stream');

    useEffect(() => {
        if (playerRef.current) {
            new DPlayer({
                container: playerRef.current,
                live: true,
                video: {
                    type: "flv",
                    url: streamAddress,
                },
                theme: "#7c3aed",
                // danmaku: false,
            });
        }

        if (!username) {
            setUsername(`用户${Math.floor(Math.random() * 1000)}`)
        }
    });

    useEffect(() => {
        const websocket = new WebSocket(chatServer);
        websocket.onopen = () => setConnectionStatus("connected");
        websocket.onclose = () => setConnectionStatus("disconnected");
        websocket.onerror = () => setConnectionStatus("disconnected");
        websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "message") {
                setMessages((prev) => [...prev, data.data]);
            } else if (data.type === "online") {
                setOnlineCount(data.count);
            } else if (data.type === "history") {
                setMessages((prev) => [...prev, ...data.data]);
            }
        };
        setWs(websocket);
        return () => websocket.close();
    }, []);

    const sendMessage = (message: string) => {
        if (ws && message.trim()) {
            ws.send(JSON.stringify({user: username, content: message}));
        }
    };

    return (
        <div
            className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white p-4">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                直播学习平台
            </h1>
            <div ref={playerRef} className="absolute w-full max-w-4xl my-6 rounded-lg m-4 overflow-hidden shadow-lg"></div>

            <ChatRoom messages={messages} sendMessage={sendMessage}/>
            <OnlineStatus connectionStatus={connectionStatus} onlineCount={onlineCount}/>
        </div>
    );
}

export default LiveStreamPage;