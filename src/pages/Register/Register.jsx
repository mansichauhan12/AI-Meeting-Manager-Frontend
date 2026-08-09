// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import callAPI from "../../utils/callAPI";

// function Register() {
//     const navigate = useNavigate();

//     const [form, setForm] = useState({
//         full_name: "",
//         username: "",
//         email: "",
//         password: "",
//     });

//     const handleChange = (e) => {
//         setForm((prev) => ({
//             ...prev,
//             [e.target.name]: e.target.value,
//         }));
//     };

//     const handleRegister = async (e) => {
//         e.preventDefault();

//         const response = await callAPI(
//             "POST",
//             "auth/register/",
//             form
//         );

//         if (response.ok) {
//             navigate("/login");
//         } else {
//             alert(response.data.detail || "Registration Failed");
//         }
//     };

//     return (
//         <form onSubmit={handleRegister}>

//             <input
//                 name="full_name"
//                 placeholder="Full Name"
//                 onChange={handleChange}
//             />

//             <input
//                 name="username"
//                 placeholder="Username"
//                 onChange={handleChange}
//             />

//             <input
//                 name="email"
//                 placeholder="Email"
//                 onChange={handleChange}
//             />

//             <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 onChange={handleChange}
//             />

//             <button>
//                 Register
//             </button>

//         </form>
//     );
// }

// export default Register;
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    Eye,
    EyeOff,
    Loader2,
    ArrowRight,
    Mail,
    Lock,
    User,
    AtSign,
    Check,
} from "lucide-react";
import { toast } from "sonner";

import callAPI from "../../utils/callAPI";

import AuthLayout from "../../components/AuthLayout";

function Register() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        full_name: "",
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const passwordChecks = [
        { label: "At least 8 characters", ok: form.password.length >= 8 },
        { label: "One number", ok: /\d/.test(form.password) },
        { label: "One letter", ok: /[a-zA-Z]/.test(form.password) },
    ];

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!form.full_name || !form.username || !form.email || !form.password) {
            toast.error("Please fill in all fields.");
            return;
        }
        setLoading(true);
        const response = await callAPI("POST", "auth/register/", form);
        setLoading(false);

        if (response.ok) {
            toast.success("Account created. Please sign in.");
            navigate("/login");
        } else {
            const err =
                response.data?.detail ||
                response.data?.email?.[0] ||
                response.data?.username?.[0] ||
                response.data?.password?.[0] ||
                "Registration failed. Please try again.";
            toast.error(err);
        }
    };

    const fieldIcons = {
        full_name: User,
        username: AtSign,
        email: Mail,
    };

    const placeholders = {
        full_name: "Jane Cooper",
        username: "janecooper",
        email: "jane@company.com",
    };

    return (
        <AuthLayout eyebrow="CREATE ACCOUNT">
            <div className="auth-stagger">
                <h2
                    className="font-[Bricolage_Grotesque,sans-serif] text-4xl sm:text-5xl font-black tracking-tighter leading-[0.95] mb-3"
                    data-testid="register-heading"
                >
                    Start capturing
                    <br />
                    every idea.
                </h2>
                <p className="text-zinc-500 text-base mb-8 max-w-sm">
                    Free forever for solo users. No credit card required.
                </p>

                <form
                    onSubmit={handleRegister}
                    className="space-y-4"
                    data-testid="register-form"
                >
                    {["full_name", "username", "email"].map((name) => {
                        const Icon = fieldIcons[name];
                        return (
                            <div key={name} className="space-y-2">
                                <label
                                    htmlFor={name}
                                    className="text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-500 block"
                                >
                                    {name.replace("_", " ")}
                                </label>
                                <div className="relative group">
                                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-[#FF4F00] transition-colors" />
                                    <input
                                        id={name}
                                        name={name}
                                        type={name === "email" ? "email" : "text"}
                                        autoComplete={name === "email" ? "email" : "off"}
                                        placeholder={placeholders[name]}
                                        value={form[name]}
                                        onChange={handleChange}
                                        className="w-full h-14 pl-11 pr-4 bg-white border border-[#E5E5E5] rounded-xl text-base text-[#0A0A0A] placeholder:text-zinc-400 focus:border-[#FF4F00] focus:ring-2 focus:ring-[#FF4F00]/15 outline-none transition-all"
                                        data-testid={`register-${name}-input`}
                                    />
                                </div>
                            </div>
                        );
                    })}

                    {/* Password */}
                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-500 block"
                        >
                            Password
                        </label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-[#FF4F00] transition-colors" />
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                placeholder="Create a strong password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full h-14 pl-11 pr-12 bg-white border border-[#E5E5E5] rounded-xl text-base text-[#0A0A0A] placeholder:text-zinc-400 focus:border-[#FF4F00] focus:ring-2 focus:ring-[#FF4F00]/15 outline-none transition-all"
                                data-testid="register-password-input"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#0A0A0A] transition-colors"
                                data-testid="toggle-password-visibility"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                        {/* Password checklist */}
                        {form.password && (
                            <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-2">
                                {passwordChecks.map((c) => (
                                    <span
                                        key={c.label}
                                        className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors ${c.ok ? "text-[#0A0A0A]" : "text-zinc-400"
                                            }`}
                                    >
                                        <span
                                            className={`h-3.5 w-3.5 rounded-full flex items-center justify-center ${c.ok ? "bg-[#FF4F00]" : "bg-zinc-200"
                                                }`}
                                        >
                                            {c.ok && <Check className="h-2.5 w-2.5 text-black" strokeWidth={3} />}
                                        </span>
                                        {c.label}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="group w-full h-14 rounded-full bg-[#FF4F00] text-[#0A0A0A] font-bold text-base flex items-center justify-center gap-2 hover:shadow-[0_10px_30px_-8px_rgba(255,79,0,0.5)] hover:scale-[1.01] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 mt-2"
                        data-testid="register-submit-button"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Creating account...
                            </>
                        ) : (
                            <>
                                Create account
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    <p className="text-xs text-zinc-500 text-center leading-relaxed pt-1">
                        By creating an account, you agree to our{" "}
                        <a href="#" className="text-[#0A0A0A] underline underline-offset-2 hover:text-[#FF4F00]">
                            Terms
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-[#0A0A0A] underline underline-offset-2 hover:text-[#FF4F00]">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </form>

                <div className="flex items-center gap-4 my-8">
                    <div className="flex-1 h-[1px] bg-[#E5E5E5]" />
                    <span className="text-xs text-zinc-400 tracking-widest uppercase">
                        Already a member?
                    </span>
                    <div className="flex-1 h-[1px] bg-[#E5E5E5]" />
                </div>

                <Link
                    to="/login"
                    className="block text-center w-full h-14 rounded-full border-2 border-[#0A0A0A] text-[#0A0A0A] font-bold text-base leading-[3.25rem] hover:bg-[#0A0A0A] hover:text-white transition-all duration-300"
                    data-testid="link-to-login"
                >
                    Sign in instead
                </Link>
            </div>
        </AuthLayout>
    );
}

export default Register;
