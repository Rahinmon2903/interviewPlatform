import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
     const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response =await api.post("/auth/login", {
                email,
                password,
            });
            localStorage.setItem("token", response.data.token);
            toast.success("Login successful");
            navigate("/dashboard");
            
        } catch (error) {
            toast.error("Login failed");


            
        }
    }
    return (
        <div>
            <h1>Login Page</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            
        </div>
    );
};

export default Login;