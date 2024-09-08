import { useEffect, useState } from "react";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);

  // Fetch the existing place data if id is present
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      formik.setValues({
        title: data.title,
        address: data.address,
        addedPhotos: data.photos,
        description: data.description,
        perks: data.perks,
        extraInfo: data.extraInfo,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        maxGuests: data.maxGuests,
        price: data.price,
      });
    });
  }, [id]);

  // Basic form validation without Yup
  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Title is required";
    }
    if (!values.address) {
      errors.address = "Address is required";
    }
    if (!values.addedPhotos) {
      errors.addedPhotos = "At least one photo is required";
    }
    if (!values.description) {
      errors.description = "Description is required";
    }
    if (!values.checkIn) {
      errors.checkIn = "Check-in time is required";
    }
    if (!values.checkOut) {
      errors.checkOut = "Check-out time is required";
    }
    if (values.maxGuests < 1) {
      errors.maxGuests = "At least 1 guest is required";
    }
    if (values.price < 1) {
      errors.price = "Price must be at least 1";
    }
    return errors;
  };

  const savePlace = async (values) => {
    const token = localStorage.getItem("token");
    if (id) {
      // Update place
      await axios.put(
        "/places",
        { id, ...values },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } else {
      // Create new place
      await axios.post("/places", values, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <>
      <div>
        <AccountNav />
        <Formik
          initialValues={{
            title: "",
            address: "",
            addedPhotos: "",
            description: "",
            perks: [],
            extraInfo: "",
            checkIn: "",
            checkOut: "",
            maxGuests: 1,
            price: 100,
          }}
          validate={validate}
          onSubmit={(values, { setSubmitting }) => {
            savePlace(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <div>
                <h2 className="text-2xl mt-4">Title</h2>
                <Field
                  type="text"
                  name="title"
                  placeholder="Title, for example: My lovely apartment"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500"
                />

                <h2 className="text-2xl mt-4">Address</h2>
                <Field type="text" name="address" placeholder="Address" />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500"
                />

                <h2 className="text-2xl mt-4">Photos</h2>
                <PhotosUploader
                  addedPhotos={values.addedPhotos}
                  onChange={(photos) => setFieldValue("addedPhotos", photos)}
                />
                <ErrorMessage
                  name="addedPhotos"
                  component="div"
                  className="text-red-500"
                />

                <h2 className="text-2xl mt-4">Description</h2>
                <Field as="textarea" name="description" />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500"
                />

                <h2 className="text-2xl mt-4">Perks</h2>
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-col-3 lg:grid-cols-6">
                  <Perks
                    selected={values.perks}
                    onChange={(perks) => setFieldValue("perks", perks)}
                  />
                </div>

                <h2 className="text-2xl mt-4">Extra Info</h2>
                <Field as="textarea" name="extraInfo" />

                <h2 className="text-2xl mt-4">Check in & Check out</h2>
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                  <div>
                    <h3 className="mt-2 -mb-1">Check-in time</h3>
                    <Field type="text" name="checkIn" placeholder="14:00" />
                    <ErrorMessage
                      name="checkIn"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div>
                    <h3 className="mt-2 -mb-1">Check-out time</h3>
                    <Field type="text" name="checkOut" placeholder="11:00" />
                    <ErrorMessage
                      name="checkOut"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div>
                    <h3 className="mt-2 -mb-1">Max number of guests</h3>
                    <Field type="number" name="maxGuests" />
                    <ErrorMessage
                      name="maxGuests"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div>
                    <h3 className="mt-2 -mb-1">Price per night</h3>
                    <Field type="number" name="price" />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <button
                  className="primary my-4"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
