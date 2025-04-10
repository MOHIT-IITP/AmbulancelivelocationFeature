import express from "express";
import http from "http";
import { Server as socketio } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

// Fixing __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new socketio(server);

// Socket.io connection
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Listen for location from client
    socket.on("send-location", (data) => {
        // Broadcast location to all clients
        io.emit("receive-location", { id: socket.id, ...data });
    });

    // Handle disconnect
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        io.emit("user-disconnected", socket.id);
    });
});

// Set view engine and static files
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
