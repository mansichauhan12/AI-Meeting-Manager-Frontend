import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";


const navItems = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how" },
    { label: "AI Search", href: "#search" },
    { label: "Showcase", href: "#showcase" },
    { label: "Pricing", href: "#pricing" },
];

export function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 24);
        };

        onScroll();

        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <header className={`topbar ${scrolled ? "is-scrolled" : ""}`}>
            {/* Logo */}
            <a className="brand" href="#top" aria-label="MeetMind home">
                <span className="brand-mark">
                    <span></span>
                </span>
                <span>MeetMind</span>
            </a>

            {/* Navigation */}
            <nav
                className={`nav-links ${open ? "is-open" : ""}`}
                aria-label="Primary navigation"
            >
                {navItems.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setOpen(false)}
                    >
                        {item.label}
                    </a>
                ))}

                {/* Mobile Login */}
                {/* Mobile Login */}
                <Link
                    className="mobile-login"
                    to="/login"
                    onClick={() => setOpen(false)}
                >
                    Log in
                </Link>

                {/* Mobile CTA */}
                <Link
                    className="mobile-cta"
                    to="/register"
                    onClick={() => setOpen(false)}
                >
                    Start for free
                    <ArrowRight size={15} />
                </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="nav-actions">
                <Link className="login-link" to="/login">
                    Log in
                </Link>

                <Link className="button button-dark button-small !text-white" to="/register">
                    Get started
                    <ArrowRight size={15} />
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
                className="menu-toggle"
                onClick={() => setOpen(!open)}
                aria-label={open ? "Close menu" : "Open menu"}
            >
                {open ? <X size={21} /> : <Menu size={21} />}
            </button>
        </header>
    );
}

export default Nav;