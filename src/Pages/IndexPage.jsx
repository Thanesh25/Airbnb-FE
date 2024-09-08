import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Import PacmanLoader

export default function IndexPages() {
  const [places, setPlaces] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoader(true); // Show loader when data fetching starts
    axios
      .get("/places", {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
      })
      .then((response) => {
        setPlaces(response.data);
        setLoader(false); // Hide loader when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
        setLoader(false); // Hide loader even if there's an error
      });
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {loader ? (
        <div className=" flex ">
          <ClipLoader
            className="px-50 px-50"
            color="primary"
            loading={loader}
            size={50}
          />{" "}
          {/* Loader */}
        </div>
      ) : (
        <>
          {places.length > 0 ? (
            places.map((place) => (
              <Link to={"/place/" + place._id} key={place._id}>
                <div className="bg-gray-500 mb-2 rounded-2xl flex">
                  {place.photos?.[0] && (
                    <img
                      className="rounded-2xl object-cover aspect-square"
                      src={
                        "https://airbnb-be-ayxh.onrender.com/Uploads/" +
                        place.photos?.[0]
                      }
                      alt={place.title}
                    />
                  )}
                </div>
                <h2 className="text-sm truncate leading-4">{place.title}</h2>
                <h3 className="font-bold">{place.address}</h3>
                <div className="mt-2">
                  <span className="font-bold">${place.price}</span> per night
                </div>
              </Link>
            ))
          ) : (
            <p>Places not found</p> // If no places are available
          )}
        </>
      )}
    </div>
  );
}
