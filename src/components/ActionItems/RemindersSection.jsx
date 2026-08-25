import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import callAPI from "../../utils/callAPI";

export default function RemindersSection({ actionItem, workspaceId }) {
    const [reminders, setReminders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Form state
    const [showForm, setShowForm] = useState(false);
    const [editingReminder, setEditingReminder] = useState(null);
    const [sendAt, setSendAt] = useState("");

    useEffect(() => {
        if (actionItem && workspaceId) {
            fetchReminders();
        }
    }, [actionItem, workspaceId]);

    const fetchReminders = async () => {
        setIsLoading(true);
        try {
            const { ok, data } = await callAPI("GET", `meetings/reminders/?workspace=${workspaceId}`);
            if (ok) {
                const allReminders = data?.data || data || [];
                // Filter reminders by task ID
                const taskReminders = allReminders.filter(r => r.task === actionItem.id);
                setReminders(taskReminders);
            } else {
                toast.error("Failed to load reminders.");
            }
        } catch (error) {
            toast.error("An error occurred while fetching reminders.");
        } finally {
            setIsLoading(false);
        }
    };

    const validateReminderDate = (dateString) => {
        const reminderDate = new Date(dateString);
        const now = new Date();

        if (reminderDate <= now) {
            toast.error("Reminder time must be in the future.");
            return false;
        }

        if (actionItem.deadline) {
            // Deadline is typically a date string like YYYY-MM-DD
            // Let's compare the end of that day to be safe, or just the parsed date
            const deadlineDate = new Date(actionItem.deadline);
            // set time to end of day 23:59:59
            deadlineDate.setHours(23, 59, 59, 999);

            if (reminderDate > deadlineDate) {
                toast.error("Reminder time must be before or equal to the task deadline.");
                return false;
            }
        }

        return true;
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (!sendAt) {
            toast.error("Please select a date and time.");
            return;
        }

        if (!validateReminderDate(sendAt)) {
            return;
        }

        setIsSaving(true);
        const payload = {
            send_at: new Date(sendAt).toISOString(),
        };

        if (editingReminder) {
            // Update
            const { ok, data } = await callAPI("PATCH", `meetings/reminders/${editingReminder.id}/`, payload);
            if (ok) {
                toast.success("Reminder updated successfully.");
                setReminders(prev => prev.map(r => r.id === editingReminder.id ? (data.data || data) : r));
                resetForm();
            } else {
                toast.error(data?.message || data?.send_at?.[0] || "Failed to update reminder.");
            }
        } else {
            // Create
            payload.task = actionItem.id;
            const { ok, data } = await callAPI("POST", `meetings/reminders/`, payload);
            if (ok) {
                toast.success("Reminder created successfully.");
                setReminders(prev => [...prev, (data.data || data)]);
                resetForm();
            } else {
                toast.error(data?.message || data?.send_at?.[0] || "Failed to create reminder.");
            }
        }

        setIsSaving(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this reminder?")) return;

        const { ok } = await callAPI("DELETE", `meetings/reminders/${id}/`);
        if (ok) {
            toast.success("Reminder deleted.");
            setReminders(prev => prev.filter(r => r.id !== id));
        } else {
            toast.error("Failed to delete reminder.");
        }
    };

    const handleEditClick = (reminder) => {
        setEditingReminder(reminder);
        // format for datetime-local input
        const localDateTime = new Date(reminder.send_at).toISOString().slice(0, 16);
        setSendAt(localDateTime);
        setShowForm(true);
    };

    const resetForm = () => {
        setShowForm(false);
        setEditingReminder(null);
        setSendAt("");
    };

    const getStatusIcon = (status) => {
        switch (status?.toUpperCase()) {
            case "PENDING": return <Clock className="w-4 h-4 text-yellow-500" />;
            case "SENT": return <CheckCircle2 className="w-4 h-4 text-green-500" />;
            case "FAILED": return <XCircle className="w-4 h-4 text-red-500" />;
            default: return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Reminders</h3>
                    <p className="text-sm text-gray-500">Set email notifications for this task.</p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 bg-[#FF4F00] hover:bg-[#e64700] text-white px-4 py-2 rounded-xl font-bold transition-all shadow-sm text-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Add Reminder
                    </button>
                )}
            </div>

            {showForm && (
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <form onSubmit={handleSave} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Send at
                            </label>
                            <input
                                type="datetime-local"
                                value={sendAt}
                                onChange={(e) => setSendAt(e.target.value)}
                                className="w-full bg-white border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF4F00]/20 focus:border-[#FF4F00] transition-all font-medium"
                                required
                            />
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={resetForm}
                                disabled={isSaving}
                                className="px-5 py-2 rounded-xl font-bold text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="px-5 py-2 rounded-xl font-bold text-white bg-black hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center gap-2 text-sm"
                            >
                                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                                {editingReminder ? 'Save Changes' : 'Schedule'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {isLoading ? (
                <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 text-[#FF4F00] animate-spin" />
                </div>
            ) : reminders.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/50">
                    <Clock className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">No reminders scheduled yet.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {reminders.map(reminder => (
                        <div key={reminder.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-gray-200 transition-colors shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-gray-50 rounded-lg">
                                    {getStatusIcon(reminder.status)}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">
                                        {new Date(reminder.send_at).toLocaleString(undefined, {
                                            dateStyle: 'medium',
                                            timeStyle: 'short'
                                        })}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5 font-medium uppercase tracking-wider">
                                        {reminder.status}
                                    </p>
                                </div>
                            </div>

                            {reminder.status === "PENDING" && (
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => handleEditClick(reminder)}
                                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                        title="Edit Reminder"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(reminder.id)}
                                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete Reminder"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
