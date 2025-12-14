import React from 'react';
import { Calendar, MapPin, Music, Users, Trophy, BookOpen, Check } from 'lucide-react';
import { CampusEvent } from '../types';
import { useEvents } from '../context/EventsContext';
import { useNavigate } from 'react-router-dom';

export const CampusEvents: React.FC = () => {
    const { addEvent, isEventAdded } = useEvents();
    const navigate = useNavigate();

    const events: CampusEvent[] = [
        {
            id: 'ev1',
            title: 'Annual Cultural Fest: AARAMBH',
            category: 'Cultural',
            date: 'August 20, 2024',
            time: '5:00 PM onwards',
            location: 'Main Auditorium',
            description: 'Join us for a night of music, dance, and drama as we welcome the freshers batch!'
        },
        {
            id: 'ev2',
            title: 'Inter-Department Cricket Finals',
            category: 'Sports',
            date: 'August 25, 2024',
            time: '9:00 AM',
            location: 'University Ground',
            description: 'CSE vs ECE. Come support your department in the grand finale of the Chancellor\'s Trophy.'
        },
        {
            id: 'ev3',
            title: 'Guest Lecture: Future of AI',
            category: 'Academic',
            date: 'August 28, 2024',
            time: '2:00 PM',
            location: 'Seminar Hall 2',
            description: 'Dr. S. Rao from Tech Institute will speak about Generative AI and its impact on jobs.'
        },
        {
            id: 'ev4',
            title: 'Music Club Jam Session',
            category: 'Club',
            date: 'June 02, 2024', // Changed date to be sooner for demo purposes
            time: '6:00 PM',
            location: 'Amphitheater',
            description: 'Open mic for all students. Bring your instruments or just your voice.'
        }
    ];

    const getIcon = (category: string) => {
        switch (category) {
            case 'Cultural': return <Music size={20} />;
            case 'Sports': return <Trophy size={20} />;
            case 'Academic': return <BookOpen size={20} />;
            case 'Club': return <Users size={20} />;
            default: return <Calendar size={20} />;
        }
    };

    const getColor = (category: string) => {
        switch (category) {
            case 'Cultural': return 'bg-purple-100 text-purple-700';
            case 'Sports': return 'bg-green-100 text-green-700';
            case 'Academic': return 'bg-blue-100 text-blue-700';
            case 'Club': return 'bg-pink-100 text-pink-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    const handleAddToCalendar = (event: CampusEvent) => {
        // Parse date string (simple parsing for the format "Month DD, YYYY")
        // Note: In a real app, use a library like date-fns
        const dateObj = new Date(event.date);

        addEvent({
            id: event.id,
            title: event.title,
            type: 'Campus Event',
            date: dateObj,
            time: event.time,
            location: event.location
        });

        // Optional: Navigate to calendar or show toast. 
        // For now, the button state change handles feedback.
    };

    return (
        <div className="space-y-8">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Campus Events</h1>
                    <p className="text-slate-500 mt-1">Don't miss out on what's happening around campus.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => {
                    const isAdded = isEventAdded(event.id);

                    return (
                        <div key={event.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-2 rounded-lg ${getColor(event.category)}`}>
                                        {getIcon(event.category)}
                                    </div>
                                    <div className="text-center bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                                        <span className="block text-xs font-bold text-slate-400 uppercase">
                                            {event.date.split(',')[0]}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                                    {event.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                                    {event.description}
                                </p>

                                <div className="flex flex-col space-y-2 text-sm text-slate-600 border-t border-slate-100 pt-4">
                                    <div className="flex items-center space-x-2">
                                        <Calendar size={16} className="text-slate-400" />
                                        <span>{event.date} • {event.time}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <MapPin size={16} className="text-slate-400" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                            </div>
                             <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                                <span className={`text-xs font-semibold px-2 py-1 rounded ${getColor(event.category)} bg-opacity-50`}>
                                    {event.category}
                                </span>
                                <button 
                                    onClick={() => handleAddToCalendar(event)}
                                    disabled={isAdded}
                                    className={`
                                        text-sm font-medium transition flex items-center space-x-1
                                        ${isAdded ? 'text-green-600 cursor-default' : 'text-brand-600 hover:text-brand-700'}
                                    `}
                                >
                                    {isAdded ? (
                                        <>
                                            <Check size={16} />
                                            <span>Added</span>
                                        </>
                                    ) : (
                                        <span>Add to Calendar</span>
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};