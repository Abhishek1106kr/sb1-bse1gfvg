import React from 'react';
import { Shield, Heart, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-purple-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">SafeGuardian</span>
            </div>
            <p className="text-purple-200">
              Empowering women with real-time safety solutions and emergency response systems.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-purple-200 hover:text-white">Home</a></li>
              <li><a href="/dashboard" className="text-purple-200 hover:text-white">Dashboard</a></li>
              <li><a href="/emergency-contacts" className="text-purple-200 hover:text-white">Emergency Contacts</a></li>
              <li><a href="/safe-routes" className="text-purple-200 hover:text-white">Safe Routes</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-purple-200 hover:text-white">Safety Tips</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white">Emergency Numbers</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white">Support Centers</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>Emergency: 911</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Women Helpline: 1800-XXX-XXXX</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-purple-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-purple-200">© 2025 SafeGuardian. All rights reserved.</p>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-purple-200">Made with</span>
            <Heart className="h-4 w-4 mx-1 text-red-400" />
            <span className="text-purple-200">for a safer world</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;