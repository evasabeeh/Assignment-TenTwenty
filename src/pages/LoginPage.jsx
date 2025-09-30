import { useState } from 'react';
import { setSessionToken } from '../utils/auth'; 
import { fakeFetch } from '../mockServer';

// To make login attempt

async function loginUser(email, password) {
    const res = await fakeFetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
    });
    return res.json();
}

export default function LoginPage({ onLoginSuccess }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { token } = await loginUser(email, password);
            setSessionToken(token);
            onLoginSuccess();
            console.log("Token set:", token);
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">

            <div className="flex flex-col justify-between px-10 md:px-10 lg:px-20 bg-white w-full h-full">
                <div className="flex flex-col items-center justify-center flex-grow">
                    <div className="w-full mx-auto">
                        <h2 className="text-xl font-bold mb-6">Welcome back</h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                                <label className="block text-sm mb-1">Email</label>
                                <input
                                    type="email"
                                    placeholder="test@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Password</label>
                                <input
                                    type="password"
                                    placeholder="test1234"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="flex items-center space-x-2 text-sm">
                                <input type="checkbox" id="remember" className="accent-blue-600" />
                                <label htmlFor="remember" className="text-gray-500 select-none">Remember me</label>
                            </div>

                            <button
                                type="submit"
                                className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md transition"
                            >
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>

                <p className="text-xs text-gray-500 text-center mb-10">&copy; 2024 tentwenty</p>
            </div>

            <div className="flex items-center justify-center bg-blue-600 text-white px-8 md:px-10 lg:px-20 w-full h-full">
                <div className="max-w-full">
                    <h2 className="text-4xl font-semibold mb-4">ticktock</h2>
                    <p className="text-sm font-extralight md:leading-relaxed">
                        Introducing ticktock, our cutting-edge timesheet web application designed
                        to revolutionize how you manage employee work hours. With ticktock, you
                        can effortlessly track and monitor employee attendance and productivity
                        from anywhere, anytime, using any internet-connected device.
                    </p>
                </div>
            </div>
        </div>
    );
}