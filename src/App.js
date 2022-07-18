import React, { useState, useEffect } from "react";
import Login from "./Login";
import Welcome from "./Welcome";

const App = () => {
    const [token, setToken] = useState("");

    useEffect(() => {
        async function getToken() {
            const response = await fetch("/auth/token");
            const json = await response.json();
            setToken(json.access_token);
            // spotifyApi.setAccessToken(json.access_token);
            // console.log(spotifyApi.getAccessToken());
        }
        getToken();
    }, []);

    return <>{token === "" ? <Login /> : <Welcome token={token} />}</>;
};

export default App;
