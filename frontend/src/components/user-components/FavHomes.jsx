import React, { useContext } from "react";
import Navbar from "../Navbar";
import { Helmet } from "react-helmet-async";
import UserContext from "../../store/user/UserContext";

const FavHomes = () => {
  const { favHomes, removeUserFavHome } = useContext(UserContext);
  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <>
      <Helmet>
        <title>user fav homes</title>
      </Helmet>
      <Navbar />
      <section>
        <h2 className="text-3xl text-center mt-6 mb-6 font-semibold italic">
          Here are your Fav Homes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {favHomes.map((home) => {
            return (
              <div
                key={home.houseId}
                className="
                  m-4
                  w-[90%]
                  rounded-xl
                  overflow-hidden
                  shadow-[0px_-1px_9px_-3px_white]
                  hover:-translate-y-2
                  hover:shadow-[0px_5px_20px_-5px_white]
                  transition-all
                  duration-500
                "
              >
                <div className="homeCard h-full flex flex-col">
                  <div className="p-2 relative">
                    {home.images.length > 0 ? (
                      <img
                        src={`${API_URL}/host/home-image/${home.images[0].imageId}`}
                        alt={home.houseName}
                        className=" w-full h-52 sm:h-48 lg:h-52 object-cover rounded-lg
                        "
                      />
                    ) : (
                      <div
                        className=" w-full h-52 sm:h-48 lg:h-52 rounded-lg flex items-center justify-center  bg-gray-600  text-gray-300
                        "
                      >
                        No Image Available
                      </div>
                    )}
                    <div className="absolute top-3.75 right-3.75">
                      <span className="text-4xl">❤️</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4 flex-1">
                    <h3 className="text-xl font-bold mb-4 wrap-break-word">
                      {home.houseName}
                    </h3>

                    <div className="space-y-2 text-[16px] sm:text-[17px]">
                      <p className="wrap-break-word">
                        <b>Area:</b> {home.houseArea}
                      </p>

                      <p className="wrap-break-word">
                        <b>Owner:</b> {home.houseOwner}
                      </p>

                      <p className="wrap-break-word">
                        <b>Rent:</b> ₹{home.houseRent}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 p-4 pt-2">
                    <button
                      onClick={() => removeUserFavHome(home.houseId)}
                      className="
                        flex-1
                        p-2.5
                        rounded-lg
                        cursor-pointer
                        font-semibold
                        shadow-[0px_-1px_9px_-3px_white]
                        hover:bg-pink-500
                        hover:text-white
                        hover:shadow-[0px_0px_12px_-2px_white]
                        transition-all
                        duration-500
                      "
                    >
                      Remove From Fav
                    </button>
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

export default FavHomes;
