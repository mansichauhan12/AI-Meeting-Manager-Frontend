import { Reveal } from "./Reveal";

const logos = [
    {
        name: "northwind",
        className: "",
    },
    {
        name: "marble",
        className: "logo-serif",
    },
    {
        name: "KIN + CO",
        className: "logo-wide",
    },
    {
        name: "/linear",
        className: "logo-mono",
    },
    {
        name: "arc",
        className: "logo-light",
    },
];

export function LogoStrip() {
    return (
        <Reveal>
            <section className="logo-strip">
                <span>BUILT FOR THE WAY MODERN TEAMS WORK</span>

                <div>
                    {logos.map((logo) => (
                        <b key={logo.name} className={logo.className}>
                            {logo.name}
                        </b>
                    ))}
                </div>
            </section>
        </Reveal>
    );
}

export default LogoStrip;