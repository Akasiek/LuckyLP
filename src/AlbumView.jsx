import React from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faForward } from "@fortawesome/free-solid-svg-icons";

const AlbumView = ({ album, genres, handlePlay, handleNextAlbum }) => {
    const genreString = genres.join(", ");
    return (
        <div className="md:w-full flex gap-3 md:gap-6 flex-col items-center">
            <h3>Chosen album</h3>
            <div className="md:w-full flex flex-col md:flex-row gap-3 md:gap-6 items-center text-center md:text-left ">
                <img src={album.images[1].url} alt={album.name} className="h-44 md:h-52 lg:h-72 aspect-square object-cover object-center" />
                <div>
                    <h2 className="text-base md:text-lg lg:text-xl xl:text-2xl">
                        <a href={album.external_urls.spotify} target="_blank" rel="noreferrer">
                            {album.name}
                        </a>
                    </h2>
                    <h3 className="text-sm md:text-base lg:text-lg xl:text-xl italic">
                        <a href={album.artists[0].external_urls.spotify} target="_blank" rel="noreferrer">
                            {album.artists[0].name}
                        </a>
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-400 dark:text-gray-500 italic">
                        {moment(album.release_date).format("LL")}
                    </p>
                    <p className="italic text-gray-400 dark:text-gray-500 text-xs sm:text-sm md:text-base">{genreString}</p>
                </div>
            </div>
            <div className="flex gap-3">
                <button type="button" onClick={handlePlay} className="btn-primary flex gap-2 items-center">
                    Play it <FontAwesomeIcon icon={faPlay} />
                </button>
                <button type="button" onClick={handleNextAlbum} className="btn-primary flex gap-2 items-center">
                    Next <FontAwesomeIcon icon={faForward} />
                </button>
            </div>
        </div>
    );
};
export default AlbumView;
