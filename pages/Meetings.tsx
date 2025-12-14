import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Plus, Video } from 'lucide-react';

export const Meetings: React.FC = () => {
    const [meetings, setMeetings] = useState([
        { id: 1, title: 'Department Monthly Review', date: '2024-05-20', time: '10:00 AM', location: 'Conference Room A', participants: 'All Faculty', type: 'Offline' },
        { id: 2, title: 'Student Project Guidance', date: '2024-05-21', time: '02:00 PM', location: 'Google Meet', participants: 'Final Year Students', type: 'Online' },
    ]);

    return (
        <div className="space-y-8">
             <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Scheduled Meetings</h1>
                    <p className="text-slate-500 mt-1">Manage your upcoming appointments and department meetings.</p>
                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                    <Plus size={20} />
                    Schedule New
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {meetings.map(meeting => (
                    <div key={meeting.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 hover:shadow-md transition group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${meeting.type === 'Online' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                                {meeting.type === 'Online' ? <Video size={24} /> : <Users size={24} />}
                            </div>
                            <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
                                {meeting.type}
                            </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition">{meeting.title}</h3>
                        
                        <div className="space-y-3 mt-4">
                            <div className="flex items-center text-slate-600 text-sm">
                                <Calendar size={18} className="mr-3 text-slate-400" />
                                {meeting.date}
                            </div>
                            <div className="flex items-center text-slate-600 text-sm">
                                <Clock size={18} className="mr-3 text-slate-400" />
                                {meeting.time}
                            </div>
                            <div className="flex items-center text-slate-600 text-sm">
                                <MapPin size={18} className="mr-3 text-slate-400" />
                                {meeting.location}
                            </div>
                            <div className="flex items-center text-slate-600 text-sm">
                                <Users size={18} className="mr-3 text-slate-400" />
                                {meeting.participants}
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-100 flex gap-3">
                            <button className="flex-1 py-2 text-sm font-bold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition">
                                View Details
                            </button>
                            {meeting.type === 'Online' && (
                                <button className="flex-1 py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">
                                    Join Link
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};