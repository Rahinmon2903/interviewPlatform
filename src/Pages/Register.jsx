import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../services/api';

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const nameRef = useRef(null);

    useEffect(() => {
        nameRef.current.focus();
    }, []);

    const handleRegister = async () => {
        try {
            await api.post("/auth/register", { name, email, password });
            navigate("/");
        } catch (error) {
            alert("Register failed");
        }
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-b from-[#0f0f11] to-black text-white">

            {/* LEFT */}
            <div className="hidden lg:flex w-1/2 flex-col justify-center px-16 border-r border-white/10">
                <h1 className="text-5xl font-semibold leading-tight tracking-tight">
                    Prepare for interviews <br />
                    <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                        the right way
                    </span>
                </h1>

                <p className="mt-6 text-gray-400 max-w-md leading-relaxed">
                    Practice real questions, track progress, and improve consistently.
                </p>

                <div className="mt-10 space-y-3 text-sm text-gray-300">
                    <p>✔ Structured learning paths</p>
                    <p>✔ Real interview questions</p>
                    <p>✔ Progress tracking</p>
                </div>
            </div>

            {/* RIGHT */}
            <div className="flex w-full lg:w-1/2 items-center justify-center px-6">
                <div className="w-full max-w-md">

                    {/* Brand */}
                    <h2 className="text-xl font-semibold mb-6 tracking-wide">
                        Interview<span className="text-purple-400">Pro</span>
                    </h2>

                    {/* Heading */}
                    <h3 className="text-3xl font-semibold mb-2 tracking-tight">
                        Create account
                    </h3>
                    <p className="text-gray-400 text-sm mb-8">
                        Takes less than a minute
                    </p>

                    {/* Form */}
                    <div 
                        className="space-y-5"
                        onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                    >

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">
                                Full name
                            </label>
                            <input
                                ref={nameRef}
                                onChange={(e)=>setName(e.target.value)}
                                className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg 
                                focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
                                hover:border-white/20 outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">
                                Email address
                            </label>
                            <input
                                onChange={(e)=>setEmail(e.target.value)}
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
                                onChange={(e)=>setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg 
                                focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
                                hover:border-white/20 outline-none transition"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                At least 6 characters
                            </p>
                        </div>

                    </div>

                    {/* Button */}
                    <button
                        onClick={handleRegister}
                        className="w-full mt-6 py-3 rounded-lg 
                        bg-gradient-to-r from-purple-500 to-blue-500 
                        hover:opacity-90 active:scale-[0.98]
                        transition-all duration-200 font-medium shadow-md"
                    >
                        Create account
                    </button>

                    {/* Trust */}
                    <p className="text-xs text-gray-500 mt-4 text-center">
                        🔒 Secure • No spam • Free to use
                    </p>

                    {/* Footer */}
                    <p className="text-gray-400 text-sm mt-6 text-center">
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/")}
                            className="text-white cursor-pointer hover:underline"
                        >
                            Sign in
                        </span>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Register;