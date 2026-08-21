import { Reveal } from "./Reveal";

export function Showcase() {
    return (
        <section className="showcase-section" id="showcase">
            <Reveal>
                <div className="section-intro center">
                    <span className="eyebrow">
                        <span className="eyebrow-dot" />
                        See it in action
                    </span>

                    <h2>
                        From a 1-hour recording to <em>action</em>.
                    </h2>

                    <p>
                        Here is what MeetMind does with a real Monday sprint planning
                        meeting — automatically.
                    </p>
                </div>
            </Reveal>

            <Reveal delay={100}>
                <div className="showcase-flow">
                    {/* Input */}
                    <div className="showcase-input">
                        <div className="showcase-label">
                            INPUT — Monday meeting
                        </div>

                        <div className="showcase-transcript">
                            <div className="speaker">
                                <span className="sp-tag">Manager</span>
                                <p>
                                    We need to launch the Pricing Page by Friday.
                                </p>
                            </div>

                            <div className="speaker">
                                <span className="sp-tag">Rahul</span>
                                <p>I'll build the frontend.</p>
                            </div>

                            <div className="speaker">
                                <span className="sp-tag">Mansi</span>
                                <p>I'll build the backend APIs.</p>
                            </div>

                            <div className="speaker">
                                <span className="sp-tag">Priya</span>
                                <p>I'll send the final design tomorrow.</p>
                            </div>
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="showcase-arrow">→</div>

                    {/* Outputs */}
                    <div className="showcase-outputs">
                        {/* AI Summary */}
                        <div className="showcase-output-card">
                            <div className="showcase-label accent">
                                AI SUMMARY
                            </div>

                            <ul className="summary-list">
                                <li>Pricing page launch by Friday</li>
                                <li>Frontend assigned to Rahul</li>
                                <li>Backend assigned to Mansi</li>
                                <li>Design assigned to Priya</li>
                            </ul>
                        </div>

                        {/* Action Items */}
                        <div className="showcase-output-card dark">
                            <div className="showcase-label accent">
                                ACTION ITEMS
                            </div>

                            <div className="action-item">
                                <div className="action-avatar">R</div>

                                <div>
                                    <b>Build frontend</b>
                                    <span>Due Friday</span>
                                </div>
                            </div>

                            <div className="action-item">
                                <div className="action-avatar orange">M</div>

                                <div>
                                    <b>Build backend APIs</b>
                                    <span>Due Friday</span>
                                </div>
                            </div>

                            <div className="action-item">
                                <div className="action-avatar green">P</div>

                                <div>
                                    <b>Complete UI design</b>
                                    <span>Due tomorrow</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    );
}

export default Showcase;