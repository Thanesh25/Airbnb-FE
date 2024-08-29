import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPages() {
  const [places,setPlaces] =useState([])
  useEffect(() => {
    axios.get('/places').then(response => {
     setPlaces(response.data);
    })
  },[]) 
  return (
    <div className=" mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={'/places/'+place._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={"http://localhost:4000/Uploads/" + place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <h2 className="text-sm truncate leading-4 ">{place.title}</h2>
            <h3 className="font-bold ">{place.address}</h3>
            <div className="mt-2">
              <span className="font-bold"> ${place.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
}
