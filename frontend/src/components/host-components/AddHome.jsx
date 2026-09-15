import React, { useContext, useEffect } from "react";
import Navbar from "../Navbar";
import { Helmet } from "react-helmet-async";
import HostContext from "../../store/host/HostContext";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const AddHome = () => {
  const { home, setHome, addHome, editHome, updateHome, resetHome } =
    useContext(HostContext);
  const navigateTo = useNavigate();
  const { houseId } = useParams();
  const [searchParams] = useSearchParams();
  const editing = searchParams.get("editing") === "true";

  useEffect(() => {
    if (houseId) {
      editHome(houseId);
    } else {
      resetHome();
    }
  }, [houseId]);

  const newHome = async (e) => {
    e.preventDefault();
    try {
      addHome(
        home.houseName,
        home.houseArea,
        home.houseRent,
        home.houseImage,
        home.houseOwner
      );
      setHome({
        houseName: "",
        houseArea: "",
        houseRent: 0,
        houseImage: [],
        houseOwner: "",
      });
      navigateTo("/host/homes");
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <>
      <Helmet>
        {editing ? (
          <title>Edit Home | StayMitra</title>
        ) : (
          <title>Add Home | StayMitra</title>
        )}
      </Helmet>

      <div className="min-h-screen  text-white">
        <Navbar />

        <section className="px-4 pt-10 pb-6 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
            StayMitra
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Add Your Home
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-gray-400">
            Share your beautiful place with guests and start hosting on
            StayMitra.
          </p>
        </section>

        <main className="flex justify-center px-4 pb-16">
          <section className="w-full max-w-2xl rounded-3xl border shadow-[0px_0px_11px_-3px_white] border-gray-800 bg-gray-900 p-6  sm:p-8">
            <form
              onSubmit={async (e) => {
                if (editing) {
                  updateHome(e, houseId);
                  navigateTo("/host/homes");
                } else {
                  newHome(e);
                }
              }}
            >
              <input type="hidden" name="houseId" value={home.houseId} />
              <div className="mb-6">
                <label
                  htmlFor="houseName"
                  className="mb-2 block text-sm text-[1rem] text-gray-300"
                >
                  Home Name
                </label>

                <input
                  id="houseName"
                  type="text"
                  name="houseName"
                  placeholder="e.g. Cozy Beach House"
                  className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none placeholder:text-gray-400 transition focus:border-white focus:ring-2 focus:ring-white/10 "
                  onChange={(e) =>
                    setHome({ ...home, houseName: e.target.value })
                  }
                  value={home.houseName}
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="houseArea"
                  className="mb-2 text-[1rem] block text-sm font-medium text-gray-300"
                >
                  Home Area
                </label>

                <input
                  id="houseArea"
                  type="text"
                  name="houseArea"
                  placeholder="e.g. Mumbai, Maharashtra"
                  className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none placeholder:text-gray-400 transition focus:border-white focus:ring-2 focus:ring-white/10"
                  onChange={(e) =>
                    setHome({ ...home, houseArea: e.target.value })
                  }
                  value={home.houseArea}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="houseRent"
                  className="mb-2 block text-[1rem] text-sm font-medium text-gray-300"
                >
                  Rent Per Night
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    ₹
                  </span>

                  <input
                    id="houseRent"
                    type="number"
                    name="houseRent"
                    placeholder="2500"
                    className="w-full rounded-xl border border-gray-700 bg-gray-950 py-3 pl-9 pr-4 text-white outline-none placeholder:text-gray-400 transition focus:border-white focus:ring-2 focus:ring-white/10"
                    onChange={(e) =>
                      setHome({ ...home, houseRent: e.target.value })
                    }
                    value={home.houseRent}
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="houseImage"
                  className="mb-2 block  text-[1rem] text-sm font-medium text-gray-300"
                >
                  House Image
                </label>

                <label
                  htmlFor="houseImage"
                  className="flex cursor-pointer text-[1rem] flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-700 bg-gray-950 px-6 py-8 text-center transition hover:border-gray-500 hover:bg-gray-900"
                >
                  <div className="mb-3 text-3xl">📷</div>

                  <p className="font-medium text-gray-300">
                    Upload your home image
                  </p>

                  <p className="mt-1 text-sm text-gray-400">PNG, JPG or JPEG</p>

                  <input
                    id="houseImage"
                    type="file"
                    name="houseImage"
                    multiple
                    accept="image/png, image/jpeg, image/jpg"
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      setHome({
                        ...home,
                        houseImage: files,
                      });
                    }}
                  />
                </label>
              </div>

              {home.houseImage.map((houseImage, index) => (
                <li className="m-4" key={index}>
                  {houseImage.name}
                </li>
              ))}

              <div className="mb-8">
                <label
                  htmlFor="houseOwner"
                  className="mb-2 text-[1rem] block text-sm font-medium text-gray-300"
                >
                  House Owner
                </label>

                <input
                  id="houseOwner"
                  type="text"
                  name="houseOwner"
                  placeholder="Enter owner's name"
                  className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none placeholder:text-gray-400 transition focus:border-white focus:ring-2 focus:ring-white/10"
                  onChange={(e) =>
                    setHome({ ...home, houseOwner: e.target.value })
                  }
                  value={home.houseOwner}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full  rounded-xl bg-white px-5 py-3.5 font-semibold text-black transition duration-200 hover:bg-gray-200 active:scale-[0.98]"
              >
                {editing ? "Update Home" : "Add Home"}
              </button>
            </form>
          </section>
        </main>
      </div>
    </>
  );
};

export default AddHome;
