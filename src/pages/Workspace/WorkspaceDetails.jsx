import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Edit2, Trash2, UserPlus, Grid } from "lucide-react";
import { toast } from "sonner";
import callAPI from "../../utils/callAPI";
import MemberCard from "../../components/Workspace/MemberCard";
import EditWorkspaceModal from "../../components/Workspace/EditWorkspaceModal";
import DeleteWorkspaceModal from "../../components/Workspace/DeleteWorkspaceModal";
import InviteMemberModal from "../../components/Workspace/InviteMemberModal";
import ChangeRoleModal from "../../components/Workspace/ChangeRoleModal";

export default function WorkspaceDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [workspace, setWorkspace] = useState(null);
    const [members, setMembers] = useState([]);
    const [activeTab, setActiveTab] = useState("overview");
    const [isLoading, setIsLoading] = useState(true);

    // Modals state
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    
    const [selectedMember, setSelectedMember] = useState(null);
    const [isChangeRoleModalOpen, setIsChangeRoleModalOpen] = useState(false);

    useEffect(() => {
        fetchWorkspaceData();
    }, [id]);

    const fetchWorkspaceData = async () => {
        setIsLoading(true);
        const [wsResponse, membersResponse] = await Promise.all([
            callAPI("GET", `workspaces/${id}/`),
            callAPI("GET", `workspaces/${id}/members/`)
        ]);

        if (wsResponse.ok) {
            setWorkspace(wsResponse.data.data);
        } else {
            toast.error("Failed to load workspace details.");
            navigate("/workspaces");
        }

        if (membersResponse.ok) {
            setMembers(membersResponse.data);
        }
        
        setIsLoading(false);
    };

    const handleRemoveMember = async (member) => {
        if (!confirm(`Are you sure you want to remove ${member.user?.email} from the workspace?`)) return;

        const { ok } = await callAPI("DELETE", `workspaces/members/${member.id}/`);
        if (ok) {
            toast.success("Member removed successfully!");
            setMembers(members.filter(m => m.id !== member.id));
        } else {
            toast.error("Failed to remove member.");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-10 h-10 border-4 border-[#FF4F00]/30 border-t-[#FF4F00] rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!workspace) return null;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <Link to="/workspaces" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors mb-6">
                <ArrowLeft className="w-4 h-4" />
                Back to Workspaces
            </Link>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="font-[Bricolage_Grotesque,sans-serif] text-4xl font-black text-gray-900 tracking-tight">
                        {workspace.name}
                    </h1>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-white border border-gray-200 rounded-xl w-fit mb-8 shadow-sm">
                <button
                    onClick={() => setActiveTab("overview")}
                    className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${
                        activeTab === "overview"
                            ? "bg-black text-white shadow-sm"
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                >
                    Overview
                </button>
                <button
                    onClick={() => setActiveTab("members")}
                    className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${
                        activeTab === "members"
                            ? "bg-black text-white shadow-sm"
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                >
                    Members
                </button>
            </div>

            {/* Content */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm min-h-[400px]">
                {activeTab === "overview" && (
                    <div className="max-w-2xl">
                        <div className="mb-10">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
                                Description
                            </h3>
                            <p className="text-gray-900 text-lg leading-relaxed font-medium">
                                {workspace.description || "No description provided."}
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-8 mb-10">
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
                                    Owner
                                </h3>
                                <p className="text-gray-900 font-bold">
                                    {workspace.owner_name || "Unknown"}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
                                    Created At
                                </h3>
                                <p className="text-gray-900 font-bold">
                                    {new Date(workspace.created_at).toLocaleDateString("en-US", {
                                        year: 'numeric', month: 'long', day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex gap-4 pt-8 border-t border-gray-100">
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                <Edit2 className="w-4 h-4" />
                                Edit Workspace
                            </button>
                            <button
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete Workspace
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === "members" && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-[Bricolage_Grotesque,sans-serif] text-2xl font-bold text-gray-900">
                                Team Members ({members.length})
                            </h2>
                            <button
                                onClick={() => setIsInviteModalOpen(true)}
                                className="flex items-center gap-2 bg-[#FF4F00] hover:bg-[#e64700] text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm"
                            >
                                <UserPlus className="w-4 h-4" />
                                Invite Member
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {members.map(member => (
                                <MemberCard
                                    key={member.id}
                                    member={member}
                                    onRemove={handleRemoveMember}
                                    onChangeRole={(m) => {
                                        setSelectedMember(m);
                                        setIsChangeRoleModalOpen(true);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <EditWorkspaceModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                workspace={workspace}
                onSuccess={(data) => setWorkspace(data)}
            />
            
            <DeleteWorkspaceModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                workspace={workspace}
                onSuccess={() => navigate("/workspaces")}
            />
            
            <InviteMemberModal
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
                workspaceId={workspace.id}
                onSuccess={(newMember) => setMembers([...members, newMember])}
            />
            
            <ChangeRoleModal
                isOpen={isChangeRoleModalOpen}
                onClose={() => setIsChangeRoleModalOpen(false)}
                member={selectedMember}
                onSuccess={(updatedMember) => {
                    setMembers(members.map(m => m.id === updatedMember.id ? updatedMember : m));
                }}
            />
        </div>
    );
}
