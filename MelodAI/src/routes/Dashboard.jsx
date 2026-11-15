import { useEffect, useState, useRef } from "react";
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Dashboard')({
  component: Dashboard,
})
export function Dashboard() {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [playingId, setPlayingId] = useState(null);
    const http = import.meta.env.VITE_HTTP;
    
    // Reference to keep track of the currently playing HTML5 audio object
    const audioRef = useRef(null);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await fetch(`${http}/api/music/all`);
                if (!response.ok) {
                    throw new Error("Could not load all the music tracks.");
                }
                const data = await response.json();
                
                // Keep only tracks that have a valid file path and are completed
                const validTracks = data.filter(
                    (track) => track.filePath !== null && track.status === "COMPLETED"
                );
                
                setTracks(validTracks);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTracks();

        // Cleanup audio on unmount
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    const handlePlay = (track) => {
        // If clicking the same track that is currently playing, pause it
        if (playingId === track.id) {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            setPlayingId(null);
            return;
        }

        // If another track is playing, stop it first
        if (audioRef.current) {
            audioRef.current.pause();
        }

        // Play the new track using Cloudinary filePath
        const audioElement = new Audio(track.filePath);
        audioRef.current = audioElement;

        audioElement.play()
            .then(() => {
                setPlayingId(track.id);
            })
            .catch((err) => {
                console.error("Playback failed:", err);
                alert("Could not play audio track.");
            });

        // When track finishes playing naturally, reset state
        audioElement.onended = () => {
            setPlayingId(null);
        };
    };

    const handleCreateMusic = () => {
        alert("Redirecting to Music Creation / Generation Studio...");
    };

    if (loading) {
        return (
            <div className="w-full text-center py-20 text-slate-500 font-medium bg-slate-50 min-h-screen flex items-center justify-center">
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
                    Loading your audio workspace...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full text-center py-20 text-rose-600 font-medium bg-slate-50 min-h-screen">
                {error}
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-slate-50 text-slate-950 px-6 py-8">
            <div className="max-w-7xl mx-auto">
                
                {/* Top Bar: Section Title & Create Music Button */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            MelodAI Studio
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Explore and manage your AI-generated soundscapes.
                        </p>
                    </div>
                    
                    <button 
                        onClick={handleCreateMusic}
                        className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-6 py-2.5 rounded-xl shadow-xs transition-all duration-200 tracking-wide flex items-center gap-2 cursor-pointer"
                    >
                        <span>+</span> CREATE MUSIC
                    </button>
                </div>

                {/* Music Cards Grid */}
                {tracks.length === 0 ? (
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
                        {tracks.map((track) => {
                            const isPlaying = playingId === track.id;
                            return (
                                <div 
                                    key={track.id} 
                                    className="flex flex-col bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden hover:shadow-md hover:border-slate-300 transition-all duration-200 group"
                                >
                                    {/* Play Button Area */}
                                    <div 
                                        onClick={() => handlePlay(track)}
                                        className="h-44 bg-slate-50 flex items-center justify-center cursor-pointer relative group-hover:bg-slate-100/80 transition-colors"
                                    >
                                        {/* Status Badge Pill */}
                                        <span className="absolute top-3 right-3 text-[10px] font-semibold tracking-wider uppercase bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
                                            {track.status}
                                        </span>

                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-sm transition-transform duration-200 ${
                                            isPlaying 
                                                ? "bg-violet-600 text-white scale-105" 
                                                : "bg-white text-slate-900 border border-slate-200 group-hover:scale-105"
                                        }`}>
                                            {isPlaying ? (
                                                /* Pause Icon */
                                                <div className="w-4 h-4 bg-white rounded-xs"></div>
                                            ) : (
                                                /* Play Icon */
                                                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-slate-900 border-b-[8px] border-b-transparent ml-1"></div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Track Title Footer Area */}
                                    <div className="border-t border-slate-200 py-3.5 px-4 bg-white">
                                        <h3 className="font-medium text-slate-950 text-sm truncate" title={track.title}>
                                            {track.title || "Untitled Track"}
                                        </h3>
                                        <p className="text-xs text-slate-500 mt-0.5">AI Generated Audio</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}