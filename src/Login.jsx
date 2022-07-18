import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

const Login = () => {
    return (
        <div className="w-full h-full text-center flex flex-col items-center justify-center gap-5">
            <div>
                <h1 className="text-5xl font-bold">
                    Lucky<span className="text-main-spotify">LP</span>
                </h1>
                <p className="font-serif">Feeling lucky? Listen to one of your saved albums at random</p>
            </div>
            <a href="/auth/login" className="flex items-center gap-3 btn-primary">
                <span className="font-serif font-bold text-lg">Login with Spotify</span>
                <FontAwesomeIcon icon={faSpotify} className="text-2xl" />
            </a>
        </div>
    );
};

export default Login;
