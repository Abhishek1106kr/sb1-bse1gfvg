import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Shield, MapPin, Bell, Users, Clock, Navigation } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SOSButton from '../components/SOSButton';
import LocationTracker from '../components/LocationTracker';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [userName, setUserName] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [safetyStatus, setSafetyStatus] = useState<'safe' | 'monitoring' | 'alert'>('safe');
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUserName(userDoc.data().name || 'User');
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    
    fetchUserData();
  }, [currentUser]);
  
  const handleSOSActivate = () => {
    setSafetyStatus('alert');
    // In a real implementation, this would trigger emergency protocols
    alert('SOS Alert activated! In a real scenario, this would notify your emergency contacts and nearby responders.');
  };
  
  const handleStartTracking = () => {
    setIsTracking(true);
    setSafetyStatus('monitoring');
  };
  
  const handleStopTracking = () => {
    setIsTracking(false);
    setSafetyStatus('safe');
  };
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome, {userName}</h1>
              <p className="text-gray-600 mt-1">Your safety dashboard is {safetyStatus === 'safe' ? 'inactive' : safetyStatus === 'monitoring' ? 'monitoring' : 'in alert mode'}.</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <div className={`h-3 w-3 rounded-full mr-2 ${
                safetyStatus === 'safe' ? 'bg-green-500' : 
                safetyStatus === 'monitoring' ? 'bg-yellow-500 animate-pulse' : 
                'bg-red-500 animate-ping'
              }`}></div>
              <span className={`font-medium ${
                safetyStatus === 'safe' ? 'text-green-600' : 
                safetyStatus === 'monitoring' ? 'text-yellow-600' : 
                'text-red-600'
              }`}>
                {safetyStatus === 'safe' ? 'Safe' : 
                 safetyStatus === 'monitoring' ? 'Monitoring' : 
                 'ALERT ACTIVE'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Location Tracker */}
            <LocationTracker isTracking={isTracking} />
            
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-purple-700 text-white">
                <h3 className="font-semibold">Quick Actions</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={isTracking ? handleStopTracking : handleStartTracking}
                    className={`flex items-center justify-center p-4 rounded-lg ${
                      isTracking 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {isTracking ? (
                      <>
                        <Clock className="h-5 w-5 mr-2" />
                        Stop Tracking
                      </>
                    ) : (
                      <>
                        <MapPin className="h-5 w-5 mr-2" />
                        Start Tracking
                      </>
                    )}
                  </button>
                  
                  <button className="flex items-center justify-center p-4 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200">
                    <Navigation className="h-5 w-5 mr-2" />
                    Find Safe Route
                  </button>
                  
                  <button className="flex items-center justify-center p-4 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200">
                    <Users className="h-5 w-5 mr-2" />
                    Nearby Responders
                  </button>
                  
                  <button className="flex items-center justify-center p-4 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
                    <Bell className="h-5 w-5 mr-2" />
                    Test Alert
                  </button>
                </div>
              </div>
            </div>
            
            {/* Safety Tips */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-purple-700 text-white">
                <h3 className="font-semibold">Safety Tips</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="h-6 w-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mr-3 mt-0.5">1</span>
                    <p className="text-gray-700">Share your travel plans with trusted contacts before heading out.</p>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mr-3 mt-0.5">2</span>
                    <p className="text-gray-700">Stay in well-lit areas and avoid shortcuts through isolated places.</p>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mr-3 mt-0.5">3</span>
                    <p className="text-gray-700">Keep your phone charged and easily accessible at all times.</p>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mr-3 mt-0.5">4</span>
                    <p className="text-gray-700">Trust your instincts - if something feels wrong, seek help immediately.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-8">
            {/* SOS Button */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-red-600 text-white">
                <h3 className="font-semibold">Emergency SOS</h3>
              </div>
              <div className="p-6 flex flex-col items-center">
                <SOSButton onActivate={handleSOSActivate} size="lg" className="mb-4" />
                <p className="text-center text-gray-600 text-sm mt-4">
                  Press and hold for 2 seconds to activate emergency mode.
                  This will alert your emergency contacts and nearby responders.
                </p>
              </div>
            </div>
            
            {/* Emergency Contacts */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-purple-700 text-white flex justify-between items-center">
                <h3 className="font-semibold">Emergency Contacts</h3>
                <a href="/emergency-contacts" className="text-xs text-white underline">Manage</a>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Mom</p>
                      <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Primary</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Sister</p>
                      <p className="text-sm text-gray-600">+1 (555) 987-6543</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Secondary</span>
                  </div>
                  
                  <a 
                    href="/emergency-contacts" 
                    className="block text-center text-purple-600 hover:text-purple-500 text-sm font-medium"
                  >
                    + Add more contacts
                  </a>
                </div>
              </div>
            </div>
            
            {/* Safe Zones */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-purple-700 text-white flex justify-between items-center">
                <h3 className="font-semibold">Safe Zones</h3>
                <a href="#" className="text-xs text-white underline">Manage</a>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Home</p>
                      <p className="text-sm text-gray-600">123 Main St, Anytown</p>
                    </div>
                    <span className="h-3 w-3 bg-green-500 rounded-full"></span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Work</p>
                      <p className="text-sm text-gray-600">456 Office Blvd, Anytown</p>
                    </div>
                    <span className="h-3 w-3 bg-green-500 rounded-full"></span>
                  </div>
                  
                  <a 
                    href="#" 
                    className="block text-center text-purple-600 hover:text-purple-500 text-sm font-medium"
                  >
                    + Add safe zone
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;