import React from 'react';
import { Clock, MapPin, Users, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const TimeTable: React.FC = () => {
    const { user } = useAuth();
    const isFaculty = user?.role === 'faculty';
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Faculty Schedule Data
    const facultySchedule = {
        'Monday': [
            { time: '09:00 - 10:40', subject: 'Advanced Algorithms', batch: 'CSE-3A', room: 'LH-102', type: 'Lecture' },
            { time: '14:00 - 16:00', subject: 'Project Review', batch: 'CSE-4B', room: 'Lab-3', type: 'Lab' },
        ],
        'Tuesday': [
            { time: '10:40 - 11:30', subject: 'Mentoring Hour', batch: 'CSE-2C', room: 'Faculty Cabin', type: 'Mentoring' },
            { time: '11:30 - 13:10', subject: 'Advanced Algorithms', batch: 'CSE-3B', room: 'LH-104', type: 'Lecture' },
        ],
        'Wednesday': [
            { time: '09:00 - 10:40', subject: 'Machine Learning', batch: 'AIML-3A', room: 'LH-201', type: 'Lecture' },
        ],
        'Thursday': [
            { time: '14:00 - 16:00', subject: 'ML Lab', batch: 'AIML-3A', room: 'Lab-AI', type: 'Lab' },
        ],
        'Friday': [
            { time: '09:50 - 11:30', subject: 'Department Meeting', batch: 'Faculty', room: 'Conf Room', type: 'Meeting' },
        ],
        'Saturday': []
    };

    // Student Schedule Data
    const studentSchedule = {
        'Monday': [
            { time: '09:00 - 09:50', subject: 'Database Management', room: 'LH-105', type: 'Lecture', faculty: 'Dr. Smith' },
            { time: '09:50 - 10:40', subject: 'Operating Systems', room: 'LH-105', type: 'Lecture', faculty: 'Prof. Jones' },
            { time: '11:00 - 12:40', subject: 'Web Technologies Lab', room: 'Lab-2', type: 'Lab', faculty: 'Ms. Davis' },
        ],
        'Tuesday': [
            { time: '09:00 - 10:40', subject: 'Computer Networks', room: 'LH-105', type: 'Lecture', faculty: 'Mr. Wilson' },
            { time: '11:00 - 11:50', subject: 'Soft Skills', room: 'LH-105', type: 'Lecture', faculty: 'Mrs. Brown' },
            { time: '14:00 - 16:00', subject: 'Library Hour', room: 'Library', type: 'Self Study', faculty: '-' },
        ],
        'Wednesday': [
            { time: '09:00 - 09:50', subject: 'Probability & Stats', room: 'LH-105', type: 'Lecture', faculty: 'Dr. Mathur' },
            { time: '09:50 - 10:40', subject: 'Database Management', room: 'LH-105', type: 'Lecture', faculty: 'Dr. Smith' },
            { time: '14:00 - 16:00', subject: 'DBMS Lab', room: 'Lab-1', type: 'Lab', faculty: 'Dr. Smith' },
        ],
        'Thursday': [
            { time: '09:00 - 10:40', subject: 'Operating Systems', room: 'LH-105', type: 'Lecture', faculty: 'Prof. Jones' },
            { time: '11:00 - 11:50', subject: 'Computer Networks', room: 'LH-105', type: 'Lecture', faculty: 'Mr. Wilson' },
        ],
        'Friday': [
            { time: '09:00 - 11:30', subject: 'Mini Project', room: 'Innovation Hub', type: 'Practical', faculty: 'Various' },
            { time: '14:00 - 15:00', subject: 'Sports / Club', room: 'Ground', type: 'Extra-curricular', faculty: '-' },
        ],
        'Saturday': [
             { time: '09:00 - 12:00', subject: 'Placement Training', room: 'Auditorium', type: 'Workshop', faculty: 'External' },
        ]
    };

    const schedule = isFaculty ? facultySchedule : studentSchedule;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Weekly Time Table</h1>
                <p className="text-slate-500 mt-1">
                    {isFaculty ? "Your class schedule and teaching hours." : "Your academic schedule for this semester."}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {days.map(day => (
                    <div key={day} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
                        <div className={`${isFaculty ? 'bg-indigo-50 border-indigo-100 text-indigo-900' : 'bg-brand-50 border-brand-100 text-brand-900'} px-6 py-3 border-b flex justify-between items-center`}>
                            <h3 className="font-bold">{day}</h3>
                            <span className={`text-xs font-semibold bg-white px-2 py-1 rounded-lg border ${isFaculty ? 'text-indigo-600 border-indigo-100' : 'text-brand-600 border-brand-100'}`}>
                                {schedule[day as keyof typeof schedule].length} Sessions
                            </span>
                        </div>
                        <div className="p-4 space-y-4 flex-1">
                            {schedule[day as keyof typeof schedule].length === 0 ? (
                                <div className="h-full flex items-center justify-center text-slate-400 text-sm py-8 italic">
                                    No classes scheduled
                                </div>
                            ) : (
                                schedule[day as keyof typeof schedule].map((slot: any, idx: number) => (
                                    <div key={idx} className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                                        <div className="flex-shrink-0 w-16 flex flex-col items-center justify-center bg-slate-100 rounded-lg p-2 h-fit">
                                            <span className="text-xs font-bold text-slate-600">{slot.time.split(' - ')[0]}</span>
                                            <span className="text-[10px] text-slate-400">Start</span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-slate-800 text-sm">{slot.subject}</h4>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {isFaculty ? (
                                                     <div className="flex items-center text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">
                                                        <Users size={12} className="mr-1" />
                                                        {slot.batch}
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">
                                                        <BookOpen size={12} className="mr-1" />
                                                        {slot.faculty}
                                                    </div>
                                                )}
                                                <div className="flex items-center text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">
                                                    <MapPin size={12} className="mr-1" />
                                                    {slot.room}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};