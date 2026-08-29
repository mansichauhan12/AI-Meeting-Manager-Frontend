import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronDown, Calendar, CheckSquare, Clock, Users, Hexagon, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import callAPI from "../../utils/callAPI";

export default function Dashboard() {
    const { workspaceId } = useParams();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const [dashboardData, setDashboardData] = useState(null);
    const [workspaces, setWorkspaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        fetchWorkspaces();
        
        // Handle clicking outside of dropdown
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (workspaceId) {
            fetchDashboardData(workspaceId);
        }
    }, [workspaceId]);

    const fetchWorkspaces = async () => {
        const { ok, data } = await callAPI("GET", "workspaces/");
        if (ok) {
            setWorkspaces(data.data || []);
        }
    };

    const fetchDashboardData = async (id) => {
        setIsLoading(true);
        setError(null);
        try {
            const { ok, data, status } = await callAPI("GET", `dashboard/?workspace_id=${id}`);
            
            if (ok) {
                setDashboardData(data.data);
            } else {
                setError(data?.error || "Failed to load dashboard data");
                if (status === 403) {
                    toast.error("You do not have access to this workspace.");
                    navigate("/workspaces");
                }
            }
        } catch (err) {
            setError("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    const activeWorkspace = workspaces.find((w) => w.id === parseInt(workspaceId)) || { name: "Loading Workspace..." };

    const StatCard = ({ title, value, icon: Icon, colorClass }) => (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
            <div>
                <p className="text-sm font-bold text-gray-500 mb-1">{title}</p>
                <h3 className="text-3xl font-black text-gray-900 font-[Bricolage_Grotesque,sans-serif]">
                    {value || 0}
                </h3>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClass}`}>
                <Icon className="w-6 h-6" />
            </div>
        </div>
    );

    const getPriorityColor = (priority) => {
        switch (priority?.toUpperCase()) {
            case 'HIGH': return 'bg-red-50 text-red-600 border-red-100';
            case 'MEDIUM': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
            case 'LOW': return 'bg-green-50 text-green-600 border-green-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toUpperCase()) {
            case 'COMPLETED': return 'bg-green-50 text-green-600 border-green-100';
            case 'PROCESSING': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'FAILED': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-12">
            
            {/* Top Bar - Workspace Context */}
            <div className="flex justify-between items-center mb-8">
                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-3 bg-white border border-gray-200 px-5 py-3 rounded-xl shadow-sm hover:border-gray-300 transition-all"
                    >
                        <div className="w-8 h-8 rounded-lg bg-[#FF4F00]/10 flex items-center justify-center">
                            <Hexagon className="w-4 h-4 text-[#FF4F00] fill-current" />
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none mb-1">Active Workspace</p>
                            <h2 className="text-sm font-bold text-gray-900 leading-none">{activeWorkspace.name}</h2>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-400 ml-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isDropdownOpen && workspaces.length > 0 && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                            {workspaces.map((ws) => (
                                <button
                                    key={ws.id}
                                    onClick={() => {
                                        setIsDropdownOpen(false);
                                        navigate(`/workspaces/${ws.id}/dashboard`);
                                    }}
                                    className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-3
                                        ${ws.id === parseInt(workspaceId) ? 'bg-orange-50 text-[#FF4F00]' : 'text-gray-700 hover:bg-gray-50'}`}
                                >
                                    <Hexagon className="w-4 h-4" />
                                    {ws.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                
                <div className="text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {error ? (
                <div className="bg-red-50 border border-red-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h3>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button 
                        onClick={() => fetchDashboardData(workspaceId)}
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                    >
                        Retry
                    </button>
                </div>
            ) : isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 text-[#FF4F00] animate-spin mb-4" />
                    <p className="text-gray-500 font-medium animate-pulse">Loading dashboard insights...</p>
                </div>
            ) : dashboardData ? (
                <>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard 
                            title="Total Meetings" 
                            value={dashboardData.statistics?.total_meetings} 
                            icon={Users}
                            colorClass="bg-indigo-50 text-indigo-600"
                        />
                        <StatCard 
                            title="Completed Meetings" 
                            value={dashboardData.statistics?.completed_meetings} 
                            icon={CheckSquare}
                            colorClass="bg-green-50 text-green-600"
                        />
                        <StatCard 
                            title="Pending Tasks" 
                            value={dashboardData.statistics?.pending_tasks} 
                            icon={AlertCircle}
                            colorClass="bg-orange-50 text-orange-600"
                        />
                        <StatCard 
                            title="Upcoming Reminders" 
                            value={dashboardData.statistics?.upcoming_reminders} 
                            icon={Clock}
                            colorClass="bg-purple-50 text-purple-600"
                        />
                    </div>

                    {/* Main Layout Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        {/* Left Column (Wider) */}
                        <div className="lg:col-span-7 space-y-8">
                            
                            {/* Upcoming Meetings */}
                            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-[#FF4F00]" />
                                        Upcoming Meetings
                                    </h3>
                                    <Link to={`/workspaces/${workspaceId}/meetings`} className="text-sm font-bold text-[#FF4F00] hover:underline">
                                        View All
                                    </Link>
                                </div>
                                
                                <div className="space-y-4">
                                    {dashboardData.upcoming_meetings?.length > 0 ? (
                                        dashboardData.upcoming_meetings.map((meeting) => (
                                            <Link 
                                                key={meeting.id} 
                                                to={`/workspaces/${workspaceId}/meetings/${meeting.id}`}
                                                className="block p-4 rounded-2xl border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all group"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 group-hover:text-[#FF4F00] transition-colors">{meeting.title}</h4>
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            {new Date(meeting.meeting_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {new Date(meeting.meeting_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="py-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                            <p className="text-sm font-medium text-gray-500">No upcoming meetings scheduled.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Pending Action Items */}
                            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                                        <CheckSquare className="w-5 h-5 text-indigo-500" />
                                        Pending Action Items
                                    </h3>
                                    <Link to={`/workspaces/${workspaceId}/tasks`} className="text-sm font-bold text-indigo-500 hover:underline">
                                        View Tasks
                                    </Link>
                                </div>
                                
                                <div className="space-y-3">
                                    {dashboardData.pending_tasks?.length > 0 ? (
                                        dashboardData.pending_tasks.map((task) => (
                                            <div key={task.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-sm transition-all">
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-sm text-gray-900">{task.title}</h4>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Due: {new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                    </p>
                                                </div>
                                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${getPriorityColor(task.priority)}`}>
                                                    {task.priority || 'NORMAL'}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                            <p className="text-sm font-medium text-gray-500">All caught up! No pending tasks.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>

                        {/* Right Column (Narrower) */}
                        <div className="lg:col-span-5 space-y-8">
                            
                            {/* Recent Meetings */}
                            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-gray-400" />
                                    Recent Meetings
                                </h3>
                                
                                <div className="space-y-4">
                                    {dashboardData.recent_meetings?.length > 0 ? (
                                        dashboardData.recent_meetings.map((meeting) => (
                                            <div key={meeting.id} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                                <h4 className="font-semibold text-sm text-gray-800 line-clamp-1 flex-1 pr-4">
                                                    {meeting.title}
                                                </h4>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${getStatusColor(meeting.status)}`}>
                                                    {meeting.status}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500 text-center py-4">No recent meetings found.</p>
                                    )}
                                </div>
                            </div>

                            {/* Upcoming Reminders */}
                            <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 border border-gray-800 shadow-lg text-white">
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-[#FF4F00]" />
                                    Upcoming Reminders
                                </h3>
                                
                                <div className="space-y-4">
                                    {dashboardData.upcoming_reminders?.length > 0 ? (
                                        dashboardData.upcoming_reminders.map((reminder) => (
                                            <div key={reminder.id} className="bg-white/5 p-4 rounded-xl border border-white/10 relative overflow-hidden group hover:bg-white/10 transition-colors">
                                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF4F00]"></div>
                                                <h4 className="font-semibold text-sm text-white mb-1">
                                                    {reminder.task_title}
                                                </h4>
                                                <p className="text-xs text-gray-400 flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {new Date(reminder.send_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-400 text-center py-4">No reminders scheduled.</p>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
}