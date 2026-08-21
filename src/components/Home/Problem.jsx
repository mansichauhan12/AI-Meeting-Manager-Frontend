import { Clock, FileText, Search, Bell } from "lucide-react";
import { Reveal } from "./Reveal";

const problems = [
    {
        icon: Clock,
        title: "1-hour meetings nobody re-watches",
        text: "You sit through an hour. A week later, nobody remembers what was decided.",
    },
    {
        icon: FileText,
        title: "Notes that drift and die",
        text: "Someone scribbles notes in a doc. Nobody updates them. Nobody reads them.",
    },
    {
        icon: Search,
        title: "Action items quietly slip away",
        text: '"Who was supposed to send the proposal?" Nobody knows. Deadlines pass silently.',
    },
    {
        icon: Bell,
        title: "Old meetings are impossible to search",
        text: "Three months later, finding that one Stripe discussion means re-watching 100 recordings.",
    },
];

export function Problem() {
    return (
        <section className="problem-section">
            <Reveal>
                <div className="section-intro center">
                    <span className="eyebrow">
                        <span className="eyebrow-dot" />
                        The real-world problem
                    </span>

                    <h2>
                        Great meetings die in <em>notebooks</em>.
                    </h2>

                    <p>
                        Teams talk, decide, and assign — then forget. MeetMind makes sure
                        the value of every conversation actually goes somewhere.
                    </p>
                </div>
            </Reveal>

            <div className="problem-grid">
                {problems.map(({ icon: Icon, title, text }, index) => (
                    <Reveal key={title} delay={index * 80}>
                        <article className="problem-card">
                            <span className="problem-icon">
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

export default Problem;