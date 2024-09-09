import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";
import { ClipLoader } from "react-spinners"; // Import ClipLoader

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // State to control loader

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true); // Show loader when fetching starts
    axios
      .get("/bookings", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setBookings(response.data);
        setLoading(false); // Hide loader after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setLoading(false); // Hide loader even if there's an error
      });
  }, []);

  return (
    <div>
      <AccountNav />

      {/* Loader display */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color={"primary"} loading={loading} size={50} />
        </div>
      ) : (
        // Display bookings once loading is complete
        <div>
          {bookings?.length > 0 ? (
            bookings.map((booking) => (
              <Link
                to={`/account/bookings/${booking._id}`}
                className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
                key={booking._id}
              >
                <div className="w-48">
                  <PlaceImg place={booking.place} />
                </div>
                <div className="py-3 pr-3 grow">
                  <h2 className="text-xl">{booking.place.title}</h2>

                  <div className="text-xl">
                    <BookingDates
                      booking={booking}
                      className="mb-2 mt-2 mt-4 text-gray-500"
                    />
                    <div className="flex gap-1 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                        />
                      </svg>
                      <span className="text-lg">
                        Total price: ${booking.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      )}
    </div>
  );
}
