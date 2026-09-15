import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import UserContext from "../../store/user/UserContext";

const HomeDetail = () => {
  const { houseId } = useParams();

  const { userHomeDetail, houseDetail } = useContext(UserContext);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    userHomeDetail(Number(houseId));
  }, [houseId]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [houseId]);

  const nextImage = (images) => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousImage = (images) => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <Helmet>
        <title>Home Details</title>
      </Helmet>

      <Navbar />

      {houseDetail.map((home) => (
        <main key={home.houseId} className="pb-12">
          <section className="relative w-full h-[60vh] sm:h-[65vh] lg:h-[75vh] bg-black overflow-hidden">
            {home.images.length > 0 ? (
              <>
                <img
                  src={`${API_URL}/host/home-image/${home.images[currentImageIndex].imageId}`}
                  alt={home.houseName}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute bottom-8 left-5 sm:left-10 lg:left-16 text-white">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold drop-shadow-lg">
                    {home.houseName}
                  </h1>

                  <p className="mt-2 text-lg sm:text-xl">{home.houseArea}</p>
                </div>

                {/* PREVIOUS BUTTON */}

                {home.images.length > 1 && (
                  <button
                    onClick={() => previousImage(home.images)}
                    className=" absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full  bg-black/50  hover:bg-black/80  text-white text-3xl flex items-center justify-center transition
                    "
                  >
                    ←
                  </button>
                )}

                {/* NEXT BUTTON */}

                {home.images.length > 1 && (
                  <button
                    onClick={() => nextImage(home.images)}
                    className=" absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full  bg-black/50  hover:bg-black/80  text-white  text-3xl flex items-center justify-center transition
                    "
                  >
                    →
                  </button>
                )}

                {/* IMAGE COUNTER */}

                {home.images.length > 1 && (
                  <div
                    className=" absolute bottom-6 left-1/2 -translate-x-1/2  bg-black/60  text-white px-4 py-2 rounded-full text-sm
                    "
                  >
                    {currentImageIndex + 1} / {home.images.length}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl">
                No Image Available
              </div>
            )}
          </section>

          {/* ================= HOME DETAILS ================= */}

          <section className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* LEFT SIDE */}

              <div className="lg:col-span-2">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  {home.houseName}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* AREA */}

                  <div
                    className="
                      rounded-xl
                      p-5
                      shadow-[0px_2px_12px_-4px_white]
                    "
                  >
                    <p className="text-gray-400 text-sm mb-1">
                      Location / Area
                    </p>

                    <p className="text-xl font-semibold">{home.houseArea}</p>
                  </div>

                  {/* OWNER */}

                  <div
                    className="
                      rounded-xl
                      p-5
                      shadow-[0px_2px_12px_-4px_white]
                    "
                  >
                    <p className="text-gray-400 text-sm mb-1">Property Owner</p>

                    <p className="text-xl font-semibold">{home.houseOwner}</p>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE - RENT */}

              <div
                className="
                  rounded-2xl
                  p-6
                  h-fit
                  shadow-[0px_2px_15px_-4px_white]
                "
              >
                <p className="text-gray-400 text-sm">Monthly Rent</p>

                <p className="text-4xl font-bold mt-2">₹{home.houseRent}</p>

                <p className="text-gray-400 mt-1">per month</p>

                <button
                  className="
                    w-full
                    mt-6
                    py-3
                    rounded-lg
                    bg-white
                    text-black
                    font-semibold
                    hover:bg-gray-200
                    transition
                  "
                >
                  Contact Owner
                </button>
              </div>
            </div>
          </section>
        </main>
      ))}
    </>
  );
};

export default HomeDetail;
