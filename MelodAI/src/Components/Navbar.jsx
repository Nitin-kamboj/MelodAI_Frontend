import { useState } from "react";

export function Navbar() {
    const [isLogged, setIsLogged] = useState(false);
    const [credits, setCredits] = useState(150); // Example initial credits

    return (
        <nav className="w-full bg-gray-100 border-b border-gray-300 px-6 py-3 flex items-center justify-between shadow-sm">
            
            {/* Logo container */}
            <div className="flex items-center">
                <div className="border border-gray-400 px-6 py-2 rounded-md font-semibold text-gray-700 tracking-wider">
                    LOGO
                </div>
            </div>

            {/* Nav Items & Controls */}
            <div className="flex items-center space-x-6 text-gray-700 font-medium text-sm">
                
                {/* Navigation Links / Buttons */}
                <button className="hover:text-black transition-colors">Home</button>
                <button className="hover:text-black transition-colors">Music</button>
                <button className="hover:text-black transition-colors">Contact</button>
                <button className="hover:text-black transition-colors">About</button>

                {/* Buy Credits Button */}
                <button className="border border-gray-400 px-4 py-1.5 rounded-full hover:bg-gray-200 transition-colors">
                    Buy Credits
                </button>

                {/* Credits Counter Display */}
                <div className="border border-gray-400 px-4 py-1.5 rounded-full bg-white text-gray-700">
                    Credits: <span className="font-semibold">{credits}</span>
                </div>

                {/* Search Bar */}
                <div className="flex items-center">
                    <input 
                        type="text" 
                        placeholder="SEARCH BAR" 
                        className="border border-gray-400 rounded-full px-4 py-1.5 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-gray-500 placeholder-gray-400 w-44"
                    />
                </div>

                {/* Log In / Log Out Button */}
                <div>
                    <button 
                        onClick={() => setIsLogged(!isLogged)}
                        className="border border-gray-400 px-5 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        {isLogged ? "Logout" : "Log In"}
                    </button>
                </div>

            </div>
        </nav>
    );
}