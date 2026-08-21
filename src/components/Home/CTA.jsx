import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function CTA() {
    return (
        <Reveal>
            <section className="cta-section" id="signup">
                <div>
                    <span className="eyebrow">
                        <span className="eyebrow-dot" />
                        Your next meeting can be different
                    </span>

                    <h2>
                        Stop taking notes.
                        <br />
                        <em>Start moving forward.</em>
                    </h2>
                </div>

                <a className="button button-orange" href="#how">
                    Bring MeetMind to your team
                    <ArrowRight size={17} />
                </a>
            </section>
        </Reveal>
    );
}

export default CTA;