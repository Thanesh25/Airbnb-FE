import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";
import { ClipLoader } from "react-spinners"; // Import ClipLoader

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true); // State to control loader

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true); // Show loader when fetching starts
    axios
      .get("/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
        setLoading(false); // Hide loader after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching booking:", error);
        setLoading(false); // Hide loader even on error
      });
  }, [id]);

  // Loader: Show while fetching
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color={"primary"} size={50} loading={loading} />
      </div>
    );
  }

  // If no booking is found after loading
  if (!booking) {
    return <p>No booking found</p>;
  }

  // Display booking details after loading
  return (
    <div className="my-8">
      <h1 className="text-2xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="tex-2xl mb-4">Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price:</div>
          <div className="text-2xl"> ${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}
