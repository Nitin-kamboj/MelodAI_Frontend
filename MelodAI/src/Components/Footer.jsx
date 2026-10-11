export function Footer() {
    return (
        <footer className="w-full bg-gray-200 border-t border-gray-300 py-3 px-6 flex flex-col items-center justify-center space-y-4 text-gray-700">
            
            {/* Join Us Container */}
            <div className="flex items-center space-x-6">
                <h3 className="text-lg font-medium tracking-wide">Join us Today!</h3>
                
                <div className="flex items-center space-x-3">
                    {/* Facebook Icon Placeholder */}
                    <div className="w-9 h-9 rounded-full border border-gray-400 bg-white flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer" title="Facebook">
                        {/* Insert <img> or SVG here */}
                    </div>
                    
                    {/* Instagram Icon Placeholder */}
                    <div className="w-9 h-9 rounded-full border border-gray-400 bg-white flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer" title="Instagram">
                        {/* Insert <img> or SVG here */}
                    </div>
                    
                    {/* Twitter Icon Placeholder */}
                    <div className="w-9 h-9 rounded-full border border-gray-400 bg-white flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer" title="Twitter">
                        {/* Insert <img> or SVG here */}
                    </div>
                </div>
            </div>

            {/* Copyright Container */}
            <div className="text-xs text-gray-500 font-light">
                copyright@MelodAI
            </div>
            
        </footer>
    );
}