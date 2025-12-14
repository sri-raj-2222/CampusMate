import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, AlertCircle, Calendar as CalendarIcon, Trophy, CheckCircle, FileText, Ticket, Users, Megaphone, Send, Trash2 } from 'lucide-react';
import { DashboardChat } from '../components/DashboardChat';
import { useProfile } from '../context/ProfileContext';
import { useAuth } from '../context/AuthContext';
import { useOutpass } from '../context/OutpassContext';
import { useAnnouncements } from '../context/AnnouncementsContext';
import { Announcement } from '../types';

export const Dashboard: React.FC = () => {
    const { user: profile } = useProfile();
    const { user: authUser } = useAuth();
    const isFaculty = authUser?.role === 'faculty';
    const firstName = profile.name.split(' ')[0];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        {isFaculty ? `Welcome, ${profile.name}` : `Welcome back, ${firstName}! 👋`}
                    </h1>
                    <p className="text-slate-500 mt-1">
                        {isFaculty ? 'Manage student requests and campus updates.' : "Here's what's happening on campus today."}
                    </p>
                </div>
                <div className="text-sm text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm flex items-center space-x-2">
                    <Clock size={16} />
                    <span>Spring Semester • Week 12</span>
                </div>
            </div>

            {isFaculty ? <FacultyDashboard /> : <StudentDashboard />}
        </div>
    );
};

