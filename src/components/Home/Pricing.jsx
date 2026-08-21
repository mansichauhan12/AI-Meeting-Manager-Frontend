import { Check, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

const plans = [
    {
        name: "Starter",
        price: "$0",
        period: "/forever",
        blurb: "For individuals trying MeetMind out.",
        features: [
            "5 meetings / month",
            "AI summaries",
            "Action item extraction",
            "Basic search",
        ],
        cta: "Start for free",
        highlight: false,
    },
    {
        name: "Team",
        price: "$24",
        period: "/user / mo",
        blurb: "For teams that run on meetings.",
        features: [
            "Unlimited meetings",
            "Semantic search (RAG)",
            "Chat with meetings",
            "Email reminders",
            "Calendar integration",
            "Shared workspace",
        ],
        cta: "Start 14-day trial",
        highlight: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        blurb: "For organizations with advanced needs.",
        features: [
            "Everything in Team",
            "SSO & SAML",
            "Role-based permissions",
            "Audit logs",
            "Priority support",
            "Custom integrations",
        ],
        cta: "Contact sales",
        highlight: false,
    },
];

export function Pricing() {
    return (
        <section className="pricing-section" id="pricing">
            <Reveal>
                <div className="section-intro center">
                    <span className="eyebrow">
                        <span className="eyebrow-dot" />
                        Simple pricing
                    </span>

                    <h2>
                        Start free. <em>Scale</em> when ready.
                    </h2>

                    <p>
                        No credit card needed to get started. Upgrade only when your team
                        grows.
                    </p>
                </div>
            </Reveal>

            <div className="pricing-grid">
                {plans.map((plan, index) => (
                    <Reveal
                        key={plan.name}
                        delay={index * 90}
                    >
                        <article
                            className={`pricing-card ${plan.highlight ? "highlight" : ""
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.highlight && (
                                <span className="pricing-badge">
                                    Most popular
                                </span>
                            )}

                            {/* Plan Name */}
                            <h3>{plan.name}</h3>

                            {/* Price */}
                            <div className="pricing-price">
                                <strong>{plan.price}</strong>
                                <span>{plan.period}</span>
                            </div>

                            {/* Description */}
                            <p className="pricing-blurb">
                                {plan.blurb}
                            </p>

                            {/* Features */}
                            <ul className="pricing-features">
                                {plan.features.map((feature) => (
                                    <li key={feature}>
                                        <Check size={15} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <a
                                className={`button ${plan.highlight
                                    ? "button-orange"
                                    : "button-dark"
                                    } pricing-cta`}
                                href="/register"
                            >
                                {plan.cta}
                                <ArrowRight size={15} />
                            </a>
                        </article>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

export default Pricing;