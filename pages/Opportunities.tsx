import React, { useState } from 'react';
import { Calendar, ExternalLink, Tag, Briefcase, Plus, Trash2, LayoutList } from 'lucide-react';
import { useOpportunities } from '../context/OpportunitiesContext';
import { useAuth } from '../context/AuthContext';
import { Opportunity } from '../types';

export const Opportunities: React.FC = () => {
    const { opportunities, addOpportunity, deleteOpportunity } = useOpportunities();
    const { user } = useAuth();
    const isFaculty = user?.role === 'faculty';

    const [filter, setFilter] = useState<'All' | 'Hackathon' | 'Internship' | 'Workshop'>('All');
    
    // Form state for Faculty
    const [isFormOpen, setIsFormOpen] = useState(true);
    const [newOpp, setNewOpp] = useState<Partial<Opportunity>>({
        title: '',
        type: 'Hackathon',
        companyOrOrg: '',
        date: '',
        tags: '',
        link: '#'
    });

    const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newOpp.title || !newOpp.companyOrOrg) return;

        const tagsArray = typeof newOpp.tags === 'string' 
            ? newOpp.tags.split(',').map(t => t.trim()).filter(t => t.length > 0)
            : [];

        const opp: Opportunity = {
            id: Date.now().toString(),
            title: newOpp.title || '',
            type: newOpp.type as 'Hackathon' | 'Internship' | 'Workshop',
            companyOrOrg: newOpp.companyOrOrg || '',
            date: newOpp.date || 'TBD',
            tags: tagsArray.length > 0 ? tagsArray : ['General'],
            link: newOpp.link || '#'
        };

        addOpportunity(opp);
        setNewOpp({
            title: '',
            type: 'Hackathon',
            companyOrOrg: '',
            date: '',
            tags: '',
            link: '#'
        });
        alert('Opportunity posted successfully!');
    };

    const filteredOpps = filter === 'All' ? opportunities : opportunities.filter(o => o.type === filter);
    
    // Updated faculty input class to use indigo theme
    const facultyInputClass = "w-full px-4 py-2 rounded-xl border border-indigo-200 bg-indigo-50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm text-indigo-900 placeholder-indigo-300";

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        {isFaculty ? 'Manage Opportunities' : 'Opportunities'}
                    </h1>
                    <p className="text-slate-500 mt-1">
                        {isFaculty 
                            ? 'Post new hackathons, internships, or workshops for students.' 
                            : 'Discover hackathons, internships, and workshops.'}
                    </p>
                </div>
                
                {!isFaculty && (
                    <div className="flex items-center space-x-2 bg-white p-1 rounded-xl border border-slate-200 overflow-x-auto max-w-full">
                        {['All', 'Hackathon', 'Internship', 'Workshop'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f as any)}
                                className={`
                                    px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                                    ${filter === f 
                                        ? 'bg-brand-100 text-brand-700' 
                                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                    }
                                `}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {isFaculty && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <Plus size={20} className="text-indigo-600"/>
                            Post New Opportunity
                        </h2>
                        <button 
                            onClick={() => setIsFormOpen(!isFormOpen)}
                            className="text-sm text-slate-500 hover:text-indigo-600 font-medium"
                        >
                            {isFormOpen ? 'Hide Form' : 'Show Form'}
                        </button>
                    </div>
                    
                    {isFormOpen && (
                        <div className="p-6">
                            <form onSubmit={handleAddSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                                        <input 
                                            required
                                            type="text" 
                                            className={facultyInputClass}
                                            placeholder="e.g. Summer Code Sprint"
                                            value={newOpp.title}
                                            onChange={e => setNewOpp({...newOpp, title: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Company / Organization</label>
                                        <input 
                                            required
                                            type="text" 
                                            className={facultyInputClass}
                                            placeholder="e.g. TechCorp or University Club"
                                            value={newOpp.companyOrOrg}
                                            onChange={e => setNewOpp({...newOpp, companyOrOrg: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                                        <select 
                                            className={facultyInputClass}
                                            value={newOpp.type}
                                            onChange={e => setNewOpp({...newOpp, type: e.target.value as any})}
                                        >
                                            <option value="Hackathon">Hackathon</option>
                                            <option value="Internship">Internship</option>
                                            <option value="Workshop">Workshop</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Date / Deadline</label>
                                        <input 
                                            required
                                            type="text" 
                                            className={facultyInputClass}
                                            placeholder="e.g. June 15th or Apply by May 30"
                                            value={newOpp.date}
                                            onChange={e => setNewOpp({...newOpp, date: e.target.value})}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Tags (comma separated)</label>
                                        <input 
                                            type="text" 
                                            className={facultyInputClass}
                                            placeholder="e.g. AI, Remote, Paid, Java"
                                            value={newOpp.tags as string}
                                            onChange={e => setNewOpp({...newOpp, tags: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="pt-2 flex justify-end">
                                    <button 
                                        type="submit" 
                                        className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 shadow-md transition"
                                    >
                                        Post Opportunity
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            )}

            {isFaculty && (
                <div className="flex items-center space-x-2 mb-4">
                    <LayoutList size={20} className="text-slate-500" />
                    <h2 className="text-xl font-bold text-slate-900">Active Listings</h2>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOpps.map((opp) => (
                    <div key={opp.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-brand-200 transition duration-300 flex flex-col h-full group relative">
                        <div className="p-6 flex-1">
                            <div className="flex justify-between items-start mb-4">
                                <span className={`
                                    px-3 py-1 rounded-full text-xs font-semibold
                                    ${opp.type === 'Hackathon' ? 'bg-purple-100 text-purple-700' : 
                                      opp.type === 'Internship' ? 'bg-blue-100 text-blue-700' : 
                                      opp.type === 'Workshop' ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'}
                                `}>
                                    {opp.type}
                                </span>
                                {isFaculty ? (
                                    <button 
                                        onClick={() => {
                                            if(window.confirm('Are you sure you want to delete this listing?')) {
                                                deleteOpportunity(opp.id);
                                            }
                                        }}
                                        className="text-slate-300 hover:text-red-500 transition"
                                        title="Delete Listing"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                ) : (
                                    <ExternalLink size={18} className="text-slate-300 group-hover:text-brand-500 transition" />
                                )}
                            </div>
                            
                            <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-brand-600 transition">{opp.title}</h3>
                            <p className="text-slate-500 text-sm font-medium mb-4">{opp.companyOrOrg}</p>
                            
                            <div className="flex items-center text-slate-500 text-sm mb-4">
                                <Calendar size={16} className="mr-2 text-slate-400" />
                                {opp.date}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {opp.tags.map((tag, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-slate-50 border border-slate-100 rounded text-xs text-slate-600">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="p-4 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
                            <button className={`w-full py-2 text-sm font-medium hover:bg-white hover:shadow-sm rounded-lg transition-all ${isFaculty ? 'text-indigo-600' : 'text-brand-600'}`}>
                                {isFaculty ? 'Edit Details' : 'View Details'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {filteredOpps.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                    <p>No opportunities found.</p>
                </div>
            )}
        </div>
    );
};