import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import callAPI from "../../utils/callAPI";

export default function InviteMemberModal({ isOpen, onClose, onSuccess, workspaceId }) {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("MEMBER");
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email.trim()) {
            toast.error("Email is required.");
            return;
        }

        setIsLoading(true);
        const { ok, data } = await callAPI("POST", "workspaces/members/", {
            workspace: workspaceId,
            email,
            role,
        });
        setIsLoading(false);

        if (ok) {
            toast.success("Member invited successfully!");
            onSuccess(data);
            setEmail("");
            setRole("MEMBER");
            onClose();
        } else {
            toast.error(data.detail || "Failed to invite member.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="font-[Bricolage_Grotesque,sans-serif] text-2xl font-bold text-gray-900">
                        Invite Member
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
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="colleague@example.com"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF4F00]/20 focus:border-[#FF4F00] transition-all bg-gray-50/50"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Role
                            </label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF4F00]/20 focus:border-[#FF4F00] transition-all bg-gray-50/50 appearance-none"
                            >
                                <option value="MEMBER">Member</option>
                                <option value="ADMIN">Admin</option>
                            </select>
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
                                "Invite"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
