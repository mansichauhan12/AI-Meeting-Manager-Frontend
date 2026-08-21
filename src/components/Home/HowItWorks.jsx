import {
    Upload,
    AudioLines,
    FileText,
    Sparkles,
    Target,
    KanbanSquare,
    Bell,
    Search,
} from "lucide-react";

import { Reveal } from "./Reveal";

const steps = [
    {
        icon: Upload,
        step: "01",
        title: "Upload a meeting",
        text: "Drop in an MP3, a Zoom or Google Meet recording, or paste a transcript. MeetMind accepts it all.",
    },
    {
        icon: AudioLines,
        step: "02",
        title: "Speech to text",
        text: "Audio is transcribed automatically — speaker labels included — so every word is searchable.",
    },
    {
        icon: FileText,
        step: "03",
        title: "Save the transcript",
        text: "The full transcript is stored and indexed, ready to be searched or cited at any time.",
    },
    {
        icon: Sparkles,
        step: "04",
        title: "AI summary",
        text: "MeetMind writes a concise summary: decisions, key points, and topics — readable in 20 seconds.",
    },
    {
        icon: Target,
        step: "05",
        title: "Extract action items",
        text: 'AI identifies who said they will do what, and by when. "Mansi will build the APIs by Friday."',
    },
    {
        icon: KanbanSquare,
        step: "06",
        title: "Task management",
        text: "Action items become tasks on a board — To do, In progress, Done — assigned to the right person.",
    },
    {
        icon: Bell,
        step: "07",
        title: "Reminders & notifications",
        text: "When Friday comes and the API is not done, MeetMind sends a reminder. No more silent misses.",
    },
    {
        icon: Search,
        step: "08",
        title: "Search & chat with AI",
        text: 'Ask "When did we discuss Stripe?" MeetMind finds the meeting, the decision, and the participants.',
    },
];

export function HowItWorks() {
    return (
        <section className="how-section" id="how">
            <Reveal>
                <div className="section-intro center">
                    <span className="eyebrow">
                        <span className="eyebrow-dot" />
                        From upload to action
                    </span>

                    <h2>
                        Eight steps. <em>Zero</em> manual work.
                    </h2>

                    <p>
                        From the first upload to a searchable, chat-able meeting memory —
                        here is everything MeetMind does for you.
                    </p>
                </div>
            </Reveal>

            <div className="how-grid">
                {steps.map(({ icon: Icon, step, title, text }, index) => (
                    <Reveal key={step} delay={(index % 4) * 70}>
                        <article className="how-card">
                            <div className="how-icon">
                                <Icon size={20} />
                            </div>

                            <span className="how-number">{step}</span>

                            <h3>{title}</h3>

                            <p>{text}</p>
                        </article>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

export default HowItWorks;