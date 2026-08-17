import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Mic,
    CheckSquare,
    Sparkles,
    Calendar,
    Users,
    Settings,
    Hexagon,
    ChevronDown
} from "lucide-react";

export default function Sidebar() {
    const location = useLocation();
    const { id, workspaceId: paramWorkspaceId } = useParams();
    const [user, setUser] = useState(null);
    
    // Use either 'id' or 'workspaceId' depending on the current route
    const currentWorkspaceId = paramWorkspaceId || id;

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

    const getNavPath = (path) => {
        if (!currentWorkspaceId) return path;
        // Prefix with workspace path if it's a workspace-specific route
        if (path === "/meetings") {
            return `/workspaces/${currentWorkspaceId}/meetings`;
        }
        // Can extend this for /tasks, /dashboard, etc. later when they are workspace-specific
        return path;
    };

    const navItems = [
        { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, global: true },
        { name: "Workspace", path: "/workspaces", icon: Users, global: true },
        { name: "Meetings", path: "/meetings", icon: Mic },
        { name: "Tasks", path: "/tasks", icon: CheckSquare },
        { name: "AI Search", path: "/ai-search", icon: Sparkles },
        { name: "Calendar", path: "/calendar", icon: Calendar },
        { name: "Settings", path: "/settings", icon: Settings },
    ];

    const visibleNavItems = navItems.filter(item => 
        currentWorkspaceId ? true : item.global
    );

    return (
        <aside className="w-[260px] bg-[#111111] text-white flex flex-col flex-shrink-0 h-full border-r border-[#1C1C1C]">
            {/* Logo Area */}
            <div className="h-[72px] flex items-center px-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#FF4F00]">
                        <Hexagon className="w-5 h-5 fill-current" />
                    </div>
                    <span className="font-bold text-lg tracking-wide text-white">MeetMind</span>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 px-4 py-4 overflow-y-auto">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">
                    WORKSPACE
                </div>
                <nav className="flex flex-col gap-1">
                    {visibleNavItems.map((item) => {
                        const targetPath = getNavPath(item.path);
                        const isActive = location.pathname.startsWith(targetPath) || location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={targetPath}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                                    isActive
                                        ? "bg-white text-black font-semibold"
                                        : "text-[#8A8A8A] hover:text-white hover:bg-white/5"
                                }`}
                            >
                                <item.icon
                                    className={`w-[18px] h-[18px] ${
                                        isActive ? "text-[#FF4F00]" : "text-[#8A8A8A]"
                                    }`}
                                />
                                <span className="text-sm font-medium">{item.name}</span>
                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF4F00]"></div>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Pro Tip Section */}
            <div className="px-4 mb-4">
                <div className="bg-[#1C1C1C] rounded-2xl p-4 border border-white/5">
                    <h4 className="text-[10px] font-bold text-[#FF4F00] uppercase tracking-widest mb-2">PRO TIP</h4>
                    <p className="text-[#8A8A8A] text-xs leading-relaxed mb-4">
                        Invite your team to unlock shared meeting memory.
                    </p>
                    <button className="bg-[#FF4F00] hover:bg-[#e64700] text-white text-xs font-bold py-2 px-4 rounded-full transition-colors w-full">
                        Invite teammates
                    </button>
                </div>
            </div>

            {/* User Profile */}
            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3 px-2 py-2 cursor-pointer hover:bg-white/5 rounded-xl transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[#FF4F00] flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                        {getInitials(user?.full_name)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">
                            {user?.full_name || "User"}
                        </p>
                        <p className="text-xs text-[#8A8A8A] truncate">
                            {user?.email || "No email"}
                        </p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-[#8A8A8A] flex-shrink-0" />
                </div>
            </div>
        </aside>
    );
}
