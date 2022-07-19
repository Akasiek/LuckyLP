import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import AlbumView from "./AlbumView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

const Welcome = ({ token }) => {
    const [savedAlbumsCount, setSavedAlbumsCount] = useState(0);
    const [choosenAlbum, setChoosenAlbum] = useState(null);
    const [choosenArtistGenres, setChoosenArtistGenres] = useState([]);
    const [spotifyApi] = useState(new SpotifyWebApi());
    const [error, setError] = useState(null);
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
    }, [spotifyApi]);

    const chooseRandomAlbum = () => {
        spotifyApi
            .getMySavedAlbums({
                limit: 1,
                offset: Math.floor(Math.random() * savedAlbumsCount),
            })
            .then((data) => {
                const album = data.body.items[0].album;

                // Get album's artist genres
                spotifyApi.getArtist(album.artists[0].id).then(
                    (data) => setChoosenArtistGenres(data.body.genres.slice(0, 3)),
                    (err) => console.error(err)
                );

                // Set the choosen album
                setChoosenAlbum(album);
                setError(null);
            });
    };

    const playChoosenAlbum = () => {
        // Check if user has at least one device available
        spotifyApi.getMyDevices().then((data) => {
            if (data.body.devices.filter((device) => device.is_active).length > 0) {
                // Turn off shuffle
                spotifyApi.setShuffle(false);

                // Play the choosen album
                spotifyApi
                    .play({
                        context_uri: choosenAlbum.uri,
                    })
                    .then(
                        (data) => setError(null),
                        (err) => setError(err.message)
                    );
            } else {
                // Open album in Spotify
                window.open(choosenAlbum.external_urls.spotify);
            }
        });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <>
            <div className="md:w-[42rem] h-full max-w-sm md:max-w-none mx-auto flex gap-5 flex-col items-center justify-center text-center font-serif">
                {choosenAlbum ? (
                    <>
                        <AlbumView
                            album={choosenAlbum}
                            genres={choosenArtistGenres}
                            handlePlay={playChoosenAlbum}
                            handleNextAlbum={chooseRandomAlbum}
                        />
                        {error && <p className="text-red-500">{error}</p>}
                    </>
                ) : (
                    <>
                        <p className="text-lg">
                            You have <span className="font-bold">{savedAlbumsCount || "..."}</span> saved albums
                        </p>
                        <button
                            onClick={chooseRandomAlbum}
                            className={"btn-primary text-lg flex gap-2 items-center" + (choosenAlbum ? "hidden" : "")}
                        >
                            Get random album
                            <FontAwesomeIcon icon={faFire} />
                        </button>
                    </>
                )}
            </div>
            <button type="button" onClick={handleLogout} className="absolute bottom-3 left-3 btn-primary">
                Logout
            </button>
        </>
    );
};
export default Welcome;
