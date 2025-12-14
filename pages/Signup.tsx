import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, BookOpen, User, Lock, ArrowRight, Mail, Hash, BadgeCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export const Signup: React.FC = () => {
    const [activeTab, setActiveTab] = useState<UserRole>('student');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        id: '', // Roll Number or Employee ID
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const isFaculty = activeTab === 'faculty';

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setIsLoading(true);
        
        // Simulate network delay and registration
        setTimeout(() => {
            // For demo purposes, we log the user in immediately after signup
            login(activeTab, formData.email, formData.name);
            setIsLoading(false);
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-brand-50 to-indigo-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col relative">
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-60 h-60 bg-gradient-to-br from-brand-100 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-gradient-to-tr from-indigo-100 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                <div className="p-8 md:p-12">
                    <div className="text-center mb-10">
                        <Link to="/" className="inline-flex items-center space-x-2 text-brand-600 mb-6 hover:opacity-80 transition">
                            <GraduationCap size={32} />
                            <span className="text-2xl font-bold tracking-tight">CampusMate</span>
                        </Link>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Create your account</h2>
                        <p className="text-slate-500">Join the campus digital ecosystem today.</p>
                    </div>

                    {/* Role Switcher */}
                    <div className="flex bg-slate-100 p-1 rounded-xl mb-8 max-w-md mx-auto">
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

                    <form onSubmit={handleSignup} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl outline-none transition-all placeholder-slate-400 text-sm ${
                                            isFaculty 
                                                ? 'bg-indigo-50 border border-indigo-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-indigo-900' 
                                                : 'bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900'
                                        }`}
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    {isFaculty ? 'Faculty ID' : 'Roll Number'}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        {isFaculty ? <BadgeCheck size={18} /> : <Hash size={18} />}
                                    </div>
                                    <input
                                        type="text"
                                        name="id"
                                        required
                                        value={formData.id}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl outline-none transition-all placeholder-slate-400 text-sm ${
                                            isFaculty 
                                                ? 'bg-indigo-50 border border-indigo-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-indigo-900' 
                                                : 'bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900'
                                        }`}
                                        placeholder={isFaculty ? 'e.g., FAC2023' : 'e.g., 21A91A0588'}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-4 py-3 rounded-xl outline-none transition-all placeholder-slate-400 text-sm ${
                                        isFaculty 
                                            ? 'bg-indigo-50 border border-indigo-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-indigo-900' 
                                            : 'bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900'
                                    }`}
                                    placeholder="you@aditya.edu"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl outline-none transition-all placeholder-slate-400 text-sm ${
                                            isFaculty 
                                                ? 'bg-indigo-50 border border-indigo-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-indigo-900' 
                                                : 'bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900'
                                        }`}
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl outline-none transition-all placeholder-slate-400 text-sm ${
                                            isFaculty 
                                                ? 'bg-indigo-50 border border-indigo-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-indigo-900' 
                                                : 'bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900'
                                        }`}
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`
                                w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center space-x-2 mt-4
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
                                    <span>Create Account</span>
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-slate-500">
                            Already have an account? <Link to="/login" className={`font-bold hover:underline ${isFaculty ? 'text-indigo-600' : 'text-brand-600'}`}>Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};