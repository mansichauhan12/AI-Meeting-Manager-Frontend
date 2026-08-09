import { Trash2, UserCog } from "lucide-react";

export default function MemberCard({ member, currentUserId, onRemove, onChangeRole }) {
    return (
        <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 transition-all">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-700">
                    {member.user?.first_name?.charAt(0) || member.user?.email?.charAt(0) || "U"}
                </div>
                <div>
                    <h4 className="font-bold text-gray-900">
                        {member.user?.first_name} {member.user?.last_name || ""}
                    </h4>
                    <p className="text-sm text-gray-500">{member.user?.email}</p>
                </div>
            </div>
            
            <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Role</span>
                    <span className={`text-sm font-medium px-2 py-0.5 rounded-md ${
                        member.role === "OWNER" ? "bg-orange-100 text-[#FF4F00]" :
                        member.role === "ADMIN" ? "bg-blue-100 text-blue-600" :
                        "bg-gray-100 text-gray-600"
                    }`}>
                        {member.role}
                    </span>
                </div>
                
                {/* Actions (only if we have permission, handled by parent typically, but let's just show buttons for now) */}
                {member.role !== "OWNER" && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onChangeRole(member)}
                            className="p-2 text-gray-400 hover:text-[#FF4F00] hover:bg-orange-50 rounded-lg transition-colors"
                            title="Change Role"
                        >
                            <UserCog className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onRemove(member)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove Member"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
