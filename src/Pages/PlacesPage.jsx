import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import {  ClipLoader } from "react-spinners"; // Import the loader

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [loader, setLoader] = useState(false); // State to control loader

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoader(true); // Show loader when fetching starts
    axios
      .get("/user-places", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        setPlaces(data);
        setLoader(false); // Hide loader after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
        setLoader(false); // Hide loader even on error
      });
  }, []);

  return (
    <div>
      <AccountNav />

      <div className="text-center">
        <p>List of all added places</p>
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>

      {/* Loader Display */}
      {loader ? (
        <div className="flex justify-center items-center w-full h-full min-h-screen">
          <ClipLoader color={"black"} loading={loader} size={50} />
        </div>
      ) : (
        // Display the places when the loader is hidden
        <>
          {places.length > 0 ? (
            places.map((place, index) => (
              <Link
                to={"/account/places/" + place._id}
                className="flex cursor-pointer gap-4 bg-gray-200 p-4 rounded-2xl"
                key={place._id}
              >
                <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                  <PlaceImg place={place} />
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl">{place.title}</h2>
                  <p className="text-sm mt-2">{place.description}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center mt-4">No places found.</p>
          )}
        </>
      )}
    </div>
  );
}
