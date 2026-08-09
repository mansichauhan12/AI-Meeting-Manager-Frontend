import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import callAPI from "../../utils/callAPI";

export default function ChangeRoleModal({ isOpen, onClose, onSuccess, member }) {
    const [role, setRole] = useState("MEMBER");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (member) {
            setRole(member.role);
        }
    }, [member]);

    if (!isOpen || !member) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (role === member.role) {
            onClose();
            return;
        }

        setIsLoading(true);
        // User requested PATCH /api/workspaces/members/:id/role/
        // Using member.id in URL
        const { ok, data } = await callAPI("PATCH", `workspaces/members/${member.id}/role/`, {
            role,
        });
        setIsLoading(false);

        if (ok) {
            toast.success("Role updated successfully!");
            onSuccess({ ...member, role });
            onClose();
        } else {
            toast.error(data.detail || "Failed to update role.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="font-[Bricolage_Grotesque,sans-serif] text-2xl font-bold text-gray-900">
                        Change Role
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-6 bg-gray-50 p-4 rounded-xl flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-gray-700 border border-gray-200">
                            {member.user?.first_name?.charAt(0) || member.user?.email?.charAt(0) || "U"}
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-sm">
                                {member.user?.first_name} {member.user?.last_name}
                            </p>
                            <p className="text-xs text-gray-500">{member.user?.email}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-gray-700">
                            Select New Role
                        </label>
                        
                        <div className="flex gap-4">
                            <label className={`flex-1 cursor-pointer border-2 rounded-xl p-4 transition-all ${role === "ADMIN" ? "border-[#FF4F00] bg-orange-50" : "border-gray-200 hover:border-gray-300"}`}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-gray-900">Admin</span>
                                    <input type="radio" name="role" value="ADMIN" checked={role === "ADMIN"} onChange={() => setRole("ADMIN")} className="hidden" />
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${role === "ADMIN" ? "border-[#FF4F00]" : "border-gray-300"}`}>
                                        {role === "ADMIN" && <div className="w-2 h-2 bg-[#FF4F00] rounded-full"></div>}
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500">Can manage workspace and members.</p>
                            </label>
                            
                            <label className={`flex-1 cursor-pointer border-2 rounded-xl p-4 transition-all ${role === "MEMBER" ? "border-[#FF4F00] bg-orange-50" : "border-gray-200 hover:border-gray-300"}`}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-gray-900">Member</span>
                                    <input type="radio" name="role" value="MEMBER" checked={role === "MEMBER"} onChange={() => setRole("MEMBER")} className="hidden" />
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${role === "MEMBER" ? "border-[#FF4F00]" : "border-gray-300"}`}>
                                        {role === "MEMBER" && <div className="w-2 h-2 bg-[#FF4F00] rounded-full"></div>}
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500">Standard access.</p>
                            </label>
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
                                "Save Role"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
