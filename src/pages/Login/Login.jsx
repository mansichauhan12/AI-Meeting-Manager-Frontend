// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import callAPI from "../../utils/callAPI";

// function Login() {
//     const navigate = useNavigate();

//     const [form, setForm] = useState({
//         email: "",
//         password: "",
//     });

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         const response = await callAPI(
//             "POST",
//             "auth/login/",
//             form
//         );

//         if (response.ok) {
//             localStorage.setItem(
//                 "access",
//                 response.data.access
//             );

//             localStorage.setItem(
//                 "refresh",
//                 response.data.refresh
//             );

//             localStorage.setItem(
//                 "user",
//                 JSON.stringify(response.data.user)
//             );

//             navigate("/dashboard");
//         }
//     };

//     return (
//         <form onSubmit={handleLogin}>

//             <input
//                 placeholder="Email"
//                 onChange={(e) =>
//                     setForm({
//                         ...form,
//                         email: e.target.value,
//                     })
//                 }
//             />

//             <input
//                 type="password"
//                 placeholder="Password"
//                 onChange={(e) =>
//                     setForm({
//                         ...form,
//                         password: e.target.value,
//                     })
//                 }
//             />

//             <button>

//                 Login

//             </button>

//         </form>
//     );
// }

// export default Login;


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, ArrowRight, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

import callAPI from "../../utils/callAPI";

import AuthLayout from "../../components/AuthLayout";

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            toast.error("Please fill in both email and password.");
            return;
        }
        setLoading(true);
        const response = await callAPI("POST", "auth/login/", form);
        setLoading(false);

        if (response.ok) {
            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            toast.success("Welcome back!");
            navigate("/dashboard");
        } else {
            toast.error(
                response.data?.detail ||
                response.data?.non_field_errors?.[0] ||
                "Invalid credentials. Try again."
            );
        }
    };

    return (
        <AuthLayout eyebrow="SIGN IN">
            <div className="auth-stagger">
                <h2
                    className="font-[Bricolage_Grotesque,sans-serif] text-4xl sm:text-5xl font-black tracking-tighter leading-[0.95] mb-3"
                    data-testid="login-heading"
                >
                    Welcome back.
                </h2>
                <p className="text-zinc-500 text-base mb-10 max-w-sm">
                    Sign in to pick up where your last meeting left off.
                </p>

                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                    data-testid="login-form"
                >
                    {/* Email */}
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-500 block"
                        >
                            Email
                        </label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-[#FF4F00] transition-colors" />
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                placeholder="you@company.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full h-14 pl-11 pr-4 bg-white border border-[#E5E5E5] rounded-xl text-base text-[#0A0A0A] placeholder:text-zinc-400 focus:border-[#FF4F00] focus:ring-2 focus:ring-[#FF4F00]/15 outline-none transition-all"
                                data-testid="login-email-input"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-500"
                            >
                                Password
                            </label>
                            <a
                                href="#"
                                className="text-xs text-zinc-500 hover:text-[#FF4F00] transition-colors font-medium"
                                data-testid="forgot-password-link"
                            >
                                Forgot password?
                            </a>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-[#FF4F00] transition-colors" />
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="w-full h-14 pl-11 pr-12 bg-white border border-[#E5E5E5] rounded-xl text-base text-[#0A0A0A] placeholder:text-zinc-400 focus:border-[#FF4F00] focus:ring-2 focus:ring-[#FF4F00]/15 outline-none transition-all"
                                data-testid="login-password-input"
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
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="group w-full h-14 rounded-full bg-[#FF4F00] text-[#0A0A0A] font-bold text-base flex items-center justify-center gap-2 hover:shadow-[0_10px_30px_-8px_rgba(255,79,0,0.5)] hover:scale-[1.01] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 mt-2"
                        data-testid="login-submit-button"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            <>
                                Sign in
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-8">
                    <div className="flex-1 h-[1px] bg-[#E5E5E5]" />
                    <span className="text-xs text-zinc-400 tracking-widest uppercase">
                        New here?
                    </span>
                    <div className="flex-1 h-[1px] bg-[#E5E5E5]" />
                </div>

                <Link
                    to="/register"
                    className="block text-center w-full h-14 rounded-full border-2 border-[#0A0A0A] text-[#0A0A0A] font-bold text-base leading-[3.25rem] hover:bg-[#0A0A0A] hover:text-white transition-all duration-300"
                    data-testid="link-to-register"
                >
                    Create an account
                </Link>
            </div>
        </AuthLayout>
    );
}

export default Login;
