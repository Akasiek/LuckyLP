import React, { useState, useEffect } from "react";
import Login from "./Login";
import RandomAlbum from "./RandomAlbum";

const App = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        (async function getToken() {
            const response = await fetch("/auth/token");
            const json = await response.json();
            const jsonToken = json.access_token;
            if (jsonToken !== "") {
                localStorage.setItem("token", jsonToken);
                setToken(jsonToken);
            }
        })();
    }, []);

    return (
        <div
            className="w-screen h-screen p-4
            bg-zinc-200 dark:bg-zinc-900 text-gray-900 dark:text-gray-100"
        >
            {token === null ? <Login /> : <RandomAlbum token={token} setToken={setToken} />}
        </div>
    );
};

export default App;
