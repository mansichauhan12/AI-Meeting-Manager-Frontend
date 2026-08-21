import { Reveal } from "./Reveal";


const testimonials = [
    {
        quote:
            "We stopped writing meeting notes entirely. MeetMind summarizes everything and our action items actually get done now.",
        name: "Jane Rivera",
        role: "Product Lead, Northwind",
        initials: "JR",
    },
    {
        quote:
            "The semantic search is unreal. I asked about a Stripe discussion from three months ago and it found the exact meeting in seconds.",
        name: "Mansi Chauhan",
        role: "Backend Engineer",
        initials: "MC",
    },
    {
        quote:
            "Our standups used to disappear into thin air. Now every decision is searchable and every task has an owner and a deadline.",
        name: "Arjun Kapoor",
        role: "Engineering Manager",
        initials: "AK",
    },
];

export function Testimonials() {
    return (
        <section className="testimonials-section">
            <Reveal>
                <div className="section-intro center">
                    <span className="eyebrow">
                        <span className="eyebrow-dot" />
                        Loved by teams
                    </span>

                    <h2>
                        Teams that turn meetings into <em>momentum</em>.
                    </h2>
                </div>
            </Reveal>

            <div className="testimonials-grid">
                {testimonials.map((testimonial, index) => (
                    <Reveal
                        key={testimonial.name}
                        delay={index * 90}
                    >
                        <article className="testimonial-card">
                            <div className="quote-mark">"</div>

                            <p className="testimonial-quote">
                                {testimonial.quote}
                            </p>

                            <div className="testimonial-author">
                                <span className="testimonial-avatar">
                                    {testimonial.initials}
                                </span>

                                <div>
                                    <b>{testimonial.name}</b>
                                    <span>{testimonial.role}</span>
                                </div>
                            </div>
                        </article>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

export default Testimonials;