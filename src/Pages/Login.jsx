import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const emailRef = useRef(null);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    const handleLogin = async () => {
        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", response.data.token);
            toast.success("Login successful");
            navigate("/dashboard");

        } catch (error) {
            toast.error("Login failed");
        }
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-b from-[#0f0f11] to-black text-white">

            {/* LEFT SIDE */}
            <div className="hidden lg:flex w-1/2 flex-col justify-center px-16 border-r border-white/10">

                <h1 className="text-5xl font-semibold leading-tight tracking-tight">
                    Welcome back <br />
                    <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                        keep improving
                    </span>
                </h1>

                <p className="mt-6 text-gray-400 max-w-md leading-relaxed">
                    Continue your interview preparation and stay consistent.
                </p>

                <div className="mt-10 space-y-3 text-sm text-gray-300">
                    <p>✔ Track your progress</p>
                    <p>✔ Practice real questions</p>
                    <p>✔ Improve daily</p>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex w-full lg:w-1/2 items-center justify-center px-6">
                <div className="w-full max-w-md">

                    {/* Brand */}
                    <h2 className="text-xl font-semibold mb-6 tracking-wide">
                        Interview<span className="text-purple-400">Pro</span>
                    </h2>

                    {/* Heading */}
                    <h3 className="text-3xl font-semibold mb-2 tracking-tight">
                        Login to your account
                    </h3>

                    <p className="text-gray-400 text-sm mb-8">
                        Welcome back, let’s get started
                    </p>

                    {/* Form */}
                    <div 
                        className="space-y-5"
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    >

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">
                                Email address
                            </label>
                            <input
                                ref={emailRef}
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg 
                                focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                                hover:border-white/20 outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg 
                                focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
                                hover:border-white/20 outline-none transition"
                            />
                        </div>

                    </div>

                    {/* Button */}
                    <button
                        onClick={handleLogin}
                        className="w-full mt-6 py-3 rounded-lg 
                        bg-gradient-to-r from-purple-500 to-blue-500 
                        hover:opacity-90 active:scale-[0.98]
                        transition-all duration-200 font-medium shadow-md"
                    >
                        Login
                    </button>

                    {/* Trust */}
                    <p className="text-xs text-gray-500 mt-4 text-center">
                        🔒 Secure login • Your data is protected
                    </p>

                    {/* Footer */}
                    <p className="text-gray-400 text-sm mt-6 text-center">
                        Don’t have an account?{" "}
                        <span
                            onClick={() => navigate("/register")}
                            className="text-white cursor-pointer hover:underline"
                        >
                            Sign up
                        </span>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Login;