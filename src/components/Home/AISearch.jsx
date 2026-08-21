import { useState } from "react";
import { Search, Send, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";

const sampleQueries = [
    "When did we discuss Stripe integration?",
    "Who was assigned the pricing page?",
    "What deadlines are pending?",
];

export function AISearch() {
    const [active, setActive] = useState(0);

    const query = sampleQueries[active];

    return (
        <section className="search-section" id="search">
            <div className="search-grid">
                {/* Left Content */}
                <div className="search-copy">
                    <Reveal>
                        <span className="eyebrow">
                            <span className="eyebrow-dot" />
                            Semantic search & RAG
                        </span>

                        <h2>
                            Ask questions. <em>Get answers</em> from your meetings.
                        </h2>

                        <p>
                            Instead of re-watching 100 recordings, just ask. MeetMind uses
                            embeddings and a vector database to find the exact meeting, the
                            decision, and the people involved — then answers in plain
                            English.
                        </p>
                    </Reveal>

                    {/* Query Buttons */}
                    <Reveal delay={120}>
                        <div className="search-pills">
                            {sampleQueries.map((question, index) => (
                                <button
                                    key={question}
                                    className={`search-pill ${index === active ? "active" : ""
                                        }`}
                                    onClick={() => setActive(index)}
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </Reveal>
                </div>

                {/* Search Panel */}
                <Reveal delay={160}>
                    <div className="search-panel">
                        <div className="search-bar">
                            <Search size={16} />

                            <span>{query}</span>

                            <button className="search-send">
                                <Send size={15} />
                            </button>
                        </div>

                        <div className="search-answer">
                            <div className="answer-header">
                                <Sparkles size={16} />
                                <span>MeetMind AI</span>
                            </div>

                            {/* Query 1 */}
                            {active === 0 && (
                                <div className="answer-body">
                                    <p>
                                        Stripe integration was discussed on{" "}
                                        <b>15 June</b> in the "Payments Architecture" meeting.
                                    </p>

                                    <div className="answer-card">
                                        <div className="answer-meta">
                                            <span>MEETING</span>
                                            Payments Architecture
                                        </div>

                                        <div className="answer-meta">
                                            <span>DATE</span>
                                            15 June
                                        </div>

                                        <div className="answer-meta">
                                            <span>PARTICIPANTS</span>
                                            Rahul, Mansi
                                        </div>

                                        <div className="answer-meta">
                                            <span>DECISION</span>
                                            Use Stripe webhook retry logic
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Query 2 */}
                            {active === 1 && (
                                <div className="answer-body">
                                    <p>
                                        The <b>pricing page</b> was assigned to{" "}
                                        <b>Rahul</b> (frontend) and <b>Mansi</b> (backend)
                                        during Monday's Sprint Planning.
                                    </p>

                                    <div className="answer-card">
                                        <div className="answer-meta">
                                            <span>FRONTEND</span>
                                            Rahul — due Friday
                                        </div>

                                        <div className="answer-meta">
                                            <span>BACKEND</span>
                                            Mansi — due Friday
                                        </div>

                                        <div className="answer-meta">
                                            <span>DESIGN</span>
                                            Priya — due tomorrow
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Query 3 */}
                            {active === 2 && (
                                <div className="answer-body">
                                    <p>
                                        You have <b>2 pending deadlines</b> this week:
                                    </p>

                                    <div className="answer-card">
                                        <div className="answer-meta">
                                            <span>TASK</span>
                                            Backend API — Mansi
                                        </div>

                                        <div className="answer-meta">
                                            <span>DUE</span>
                                            Today
                                        </div>

                                        <div className="answer-meta">
                                            <span>TASK</span>
                                            UI Design — Priya
                                        </div>

                                        <div className="answer-meta">
                                            <span>DUE</span>
                                            Tomorrow
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

export default AISearch;