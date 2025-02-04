import {useLocalStorage} from "../../utils.ts";
import {useNavigate} from "react-router-dom";

function SettingsPage() {
    const [username, setUsername] = useLocalStorage('live.username');
    const [chatServer, setChatServer] = useLocalStorage('live.chat.server');
    const [streamAddress, setStreamAddress] = useLocalStorage('live.stream');


    const navigate = useNavigate();

    const handleShare = async () => {
        const cfg = {
            s: streamAddress,
            c: chatServer
        };
        // encode cfg
        const b64 = btoa(JSON.stringify(cfg));
        const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/?config=${b64}`;
        await navigator.clipboard.writeText(url);
        alert(`复制到剪贴板了 ${url}`)
    }

    const handleBack = () => {
        navigate('/');
    }

    return (<>
        <div
            className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white p-4">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                设置
            </h1>

            <div className={"flex flex-col gap-2 items-center rounded h-full p-4 m-2 shadow-xl backdrop-blur-2xl"}>
                <h1 className={"text-2xl"}>通用设置</h1>
                <div className={"flex flex-row gap-2 mt-3"}>
                    <label>聊天昵称:</label>
                    <input placeholder={'nickname'} className={"border border-amber-400 rounded p-2"}
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <h1 className={"text-2xl"}>高级设置</h1>
                <p className={"text-red-500"}>如果你不知道这些是什么那就不要修改这些设置</p>
                <div className={"m-auto flex flex-col items-center w-full"}>
                    <div className={"flex flex-row gap-2 mt-3 items-center text-nowrap"}>
                        <label>聊天服务:</label>
                        <input placeholder={'ws://example.com'} className={"border border-amber-400 rounded p-2 w-full"}
                               value={chatServer}
                               onChange={(e) => setChatServer(e.target.value)}
                        />
                    </div>
                    <div className={"flex flex-row gap-2 mt-3 items-center text-nowrap"}>
                        <label>推流链接:</label>
                        <input placeholder={'http://example.com/video'}
                               className={"border border-amber-400 rounded p-2 w-full"}
                               value={streamAddress}
                               onChange={(e) => setStreamAddress(e.target.value)}
                        />
                    </div>
                    <button className="px-4 py-2 m-4 bg-purple-500 rounded" onClick={handleShare}>
                        分享推流
                    </button>
                    <button className="px-4 py-2 m-4 bg-purple-500 rounded" onClick={handleBack}>
                        返回
                    </button>
                </div>
            </div>
        </div>
    </>);
}

export default SettingsPage;