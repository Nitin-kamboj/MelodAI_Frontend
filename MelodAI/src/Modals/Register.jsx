import { useState } from "react";

export function Register({ onSwitchToSignIn, onSuccess }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const API_BASE = import.meta.env.VITE_HTTP;

    async function submitHandler(e) {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/api/user/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || "Registration failed. Username or email may already be in use.");
            }

            alert("Registration successful! Please sign in.");
            if (onSuccess) onSuccess();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white px-8 py-8 w-full">
            {/* Header */}
            <div className="text-center mb-6">
                <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold text-lg mx-auto shadow-sm mb-3">
                    M
                </div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">Create an account</h2>
                <p className="text-xs text-slate-500 mt-1">Start generating AI soundscapes today</p>
            </div>

            {error && (
                <div className="mb-4 p-3 text-xs font-medium text-rose-600 bg-rose-50 border border-rose-200 rounded-lg text-center">
                    {error}
                </div>
            )}

            <form onSubmit={submitHandler} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Username</label>
                    <input 
                        onChange={(e) => setUsername(e.target.value)} 
                        id="username" 
                        type="text" 
                        required 
                        placeholder="johndoe"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" 
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Email address</label>
                    <input 
                        onChange={(e) => setEmail(e.target.value)} 
                        id="email" 
                        type="email" 
                        required 
                        autoComplete="email" 
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" 
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Password</label>
                    <input 
                        onChange={(e) => setPassword(e.target.value)} 
                        id="password" 
                        type="password" 
                        required 
                        autoComplete="new-password" 
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" 
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Confirm Password</label>
                    <input 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        id="confirmPassword" 
                        type="password" 
                        required 
                        autoComplete="new-password" 
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" 
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full mt-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium py-2.5 text-sm shadow-xs transition-all duration-200 cursor-pointer disabled:opacity-50"
                >
                    {loading ? "Creating account..." : "Register"}
                </button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-500">
                Already have an account?{' '}
                <button 
                    type="button" 
                    onClick={onSwitchToSignIn} 
                    className="font-semibold text-violet-600 hover:text-violet-700 cursor-pointer bg-transparent border-none p-0"
                >
                    Sign In
                </button>
            </p>
        </div>
    );
}