import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, BookOpen, Users, Calendar, Shield, Ticket, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Landing: React.FC = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-brand-600">
                        <GraduationCap size={32} />
                        <span className="text-2xl font-bold tracking-tight">CampusMate</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/login" className="px-5 py-2 rounded-xl text-slate-600 font-medium hover:text-brand-600 hover:bg-brand-50 transition">
                            Log In
                        </Link>
                        <Link to="/signup" className="px-5 py-2 rounded-xl bg-brand-600 text-white font-medium hover:bg-brand-700 shadow-lg shadow-brand-200 transition">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 overflow-hidden relative">
                <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-brand-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5 mb-8 animate-fade-in-up">
                        <span className="flex h-2 w-2 rounded-full bg-brand-500"></span>
                        <span className="text-sm font-medium text-slate-600">New: AI-Powered Assistant Available 24/7</span>
                    </div>
                    
                    <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-8 leading-tight">
                        Your Digital <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">Campus Companion</span>
                    </h1>
                    
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed">
                        CampusMate bridges the gap between students and faculty. Manage attendance, assignments, events, and campus life in one beautiful platform.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/signup" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-600 text-white text-lg font-bold hover:bg-brand-700 shadow-xl shadow-brand-200 transition flex items-center justify-center space-x-2">
                            <span>Get Started for Free</span>
                            <ArrowRight size={20} />
                        </Link>
                        <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-700 text-lg font-bold border border-slate-200 hover:bg-slate-50 transition flex items-center justify-center space-x-2">
                            <span>Student Login</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to succeed</h2>
                        <p className="text-slate-500 max-w-xl mx-auto">Whether you are a student tracking attendance or a faculty member managing submissions, we've got you covered.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                                <LayoutDashboard size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Dashboard</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Get a bird's eye view of your daily schedule, pending tasks, and recent announcements all in one place.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300">
                            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                                <Users size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Faculty Connect</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Seamlessly connect with professors, schedule appointments, and submit assignments online.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300">
                            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                                <Ticket size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Digital Outpass</h3>
                            <p className="text-slate-500 leading-relaxed">
                                No more paper forms. Apply for gate passes digitally and get real-time approval notifications.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300">
                            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
                                <Calendar size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Event Tracking</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Never miss a campus event. From hackathons to cultural fests, keep track of everything happening around you.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300">
                            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                                <Shield size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Secure & Private</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Your data is encrypted and secure. We prioritize student privacy and data protection above all else.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300">
                            <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-6">
                                <BookOpen size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Academic Resources</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Access library catalogs, previous year papers, and study materials directly from your dashboard.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-100 py-12">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2 text-brand-600 mb-4 md:mb-0">
                        <GraduationCap size={24} />
                        <span className="text-xl font-bold">CampusMate</span>
                    </div>
                    <div className="text-slate-400 text-sm">
                        © 2024 CampusMate. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};