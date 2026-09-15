import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Helmet } from "react-helmet-async";
import HostContext from "../../store/host/HostContext";
import { NavLink, useParams } from "react-router-dom";

const HostHomes = () => {
  const { hostHomes } = useContext(HostContext);
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;

  const nextImage = (homeId, imagesLength) => {
    setCurrentImageIndexes((prevIndexes) => {
      const currentIndex = prevIndexes[homeId] || 0;

      return {
        ...prevIndexes,
        [homeId]: currentIndex === imagesLength - 1 ? 0 : currentIndex + 1,
      };
    });
  };

  const previousImage = (homeId, imagesLength) => {
    setCurrentImageIndexes((prevIndexes) => {
      const currentIndex = prevIndexes[homeId] || 0;

      return {
        ...prevIndexes,
        [homeId]: currentIndex === 0 ? imagesLength - 1 : currentIndex - 1,
      };
    });
  };

  return (
    <>
      <Helmet>
        <title>Host Homes</title>
      </Helmet>

      <Navbar />

      <section className="px-4 sm:px-6 lg:px-8 pb-10">
        {/* Page Heading */}
        <h2 className="text-3xl text-center mt-6 mb-8 font-semibold italic">
          Here are your Host Homes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
          {hostHomes.map((home) => {
            const currentImageIndex = currentImageIndexes[home.houseId] || 0;

            return (
              <div
                key={home.houseId}
                className=" w-full rounded-xl overflow-hidden shadow-[0px_-1px_9px_-3px_white] hover:-translate-y-2 hover:shadow-[0px_5px_20px_-5px_white] transition-all duration-500
                "
              >
                <div className="homeCard h-full flex flex-col">
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden">
                    {home.images && home.images.length > 0 ? (
                      <>
                        <img
                          src={`${API_URL}/host/home-image/${home.images[currentImageIndex].imageId}`}
                          alt={home.houseName}
                          className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/30" />

                        <div className="absolute bottom-8 left-5 sm:left-10 lg:left-6 text-white">
                          <h1 className="text-2xl sm:text-3xl font-bold drop-shadow-lg">
                            {home.houseName}
                          </h1>

                          <p className="mt-2 text-lg sm:text-xl">
                            {home.houseArea}
                          </p>
                        </div>

                        {home.images.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              previousImage(home.houseId, home.images.length)
                            }
                            className=" absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full  bg-black/50  hover:bg-black/80  text-white text-3xl flex items-center justify-center transition cursor-pointer
                            "
                          >
                            ←
                          </button>
                        )}

                        {home.images.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              nextImage(home.houseId, home.images.length)
                            }
                            className=" absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full  bg-black/50  hover:bg-black/80  text-white text-3xl flex items-center justify-center transition cursor-pointer
                            "
                          >
                            →
                          </button>
                        )}

                        {home.images.length > 1 && (
                          <div
                            className=" absolute bottom-6 left-1/2 -translate-x-1/2  bg-black/60  text-white  px-4 py-2  rounded-full  text-sm
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
                  </div>

                  <div className="p-4 flex-1">
                    <h3
                      className="
                        text-xl
                        font-bold
                        mb-5
                        wrap-break-word
                      "
                    >
                      {home.houseName}
                    </h3>

                    <div className="space-y-3 text-[16px]">
                      <p className="wrap-break-word">
                        <span className="font-semibold">Area:</span>{" "}
                        {home.houseArea}
                      </p>

                      <p className="wrap-break-word">
                        <span className="font-semibold">Owner:</span>{" "}
                        {home.houseOwner}
                      </p>

                      <p className="wrap-break-word">
                        <span className="font-semibold">Rent:</span> ₹
                        {Number(home.houseRent)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 p-4 pt-2">
                    <NavLink
                      to={`/host/edit-home/${home.houseId}?editing=true`}
                      className=" text-center flex-1 p-2.5 rounded-lg cursor-pointer font-semibold shadow-[0px_-1px_9px_-3px_white]  hover:bg-amber-400  hover:text-black hover:shadow-[0px_0px_12px_-2px_white] transition-all duration-500
                      "
                    >
                      Edit Home
                    </NavLink>

                    <NavLink
                      to={`/host/delete-home/${home.houseId}`}
                      className="text-center flex-1 p-2.5 rounded-lg cursor-pointer font-semibold shadow-[0px_-1px_9px_-3px_white]  hover:bg-red-500  hover:text-white hover:shadow-[0px_0px_12px_-2px_white] transition-all duration-500
                      "
                    >
                      Delete Home
                    </NavLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default HostHomes;
