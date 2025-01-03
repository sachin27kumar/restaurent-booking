import React, { useEffect, useState } from "react";
import BookingForm from "./components/BookingForm";
const App = () => {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/bookings")
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  const handleBookingSubmit = (formData) => {
    fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((err) => {
            throw new Error(err.message);
          });
        }
      })
      .then((newBooking) => {
        setBookings([...bookings, newBooking]);
        setMessage("Booking successful!");
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  const handleDeleteBooking = (id) => {
    fetch(`http://localhost:5000/api/bookings/${id}`, { method: "DELETE" })
      .then(() => {
        setBookings(bookings.filter((booking) => booking.id !== id));
        setMessage("Booking deleted.");
      })
      .catch((error) => console.error("Error deleting booking:", error));
  };

  return (
    <div className="p-4">
      <BookingForm onBookingSubmit={handleBookingSubmit} />
      {message && <p className="mt-4 text-green-600">{message}</p>}
      <div className="mt-8">
        <h2 className="text-xl font-bold">Bookings</h2>
        <ul>
          {bookings.map((booking) => (
            <li
              key={booking.id}
              className="p-4 bg-gray-100 shadow rounded my-2"
            >
              <p>Date: {booking.date}</p>
              <p>Time: {booking.time}</p>
              <p>Guests: {booking.guests}</p>
              <p>Name: {booking.name}</p>
              <p>Contact: {booking.contact}</p>
              <button
                onClick={() => handleDeleteBooking(booking.id)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
