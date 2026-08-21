import {
    Mic2,
    Sparkles,
    Target,
    Search,
    Bell,
    CalendarDays,
    Users,
    MessageSquare,
    FileText,
    Shield,
} from "lucide-react";

import { Reveal } from "./Reveal";

const features = [
    {
        icon: Mic2,
        title: "Audio & transcript upload",
        text: "MP3, Zoom, Google Meet recordings, or pasted text. MeetMind handles any input.",
    },
    {
        icon: Sparkles,
        title: "AI summarization",
        text: "Concise summaries with decisions, key points, and topics — readable in seconds.",
    },
    {
        icon: Target,
        title: "Action item extraction",
        text: "AI finds who-owes-what-by-when and turns each into an assigned task automatically.",
    },
    {
        icon: Search,
        title: "Semantic search (RAG)",
        text: "Ask in natural language. MeetMind retrieves the right meeting and answers with citations.",
    },
    {
        icon: MessageSquare,
        title: "Chat with meetings",
        text: "A ChatGPT-style interface to ask questions across all your meeting history.",
    },
    {
        icon: Bell,
        title: "Email reminders",
        text: "Automatic deadline reminders so action items never slip through the cracks again.",
    },
    {
        icon: CalendarDays,
        title: "Calendar integration",
        text: "Sync meetings, schedule recordings, and get pre-meeting context at the right time.",
    },
    {
        icon: Users,
        title: "Team workspaces",
        text: "Shared meeting memory for your whole team, with roles and workspace-level access.",
    },
    {
        icon: FileText,
        title: "Full transcript storage",
        text: "Every transcript is stored, indexed, and citable — your searchable meeting archive.",
    },
    {
        icon: Shield,
        title: "JWT authentication",
        text: "Secure access and refresh tokens protect every API and workspace.",
    },
];

export function Features() {
    return (
        <section className="features-section" id="features">
            <Reveal>
                <div className="section-intro center">
                    <span className="eyebrow">
                        <span className="eyebrow-dot" />
                        Everything in one place
                    </span>

                    <h2>
                        A complete meeting <em>intelligence</em> platform.
                    </h2>

                    <p>
                        Not just transcription. Not just notes. MeetMind is the full
                        pipeline — from audio upload to AI search.
                    </p>
                </div>
            </Reveal>

            <div className="features-grid">
                {features.map(({ icon: Icon, title, text }, index) => (
                    <Reveal key={title} delay={(index % 3) * 70}>
                        <article className="feature-card">
                            <span className="feature-icon">
                                <Icon size={20} />
                            </span>

                            <h3>{title}</h3>

                            <p>{text}</p>
                        </article>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

export default Features;