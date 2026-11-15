import { useEffect, useState } from "react";
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Music')({
  component: Music,
})

export function Music() {
    const [music, setMusic] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [playingId, setPlayingId] = useState(null);

    // Fallback directly to your backend port if env isn't defined
    const API_BASE = import.meta.env.VITE_HTTP;

    useEffect(() => {
        const fetchUserLibrary = async () => {
            try {
                const token = localStorage.getItem("token"); // Retrieve JWT token
                const response = await fetch(`${API_BASE}/api/music/my-library`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Could not load your music tracks.");
                }

                const data = await response.json();
                
                // Filter for completed tracks with valid files
                const validTracks = data.filter(
                    (track) => track.filePath !== null && track.status === "COMPLETED"
                );
                
                setMusic(validTracks);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserLibrary();
    }, []);

    const handlePlay = (id) => {
        setPlayingId(playingId === id ? null : id);
    };

    const handleCreateMusic = () => {
        // Redirect or trigger your creation studio modal/page here
        alert("Redirecting to Music Creation Studio...");
    };

    if (loading) {
        return (
            <div className="w-full max-w-6xl mx-auto px-6 py-24 text-center">
                <p className="text-slate-500 text-lg font-medium">Loading your library...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full max-w-6xl mx-auto px-6 py-24 text-center">
                <p className="text-red-500 text-lg font-medium">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold tracking-wide text-slate-800">
                    My Music Library
                </h1>
                <button 
                    onClick={handleCreateMusic}
                    className="border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-medium px-6 py-2.5 rounded-full shadow-xs transition-colors tracking-wide cursor-pointer"
                >
                    CREATE MUSIC
                </button>
            </div>

            {music.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-2xl border border-slate-200 shadow-xs">
                    <p className="text-slate-500 text-base font-medium">No completed tracks available yet.</p>
                    <button 
                        onClick={handleCreateMusic}
                        className="mt-4 text-sm font-semibold text-violet-600 hover:underline cursor-pointer"
                    >
                        Generate your first track →
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {music.map((track) => {
                        const isPlaying = playingId === track.id;
                        return (
                            <div 
                                key={track.id} 
                                className="flex flex-col border border-slate-200 bg-white rounded-xl shadow-xs overflow-hidden hover:shadow-md transition-shadow"
                            >
                                {/* Play Button Area / Artwork Box */}
                                <div 
                                    onClick={() => handlePlay(track.id)}
                                    className="h-44 bg-slate-100 flex items-center justify-center cursor-pointer group hover:bg-slate-200 transition-colors relative"
                                >
                                    <div className="w-12 h-12 rounded-full border border-slate-300 bg-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                                        {isPlaying ? (
                                            <div className="w-4 h-4 bg-slate-800 rounded-xs"></div>
                                        ) : (
                                            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-slate-800 border-b-[8px] border-b-transparent ml-1"></div>
                                        )}
                                    </div>
                                </div>

                                {/* Audio Player HTML element if playing */}
                                {isPlaying && track.filePath && (
                                    <audio src={track.filePath} autoPlay controls className="w-full mt-2 px-2" />
                                )}

                                {/* Track Title Footer */}
                                <div className="border-t border-slate-100 py-3 px-4 bg-white text-center font-medium text-slate-800 tracking-wider text-sm truncate">
                                    {track.title || "Untitled Track"}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}