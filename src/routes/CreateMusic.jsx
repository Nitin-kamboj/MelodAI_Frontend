import { createFileRoute, useNavigate } from '@tanstack/react-router'
import React, { useState } from "react";
export const Route = createFileRoute('/CreateMusic')({
  component: CreateMusic,
})

const GENRES = ["Lo-Fi", "Synthwave", "Pop", "Cinematic", "Hip-Hop", "Ambient"];
const MOODS = ["Chill", "Energetic", "Dark", "Uplifting", "Focus", "Dreamy"];
const DURATIONS = [
  { label: "15 sec", value: 15, cost: 10 },
  { label: "30 sec", value: 30, cost: 20 },
  { label: "60 sec", value: 60, cost: 35 },
];

export default function CreateMusic() {
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Lo-Fi");
  const [selectedMood, setSelectedMood] = useState("Chill");
  const [duration, setDuration] = useState(DURATIONS[1]);
  const [instrumental, setInstrumental] = useState(true);

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [generatedTrack, setGeneratedTrack] = useState(null);
  const http = import.meta.env.VITE_HTTP;
  const navigate = useNavigate();

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError("Please describe the music you want to create.");
      return;
    }

    setError("");
    setIsGenerating(true);
    setGeneratedTrack(null);

    // 1. Combine all fields into a single comprehensive prompt string
    const combinedPrompt = `Genre: ${selectedGenre} | Mood: ${selectedMood} | Duration: ${duration.label} | Instrumental: ${instrumental ? "Yes" : "No"} | Details: ${prompt.trim()}`;

    try {
      const token = localStorage.getItem("token");
      
      // 2. Send it as a single string (using URLSearchParams for RequestParam, or JSON)
      const response = await fetch(`${http}/api/music/generate_music`, {
        method: "POST",
        headers: {
          // Change content type to form-url-encoded
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
        // Send as URL search parameters
        body: new URLSearchParams({ prompt: combinedPrompt }),
        
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to generate music. Check your credit balance.");
      }

      const data = await response.json();
      setGeneratedTrack(data);
      navigate ({to: '/Music'})

    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Create Music
          </h1>
          <p className="text-sm text-slate-500">
            Describe your sound, pick a style, and generate studio-ready AI audio in seconds.
          </p>
        </div>

        {/* Main Studio Card */}
        <form
          onSubmit={handleGenerate}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6"
        >
          {/* Error Banner */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Track Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Track Title (Optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Midnight Rain Study Beat"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-600/15 transition"
            />
          </div>

          {/* Prompt Description */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Music Prompt
              </label>
              <span className="text-xs text-slate-400">{prompt.length}/300</span>
            </div>
            <textarea
              rows={3}
              maxLength={300}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Warm Rhodes piano chords, vinyl crackle, slow dusty hip-hop drums, relaxing late-night atmosphere..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-600/15 transition resize-none"
            />
          </div>

          {/* Genre Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
              Genre
            </label>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((genre) => {
                const active = selectedGenre === genre;
                return (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-3.5 py-1.5 rounded-lg text-sm font-medium border transition ${
                      active
                        ? "bg-violet-600 text-white border-violet-600 shadow-xs"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {genre}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mood Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
              Mood
            </label>
            <div className="flex flex-wrap gap-2">
              {MOODS.map((mood) => {
                const active = selectedMood === mood;
                return (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setSelectedMood(mood)}
                    className={`px-3.5 py-1.5 rounded-lg text-sm font-medium border transition ${
                      active
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {mood}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Duration & Instrumental Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
                Duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {DURATIONS.map((item) => {
                  const active = duration.value === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setDuration(item)}
                      className={`py-2 px-3 rounded-xl border text-center transition ${
                        active
                          ? "border-violet-600 bg-violet-50/70 text-violet-700 font-semibold"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div className="text-sm">{item.label}</div>
                      <div className="text-[11px] text-slate-400">{item.cost} credits</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
                Vocal Mode
              </label>
              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                <div>
                  <p className="text-sm font-medium text-slate-800">Instrumental Only</p>
                  <p className="text-xs text-slate-500">No vocals or lyrics</p>
                </div>
                <button
                  type="button"
                  onClick={() => setInstrumental(!instrumental)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                    instrumental ? "bg-violet-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      instrumental ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Generate CTA */}
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full py-3.5 px-6 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white font-semibold text-sm shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating Your Track...
              </>
            ) : (
              <>Generate Track ({duration.cost} Credits)</>
            )}
          </button>
        </form>

        {/* Result Audio Card */}
        {generatedTrack && (
          <div className="bg-white rounded-2xl shadow-sm border border-violet-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-700 mb-1">
                  Ready to Play
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  {generatedTrack.title || "Generated Track"}
                </h2>
                <p className="text-xs text-slate-500">
                  {selectedGenre} • {selectedMood} • {duration.label}
                </p>
              </div>
              {generatedTrack.audioUrl && (
                <a
                  href={generatedTrack.audioUrl}
                  download
                  className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
                >
                  Download MP3
                </a>
              )}
            </div>

            {generatedTrack.audioUrl && (
              <audio
                controls
                src={generatedTrack.audioUrl}
                className="w-full h-10 rounded-lg"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}