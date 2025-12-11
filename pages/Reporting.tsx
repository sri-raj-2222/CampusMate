import React, { useState } from 'react';
import { AlertTriangle, Home, Wifi, Utensils, BookOpen, CheckCircle, Clock } from 'lucide-react';
import { Report } from '../types';

export const Reporting: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('Hostel');
    const [reports, setReports] = useState<Report[]>([
        { id: '1', title: 'Wifi not working on 3rd Floor', category: 'Hostel', description: 'Signal is very weak in room 304.', status: 'Pending', date: '2024-05-10' },
        { id: '2', title: 'Projector broken in Lab A', category: 'Academic', description: 'The HDMI port seems loose.', status: 'Resolved', date: '2024-05-08' },
    ]);

    const categories = [
        { id: 'Hostel', icon: <Home size={18} />, label: 'Hostel' },
        { id: 'Academic', icon: <BookOpen size={18} />, label: 'Academic' },
        { id: 'Infrastructure', icon: <Wifi size={18} />, label: 'Infra' },
        { id: 'Mess', icon: <Utensils size={18} />, label: 'Mess/Food' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock submission
        const form = e.target as HTMLFormElement;
        const title = (form.elements.namedItem('title') as HTMLInputElement).value;
        const desc = (form.elements.namedItem('description') as HTMLTextAreaElement).value;

        const newReport: Report = {
            id: Date.now().toString(),
            title,
            category: activeCategory as any,
            description: desc,
            status: 'Pending',
            date: new Date().toISOString().split('T')[0]
        };

        setReports([newReport, ...reports]);
        form.reset();
        alert("Report submitted successfully!");
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Report an Issue</h1>
                    <p className="text-slate-500 mt-1">Found something broken? Let us know so we can fix it.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Reporting Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`
                                        flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
                                        ${activeCategory === cat.id 
                                            ? 'bg-brand-600 text-white shadow-md shadow-brand-200' 
                                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                        }
                                    `}
                                >
                                    {cat.icon}
                                    <span>{cat.label}</span>
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Issue Title</label>
                                <input 
                                    name="title" 
                                    required 
                                    type="text" 
                                    className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition" 
                                    placeholder="e.g., Leaking tap in bathroom"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea 
                                    name="description" 
                                    required 
                                    rows={4} 
                                    className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition" 
                                    placeholder="Provide more details about the location and issue..."
                                />
                            </div>
                            <div className="pt-2">
                                <button type="submit" className="w-full bg-brand-600 text-white font-medium py-2.5 rounded-xl hover:bg-brand-700 transition shadow-lg shadow-brand-200">
                                    Submit Report
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Recent Reports List */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
                            <Clock size={20} className="text-slate-400"/>
                            <span>Your Recent Reports</span>
                        </h2>
                        <div className="space-y-4">
                            {reports.map((report) => (
                                <div key={report.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-brand-100 hover:shadow-sm transition group">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-md ${report.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {report.status}
                                        </span>
                                        <span className="text-xs text-slate-400">{report.date}</span>
                                    </div>
                                    <h3 className="font-semibold text-slate-800 text-sm">{report.title}</h3>
                                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{report.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};