// Component for Students to VIEW announcements
const AnnouncementsSection: React.FC = () => {
    const { announcements } = useAnnouncements();

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-6">
                <Megaphone className="text-brand-600" size={20} />
                <h2 className="text-xl font-bold text-slate-900">Campus Announcements</h2>
            </div>
            <div className="space-y-6">
                {announcements.length === 0 ? (
                     <p className="text-slate-500 text-sm">No recent announcements.</p>
                ) : (
                    announcements.map((item) => (
                        <div key={item.id} className="flex items-start space-x-4 border-b border-slate-50 last:border-0 pb-4 last:pb-0">
                            <div className="w-2 h-2 mt-2 rounded-full bg-brand-500 flex-shrink-0" />
                            <div>
                                <h4 className="text-slate-800 font-medium">{item.title}</h4>
                                {item.description && (
                                    <p className="text-slate-500 text-sm mt-1 mb-2 line-clamp-2">{item.description}</p>
                                )}
                                <div className="flex items-center space-x-2 mt-1">
                                    <span className="text-xs text-slate-400">{item.date}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded ${
                                        item.category === 'Academic' ? 'bg-blue-50 text-blue-600' :
                                        item.category === 'Event' ? 'bg-purple-50 text-purple-600' :
                                        'bg-slate-100 text-slate-600'
                                    }`}>{item.category}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

// Component for Faculty to ADD announcements
const FacultyAnnouncementManager: React.FC = () => {
    const { announcements, addAnnouncement, deleteAnnouncement } = useAnnouncements();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<'Academic' | 'Event' | 'Campus Life' | 'Other'>('Academic');
    const [desc, setDesc] = useState('');

    const handlePost = (e: React.FormEvent) => {
        e.preventDefault();
        if(!title.trim()) return;

        const newAnnouncement: Announcement = {
            id: Date.now().toString(),
            title: title,
            category: category,
            date: 'Just now',
            description: desc
        };

        addAnnouncement(newAnnouncement);
        setTitle('');
        setDesc('');
        alert('Announcement posted successfully!');
    };

    const inputClass = "w-full px-4 py-2 rounded-xl border border-indigo-200 bg-indigo-50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm text-indigo-900 placeholder-indigo-300 transition-all";

    return (
        <div className="space-y-6">
            {/* Post Form */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                 <div className="flex items-center space-x-2 mb-6 text-indigo-700">
                    <Megaphone size={20} />
                    <h2 className="text-xl font-bold">Post Campus Announcement</h2>
                </div>
                
                <form onSubmit={handlePost} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                        <input 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text" 
                            className={inputClass}
                            placeholder="e.g., Guest Lecture tomorrow at 10 AM"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                             <select 
                                value={category}
                                onChange={(e) => setCategory(e.target.value as any)}
                                className={inputClass}
                             >
                                 <option value="Academic">Academic</option>
                                 <option value="Event">Event</option>
                                 <option value="Campus Life">Campus Life</option>
                                 <option value="Other">Other</option>
                             </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Date Display</label>
                            <div className="px-4 py-2 rounded-xl border border-slate-100 bg-slate-50 text-slate-400 text-sm cursor-not-allowed">
                                Just Now (Auto)
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description (Optional)</label>
                        <textarea 
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            rows={3}
                            className={inputClass}
                            placeholder="Add more details..."
                        />
                    </div>
                    <div className="pt-2 flex justify-end">
                        <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition flex items-center space-x-2">
                            <Send size={16} />
                            <span>Post Update</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* List of Posted Items */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-bold text-slate-900 mb-4">Your Recent Posts</h3>
                <div className="space-y-4">
                    {announcements.length === 0 ? (
                        <p className="text-slate-400 text-sm italic">You haven't posted any updates yet.</p>
                    ) : (
                        announcements.map((ann) => (
                            <div key={ann.id} className="flex justify-between items-start p-3 bg-slate-50 rounded-xl border border-slate-100 group">
                                <div>
                                    <div className="flex items-center space-x-2 mb-1">
                                        <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                                            ann.category === 'Academic' ? 'bg-blue-100 text-blue-700' :
                                            ann.category === 'Event' ? 'bg-purple-100 text-purple-700' : 'bg-slate-200 text-slate-700'
                                        }`}>
                                            {ann.category}
                                        </span>
                                        <span className="text-xs text-slate-400">{ann.date}</span>
                                    </div>
                                    <p className="text-sm font-bold text-slate-800">{ann.title}</p>
                                </div>
                                <button 
                                    onClick={() => deleteAnnouncement(ann.id)}
                                    className="p-2 text-slate-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                                    title="Delete Announcement"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

const StudentDashboard: React.FC = () => {
    const { user } = useProfile();
    
    // Student Time Table Logic
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()]; 

    const studentSchedule: any = {
        'Monday': [
            { time: '09:00 - 09:50', subject: 'Database Management', room: 'LH-105', type: 'Lecture' },
            { time: '09:50 - 10:40', subject: 'Operating Systems', room: 'LH-105', type: 'Lecture' },
            { time: '11:00 - 12:40', subject: 'Web Technologies Lab', room: 'Lab-2', type: 'Lab' },
        ],
        'Tuesday': [
            { time: '09:00 - 10:40', subject: 'Computer Networks', room: 'LH-105', type: 'Lecture' },
            { time: '11:00 - 11:50', subject: 'Soft Skills', room: 'LH-105', type: 'Lecture' },
            { time: '14:00 - 16:00', subject: 'Library Hour', room: 'Library', type: 'Self Study' },
        ],
        'Wednesday': [
            { time: '09:00 - 09:50', subject: 'Probability & Stats', room: 'LH-105', type: 'Lecture' },
            { time: '09:50 - 10:40', subject: 'Database Management', room: 'LH-105', type: 'Lecture' },
            { time: '14:00 - 16:00', subject: 'DBMS Lab', room: 'Lab-1', type: 'Lab' },
        ],
        'Thursday': [
            { time: '09:00 - 10:40', subject: 'Operating Systems', room: 'LH-105', type: 'Lecture' },
            { time: '11:00 - 11:50', subject: 'Computer Networks', room: 'LH-105', type: 'Lecture' },
        ],
        'Friday': [
            { time: '09:00 - 11:30', subject: 'Mini Project', room: 'Innovation Hub', type: 'Practical' },
            { time: '14:00 - 15:00', subject: 'Sports / Club', room: 'Ground', type: 'Extra-curricular' },
        ],
        'Saturday': [
             { time: '09:00 - 12:00', subject: 'Placement Training', room: 'Auditorium', type: 'Workshop' },
        ],
        'Sunday': []
    };

    const todaysClasses = studentSchedule[today] || [];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* 1. Semester Progress - Prominent at top */}
                 <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-2">Semester Progress</h3>
                        <div className="w-full bg-brand-800/50 rounded-full h-2 mb-4">
                            <div className="bg-brand-200 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <p className="text-brand-100 text-sm">You've completed 75% of this semester. Finals start in 3 weeks!</p>
                    </div>
                     <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10">
                        <CalendarIcon size={150} />
                    </div>
                </div>

                {/* 2. Quick Access Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link to="/calendar" className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-brand-200">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                <CalendarIcon size={24} />
                            </div>
                            <span className="text-xs font-semibold text-slate-400 group-hover:text-blue-500 transition-colors">View &rarr;</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Calendar</h3>
                        <p className="text-slate-500 text-sm mt-1">Exams & Events</p>
                    </Link>

                    <Link to="/reporting" className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-orange-200">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                                <AlertCircle size={24} />
                            </div>
                            <span className="text-xs font-semibold text-slate-400 group-hover:text-orange-500 transition-colors">Report &rarr;</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Issues</h3>
                        <p className="text-slate-500 text-sm mt-1">1 Pending</p>
                    </Link>

                    <Link to="/events" className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-purple-200">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                                <Trophy size={24} />
                            </div>
                            <span className="text-xs font-semibold text-slate-400 group-hover:text-purple-500 transition-colors">Events &rarr;</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Explore</h3>
                        <p className="text-slate-500 text-sm mt-1">AARAMBH Fest</p>
                    </Link>
                </div>

                {/* 3. Campus Announcements */}
                <AnnouncementsSection />
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-1 space-y-6 sticky top-6 self-start">
                
                {/* 1. Today's Classes */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-brand-600 p-4 text-white flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg">Today's Classes</h3>
                            <p className="text-brand-200 text-xs">{today}</p>
                        </div>
                        <Clock size={20} className="text-brand-200" />
                    </div>
                    
                    <div className="p-4 space-y-3">
                        {todaysClasses.length === 0 ? (
                             <div className="text-center py-6 text-slate-500">
                                <p className="text-sm">No classes today.</p>
                                <p className="text-xs text-slate-400 mt-1">Time to catch up on projects!</p>
                            </div>
                        ) : (
                            todaysClasses.map((cls: any, idx: number) => (
                                <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-brand-50 hover:border-brand-100 transition">
                                    <div className="flex flex-col items-center justify-center bg-white rounded-lg p-2 border border-slate-200 w-14 shadow-sm h-full">
                                        <span className="text-xs font-bold text-slate-700">{cls.time.split(' - ')[0]}</span>
                                        <span className="text-[10px] text-slate-400 uppercase">Start</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{cls.subject}</h4>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-500 flex items-center">
                                                <MapPin size={10} className="mr-1"/> {cls.room}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        <Link to="/timetable" className="block text-center text-xs font-bold text-brand-600 hover:text-brand-800 mt-2 py-2 border-t border-slate-50">
                            View Full Week &rarr;
                        </Link>
                    </div>
                </div>

                {/* 2. Campus AI Chat */}
                <DashboardChat />
            </div>
        </div>
    );
};

const FacultyDashboard: React.FC = () => {
    const { getPendingRequests } = useOutpass();
    const pendingRequests = getPendingRequests();

    // Mock Time Table Logic
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()]; // Get current day name
    
    const schedule: any = {
        'Monday': [
            { time: '09:00 - 10:40', subject: 'Advanced Algorithms', batch: 'CSE-3A', room: 'LH-102' },
            { time: '14:00 - 16:00', subject: 'Project Review', batch: 'CSE-4B', room: 'Lab-3' },
        ],
        'Tuesday': [
            { time: '10:40 - 11:30', subject: 'Mentoring Hour', batch: 'CSE-2C', room: 'Faculty Cabin' },
            { time: '11:30 - 13:10', subject: 'Advanced Algorithms', batch: 'CSE-3B', room: 'LH-104' },
        ],
        'Wednesday': [
            { time: '09:00 - 10:40', subject: 'Machine Learning', batch: 'AIML-3A', room: 'LH-201' },
        ],
        'Thursday': [
            { time: '14:00 - 16:00', subject: 'ML Lab', batch: 'AIML-3A', room: 'Lab-AI' },
        ],
        'Friday': [
            { time: '09:50 - 11:30', subject: 'Department Meeting', batch: 'Faculty', room: 'Conf Room' },
        ],
        'Saturday': [],
        'Sunday': []
    };

    const todaysClasses = schedule[today] || [];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
            <div className="lg:col-span-2 space-y-6">
                {/* Faculty Stats */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link to="/outpass" className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4 hover:border-indigo-300 transition group cursor-pointer">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full group-hover:scale-110 transition-transform">
                            <FileText size={24} />
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase">Pending Requests</p>
                            <p className="text-2xl font-bold text-slate-900">{pendingRequests.length}</p>
                        </div>
                    </Link>
                     <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-full">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase">Approved Today</p>
                            <p className="text-2xl font-bold text-slate-900">12</p>
                        </div>
                    </div>
                     <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
                        <div className="p-3 bg-red-50 text-red-600 rounded-full">
                            <AlertCircle size={24} />
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase">Alerts</p>
                            <p className="text-2xl font-bold text-slate-900">2</p>
                        </div>
                    </div>
                </div>

                {/* Department Updates */}
                <div className="bg-indigo-900 text-white rounded-2xl p-8 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-2">Department Updates</h2>
                        <p className="text-indigo-200 mb-6 max-w-lg">
                            The upcoming NBA accreditation visit is scheduled for next month. Please ensure all course files are updated.
                        </p>
                        <button className="bg-white text-indigo-900 px-6 py-2 rounded-xl font-bold hover:bg-indigo-50 transition">
                            View Circular
                        </button>
                    </div>
                    <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
                        <FileText size={200} />
                    </div>
                </div>

                {/* Announcement Manager (Post & List) */}
                <FacultyAnnouncementManager />
            </div>

            <div className="lg:col-span-1 space-y-6 sticky top-6 self-start">
                {/* Today's Schedule - Fast Access */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg">Today's Schedule</h3>
                            <p className="text-indigo-200 text-xs">{today}</p>
                        </div>
                        <CalendarIcon size={20} className="text-indigo-200" />
                    </div>
                    
                    <div className="p-4 space-y-3">
                        {todaysClasses.length === 0 ? (
                             <div className="text-center py-6 text-slate-500">
                                <p className="text-sm">No classes scheduled for today.</p>
                                <p className="text-xs text-slate-400 mt-1">Enjoy your day off!</p>
                            </div>
                        ) : (
                            todaysClasses.map((cls: any, idx: number) => (
                                <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-indigo-50 hover:border-indigo-100 transition">
                                    <div className="flex flex-col items-center justify-center bg-white rounded-lg p-2 border border-slate-200 w-16 shadow-sm">
                                        <span className="text-xs font-bold text-slate-700">{cls.time.split(' - ')[0]}</span>
                                        <span className="text-[10px] text-slate-400 uppercase">Start</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-800 text-sm">{cls.subject}</h4>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-500 flex items-center">
                                                <Users size={10} className="mr-1"/> {cls.batch}
                                            </span>
                                            <span className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-500 flex items-center">
                                                <MapPin size={10} className="mr-1"/> {cls.room}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                         <Link to="/timetable" className="block text-center text-xs font-bold text-indigo-600 hover:text-indigo-800 mt-2 py-2 border-t border-slate-50">
                            View Full Weekly Timetable &rarr;
                        </Link>
                    </div>
                </div>

                {/* Faculty Guidelines */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <div className="flex items-center space-x-2 mb-4 text-indigo-600">
                        <AlertCircle size={20} />
                        <h3 className="font-bold text-slate-900">Quick Actions</h3>
                    </div>
                    <div className="space-y-3">
                        <Link to="/outpass" className="block w-full py-2 px-3 bg-slate-50 hover:bg-indigo-50 rounded-lg text-sm text-slate-600 hover:text-indigo-700 font-medium transition flex items-center justify-between">
                            <span>Approve Outpasses</span>
                            <span className="bg-indigo-100 text-indigo-600 text-xs px-2 py-0.5 rounded-full">{pendingRequests.length}</span>
                        </Link>
                         <Link to="/opportunities" className="block w-full py-2 px-3 bg-slate-50 hover:bg-indigo-50 rounded-lg text-sm text-slate-600 hover:text-indigo-700 font-medium transition">
                            <span>Post Internship</span>
                        </Link>
                    </div>
                </div>

                {/* Dashboard Chat */}
                <DashboardChat />
            </div>
        </div>
    );
};