import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Reporting } from './pages/Reporting';
import { Scheduler } from './pages/Scheduler';
import { Opportunities } from './pages/Opportunities';
import { HostelMenu } from './pages/HostelMenu';
import { CampusEvents } from './pages/CampusEvents';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { TimeTable } from './pages/TimeTable';
import { Meetings } from './pages/Meetings';
import { Outpass } from './pages/Outpass';
import { EventsProvider } from './context/EventsContext';
import { ProfileProvider } from './context/ProfileContext';
import { AuthProvider } from './context/AuthContext';
import { OutpassProvider } from './context/OutpassContext';
import { OpportunitiesProvider } from './context/OpportunitiesContext';
import { AnnouncementsProvider } from './context/AnnouncementsContext';
import { ProtectedRoute } from './components/ProtectedRoute';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <AnnouncementsProvider>
                <OutpassProvider>
                    <OpportunitiesProvider>
                        <ProfileProvider>
                            <EventsProvider>
                                <Router>
                                    <Routes>
                                        {/* Public Routes */}
                                        <Route path="/" element={<Landing />} />
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/signup" element={<Signup />} />
                                        
                                        {/* Protected Routes */}
                                        <Route element={
                                            <ProtectedRoute>
                                                <Layout />
                                            </ProtectedRoute>
                                        }>
                                            <Route path="/dashboard" element={<Dashboard />} />
                                            <Route path="/profile" element={<Profile />} />
                                            <Route path="/reporting" element={<Reporting />} />
                                            <Route path="/outpass" element={<Outpass />} />
                                            <Route path="/calendar" element={<Scheduler />} />
                                            <Route path="/scheduler" element={<Scheduler />} />
                                            <Route path="/timetable" element={<TimeTable />} />
                                            <Route path="/meetings" element={<Meetings />} />
                                            <Route path="/opportunities" element={<Opportunities />} />
                                            <Route path="/menu" element={<HostelMenu />} />
                                            <Route path="/events" element={<CampusEvents />} />
                                        </Route>

                                        {/* Catch all - Redirect to Landing */}
                                        <Route path="*" element={<Navigate to="/" replace />} />
                                    </Routes>
                                </Router>
                            </EventsProvider>
                        </ProfileProvider>
                    </OpportunitiesProvider>
                </OutpassProvider>
            </AnnouncementsProvider>
        </AuthProvider>
    );
};

export default App;