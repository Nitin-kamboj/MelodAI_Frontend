import { useState } from "react";

export function Dashboard() {
    // Sample public music tracks data
    const [tracks, setTracks] = useState([
        { id: 1, name: "Neon Sunset" },
        { id: 2, name: "Cyber Pulse" },
        { id: 3, name: "Midnight Lofi" },
        { id: 4, name: "Electric Dream" },
        { id: 5, name: "Starlight Echo" },
        { id: 6, name: "Velocity Beat" },
        { id: 7, name: "Horizon Wave" },
    ]);

    const [playingId, setPlayingId] = useState(null);

    const handlePlay = (id) => {
        setPlayingId(playingId === id ? null : id);
    };

    const handleCreateMusic = () => {
        alert("Redirecting to Music Creation / Generation Studio...");
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-8 flex-grow">
            
            {/* Top Bar: Section Title & Create Music Button */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold tracking-wide text-gray-800">
                    Public Music
                </h1>
                
                <button 
                    onClick={handleCreateMusic}
                    className="border border-gray-400 bg-white hover:bg-gray-100 text-gray-800 font-medium px-6 py-2.5 rounded-full shadow-sm transition-colors tracking-wide"
                >
                    CREATE MUSIC
                </button>
            </div>

            {/* Music Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {tracks.map((track) => {
                    const isPlaying = playingId === track.id;
                    return (
                        <div 
                            key={track.id} 
                            className="flex flex-col border border-gray-400 bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                        >
                            {/* Play Button Area */}
                            <div 
                                onClick={() => handlePlay(track.id)}
                                className="h-44 bg-gray-100 flex items-center justify-center cursor-pointer group hover:bg-gray-200 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-full border border-gray-400 bg-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                                    {isPlaying ? (
                                        /* Pause Icon */
                                        <div className="w-4 h-4 bg-gray-800 rounded-sm"></div>
                                    ) : (
                                        /* Play Icon using standard triangle borders */
                                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-gray-800 border-b-[8px] border-b-transparent ml-1"></div>
                                    )}
                                </div>
                            </div>

                            {/* Track Name Footer Area */}
                            <div className="border-t border-gray-400 py-3 px-4 bg-white text-center font-medium text-gray-800 tracking-wider text-sm truncate">
                                {track.name}
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}