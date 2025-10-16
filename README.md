
## Ambulance Live Location (Socket.IO)

This project demonstrates a simple real-time ambulance live-location feature using Socket.IO (WebSockets), Express and EJS.

When a client (for example, a mobile device in an ambulance) emits location updates, the server broadcasts those updates to all connected clients so a dispatcher or other users can see the ambulance moving on a map in real time.

Features
- Real-time location updates using Socket.IO
- Simple server built with Express and EJS for the view
- Static client assets under `backend/public`

Preview

![screenshot](./01.png)

Quick start

Prerequisites:
- Node.js (v16+ recommended)

Install and run:

```bash
cd backend
npm install
npm start
```

Open your browser at http://localhost:5000 to load the demo page.

How it works (high level)
- The server (`backend/server.js`) creates an HTTP server and attaches a Socket.IO server.
- Clients connect via Socket.IO and can emit `send-location` messages with a payload like `{ lat: number, lng: number }`.
- The server listens for `send-location` and re-broadcasts to all clients as `receive-location` (including the sender id).

Files of interest
- `backend/server.js` — Express + Socket.IO server and routing
- `backend/package.json` — project manifest and scripts
- `backend/public/js/script.js` — client-side Socket.IO usage (emitting/receiving location) 
- `backend/views/index.ejs` — demo page served to clients

Notes and next steps
- The demo uses a simple broadcast strategy. For production, consider authentication, namespaces/rooms in Socket.IO, rate limiting location updates, and using HTTPS.
- To show locations on a map, integrate a mapping library (Leaflet, Google Maps, Mapbox) in `index.ejs` and plot `receive-location` events.

License & contact
- This repository is provided as-is. Add a LICENSE file if you plan to reuse or publish this code.

If you want, I can:
- Add a basic map integration using Leaflet in the demo page
- Add environment-based configuration and a proper start script (without nodemon)
