import React, { useState } from 'react';
import { Coffee, Sun, Moon, Utensils, Clock, ChevronRight } from 'lucide-react';
import { DailyMenu } from '../types';

export const HostelMenu: React.FC = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [selectedDay, setSelectedDay] = useState<string>('Monday');

    // Mock Menu Data
    const menuData: Record<string, DailyMenu> = {
        'Monday': {
            day: 'Monday',
            meals: [
                { meal: 'Breakfast', time: '7:30 AM - 9:00 AM', items: 'Idli, Sambar, Chutney, Coffee/Tea', icon: <Coffee size={24} /> },
                { meal: 'Lunch', time: '12:30 PM - 2:00 PM', items: 'Rice, Dal Fry, Mixed Veg Curry, Curd, Pickle', icon: <Sun size={24} /> },
                { meal: 'Snacks', time: '4:30 PM - 5:30 PM', items: 'Samosa, Tea', icon: <Utensils size={24} /> },
                { meal: 'Dinner', time: '7:30 PM - 9:00 PM', items: 'Chapati, Potato Kurma, Rice, Rasam', icon: <Moon size={24} /> },
            ]
        },
        'Tuesday': {
            day: 'Tuesday',
            meals: [
                { meal: 'Breakfast', time: '7:30 AM - 9:00 AM', items: 'Puri, Potato Masala, Coffee/Tea', icon: <Coffee size={24} /> },
                { meal: 'Lunch', time: '12:30 PM - 2:00 PM', items: 'Lemon Rice, Sambar, Potato Fry, Curd', icon: <Sun size={24} /> },
                { meal: 'Snacks', time: '4:30 PM - 5:30 PM', items: 'Biscuits, Coffee', icon: <Utensils size={24} /> },
                { meal: 'Dinner', time: '7:30 PM - 9:00 PM', items: 'Rice, Egg Curry (or Paneer Butter Masala), Dal', icon: <Moon size={24} /> },
            ]
        },
        // Fallback for other days just to populate the UI
        'Wednesday': { day: 'Wednesday', meals: [{ meal: 'Breakfast', time: '7:30 - 9:00', items: 'Upma', icon: <Coffee /> }, { meal: 'Lunch', time: '12:30 - 2:00', items: 'Veg Biryani', icon: <Sun /> }, { meal: 'Snacks', time: '4:30 - 5:30', items: 'Bajji', icon: <Utensils /> }, { meal: 'Dinner', time: '7:30 - 9:00', items: 'Dosa', icon: <Moon /> }] },
        'Thursday': { day: 'Thursday', meals: [{ meal: 'Breakfast', time: '7:30 - 9:00', items: 'Pongal', icon: <Coffee /> }, { meal: 'Lunch', time: '12:30 - 2:00', items: 'Rice, Sambhar', icon: <Sun /> }, { meal: 'Snacks', time: '4:30 - 5:30', items: 'Cake', icon: <Utensils /> }, { meal: 'Dinner', time: '7:30 - 9:00', items: 'Chapati, Dal', icon: <Moon /> }] },
        'Friday': { day: 'Friday', meals: [{ meal: 'Breakfast', time: '7:30 - 9:00', items: 'Vada', icon: <Coffee /> }, { meal: 'Lunch', time: '12:30 - 2:00', items: 'Full Meals', icon: <Sun /> }, { meal: 'Snacks', time: '4:30 - 5:30', items: 'Puffs', icon: <Utensils /> }, { meal: 'Dinner', time: '7:30 - 9:00', items: 'Fried Rice', icon: <Moon /> }] },
        'Saturday': { day: 'Saturday', meals: [{ meal: 'Breakfast', time: '7:30 - 9:00', items: 'Dosa', icon: <Coffee /> }, { meal: 'Lunch', time: '12:30 - 2:00', items: 'Rice, Dal', icon: <Sun /> }, { meal: 'Snacks', time: '4:30 - 5:30', items: 'Corn', icon: <Utensils /> }, { meal: 'Dinner', time: '7:30 - 9:00', items: 'Chapati', icon: <Moon /> }] },
        'Sunday': { day: 'Sunday', meals: [{ meal: 'Breakfast', time: '8:00 - 9:30', items: 'Masala Dosa', icon: <Coffee /> }, { meal: 'Lunch', time: '12:30 - 2:30', items: 'Chicken Biryani / Veg Pulao', icon: <Sun /> }, { meal: 'Snacks', time: '4:30 - 5:30', items: 'Fruit Salad', icon: <Utensils /> }, { meal: 'Dinner', time: '7:30 - 9:00', items: 'Rice, Rasam', icon: <Moon /> }] },
    };

    const currentMenu = menuData[selectedDay] || menuData['Monday'];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Hostel Mess Menu</h1>
                    <p className="text-slate-500 mt-1">Check what's cooking today.</p>
                </div>
            </div>

            {/* Days Navigation */}
            <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto scrollbar-hide">
                <div className="flex space-x-2 min-w-max">
                    {days.map((day) => (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`
                                px-6 py-3 rounded-xl text-sm font-semibold transition-all
                                ${selectedDay === day 
                                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-200 scale-105' 
                                    : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                                }
                            `}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentMenu.meals.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group border-l-4 border-l-brand-400">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-brand-50 text-brand-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <div className="flex items-center text-xs text-slate-400 font-medium bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                <Clock size={12} className="mr-1.5" />
                                {item.time}
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">{item.meal}</h3>
                        <p className="text-slate-600 font-medium leading-relaxed">
                            {item.items}
                        </p>
                    </div>
                ))}
            </div>

            {/* Notice Section */}
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 flex items-start space-x-4">
                <div className="bg-orange-100 p-2 rounded-full text-orange-600 mt-1">
                    <Utensils size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-orange-800">Mess Committee Notice</h4>
                    <p className="text-sm text-orange-700 mt-1">
                        Please submit your feedback for next month's menu by the 25th of this month via the Reporting section.
                        Sunday dinner timings are extended by 30 minutes.
                    </p>
                </div>
            </div>
        </div>
    );
};