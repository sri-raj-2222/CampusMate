import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Book, Hash, Award, Edit2, Save, X, GraduationCap, MapPin, ScanLine, Briefcase, BadgeCheck } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { UserProfile } from '../types';
import Barcode from 'react-barcode';
import { useAuth } from '../context/AuthContext';

export const Profile: React.FC = () => {
    const { user, updateUser } = useProfile();
    const { user: authUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<UserProfile>(user);

    const isFaculty = authUser?.role === 'faculty';

    // Sync form data if user changes elsewhere (unlikely but good practice)
    useEffect(() => {
        setFormData(user);
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        updateUser(formData);
        setIsEditing(false);
        // Optional: Add a toast notification here
        alert("Profile updated successfully!");
    };

    const handleCancel = () => {
        setFormData(user);
        setIsEditing(false);
    };

    const inputClassName = isFaculty && isEditing
        ? "w-full px-4 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-indigo-900"
        : "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-slate-800";

    const InputField = ({ 
        label, 
        name, 
        value, 
        icon: Icon, 
        type = "text",
        disabled = false
    }: { 
        label: string, 
        name: keyof UserProfile, 
        value: string | undefined, 
        icon: any,
        type?: string,
        disabled?: boolean 
    }) => (
        <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-500 flex items-center gap-2">
                <Icon size={14} />
                {label}
            </label>
            {isEditing && !disabled ? (
                <input
                    type={type}
                    name={name}
                    value={value || ''}
                    onChange={handleChange}
                    className={inputClassName}
                />
            ) : (
                <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-transparent text-slate-800 font-medium min-h-[46px] flex items-center">
                    {value || '-'}
                </div>
            )}
        </div>
    );

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
                    <p className="text-slate-500 mt-1">Manage your personal and professional information.</p>
                </div>
                <div className="flex gap-3">
                    {isEditing ? (
                        <>
                            <button 
                                onClick={handleCancel}
                                className="px-4 py-2 rounded-xl text-slate-600 font-medium bg-white border border-slate-200 hover:bg-slate-50 transition flex items-center gap-2"
                            >
                                <X size={18} />
                                Cancel
                            </button>
                            <button 
                                onClick={handleSave}
                                className="px-6 py-2 rounded-xl text-white font-medium bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200 transition flex items-center gap-2"
                            >
                                <Save size={18} />
                                Confirm Changes
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={() => setIsEditing(true)}
                            className={`px-6 py-2 rounded-xl text-white font-medium shadow-lg transition flex items-center gap-2 ${isFaculty ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' : 'bg-brand-600 hover:bg-brand-700 shadow-brand-200'}`}
                        >
                            <Edit2 size={18} />
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card / Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                        <div className={`w-32 h-32 bg-gradient-to-br ${isFaculty ? 'from-indigo-500 to-purple-600' : 'from-brand-400 to-indigo-500'} rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-xl border-4 border-white`}>
                            {formData.name.charAt(0)}
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">{formData.name}</h2>
                        <p className="text-slate-500 font-medium">
                            {isFaculty ? formData.designation : formData.rollNumber}
                        </p>
                        
                        {!isFaculty && (
                            <div className="mt-6 w-full pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
                                <div className="text-center p-2 rounded-lg bg-slate-50">
                                    <p className="text-xs text-slate-400 uppercase font-bold">CGPA</p>
                                    <p className="text-xl font-bold text-brand-600">{formData.cgpa}</p>
                                </div>
                                <div className="text-center p-2 rounded-lg bg-slate-50">
                                    <p className="text-xs text-slate-400 uppercase font-bold">Sem</p>
                                    <p className="text-xl font-bold text-brand-600">{formData.semester?.split(' ')[0]}</p>
                                </div>
                            </div>
                        )}

                        {/* Barcode Section for Students */}
                        {!isFaculty && formData.rollNumber && (
                            <div className="mt-6 pt-6 border-t border-slate-100 w-full flex flex-col items-center">
                                <div className="flex items-center gap-2 mb-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                    <ScanLine size={14} />
                                    <span>Student ID Barcode</span>
                                </div>
                                <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-inner">
                                    <Barcode 
                                        value={formData.rollNumber} 
                                        width={1.5}
                                        height={50}
                                        fontSize={14}
                                        background="transparent"
                                    />
                                </div>
                            </div>
                        )}

                        {/* ID Badge for Faculty */}
                        {isFaculty && (
                             <div className="mt-6 pt-6 border-t border-slate-100 w-full flex flex-col items-center">
                                <div className="flex items-center gap-2 mb-2 text-indigo-500 text-xs font-bold uppercase tracking-wider">
                                    <BadgeCheck size={14} />
                                    <span>Verified Faculty</span>
                                </div>
                                <div className="bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100 text-indigo-700 font-mono font-bold text-sm">
                                    {formData.employeeId}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Book size={20} className={isFaculty ? "text-indigo-500" : "text-brand-500"} />
                            Bio
                        </h3>
                         {isEditing ? (
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows={5}
                                className={isFaculty 
                                    ? "w-full px-4 py-3 rounded-xl border border-indigo-200 bg-indigo-50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-indigo-900 leading-relaxed resize-none"
                                    : "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-slate-700 leading-relaxed resize-none"
                                }
                            />
                        ) : (
                            <p className="text-slate-600 leading-relaxed text-sm">
                                {formData.bio}
                            </p>
                        )}
                    </div>
                </div>

                {/* Details Form */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Personal Details Section */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100 flex items-center gap-2">
                            <User className={isFaculty ? "text-indigo-600" : "text-brand-600"} />
                            Personal Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField 
                                label="Full Name" 
                                name="name" 
                                value={formData.name} 
                                icon={User} 
                            />
                            {isFaculty ? (
                                <InputField 
                                    label="Employee ID" 
                                    name="employeeId" 
                                    value={formData.employeeId} 
                                    icon={Hash}
                                />
                            ) : (
                                <InputField 
                                    label="Roll Number" 
                                    name="rollNumber" 
                                    value={formData.rollNumber} 
                                    icon={Hash}
                                />
                            )}
                            <InputField 
                                label="Email Address" 
                                name="email" 
                                value={formData.email} 
                                icon={Mail}
                                type="email"
                            />
                            <InputField 
                                label="Mobile Number" 
                                name="phone" 
                                value={formData.phone} 
                                icon={Phone}
                                type="tel"
                            />
                        </div>
                    </div>

                    {/* Academic / Professional Details Section */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100 flex items-center gap-2">
                            {isFaculty ? <Briefcase className="text-indigo-600" /> : <GraduationCap className="text-brand-600" />}
                            {isFaculty ? 'Professional Details' : 'Academic Details'}
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <InputField 
                                    label={isFaculty ? "Department" : "Branch / Department"} 
                                    name={isFaculty ? "department" : "branch"} 
                                    value={isFaculty ? formData.department : formData.branch} 
                                    icon={Book} 
                                />
                            </div>
                            
                            {isFaculty ? (
                                <InputField 
                                    label="Designation" 
                                    name="designation" 
                                    value={formData.designation} 
                                    icon={Award} 
                                />
                            ) : (
                                <>
                                    <InputField 
                                        label="Semester" 
                                        name="semester" 
                                        value={formData.semester} 
                                        icon={Award} 
                                    />
                                    <InputField 
                                        label="Section" 
                                        name="section" 
                                        value={formData.section} 
                                        icon={MapPin} 
                                    />
                                    <InputField 
                                        label="Current CGPA" 
                                        name="cgpa" 
                                        value={formData.cgpa} 
                                        icon={Award} 
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};