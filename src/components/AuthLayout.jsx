import { Sparkles, Search, CheckCircle2, Waves } from "lucide-react";
import { Link } from "react-router-dom";

const HERO_IMAGE =
    "https://images.pexels.com/photos/35696867/pexels-photo-35696867.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920";

/**
 * Two-column split auth layout.
 * Left: form (children)
 * Right: cinematic brand column (hidden on mobile)
 */
export default function AuthLayout({ children, eyebrow = "AUTHENTICATION" }) {
    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F6F5F2] text-[#0A0A0A] font-[Manrope,sans-serif]">
            {/* LEFT: Form column */}
            <div className="w-full lg:w-1/2 flex flex-col px-6 sm:px-12 lg:px-20 py-8 lg:py-12 relative z-10 min-h-screen">
                {/* Brand mark */}
                <Link to="/" className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity" data-testid="brand-mark">
                    <div className="h-9 w-9 rounded-lg bg-[#0A0A0A] flex items-center justify-center">
                        <div className="h-3 w-3 bg-[#FF4F00] rounded-sm rotate-45" />
                    </div>
                    <span className="font-[Bricolage_Grotesque,sans-serif] text-xl font-black tracking-tighter">
                        MeetMind
                    </span>
                </Link>

                {/* Form area */}
                <div className="flex-1 flex flex-col justify-center py-10">
                    <div className="w-full max-w-[440px] mx-auto lg:mx-0">
                        <p
                            className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#FF4F00] mb-4 flex items-center gap-2"
                            data-testid="auth-eyebrow"
                        >
                            <span className="inline-block h-[1px] w-6 bg-[#FF4F00]" />
                            {eyebrow}
                        </p>
                        {children}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-zinc-500 pt-6">
                    <span>© 2026 MeetMind Labs</span>
                    <div className="flex gap-5">
                        <a href="#" className="hover:text-[#0A0A0A] transition-colors">
                            Privacy
                        </a>
                        <a href="#" className="hover:text-[#0A0A0A] transition-colors">
                            Terms
                        </a>
                    </div>
                </div>
            </div>

            {/* RIGHT: Brand visual column */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#0A0A0A] overflow-hidden flex-col justify-end p-12 lg:p-16 lg:sticky lg:top-0 lg:h-screen">
                {/* Hero image */}
                <img
                    src={HERO_IMAGE}
                    alt="Architectural abstraction"
                    className="absolute inset-0 h-full w-full object-cover opacity-70 auth-hero-image"
                    data-testid="auth-hero-image"
                />
                {/* Grain overlay */}
                <div className="absolute inset-0 auth-grain pointer-events-none" />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
                {/* Vermilion accent bar */}
                <div className="absolute top-12 right-12 flex items-center gap-3 z-10">
                    <span className="h-2 w-2 rounded-full bg-[#FF4F00] animate-pulse" />
                    <span className="text-white/80 text-[11px] font-bold tracking-[0.22em] uppercase">
                        AI · Live
                    </span>
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-8 max-w-xl">
                    <h1 className="font-[Bricolage_Grotesque,sans-serif] text-white text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-[0.9]">
                        Meetings,
                        <br />
                        <span className="text-[#FF4F00]">memorized.</span>
                    </h1>

                    <p className="text-white/70 text-base leading-relaxed max-w-md">
                        Upload a call. Get instant summaries, extracted action items, and
                        searchable meeting memory — powered by AI.
                    </p>

                    {/* Feature bento */}
                    <div className="grid grid-cols-3 gap-3 pt-4">
                        {[
                            { icon: Sparkles, label: "AI Summaries" },
                            { icon: CheckCircle2, label: "Action Items" },
                            { icon: Search, label: "Semantic Search" },
                        ].map(({ icon: Icon, label }, i) => (
                            <div
                                key={label}
                                className="backdrop-blur-xl bg-white/[0.06] border border-white/10 rounded-2xl p-4 hover:bg-white/[0.1] transition-all duration-300"
                                style={{ animationDelay: `${i * 80}ms` }}
                                data-testid={`feature-card-${i}`}
                            >
                                <Icon className="h-5 w-5 text-[#FF4F00] mb-3" />
                                <p className="text-white text-sm font-semibold leading-tight">
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Testimonial */}
                    <div className="pt-6 border-t border-white/10 flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#FF4F00] to-[#FF8A3D] flex items-center justify-center text-black font-bold text-sm shrink-0">
                            LR
                        </div>
                        <div>
                            <p className="text-white/90 text-sm leading-relaxed italic">
                                "Cut my post-meeting admin from 45 min to 4. My team actually
                                does the action items now."
                            </p>
                            <p className="text-white/50 text-xs mt-2 tracking-wide">
                                LENA R. — Head of Ops, Northwind
                            </p>
                        </div>
                    </div>
                </div>

                {/* Signal-wave decoration */}
                <Waves className="absolute top-24 left-12 h-6 w-6 text-white/20" />
            </div>
        </div>
    );
}
