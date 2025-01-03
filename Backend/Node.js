const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let bookings = []; // Temporary in-memory storage

// Create a booking
app.post("/api/bookings", (req, res) => {
  const { date, time, guests, name, contact } = req.body;

  // Check for double booking
  const isSlotTaken = bookings.some(
    (booking) => booking.date === date && booking.time === time
  );

  if (isSlotTaken) {
    return res.status(400).json({ message: "Slot already booked" });
  }

  const newBooking = {
    id: bookings.length + 1,
    date,
    time,
    guests,
    name,
    contact,
  };
  bookings.push(newBooking);

  res.status(201).json(newBooking);
});

// Get all bookings
app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

// Delete a booking
app.delete("/api/bookings/:id", (req, res) => {
  const { id } = req.params;
  bookings = bookings.filter((booking) => booking.id !== parseInt(id));
  res.status(200).json({ message: "Booking deleted" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
