# Women Safety Alert System

A comprehensive web application designed to enhance women's safety through real-time location tracking, AI-powered danger detection, and emergency response systems.

## Features

- **SOS Emergency Button**: One-tap alert system that shares live location with emergency contacts
- **Real-time Location Tracking**: Continuous location updates during emergencies
- **AI-Based Danger Detection**: Analyzes text sentiment, voice patterns, and route deviations
- **Safe Route Suggestions**: Recommends safer travel routes based on safety data
- **Nearby Responders**: Connects with verified volunteers who can provide immediate assistance
- **Emergency Call & Auto-Video Recording**: Automatically records video and calls emergency services

## Tech Stack

- **Frontend**: React.js with TypeScript, Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **APIs**: Google Maps, Google Places, Google Geofencing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- Google Maps API key

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/women-safety-alert-system.git
cd women-safety-alert-system
```

2. Install dependencies
```
npm install
```

3. Create a `.env` file in the root directory based on `.env.example` and add your API keys

4. Start the development server
```
npm run dev
```

## Project Structure

```
src/
├── components/        # Reusable UI components
├── contexts/          # React context providers
├── pages/             # Application pages
├── firebase.ts        # Firebase configuration
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## Firebase Setup

1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Add your Firebase configuration to the `.env` file

## Google Maps Setup

1. Create a Google Cloud project and enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Directions API
   - Geocoding API
2. Create an API key with restrictions for these services
3. Add your Google Maps API key to the `.env` file

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project was created to help improve women's safety in urban environments
- Thanks to all contributors who have helped make this project better