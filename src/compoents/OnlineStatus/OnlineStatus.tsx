interface Props {
    connectionStatus: string;
    onlineCount: number;
}

function OnlineStatus(props: Props) {
    return (<>
        <div className="fixed bottom-1 left-1 mt-4 p-2 m-4 bg-gray-700 rounded-lg flex items-center">
                <span className={`w-3 h-3 rounded-full mr-2 ${
                    props.connectionStatus === "connected" ? "bg-green-500" : "bg-red-500"
                }`}></span>
            {props.connectionStatus === "connected" ? "已连接" : "连接中..."} | 在线：{props.onlineCount}
        </div>
    </>);
}

export default OnlineStatus;