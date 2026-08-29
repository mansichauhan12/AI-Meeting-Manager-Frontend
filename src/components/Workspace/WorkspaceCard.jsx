import { Folder, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function WorkspaceCard({ workspace }) {
    return (
        <Link
            to={`/workspaces/${workspace.id}`}
            className="group block bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-1 h-full bg-[#FF4F00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 group-hover:bg-[#FF4F00]/10 group-hover:text-[#FF4F00] transition-colors duration-300">
                    <Folder className="w-6 h-6" />
                </div>
                {workspace.role === "OWNER" && (
                    <div className="bg-[#FF4F00]/10 text-[#FF4F00] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Owner
                    </div>
                )}
            </div>

            <h3 className="font-[Bricolage_Grotesque,sans-serif] text-xl font-bold text-gray-900 mb-2 group-hover:text-[#FF4F00] transition-colors">
                {workspace.name}
            </h3>

            <p className="text-gray-500 text-sm line-clamp-2 mb-6 min-h-[40px]">
                {workspace.description || "No description provided."}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-sm font-medium text-gray-600">
                <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{workspace.total_members || 0} Members</span>
                </div>
                <div className="flex items-center gap-1 text-[#FF4F00] group-hover:gap-2 transition-all">
                    Open <span>&rarr;</span>
                </div>
            </div>
        </Link>
    );
}
