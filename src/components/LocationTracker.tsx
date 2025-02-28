import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';

interface LocationTrackerProps {
  isTracking: boolean;
  onLocationUpdate?: (location: { lat: number; lng: number }) => void;
}

const containerStyle = {
  width: '100%',
  height: '400px'
};

const LocationTracker: React.FC<LocationTrackerProps> = ({ isTracking, onLocationUpdate }) => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationHistory, setLocationHistory] = useState<{ lat: number; lng: number }[]>([]);
  const [watchId, setWatchId] = useState<number | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY"
  });

  useEffect(() => {
    if (isTracking) {
      startTracking();
    } else {
      stopTracking();
    }

    return () => {
      stopTracking();
    };
  }, [isTracking]);

  const startTracking = () => {
    if (navigator.geolocation) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          setCurrentLocation(newLocation);
          setLocationHistory(prev => [...prev, newLocation]);
          
          if (onLocationUpdate) {
            onLocationUpdate(newLocation);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0
        }
      );
      
      setWatchId(id);
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const stopTracking = () => {
    if (watchId !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-purple-700 text-white flex items-center justify-between">
        <div className="flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          <h3 className="font-semibold">Location Tracker</h3>
        </div>
        <div className="flex items-center">
          <span className={`h-3 w-3 rounded-full mr-2 ${isTracking ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></span>
          <span className="text-sm">{isTracking ? 'Tracking' : 'Inactive'}</span>
        </div>
      </div>
      
      <div className="p-4">
        {!isLoaded ? (
          <div className="h-[400px] flex items-center justify-center bg-gray-100">
            <p>Loading map...</p>
          </div>
        ) : currentLocation ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentLocation}
            zoom={15}
          >
            <Marker position={currentLocation} />
          </GoogleMap>
        ) : (
          <div className="h-[400px] flex items-center justify-center bg-gray-100">
            <p>Location data not available. {isTracking ? 'Waiting for GPS signal...' : 'Start tracking to see your location.'}</p>
          </div>
        )}
      </div>
      
      {currentLocation && (
        <div className="p-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Current coordinates: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationTracker;