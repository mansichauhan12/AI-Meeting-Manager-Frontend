import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import callAPI from "../../utils/callAPI";

export default function DeleteActionItemModal({ isOpen, onClose, actionItem, onSuccess }) {
    const [isDeleting, setIsDeleting] = useState(false);

    if (!isOpen || !actionItem) return null;

    const handleDelete = async () => {
        setIsDeleting(true);
        const { ok } = await callAPI("DELETE", `meetings/action-items/${actionItem.id}/`);
        setIsDeleting(false);

        if (ok) {
            toast.success("Task deleted successfully");
            onSuccess();
            onClose();
        } else {
            toast.error("Failed to delete task");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                <div className="px-6 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="font-[Bricolage_Grotesque,sans-serif] text-xl font-bold text-gray-900">
                                Delete Task
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

                <div className="p-6">
                    <p className="text-gray-600 mb-6 font-medium">
                        Are you sure you want to delete <span className="font-bold text-gray-900">"{actionItem.title}"</span>? This action cannot be undone.
                    </p>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isDeleting}
                            className="px-5 py-2.5 rounded-xl font-bold text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="px-5 py-2.5 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {isDeleting && (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            )}
                            {isDeleting ? 'Deleting...' : 'Delete Task'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
