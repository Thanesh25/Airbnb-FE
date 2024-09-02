
import { Link,  useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import PlaceImg from "../PlaceImg";


export default function PlacesPage() {
  const [places, setPlaces] = useState('')
  console.log(places);
  
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get('/user-places'
      , { headers: { Authorization: `Bearer ${token}` } }
    ).then(({data}) => {
    setPlaces(data)
  })
},[])
    
 
  return (
    <div>
      <AccountNav />

      <div className="text-center">
        list of all added places
        <br />
        <Link
          className=" inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
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
      {places.length > 0 &&places.map((place,index) => (
          <Link to={'/account/places/'+place._id} className=" flex cursor-pointer gap-4 bg-gray-200 p-4 rounded-2xl">
            <div className=" flex w-32 h-32 bg-gray-300 grow shrink-0" >
             <PlaceImg  place={place}   />
            </div>
            <div className="grow-0 shrink">
            <h2 className="text-xl ">{place.title}</h2>
            <p className="text-sm mt-2 ">{place.description }</p>
            </div>
          </Link>
        ))}
    </div>
  );
}
