import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { SignIn } from "../Modals/Sign-in";
import { Register } from "../Modals/Register";

export function Navbar() {
  console.log("NEW NAVBAR VERSION LOADED");
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));
  const [credits, setCredits] = useState(150); // Example initial credits
  const [activeModal, setActiveModal] = useState(null); // 'signin', 'register', or null

  const handleLogOut = async () => {
    try {
      const token = localStorage.getItem("token");
      
      console.log("Logout triggered. Token found:", token ? "Yes" : "No");
      const API_BASE = import.meta.env.VITE_HTTP || "http://localhost:8081";


      if (token) {
        const response = await fetch(`${API_BASE}/api/user/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Logout backend response status:", response.status);
        const text = await response.text();
        console.log("Logout backend response body:", text);
      }
    } catch (err) {
      console.error("Logout backend call failed with error:", err);
    } finally {
      localStorage.removeItem("token");
      setIsLogged(false);
      window.location.href = "/";
    }
  };

  return (
    <>
      <nav className="w-full bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between shadow-xs sticky top-0 z-50">
        {/* Logo container */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              M
            </div>
            <span className="font-bold tracking-tight text-slate-900 text-lg">
              MelodAI
            </span>
          </Link>
        </div>

        {/* Nav Items & Controls */}
        <div className="flex items-center space-x-6 text-slate-600 font-medium text-sm">
          {/* Navigation Links using TanStack Router */}
          <Link
            to="/"
            className="hover:text-slate-950 transition-colors [&.active]:text-violet-600"
          >
            Home
          </Link>
          <Link
            to="/music"
            className="hover:text-slate-950 transition-colors [&.active]:text-violet-600"
          >
            Music Library
          </Link>

          {/* Buy Credits Button */}
          <Link
            to="/checkout"
            className="border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 px-4 py-1.5 rounded-full transition-colors cursor-pointer font-medium text-xs shadow-2xs [&.active]:border-violet-600 [&.active]:text-violet-600"
          >
            Buy Credits
          </Link>

          {/* Credits Counter Display */}
          <div className="border border-slate-200 px-3.5 py-1.5 rounded-full bg-slate-50 text-slate-700 text-xs">
            Credits:{" "}
            <span className="font-semibold text-violet-600">{credits}</span>
          </div>

          {/* Search Bar */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search tracks..."
              className="border border-slate-300 rounded-full px-4 py-1.5 text-xs bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent placeholder-slate-400 w-44 transition-all"
            />
          </div>

          {/* Log In / Log Out Button */}
          <div>
            {isLogged ? (
              <button
                onClick={() => {
                  console.log("Logout button clicked!");
                  handleLogOut();
                }}
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => setActiveModal("signin")}
                className="px-5 py-1.5 rounded-full transition-colors text-xs font-semibold cursor-pointer bg-violet-600 hover:bg-violet-700 text-white shadow-xs"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Inline Modal Backdrop & Container */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Close (X) Button */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-lg w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors cursor-pointer z-10"
            >
              ✕
            </button>

            {/* Render SignIn or Register based on state */}
            {activeModal === "signin" && (
              <SignIn
                onSwitchToRegister={() => setActiveModal("register")}
                onSuccess={() => {

                  console.log("Before update:", isLogged);

                  setIsLogged(true);
                  setActiveModal(null);

                  console.log("Navbar callback completed!");
                }}
              />
            )}

            {activeModal === "register" && (
              <Register
                onSwitchToSignIn={() => setActiveModal("signin")}
                onSuccess={() => setActiveModal("signin")}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
