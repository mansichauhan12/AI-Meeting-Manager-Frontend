import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import callAPI from "../../utils/callAPI";
import WorkspaceCard from "../../components/Workspace/WorkspaceCard";
import CreateWorkspaceModal from "../../components/Workspace/CreateWorkspaceModal";

export default function WorkspaceList() {
    const [workspaces, setWorkspaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        fetchWorkspaces();
    }, []);

    const fetchWorkspaces = async () => {
        setIsLoading(true);
        const { ok, data } = await callAPI("GET", "workspaces/");
        if (ok) {
            setWorkspaces(data.data || []);
        } else {
            toast.error("Failed to load workspaces.");
        }
        setIsLoading(false);
    };

    const handleWorkspaceCreated = (newWorkspace) => {
        setWorkspaces([newWorkspace, ...workspaces]);
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="font-[Bricolage_Grotesque,sans-serif] text-4xl font-black text-gray-900 tracking-tight">
                        My Workspaces
                    </h1>
                    <p className="text-gray-500 mt-2 font-medium">
                        Manage your teams and collaborate efficiently.
                    </p>
                </div>

                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 bg-black hover:bg-gray-900 text-white px-5 py-3 rounded-xl font-bold transition-all shadow-sm hover:shadow-md"
                >
                    <Plus className="w-5 h-5" />
                    Create Workspace
                </button>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((n) => (
                        <div key={n} className="bg-white rounded-2xl h-[200px] border border-gray-100 animate-pulse p-6">
                            <div className="flex justify-between mb-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-xl"></div>
                                <div className="w-16 h-6 bg-gray-100 rounded-full"></div>
                            </div>
                            <div className="w-3/4 h-6 bg-gray-100 rounded-lg mb-4"></div>
                            <div className="w-full h-4 bg-gray-100 rounded-lg mb-2"></div>
                            <div className="w-2/3 h-4 bg-gray-100 rounded-lg"></div>
                        </div>
                    ))}
                </div>
            ) : workspaces.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workspaces.map((workspace) => (
                        <WorkspaceCard key={workspace.id} workspace={workspace} />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
                    <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-[#FF4F00] mb-6">
                        <Plus className="w-10 h-10" />
                    </div>
                    <h3 className="font-[Bricolage_Grotesque,sans-serif] text-2xl font-bold text-gray-900 mb-3">
                        No workspaces yet
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-8">
                        Create a workspace to start collaborating with your team and organizing your meetings.
                    </p>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-[#FF4F00] hover:bg-[#e64700] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-md"
                    >
                        Create your first Workspace
                    </button>
                </div>
            )}

            <CreateWorkspaceModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={handleWorkspaceCreated}
            />
        </div>
    );
}
