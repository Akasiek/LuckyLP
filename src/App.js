import React, { useState, useEffect } from "react";
import Login from "./Login";
import Welcome from "./Welcome";

const App = () => {
    const [token, setToken] = useState("");

    useEffect(() => {
        (async function getToken() {
            const response = await fetch("/auth/token");
            const json = await response.json();
            setToken(json.access_token);
        })();
    }, []);

    return (
        <div
            className="w-screen h-screen p-4
            bg-zinc-200 dark:bg-zinc-900 text-gray-900 dark:text-gray-100"
        >
            {token === "" ? <Login /> : <Welcome token={token} />}
        </div>
    );
};

export default App;
