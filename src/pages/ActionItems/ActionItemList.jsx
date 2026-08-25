import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Plus, Edit2, Trash2, Clock, CheckCircle2, Circle, CheckSquare } from "lucide-react";
import { toast } from "sonner";
import callAPI from "../../utils/callAPI";
import ActionItemModal from "../../components/ActionItems/ActionItemModal";
import DeleteActionItemModal from "../../components/ActionItems/DeleteActionItemModal";

export default function ActionItemList() {
    const { workspaceId } = useParams();
    const [actionItems, setActionItems] = useState([]);
    const [members, setMembers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserRole, setCurrentUserRole] = useState(null);
    const [meetings, setMeetings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
        fetchData();
    }, [workspaceId]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [tasksRes, membersRes, meetingsRes] = await Promise.all([
                callAPI("GET", `meetings/action-items/?workspace=${workspaceId}`),
                callAPI("GET", `workspaces/${workspaceId}/members/`),
                callAPI("GET", `meetings/?workspace=${workspaceId}`)
            ]);
            console.log("task res", tasksRes);
            console.log("member res", membersRes);
            if (tasksRes.status === 200) {
                // If it returns paginated or direct array
                setActionItems(tasksRes.data.data);
            } else {
                toast.error("Failed to load tasks");
            }

            if (membersRes.ok) {
                const membersList = Array.isArray(membersRes.data) ? membersRes.data : (membersRes.data?.data || []);
                setMembers(membersList);

                const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
                const currentMember = membersList.find(m => 
                    (m.user?.id || m.user) === storedUser.id
                );
                
                if (currentMember) {
                    setCurrentUserRole(currentMember.role);
                }
            }

            if (meetingsRes.ok) {
                setMeetings(meetingsRes.data?.data || []);
            }
        } catch (error) {
            toast.error("An error occurred while fetching data");
        } finally {
            setIsLoading(false);
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority?.toUpperCase()) {
            case "HIGH": return "text-red-600 bg-red-50 border-red-200";
            case "MEDIUM": return "text-yellow-600 bg-yellow-50 border-yellow-200";
            case "LOW": return "text-blue-600 bg-blue-50 border-blue-200";
            default: return "text-gray-600 bg-gray-50 border-gray-200";
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toUpperCase()) {
            case "DONE": return <CheckCircle2 className="w-4 h-4 text-green-500" />;
            case "IN_PROGRESS": return <Clock className="w-4 h-4 text-yellow-500" />;
            default: return <Circle className="w-4 h-4 text-gray-400" />;
        }
    };

    const getStatusText = (status) => {
        switch (status?.toUpperCase()) {
            case "DONE": return "Done";
            case "IN_PROGRESS": return "In Progress";
            case "PENDING": return "Pending";
            default: return status || "Pending";
        }
    };

    const canEdit = (item) => {
        console.log("edit item", item);
        if (!currentUserRole || !currentUser) return false;
        if (currentUserRole.toUpperCase() === "OWNER" || currentUserRole.toUpperCase() === "ADMIN") return true;
        return item.assigned_to === currentUser.id || item.assigned_to?.id === currentUser.id;
    };

    const canDelete = () => {
        if (!currentUserRole) return false;
        return currentUserRole.toUpperCase() === "OWNER" || currentUserRole.toUpperCase() === "ADMIN";
    };

    const handleCreate = () => {
        setSelectedItem(null);
        setIsModalOpen(true);
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleDelete = (item) => {
        setSelectedItem(item);
        setIsDeleteModalOpen(true);
    };

    const handleSaveSuccess = (savedItem) => {
        if (selectedItem) {
            setActionItems(actionItems.map(item => item.id === savedItem.id ? savedItem : item));
        } else {
            setActionItems([savedItem, ...actionItems]);
        }
    };

    const handleDeleteSuccess = () => {
        setActionItems(actionItems.filter(item => item.id !== selectedItem.id));
        setSelectedItem(null);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-10 h-10 border-4 border-[#FF4F00]/30 border-t-[#FF4F00] rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="font-[Bricolage_Grotesque,sans-serif] text-4xl font-black text-gray-900 tracking-tight">
                        Tasks
                    </h1>
                    <p className="text-gray-500 mt-2 font-medium">
                        Manage your workspace action items.
                    </p>
                </div>

                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 bg-[#FF4F00] hover:bg-[#e64700] text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm"
                >
                    <Plus className="w-5 h-5" />
                    Create Task
                </button>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                {actionItems.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                            <CheckSquare className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No tasks yet</h3>
                        <p className="text-gray-500 max-w-sm mb-6">
                            Create your first action item to start tracking progress.
                        </p>
                        <button
                            onClick={handleCreate}
                            className="bg-black hover:bg-gray-800 text-white font-bold py-2.5 px-6 rounded-xl transition-colors"
                        >
                            Create Task
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Task</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Priority</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Deadline</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {actionItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900 mb-1">{item.title}</div>
                                            <div className="text-sm text-gray-500 line-clamp-1 max-w-md">{item.description}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {getStatusIcon(item.status)}
                                                <span className="text-sm font-medium text-gray-700">{getStatusText(item.status)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${getPriorityColor(item.priority)}`}>
                                                {item.priority || "NONE"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-gray-700">
                                                {item.deadline ? new Date(item.deadline).toLocaleDateString() : "-"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {canEdit(item) && (
                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                                        title="Edit Task"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                                {canDelete() && (
                                                    <button
                                                        onClick={() => handleDelete(item)}
                                                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete Task"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <ActionItemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                actionItem={selectedItem}
                meetings={meetings}
                members={members}
                onSuccess={handleSaveSuccess}
                workspaceId={workspaceId}
            />

            <DeleteActionItemModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                actionItem={selectedItem}
                onSuccess={handleDeleteSuccess}
            />
        </div>
    );
}
