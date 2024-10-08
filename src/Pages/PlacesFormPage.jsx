import { useEffect, useState } from "react";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import axios from 'axios'
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
export default function PlacesFromPage() {
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false)
  const [price, setPrice] = useState(100)
  
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/' + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos)  
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut)
      setMaxGuests(data.maxGuests)
    })
  },[id])



     function inputHeader(text) {
       return <h2 className="text-2xl mt-4">{text}</h2>;
     }
     function inputDescription(text) {
       return <p className="text-grey-500 text-sm">{text}</p>;
     }
     function preInput(header, description) {
       return (
         <>
           {inputHeader(header)}
           {inputDescription(description)}
         </>
       );
     }
  
     async function savePlace(ev) {
       ev.preventDefault();
       const placeData = {
         title,
         address,
         addedPhotos,
         description,
         perks,
         extraInfo,
         checkIn,
         checkOut,
         maxGuests,
         price,
       };
       if (id) {
         //update
         const token = localStorage.getItem("token");
         await axios.put("/places", {id, ...placeData },{ headers: { Authorization: `Bearer ${token}` } } );
        setRedirect(true);
       } else {
         //new place
            const token = localStorage.getItem("token");
            await axios.post("/places",placeData,{ headers: { Authorization: `Bearer ${token}`, }, });
            setRedirect(true);
    }




     }

     if (redirect) {
       return <Navigate to={"/account/places"} />;
     }
    
  return (
    <>
      <div>
        <AccountNav />
        <form onSubmit={savePlace}>
          {preInput(
            "Title",
            " title for your place should be short and catchy as in advertisment"
          )}
          <input
            type="text"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="title ,for example: My lovely apartment"
          />
          {preInput("Address", "address to your place")}
          <input
            type="text"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
            placeholder="address"
          />
          {preInput("photos", "more = better")}
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
          {preInput("Description", "description of the place")}
          <textarea
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          {preInput("perks", "select all the perk of your place")}
          <div className="grid mt-2 gap-2 grid-cols-2 md:grid-col-3 lg:grid-cols-6">
            <Perks selected={perks} onChange={setPerks} />
          </div>
          {preInput("Extra info", "house rules ,etc")}
          <textarea
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
          />
          {preInput(
            "check in & out times",
            " add check in and out times ,remember to have some time window for cleaning the room between guest"
          )}
          <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mt-2 -mb-1">Check in time</h3>
              <input
                type="text"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                placeholder="14:00"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check out time</h3>
              <input
                type="text"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                placeholder="11"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max number of guest </h3>
              <input
                type="number"
                value={maxGuests}
                onChange={(ev) => setMaxGuests(ev.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Price per night </h3>
              <input
                type="number"
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
              />
            </div>
          </div>
          <button className="primary my-4">Save</button>
        </form>
      </div>
    </>
  );
}
