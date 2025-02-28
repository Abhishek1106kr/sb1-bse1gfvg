import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MapPin, Bell, MessageSquare, Users, Navigation } from 'lucide-react';
import SOSButton from '../components/SOSButton';

const Home: React.FC = () => {
  const handleSOSActivate = () => {
    alert('SOS feature would be activated here in a real scenario');
    // In a real implementation, this would trigger emergency protocols
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Your Safety Companion, Anytime, Anywhere
              </h1>
              <p className="text-xl mb-8">
                Real-time protection with AI-powered alerts, location tracking, and emergency response.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/register" 
                  className="bg-white text-purple-700 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
                >
                  Get Started
                </Link>
                <Link 
                  to="/login" 
                  className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
                >
                  Login
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Women Safety" 
                className="rounded-lg shadow-2xl max-w-full h-auto"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive safety solution provides everything you need to stay protected.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
              <div className="bg-purple-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Bell className="h-7 w-7 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">SOS Emergency Alert</h3>
              <p className="text-gray-600">
                One-tap SOS button that shares your live location with emergency contacts and nearby responders.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
              <div className="bg-purple-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <MapPin className="h-7 w-7 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Location Tracking</h3>
              <p className="text-gray-600">
                Share your location with trusted contacts and get updates every 30 seconds during emergencies.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
              <div className="bg-purple-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Danger Detection</h3>
              <p className="text-gray-600">
                Automatically detects potential danger through voice analysis, text sentiment, and route deviation.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
              <div className="bg-purple-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Navigation className="h-7 w-7 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe Route Suggestions</h3>
              <p className="text-gray-600">
                Get recommendations for safer travel routes based on crime data and lighting conditions.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
              <div className="bg-purple-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Nearby Responders</h3>
              <p className="text-gray-600">
                Connect with verified volunteers nearby who can provide immediate assistance in emergencies.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
              <div className="bg-purple-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <MessageSquare className="h-7 w-7 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Auto-Video Recording</h3>
              <p className="text-gray-600">
                Automatically records video and calls emergency services when danger is detected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOS Demo Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Emergency SOS Feature</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In a real emergency, press and hold the SOS button for 2 seconds to alert your emergency contacts.
            </p>
          </div>
          
          <div className="flex justify-center">
            <SOSButton onActivate={handleSOSActivate} />
          </div>
          
          <div className="mt-12 text-center text-gray-600">
            <p className="mb-2">This is a demonstration. In the actual app, this would:</p>
            <ul className="inline-block text-left">
              <li className="flex items-center mb-2">
                <span className="h-2 w-2 bg-purple-600 rounded-full mr-2"></span>
                Share your live location with emergency contacts
              </li>
              <li className="flex items-center mb-2">
                <span className="h-2 w-2 bg-purple-600 rounded-full mr-2"></span>
                Alert nearby verified responders
              </li>
              <li className="flex items-center mb-2">
                <span className="h-2 w-2 bg-purple-600 rounded-full mr-2"></span>
                Provide directions to the nearest safe zone
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-purple-600 rounded-full mr-2"></span>
                Automatically record video evidence
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from women who feel safer with SafeGuardian.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" 
                  alt="User" 
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-gray-500 text-sm">College Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As someone who often walks home late after classes, this app gives me peace of mind. The safe route feature has been a game-changer for me."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80" 
                  alt="User" 
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Michelle Lee</h4>
                  <p className="text-gray-500 text-sm">Working Professional</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I travel for work frequently, and having this app makes me feel secure in unfamiliar cities. The emergency contacts feature is simple yet effective."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=461&q=80" 
                  alt="User" 
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Priya Sharma</h4>
                  <p className="text-gray-500 text-sm">Healthcare Worker</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Working night shifts at the hospital, I rely on this app for my commute. Once when I felt unsafe, the nearby responder feature connected me with help within minutes."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Feel Safer?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of women who trust SafeGuardian for their personal safety. Sign up today and take the first step towards peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/register" 
              className="bg-white text-purple-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300"
            >
              Sign Up Now
            </Link>
            <Link 
              to="/login" 
              className="bg-purple-600 border border-white hover:bg-purple-500 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;