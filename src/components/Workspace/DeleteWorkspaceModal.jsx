import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { toast } from "sonner";
import callAPI from "../../utils/callAPI";

export default function DeleteWorkspaceModal({ isOpen, onClose, onSuccess, workspace }) {
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen || !workspace) return null;

    const handleDelete = async () => {
        setIsLoading(true);
        const response = await callAPI("DELETE", `workspaces/${workspace.id}/`);
        console.log("response", response);
        setIsLoading(false);

        if (response.status === 204) {
            toast.success("Workspace deleted successfully!");
            onSuccess();
        } else {
            toast.error(response.data.detail || "Failed to delete workspace.");
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all p-6 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                    <AlertTriangle className="w-8 h-8" />
                </div>

                <h2 className="font-[Bricolage_Grotesque,sans-serif] text-2xl font-bold text-gray-900 mb-2">
                    Delete Workspace?
                </h2>

                <p className="text-gray-500 mb-8">
                    Are you sure you want to delete <strong className="text-gray-900">{workspace.name}</strong>? This action cannot be undone and all data will be lost.
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 px-4 py-3 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="flex-1 px-4 py-3 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            "Yes, Delete"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
