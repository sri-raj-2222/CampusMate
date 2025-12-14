import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, AlertTriangle, Calendar, Briefcase, Menu, X, GraduationCap, Utensils, Music, User, LogOut, PlusCircle, Clock, Video, Ticket } from 'lucide-react';
import { ChatBot } from './ChatBot';
import { useAuth } from '../context/AuthContext';

export const Layout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isFaculty = user?.role === 'faculty';

    // Base items common to all
    const baseNavItems = [
        { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/profile', label: 'My Profile', icon: <User size={20} /> },
        { path: '/timetable', label: 'Time Table', icon: <Clock size={20} /> },
        { path: '/outpass', label: 'Outpass', icon: <Ticket size={20} /> },
        { path: '/calendar', label: 'Academic Calendar', icon: <Calendar size={20} /> },
        { path: '/events', label: 'Campus Events', icon: <Music size={20} /> },
        { path: '/menu', label: 'Hostel Food Menu', icon: <Utensils size={20} /> },
    ];

    // Role specific items
    let navItems = [...baseNavItems];

    if (isFaculty) {
        // Faculty: Meetings, "Opportunities" becomes "Post Updates"
        navItems.splice(3, 0, { path: '/meetings', label: 'Meetings', icon: <Video size={20} /> });
        navItems.push({ path: '/opportunities', label: 'Post Updates', icon: <PlusCircle size={20} /> });
    } else {
        // Student: Has Reporting and standard Opportunities
        navItems.push({ path: '/reporting', label: 'Report Issues', icon: <AlertTriangle size={20} /> });
        navItems.push({ path: '/opportunities', label: 'Opportunities', icon: <Briefcase size={20} /> });
    }

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside 
                className={`
                    fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 shadow-xl lg:shadow-none transform transition-transform duration-300 ease-in-out flex flex-col
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                <div className="p-6 flex items-center justify-between lg:justify-center border-b border-slate-100">
                    <div className={`flex items-center space-x-2 ${isFaculty ? 'text-indigo-600' : 'text-brand-600'}`}>
                        <GraduationCap size={32} />
                        <span className="text-2xl font-bold tracking-tight">CampusMate</span>
                    </div>
                    <button onClick={toggleSidebar} className="lg:hidden text-slate-500 hover:text-slate-800">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsSidebarOpen(false)}
                            className={({ isActive }) => `
                                flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                                ${isActive 
                                    ? isFaculty 
                                        ? 'bg-indigo-50 text-indigo-700 font-medium shadow-sm ring-1 ring-indigo-100' 
                                        : 'bg-brand-50 text-brand-700 font-medium shadow-sm ring-1 ring-brand-100'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }
                            `}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* User & Logout Section */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <div className="flex items-center space-x-2 overflow-hidden">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${isFaculty ? 'bg-indigo-100 text-indigo-700' : 'bg-brand-100 text-brand-700'}`}>
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-slate-800 truncate">{user?.name}</p>
                                <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                            </div>
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors text-sm font-medium border border-transparent hover:border-red-100"
                    >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between">
                    <div className={`flex items-center space-x-2 font-bold ${isFaculty ? 'text-indigo-600' : 'text-brand-600'}`}>
                        <GraduationCap size={24} />
                        <span>CampusMate</span>
                    </div>
                    <button onClick={toggleSidebar} className="text-slate-600">
                        <Menu size={24} />
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
                    <div className="max-w-6xl mx-auto w-full">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Global ChatBot */}
            <ChatBot />
        </div>
    );
};