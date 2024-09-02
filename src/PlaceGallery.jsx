import { useState } from "react";

export default function PlaceGallery({ place }) {

     const [showAllPhotos, setShowAllPhotos] = useState(false);

    
  if (showAllPhotos) {
    return (
      <div className="absolute insert-0  bg-black text-white min-w-full min-h-screen">
        <div className=" bg- black p-8 grid-gap-4">
          <div>
            <h2 className="text-3xl mr-48">Photo of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className=" fixed right-12  top-8 flex gap-2 py-2 px-4  rounded-2xl shadow shadow-black bg-white text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
              close photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div>
                <img src={"http://localhost:4000/Uploads/" + photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }
    return (
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
          <div>
            {place.photos?.[0] && (
              <div>
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="cursor-pointer aspect-square object-cover "
                  src={"http://localhost:4000/Uploads/" + place.photos[0]}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="grid ">
            {place.photos?.[1] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="cursor-pointer aspect-square object-cover  "
                src={"http://localhost:4000/Uploads/" + place.photos[1]}
                alt=""
              />
            )}
            <div className=" overflow-hidden">
              {place.photos?.[2] && (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className=" cursor-pointer aspect-square object-cover relative top-2"
                  src={"http://localhost:4000/Uploads/" + place.photos[2]}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
}
