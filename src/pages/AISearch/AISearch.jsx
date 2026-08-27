import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Search, Sparkles, MessageSquare, Loader2, ArrowRight } from "lucide-react";
import callAPI from "../../utils/callAPI";
import { toast } from "sonner";

export default function AISearch() {
    const { workspaceId } = useParams();
    const [mode, setMode] = useState("search"); // 'search' or 'ask'
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [searchResults, setSearchResults] = useState([]);
    const [aiResponse, setAiResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) {
            toast.error("Please enter a query");
            return;
        }

        setIsLoading(true);
        setError(null);
        setSearchResults([]);
        setAiResponse(null);

        try {
            if (mode === "search") {
                const response = await callAPI("POST", "search/", {
                    query,
                    workspace_id: parseInt(workspaceId)
                });
                if (response.data && response.data.success) {
                    setSearchResults(response.data.data || []);
                } else {
                    setError("Failed to fetch search results.");
                }
            } else {
                const response = await callAPI("POST", "search/ask/", {
                    query,
                    workspace_id: parseInt(workspaceId)
                });
                console.log("ask res", response);
                if (response.status === 200) {
                    setAiResponse(response.data.data);
                } else {
                    setError("Failed to generate AI response.");
                }
            }
        } catch (err) {
            console.error("Search API Error:", err);
            setError("An error occurred while fetching data.");
            toast.error("Error occurred while fetching data.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-black tracking-tight flex items-center gap-2">
                        <Sparkles className="text-[#FF4F00] w-6 h-6" />
                        AI Search & Insights
                    </h2>
                    <p className="text-gray-500 mt-1 text-sm">
                        Search across all meeting transcripts or ask the AI questions.
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden relative">

                {/* Toggle Mode */}
                <div className="flex justify-center mb-8">
                    <div className="bg-gray-100 p-1 rounded-full inline-flex relative">
                        <button
                            onClick={() => setMode("search")}
                            className={`relative z-10 px-6 py-2 text-sm font-semibold rounded-full transition-colors flex items-center gap-2 ${mode === "search" ? "text-white" : "text-gray-600 hover:text-black"
                                }`}
                        >
                            <Search className="w-4 h-4" />
                            Search Meetings
                        </button>
                        <button
                            onClick={() => setMode("ask")}
                            className={`relative z-10 px-6 py-2 text-sm font-semibold rounded-full transition-colors flex items-center gap-2 ${mode === "ask" ? "text-white" : "text-gray-600 hover:text-black"
                                }`}
                        >
                            <MessageSquare className="w-4 h-4" />
                            Ask AI
                        </button>

                        {/* Background slider for toggle */}
                        <div
                            className="absolute top-1 bottom-1 w-1/2 bg-black rounded-full transition-transform duration-300 ease-in-out"
                            style={{ transform: mode === "search" ? "translateX(0)" : "translateX(100%)" }}
                        ></div>
                    </div>
                </div>

                {/* Input Area */}
                <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-10">
                    <div className="relative group">
                        <div className={`absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-colors ${mode === "ask" ? "text-[#FF4F00]" : "text-gray-400 group-focus-within:text-black"
                            }`}>
                            {mode === "ask" ? <Sparkles className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                        </div>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={mode === "ask" ? "Ask a question (e.g. What did we decide about Stripe?)" : "Search concepts (e.g. payment gateway)"}
                            className="w-full bg-white border-2 border-gray-100 rounded-full py-4 pl-14 pr-32 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#FF4F00]/10 focus:border-[#FF4F00] transition-all shadow-sm text-lg"
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="absolute inset-y-2 right-2 px-6 bg-black hover:bg-gray-900 text-white font-bold rounded-full transition-colors flex items-center gap-2 disabled:opacity-70"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    {mode === "ask" ? "Ask" : "Search"}
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {error && (
                    <div className="max-w-3xl mx-auto mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                        {error}
                    </div>
                )}

                {/* Loading State Skeleton */}
                {isLoading && (
                    <div className="max-w-3xl mx-auto space-y-6">
                        {mode === "ask" ? (
                            <div className="border border-indigo-100 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-2xl p-6 relative overflow-hidden">
                                <div className="absolute inset-0 border-2 border-[#FF4F00]/20 rounded-2xl animate-pulse"></div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 animate-pulse"></div>
                                    <div className="h-4 bg-indigo-100 rounded-full w-32 animate-pulse"></div>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-indigo-100/70 rounded-full w-full animate-pulse"></div>
                                    <div className="h-4 bg-indigo-100/70 rounded-full w-5/6 animate-pulse"></div>
                                    <div className="h-4 bg-indigo-100/70 rounded-full w-4/6 animate-pulse"></div>
                                </div>
                                <p className="text-[#FF4F00] text-sm mt-6 font-medium animate-pulse flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    AI is generating your answer...
                                </p>
                            </div>
                        ) : (
                            [1, 2, 3].map((i) => (
                                <div key={i} className="border border-gray-100 rounded-2xl p-5 shadow-sm animate-pulse">
                                    <div className="h-5 bg-gray-200 rounded-full w-1/4 mb-4"></div>
                                    <div className="h-4 bg-gray-100 rounded-full w-full mb-2"></div>
                                    <div className="h-4 bg-gray-100 rounded-full w-2/3"></div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Results Section */}
                {!isLoading && (
                    <div className="max-w-3xl mx-auto">

                        {/* Search Mode Results */}
                        {mode === "search" && searchResults.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
                                    Top Results
                                </h3>
                                {searchResults.map((result, index) => (
                                    <Link
                                        key={index}
                                        to={`/workspaces/${workspaceId}/meetings/${result.meeting_id}`}
                                        className="block bg-white border border-gray-100 hover:border-[#FF4F00]/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full group-hover:bg-[#FF4F00]/10 group-hover:text-[#FF4F00] transition-colors">
                                                Meeting #{result.meeting_id}
                                            </span>
                                            {result.score && (
                                                <span className="text-xs text-gray-400 font-medium">
                                                    Score: {result.score.toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-700 text-sm leading-relaxed italic">
                                            "{result.chunk}"
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {mode === "search" && searchResults.length === 0 && query && !isLoading && !error && (
                            <div className="text-center py-12">
                                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-gray-900">No results found</h3>
                                <p className="text-gray-500 mt-1">Try adjusting your search terms.</p>
                            </div>
                        )}

                        {/* Ask AI Mode Results */}
                        {mode === "ask" && aiResponse && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl border border-gray-800">

                                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF4F00] opacity-10 blur-[80px] rounded-full pointer-events-none"></div>

                                    <div className="flex items-center gap-3 mb-6 relative z-10">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF4F00] to-[#FF8A00] flex items-center justify-center shadow-lg">
                                            <Sparkles className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold">AI Response</h3>
                                    </div>

                                    <div className="prose prose-invert max-w-none relative z-10">
                                        <p className="text-lg text-gray-200 leading-relaxed font-medium whitespace-pre-wrap">
                                            {aiResponse.answer}
                                        </p>
                                    </div>

                                    {aiResponse.sources && aiResponse.sources.length > 0 && (
                                        <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                                Sources
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {aiResponse.sources.map((source, index) => (
                                                    <Link
                                                        key={index}
                                                        to={`/workspaces/${workspaceId}/meetings/${source.meeting_id}`}
                                                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 transition-colors"
                                                    >
                                                        <Search className="w-3.5 h-3.5" />
                                                        Meeting #{source.meeting_id}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </div>
    );
}
