import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import PlaceGallery from '../PlaceGallery'
import AddressLink from "../AddressLink";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
 
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";


  return (
    <div className="mt-8 bg-gray-100 -mx-8 px-8 pt-8"> 
      <h1 className="text-2xl">{place.title}</h1>
      <AddressLink>{place.address }</AddressLink>
      <PlaceGallery place={ place} />
      <button
        onClick={() => setShowAllPhotos(true)}
        className=" flex gap-1 absolute bottom-0 right-8  py-3 px-3 bg-white rounded-2xl shadow shadow-md shadow-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
            clipRule="evenodd"
          />
        </svg>
        Show more photos
      </button>
      <div className="mt-8 mb-8 grid gap-8  grid grid-cols-1 md:grid-cols-[2fr-1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in:{place.checkIn}
          <br />
          Check-out:{place.checkOut}
          <br />
          Max number of guests:{place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">

      <div>
        <h2 className="font-semibold text-2xl">Extra Info</h2>
      </div>
      <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
        {place.extraInfo}
      </div>
      </div>
    </div>
  );
}
