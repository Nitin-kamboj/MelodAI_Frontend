import { useState } from "react";

export function SignIn({ onSwitchToRegister, onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_BASE = import.meta.env.VITE_HTTP;

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 👈 Updated endpoint from /signin to /login to match Usercontroller.java
      const response = await fetch(`${API_BASE}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || "Invalid username or password.");
      }

      const data = await response.json();
      console.log("Token successfully stored. Triggering onSuccess...");

      // Save the token to local storage (adjust based on whether your backend returns a map or string token)
      localStorage.setItem("token", data.token || data.accessToken || data);
      console.log("onSuccess value:", onSuccess);
      console.log("onSuccess type:", typeof onSuccess);

      onSuccess();

      console.log("Callback finished");
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
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Welcome back to MelodAI
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Sign in to access your AI music studio
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 text-xs font-medium text-rose-600 bg-rose-50 border border-rose-200 rounded-lg text-center">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            Username
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            type="text"
            required
            autoComplete="username"
            placeholder="johndoe"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Password
            </label>
          </div>
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium py-2.5 text-sm shadow-xs transition-all duration-200 cursor-pointer disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-slate-500">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="font-semibold text-violet-600 hover:text-violet-700 cursor-pointer bg-transparent border-none p-0"
        >
          Register Now
        </button>
      </p>
    </div>
  );
}
