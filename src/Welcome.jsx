import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const Welcome = ({ token }) => {
    const [savedAlbumsCount, setSavedAlbumsCount] = useState(0);
    const [choosenAlbum, setChoosenAlbum] = useState(null);
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);

    useEffect(() => {
        // Get the user's saved albums count
        spotifyApi
            .getMySavedAlbums({
                limit: 1,
            })
            .then((data) => {
                setSavedAlbumsCount(data.body.total);
            });
    }, []);

    const chooseRandomAlbum = () => {
        spotifyApi
            .getMySavedAlbums({
                limit: 1,
                offset: Math.floor(Math.random() * savedAlbumsCount),
            })
            .then((data) => {
                setChoosenAlbum(data.body.items[0]);
            });
    };

    const playChoosenAlbum = () => {
        // Turn off shuffle
        spotifyApi.setShuffle(false);

        // Play the choosen album
        spotifyApi.play({
            context_uri: choosenAlbum.album.uri,
        });
    };

    return (
        <div>
            <p>You have {savedAlbumsCount} saved albums</p>
            <div>
                <button onClick={chooseRandomAlbum}>Random album</button>
                {choosenAlbum && (
                    <div>
                        <h2>{choosenAlbum.album.name}</h2>
                        <img src={choosenAlbum.album.images[0].url} alt={choosenAlbum.album.name} />
                        <button onClick={playChoosenAlbum}>Play it!</button>
                    </div>
                )}
            </div>
            <a href="/auth/logout">logout</a>
        </div>
    );
};
export default Welcome;
