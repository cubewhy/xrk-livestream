import './App.css'
import {HashRouter, Route, Routes} from "react-router-dom";
import LiveStreamPage from "./compoents/LiveStreamPage/LiveStreamPage.tsx";
import SettingsPage from "./compoents/SettingsPage/SettingsPage.tsx";
import {useLocalStorage} from "./utils.ts";
import {useEffect} from "react";
import {LiveConfig} from "./entities.ts";

function App() {
    const [,setChatServer] = useLocalStorage('live.chat.server');
    const [,setStreamAddress] = useLocalStorage('live.stream');

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        try {
            const encodedParam = queryParams.get('config');
            if (encodedParam) {
                // decode param
                const config: LiveConfig = JSON.parse(atob(encodedParam));
                setChatServer(config.c);
                setStreamAddress(config.s);
            }
        } catch (e) {
            console.error("Failed to receive config");
            console.error(e);
        }
    });

    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path={'/'} element={<LiveStreamPage/>}/>
                    <Route path={'/settings'} element={<SettingsPage/>}/>
                </Routes>
            </HashRouter>
        </>
    )
}

export default App
