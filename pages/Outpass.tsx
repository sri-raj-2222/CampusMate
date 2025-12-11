import React, { useState } from 'react';
import { Ticket, Calendar, Clock, CheckCircle, XCircle, FileText, Download, Filter, Search } from 'lucide-react';
import { useOutpass } from '../context/OutpassContext';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';

export const Outpass: React.FC = () => {
    const { user: authUser } = useAuth();
    const isFaculty = authUser?.role === 'faculty';

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Outpass Management</h1>
                    <p className="text-slate-500 mt-1">
                        {isFaculty 
                            ? 'Review and manage student gate pass requests.' 
                            : 'Request permission to leave campus and view history.'}
                    </p>
                </div>
            </div>

            {isFaculty ? <FacultyOutpassView /> : <StudentOutpassView />}
        </div>
    );
};

const StudentOutpassView: React.FC = () => {
    const { createRequest, getMyRequests } = useOutpass();
    const { user } = useProfile();
    const myRequests = getMyRequests(user.rollNumber || '');
    
    const [isRequesting, setIsRequesting] = useState(false);
    const [requestData, setRequestData] = useState({
        type: 'Home' as 'Home' | 'City' | 'Emergency',
        reason: '',
        fromDate: '',
        toDate: ''
    });

    const handleRequestSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createRequest({
            studentName: user.name,
            studentId: user.rollNumber || 'UNKNOWN',
            ...requestData
        });
        setIsRequesting(false);
        setRequestData({ type: 'Home', reason: '', fromDate: '', toDate: '' });
        alert('Outpass request submitted successfully!');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Request Form Section */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-6">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 bg-brand-50 text-brand-600 rounded-lg">
                            <Ticket size={24} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900">New Request</h2>
                    </div>

                    {!isRequesting ? (
                         <div className="text-center py-8">
                            <p className="text-slate-500 mb-6">Need to leave campus?</p>
                            <button 
                                onClick={() => setIsRequesting(true)}
                                className="w-full py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 shadow-lg shadow-brand-200 transition flex items-center justify-center space-x-2"
                            >
                                <FileText size={20} />
                                <span>Apply for Outpass</span>
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleRequestSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Outpass Type</label>
                                <select 
                                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500/20 outline-none transition"
                                    value={requestData.type}
                                    onChange={e => setRequestData({...requestData, type: e.target.value as any})}
                                >
                                    <option>Home</option>
                                    <option>City</option>
                                    <option>Emergency</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">From Date</label>
                                    <input 
                                        type="date" 
                                        required
                                        className="w-full p-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500/20 outline-none transition"
                                        value={requestData.fromDate}
                                        onChange={e => setRequestData({...requestData, fromDate: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">To Date</label>
                                    <input 
                                        type="date" 
                                        required
                                        className="w-full p-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500/20 outline-none transition"
                                        value={requestData.toDate}
                                        onChange={e => setRequestData({...requestData, toDate: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Reason</label>
                                <textarea 
                                    required
                                    rows={3}
                                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500/20 outline-none transition resize-none"
                                    placeholder="Please specify the reason..."
                                    value={requestData.reason}
                                    onChange={e => setRequestData({...requestData, reason: e.target.value})}
                                />
                            </div>
                            <div className="flex space-x-3 pt-2">
                                <button 
                                    type="button" 
                                    onClick={() => setIsRequesting(false)} 
                                    className="flex-1 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-xl transition"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="flex-1 py-2.5 text-sm font-bold bg-brand-600 text-white rounded-xl hover:bg-brand-700 shadow-md transition"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            {/* History List Section */}
            <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="font-bold text-slate-900">Request History</h3>
                    </div>
                    {myRequests.length === 0 ? (
                        <div className="p-12 text-center text-slate-400">
                            <Ticket size={48} className="mx-auto mb-4 opacity-20" />
                            <p>No outpass requests found.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {myRequests.map((req) => (
                                <div key={req.id} className="p-6 hover:bg-slate-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-3">
                                            <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase ${
                                                req.type === 'Emergency' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                                {req.type}
                                            </span>
                                            <span className="text-sm text-slate-500 font-medium">Applied on {req.requestDate}</span>
                                        </div>
                                        <h4 className="font-semibold text-slate-900">{req.reason}</h4>
                                        <div className="flex items-center text-sm text-slate-500 space-x-4">
                                            <div className="flex items-center space-x-1.5">
                                                <Calendar size={14} />
                                                <span>{req.fromDate} - {req.toDate}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end gap-4 min-w-[140px]">
                                        <div className={`flex items-center space-x-1.5 font-bold text-sm ${
                                            req.status === 'Approved' ? 'text-green-600' : 
                                            req.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'
                                        }`}>
                                            {req.status === 'Approved' ? <CheckCircle size={16} /> : 
                                             req.status === 'Rejected' ? <XCircle size={16} /> : <Clock size={16} />}
                                            <span>{req.status}</span>
                                        </div>
                                        
                                        {req.status === 'Approved' && (
                                            <button 
                                                onClick={() => alert('Downloading Gate Pass...')}
                                                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                                title="Download Pass"
                                            >
                                                <Download size={20} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const FacultyOutpassView: React.FC = () => {
    const { getPendingRequests, updateRequestStatus, requests } = useOutpass();
    const pendingRequests = getPendingRequests();
    
    // Simple filter state for 'All' vs 'Pending' in the history view logic if expanded
    // For now, we show Pending prominently and a full list below or tabbed.
    
    const [viewMode, setViewMode] = useState<'Pending' | 'All'>('Pending');

    // Filter displayed requests based on viewMode
    const displayedRequests = viewMode === 'Pending' 
        ? pendingRequests 
        : requests.sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime());

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase">Pending Actions</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">{pendingRequests.length}</p>
                    </div>
                    <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                        <Clock size={24} />
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase">Approved Today</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">
                            {requests.filter(r => r.status === 'Approved' && r.requestDate === new Date().toISOString().split('T')[0]).length}
                        </p>
                    </div>
                    <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                        <CheckCircle size={24} />
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase">Total Requests</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">{requests.length}</p>
                    </div>
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                        <FileText size={24} />
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4 bg-white p-2 rounded-xl border border-slate-200 w-fit">
                <button 
                    onClick={() => setViewMode('Pending')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        viewMode === 'Pending' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    Pending Requests
                </button>
                <button 
                    onClick={() => setViewMode('All')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        viewMode === 'All' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    All History
                </button>
            </div>

            {/* Requests List */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                 <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div className="flex items-center space-x-2 text-slate-500">
                        <Filter size={16} />
                        <span className="text-xs font-bold uppercase">Showing {displayedRequests.length} Requests</span>
                    </div>
                </div>

                {displayedRequests.length === 0 ? (
                    <div className="p-12 text-center text-slate-400">
                        <CheckCircle size={48} className="mx-auto mb-4 opacity-20" />
                        <p>No requests found in this category.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {displayedRequests.map(request => (
                            <div key={request.id} className="p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 hover:bg-slate-50 transition">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <span className="font-bold text-slate-900 text-lg">{request.studentName}</span>
                                        <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-mono border border-slate-200">
                                            {request.studentId}
                                        </span>
                                        {viewMode === 'All' && (
                                            <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase ${
                                                request.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                request.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                {request.status}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-start gap-4 mb-3">
                                        <span className={`text-xs font-bold px-2 py-1 rounded uppercase flex-shrink-0 ${
                                            request.type === 'Emergency' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                                        }`}>
                                            {request.type}
                                        </span>
                                        <p className="text-sm text-slate-700 leading-relaxed">{request.reason}</p>
                                    </div>
                                    <div className="flex items-center text-xs text-slate-400 space-x-4">
                                        <div className="flex items-center space-x-1.5">
                                            <Calendar size={14} />
                                            <span>{request.fromDate} <span className="mx-1">to</span> {request.toDate}</span>
                                        </div>
                                        <div className="flex items-center space-x-1.5">
                                            <Clock size={14} />
                                            <span>Requested: {request.requestDate}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {request.status === 'Pending' && (
                                    <div className="flex items-center gap-3 md:self-center">
                                        <button 
                                            onClick={() => updateRequestStatus(request.id, 'Rejected')}
                                            className="px-4 py-2 rounded-xl text-sm font-medium text-red-600 bg-white border border-red-200 hover:bg-red-50 transition flex items-center space-x-2"
                                        >
                                            <XCircle size={18} />
                                            <span>Reject</span>
                                        </button>
                                        <button 
                                            onClick={() => updateRequestStatus(request.id, 'Approved')}
                                            className="px-5 py-2 rounded-xl text-sm font-medium text-white bg-green-600 hover:bg-green-700 shadow-md shadow-green-200 transition flex items-center space-x-2"
                                        >
                                            <CheckCircle size={18} />
                                            <span>Approve</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
