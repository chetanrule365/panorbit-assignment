import React, { useEffect } from "react";
import { users, user as currentUser } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usersStoreData = useSelector((state) => state.users.list);

  const getUsers = async () => {
    return await fetch("https://panorbit.in/api/users.json");
  };

  useEffect(() => {
    getUsers().then(async (data) => {
      const usersData = await data.json();
      dispatch(users(usersData?.users));
    });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="shadow-md rounded-2xl w-full max-w-[560px] overflow-clip">
        <h2 className="bg-slate-100 p-8 text-center text-2xl font-bold text-gray-600">
          Select an account
        </h2>
        <div className="h-[50vh] overflow-y-scroll px-9">
          {(usersStoreData || [])?.map((user) => {
            const { id, profilepicture, name: userName } = user;
            return (
              <div
                key={id}
                className="py-3 border-t-2 first-of-type:border-t-0 flex items-center gap-3 cursor-pointer"
                onClick={() => {
                  dispatch(currentUser(user));
                  navigate("/profile");
                }}
              >
                <img
                  src={profilepicture}
                  alt="profile"
                  className="w-9 h-9 object-cover rounded-full"
                />
                <p>{userName}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
