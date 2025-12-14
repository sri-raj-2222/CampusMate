import React, { useState } from 'react';
import { Clock, MapPin, ChevronRight, BookOpen, ChevronLeft } from 'lucide-react';
import { useEvents } from '../context/EventsContext';
import { Event } from '../types';

export const Scheduler: React.FC = () => {
    const { events } = useEvents();
    const [currentDate, setCurrentDate] = useState(new Date(2024, 4, 1)); // Start at May 2024

    // Calendar logic
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Adjust for Monday start (0 = Sun, 1 = Mon ... 6 = Sat) -> We want Mon=0
    // JS getDay(): Sun=0, Mon=1...
    // Target: Mon=0, Tue=1... Sun=6
    const startDayOffset = (firstDayOfMonth.getDay() + 6) % 7;

    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const getEventsForDay = (day: number) => {
        return events.filter(e => 
            e.date.getDate() === day && 
            e.date.getMonth() === month && 
            e.date.getFullYear() === year
        );
    };

    const getUpcomingEvents = () => {
        const now = new Date();
        now.setHours(0,0,0,0);
        return events
            .filter(e => e.date >= now)
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .slice(0, 5); // Show next 5 events
    };

    const getEventStyle = (type: Event['type']) => {
        switch (type) {
            case 'Exam': return 'bg-red-50 border-red-100 text-red-600';
            case 'Deadline': return 'bg-amber-50 border-amber-100 text-amber-600';
            case 'Campus Event': return 'bg-purple-50 border-purple-100 text-purple-600';
            default: return 'bg-blue-50 border-blue-100 text-blue-600';
        }
    };

    const getEventDotColor = (type: Event['type']) => {
        switch (type) {
            case 'Exam': return 'bg-red-400';
            case 'Deadline': return 'bg-amber-400';
            case 'Campus Event': return 'bg-purple-400';
            default: return 'bg-blue-400';
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Academic Calendar</h1>
                    <p className="text-slate-500 mt-1">
                        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })} • Exams & Deadlines
                    </p>
                </div>
                <div className="flex space-x-2">
                    <button 
                        onClick={prevMonth}
                        className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center"
                    >
                        <ChevronLeft size={16} className="mr-1" /> Previous
                    </button>
                    <button 
                        onClick={nextMonth}
                        className="px-4 py-2 text-sm font-medium text-white bg-brand-600 rounded-lg shadow-md shadow-brand-200 hover:bg-brand-700 flex items-center"
                    >
                        Next Month <ChevronRight size={16} className="ml-1" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                {/* Calendar Grid */}
                <div className="xl:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <div className="grid grid-cols-7 gap-4 mb-4">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                            <div key={d} className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider">{d}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: startDayOffset }).map((_, i) => (
                            <div key={`empty-${i}`} className="aspect-square bg-slate-50/50 rounded-xl"></div>
                        ))}
                        {daysArray.map((day) => {
                            const dayEvents = getEventsForDay(day);
                            const isToday = 
                                day === new Date().getDate() && 
                                month === new Date().getMonth() && 
                                year === new Date().getFullYear();

                            return (
                                <div key={day} className={`
                                    min-h-[100px] rounded-xl p-2 border relative transition group hover:shadow-md cursor-pointer flex flex-col justify-between
                                    ${isToday ? 'bg-brand-50 border-brand-200' : 'bg-white border-slate-100 hover:border-brand-200'}
                                `}>
                                    <span className={`text-sm font-semibold ${isToday ? 'text-brand-700' : 'text-slate-700'}`}>{day}</span>
                                    
                                    <div className="space-y-1 mt-1">
                                        {dayEvents.map((evt) => (
                                            <div key={evt.id} className={`text-[10px] px-1.5 py-0.5 rounded truncate ${getEventStyle(evt.type)}`}>
                                                {evt.title}
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {dayEvents.length > 0 && (
                                        <div className="absolute inset-0 bg-white/95 p-2 rounded-xl border border-slate-200 shadow-lg opacity-0 group-hover:opacity-100 transition flex flex-col justify-center z-20 text-center pointer-events-none">
                                            {dayEvents.map(e => (
                                                <div key={e.id} className="mb-2 last:mb-0">
                                                    <p className="text-xs font-bold text-slate-900 line-clamp-2">{e.title}</p>
                                                    <p className="text-[10px] text-slate-500">{e.time}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Upcoming List */}
                <div className="xl:col-span-1 space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Upcoming Schedule</h2>
                        <div className="space-y-4">
                            {getUpcomingEvents().length === 0 ? (
                                <p className="text-sm text-slate-500">No upcoming events.</p>
                            ) : (
                                getUpcomingEvents().map(event => (
                                    <div key={event.id} className="flex items-start space-x-4 p-3 rounded-xl bg-slate-50 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 transition">
                                        <div className="flex-shrink-0 w-12 text-center bg-white rounded-lg border border-slate-200 p-1">
                                            <div className={`text-xs font-bold uppercase ${event.type === 'Exam' ? 'text-red-500' : 'text-purple-500'}`}>
                                                {event.date.toLocaleString('default', { month: 'short' })}
                                            </div>
                                            <div className="text-lg font-bold text-slate-900">{event.date.getDate()}</div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-800 text-sm line-clamp-1">{event.title}</h4>
                                            <div className="flex items-center text-xs text-slate-500 mt-1 space-x-2">
                                                <Clock size={12} />
                                                <span>{event.time}</span>
                                            </div>
                                            {event.location && (
                                                <div className="flex items-center text-xs text-slate-400 mt-1 space-x-2">
                                                    <MapPin size={12} />
                                                    <span>{event.location}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                     <div className="bg-indigo-900 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center space-x-3 mb-4">
                            <BookOpen className="text-indigo-300" />
                            <h3 className="font-bold">Study Tip</h3>
                        </div>
                        <p className="text-sm text-indigo-100 leading-relaxed">
                            "Break your study sessions into 25-minute focused blocks followed by 5-minute breaks. It's called the Pomodoro Technique!"
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};