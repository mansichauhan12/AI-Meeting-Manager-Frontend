import { useEffect, useRef, useState } from "react";

export function Reveal({
    children,
    delay = 0,
    y = 28,
    className = "",
}) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;

        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -60px 0px",
            }
        );

        observer.observe(el);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible
                    ? "translateY(0)"
                    : `translateY(${y}px)`,
                transition: `opacity 0.7s cubic-bezier(.16,1,.3,1) ${delay}ms,
                     transform 0.7s cubic-bezier(.16,1,.3,1) ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

export default Reveal;