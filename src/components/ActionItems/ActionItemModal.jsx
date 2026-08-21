import { useState, useEffect } from "react";
import { X, CheckSquare } from "lucide-react";
import { toast } from "sonner";
import callAPI from "../../utils/callAPI";

export default function ActionItemModal({ isOpen, onClose, actionItem, meetings, members, onSuccess }) {
    const isEditing = !!actionItem;
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        meeting: "",
        assigned_to: "",
        deadline: "",
        priority: "MEDIUM",
        status: "PENDING"
    });

    useEffect(() => {
        if (isOpen) {
            if (actionItem) {
                // Determine how assigned_to is represented (object or ID)
                let assignedId = "";
                if (actionItem.assigned_to) {
                    assignedId = typeof actionItem.assigned_to === "object" ? actionItem.assigned_to.id : actionItem.assigned_to;
                }

                // format date to YYYY-MM-DD for input type="date"
                let formattedDate = "";
                if (actionItem.deadline) {
                    formattedDate = new Date(actionItem.deadline).toISOString().split("T")[0];
                }

                let meetingId = "";
                if (actionItem.meeting) {
                    meetingId = typeof actionItem.meeting === "object" ? actionItem.meeting.id : actionItem.meeting;
                }

                setFormData({
                    title: actionItem.title || "",
                    description: actionItem.description || "",
                    meeting: meetingId,
                    assigned_to: assignedId,
                    deadline: formattedDate,
                    priority: actionItem.priority || "MEDIUM",
                    status: actionItem.status || "PENDING"
                });
            } else {
                setFormData({
                    title: "",
                    description: "",
                    meeting: "",
                    assigned_to: "",
                    deadline: "",
                    priority: "MEDIUM",
                    status: "PENDING"
                });
            }
        }
    }, [isOpen, actionItem]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            toast.error("Title is required");
            return;
        }

        if (!formData.meeting) {
            toast.error("Please select a meeting");
            return;
        }

        setIsSaving(true);

        const payload = {
            ...formData,
            // Convert to integer if it's a string from select
            meeting: parseInt(formData.meeting, 10)
        };

        // If assigned_to is empty, don't send it or send null
        if (!payload.assigned_to) {
            payload.assigned_to = null;
        }

        if (!payload.deadline) {
            payload.deadline = null;
        }

        const method = isEditing ? "PUT" : "POST";
        const endpoint = isEditing ? `meetings/action-items/${actionItem.id}/` : "meetings/action-items/";

        const { ok, data } = await callAPI(method, endpoint, payload);

        setIsSaving(false);

        if (ok) {
            toast.success(isEditing ? "Task updated successfully" : "Task created successfully");
            onSuccess(data.data || data); // handle standard or wrapped responses
            onClose();
        } else {
            toast.error(data?.message || "Failed to save task");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]">
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white">
                            <CheckSquare className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="font-[Bricolage_Grotesque,sans-serif] text-xl font-bold text-gray-900">
                                {isEditing ? "Edit Task" : "Create Task"}
                            </h2>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-xl transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto">
                    <form id="actionItemForm" onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Meeting</label>
                            <select
                                name="meeting"
                                value={formData.meeting}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF4F00]/20 focus:border-[#FF4F00] transition-all font-medium appearance-none"
                                required
                            >
                                <option value="">Select a Meeting</option>
                                {meetings?.map(m => (
                                    <option key={m.id} value={m.id}>
                                        {m.title || `Meeting #${m.id}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="E.g., Prepare Q3 presentation"
                                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF4F00]/20 focus:border-[#FF4F00] transition-all font-medium"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Add more details about this task..."
                                rows="3"
                                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF4F00]/20 focus:border-[#FF4F00] transition-all font-medium resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF4F00]/20 focus:border-[#FF4F00] transition-all font-medium appearance-none"
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="DONE">Done</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Priority</label>
                                <select
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF4F00]/20 focus:border-[#FF4F00] transition-all font-medium appearance-none"
                                >
                                    <option value="LOW">Low</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HIGH">High</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Assign To</label>
                                <select
                                    name="assigned_to"
                                    value={formData.assigned_to}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF4F00]/20 focus:border-[#FF4F00] transition-all font-medium appearance-none"
                                >
                                    <option value="">Unassigned</option>
                                    {members.map(member => (
                                        <option key={member.id} value={member.user?.id || member.id}>
                                            {member.user?.email || member.name || "Member"}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Deadline</label>
                                <input
                                    type="date"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF4F00]/20 focus:border-[#FF4F00] transition-all font-medium"
                                />
                            </div>
                        </div>

                    </form>
                </div>

                <div className="px-8 py-5 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 flex-shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSaving}
                        className="px-6 py-2.5 rounded-xl font-bold text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="actionItemForm"
                        disabled={isSaving}
                        className="px-6 py-2.5 rounded-xl font-bold text-white bg-black hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {isSaving && (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                        {isSaving ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Task')}
                    </button>
                </div>
            </div>
        </div>
    );
}
