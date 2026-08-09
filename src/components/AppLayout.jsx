import Sidebar from "./Layout/Sidebar";
import TopNav from "./Layout/TopNav";

export default function AppLayout({ children }) {
    return (
        <div className="flex h-screen w-full bg-[#F6F5F2] font-[Manrope,sans-serif] overflow-hidden text-black">
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <TopNav />
                
                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="p-8 w-full max-w-[1200px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
