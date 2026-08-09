import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import callAPI from "../../utils/callAPI";

export default function CreateWorkspaceModal({ isOpen, onClose, onSuccess }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!name.trim()) {
            toast.error("Workspace name is required.");
            return;
        }

        setIsLoading(true);
        const { ok, data } = await callAPI("POST", "workspaces/", {
            name,
            description,
        });
        setIsLoading(false);

        if (ok) {
            toast.success("Workspace created successfully!");
            onSuccess(data.data);
            setName("");
            setDescription("");
            onClose();
        } else {
            toast.error(data.detail || "Failed to create workspace.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="font-[Bricolage_Grotesque,sans-serif] text-2xl font-bold text-gray-900">
                        Create Workspace
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Workspace Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Development Team"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF4F00]/20 focus:border-[#FF4F00] transition-all bg-gray-50/50"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="What is this workspace for?"
                                rows="3"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF4F00]/20 focus:border-[#FF4F00] transition-all bg-gray-50/50 resize-none"
                            ></textarea>
                        </div>
                    </div>
                    
                    <div className="mt-8 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 px-4 py-3 rounded-xl font-bold text-white bg-[#FF4F00] hover:bg-[#e64700] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                "Create Workspace"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
