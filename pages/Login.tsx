import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, BookOpen, User, Lock, ArrowRight, School } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export const Login: React.FC = () => {
    const [activeTab, setActiveTab] = useState<UserRole>('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate network delay
        setTimeout(() => {
            login(activeTab, email);
            setIsLoading(false);
            navigate('/dashboard');
        }, 1000);
    };

    const isFaculty = activeTab === 'faculty';

    return (
        <div className="min-h-screen bg-gradient-to-br from-brand-50 to-indigo-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl flex overflow-hidden min-h-[600px]">
                
                {/* Left Side - Visual */}
                <div className={`hidden lg:flex w-1/2 ${isFaculty ? 'bg-gradient-to-br from-indigo-600 to-indigo-800' : 'bg-gradient-to-br from-brand-600 to-brand-800'} p-12 flex-col justify-between text-white relative overflow-hidden transition-all duration-500`}>
                    <div className="relative z-10">
                        <Link to="/" className="flex items-center space-x-2 mb-8 hover:opacity-90 transition">
                            <GraduationCap size={40} />
                            <span className="text-3xl font-bold tracking-tight">CampusMate</span>
                        </Link>
                        <h2 className="text-4xl font-bold leading-tight mb-4">
                            {isFaculty ? "Manage Your\nAcademic World" : "Your Digital \nCampus Companion"}
                        </h2>
                        <p className="text-brand-100 text-lg opacity-90">
                            {isFaculty 
                                ? "Access schedules, student requests, and department updates efficiently."
                                : "Access your schedule, hostel updates, academic records, and more in one place."
                            }
                        </p>
                    </div>

                    <div className="relative z-10 space-y-4">
                        <div className="flex items-center space-x-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <School size={24} />
                            </div>
                            <div>
                                <p className="font-semibold">Connected Campus</p>
                                <p className="text-xs text-white/70">Everything you need, synchronized.</p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center transition-colors duration-300">
                    <div className="max-w-md mx-auto w-full">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back!</h2>
                            <p className="text-slate-500">Please sign in to continue.</p>
                        </div>

                        {/* Role Switcher */}
                        <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
                            <button
                                onClick={() => setActiveTab('student')}
                                className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                    activeTab === 'student' 
                                        ? 'bg-white text-brand-600 shadow-sm' 
                                        : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                <GraduationCap size={18} />
                                <span>Student</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('faculty')}
                                className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                    activeTab === 'faculty' 
                                        ? 'bg-white text-indigo-600 shadow-sm' 
                                        : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                <BookOpen size={18} />
                                <span>Faculty</span>
                            </button>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    {isFaculty ? 'Faculty ID / Email' : 'Roll Number / Email'}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <User size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`w-full pl-11 pr-4 py-3 rounded-xl outline-none transition-all placeholder-slate-400 ${
                                            isFaculty 
                                                ? 'bg-indigo-50 border border-indigo-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-indigo-900' 
                                                : 'bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900'
                                        }`}
                                        placeholder={isFaculty ? 'e.g., FAC1029' : 'e.g., 21A91A0588'}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <Lock size={20} />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`w-full pl-11 pr-4 py-3 rounded-xl outline-none transition-all placeholder-slate-400 ${
                                            isFaculty 
                                                ? 'bg-indigo-50 border border-indigo-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-indigo-900' 
                                                : 'bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900'
                                        }`}
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div className="flex justify-end mt-2">
                                    <button type="button" className={`text-xs font-medium hover:underline ${isFaculty ? 'text-indigo-600' : 'text-brand-600'}`}>
                                        Forgot Password?
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`
                                    w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center space-x-2
                                    ${isFaculty 
                                        ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                                        : 'bg-brand-600 hover:bg-brand-700 shadow-brand-200' 
                                    }
                                    ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}
                                `}
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span>Sign In as {isFaculty ? 'Faculty' : 'Student'}</span>
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-slate-500">
                                Don't have an account? <Link to="/signup" className={`font-bold hover:underline ${isFaculty ? 'text-indigo-600' : 'text-brand-600'}`}>Sign Up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};