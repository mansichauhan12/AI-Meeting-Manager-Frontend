import { useState, useEffect } from "react";
import { Search, Bell } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import callAPI from "../../utils/callAPI";

export default function TopNav() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [user, setUser] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const query = searchParams.get("q") || "";

    const handleSearchChange = (e) => {
        const val = e.target.value;
        if (val) {
            searchParams.set("q", val);
        } else {
            searchParams.delete("q");
        }
        setSearchParams(searchParams, { replace: true });
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const getInitials = (name) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    const handleLogout = async () => {
        const refresh = localStorage.getItem("refresh");
        if (refresh) {
            await callAPI("POST", "auth/logout/", { refresh });
        }
        localStorage.clear();
        navigate("/login");
    };

    // Determine the title based on the route
    let pageTitle = "Dashboard";
    if (location.pathname.startsWith("/workspaces")) {
        pageTitle = "Workspaces";
    } else if (location.pathname.startsWith("/meetings")) {
        pageTitle = "Meetings";
    }

    return (
        <header className="h-[72px] bg-[#F6F5F2] border-b border-gray-200 flex items-center justify-between px-8 flex-shrink-0">
            <div className="flex flex-col justify-center">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none mb-1">
                    MEETMIND
                </span>
                <h1 className="font-[Bricolage_Grotesque,sans-serif] text-xl font-black text-black leading-none">
                    {pageTitle}
                </h1>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#FF4F00] transition-colors">
                        <Search className="w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={handleSearchChange}
                        placeholder="Search meetings, tasks, people..."
                        className="w-full bg-white border border-gray-200 text-sm rounded-full py-2.5 pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-[#FF4F00]/20 focus:border-[#FF4F00] transition-all shadow-sm"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <kbd className="hidden sm:inline-flex items-center gap-1 bg-gray-100 border border-gray-200 text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                            ⌘K
                        </kbd>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-500 hover:text-black hover:bg-gray-200 rounded-full transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF4F00] rounded-full border border-[#F6F5F2]"></span>
                </button>

                <div className="relative">
                    <div
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white font-bold text-sm cursor-pointer shadow-sm hover:ring-2 hover:ring-offset-2 hover:ring-[#FF4F00] hover:ring-offset-[#F6F5F2] transition-all"
                    >
                        {getInitials(user?.full_name)}
                    </div>

                    {isDropdownOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setIsDropdownOpen(false)}
                            ></div>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 z-50 border border-gray-100">
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="text-sm font-bold text-gray-900 truncate">{user?.full_name || "User"}</p>
                                    <p className="text-xs text-gray-500 truncate">{user?.email || "No email"}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    Log out
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
