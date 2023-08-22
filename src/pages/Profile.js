import React, { useEffect, useRef } from "react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { Wrapper } from "@googlemaps/react-wrapper";

function MyMapComponent({ center, zoom }) {
  const ref = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
  }, []);

  return <div className="h-[360px] mt-2 rounded-2xl" ref={ref} id="map"></div>;
}

function ProfilePage() {
  const user = useSelector((state) => state.users.currentUser);
  const {
    name,
    username,
    profilepicture,
    email,
    phone,
    website,
    company,
    address,
  } = user || {};
  const { name: companyName, catchPhrase, bs } = company || {};
  const {
    street,
    suite,
    city,
    zipcode,
    geo: { lat, lng } = {},
  } = address || {};
  console.log(lat, lng);

  const rowStyles = "h-10";
  const keyStyles = "text-end text-xl text-gray-400 w-[108px]";
  const middleStyles = "text-xl text-gray-400 px-3";
  const valueStyles = "text-xl text-gray-600 font-semibold w-[240px]";

  return (
    <Layout>
      <div className="flex py-8">
        <div className="w-[640px] flex flex-col items-center border-r-[1px] border-gray-300 pr-10">
          <img
            src={profilepicture}
            alt="profile"
            className="w-[200px] h-[200px] object-cover rounded-full"
          />
          <p className="text-2xl text-gray-600 font-semibold my-1">{name}</p>
          <table>
            <tbody>
              <tr className={rowStyles}>
                <td className={keyStyles}>Username</td>
                <td className={middleStyles}>:</td>
                <td className={valueStyles}>{username}</td>
              </tr>
              <tr className={rowStyles}>
                <td className={keyStyles}>e-mail</td>
                <td className={middleStyles}>:</td>
                <td className={valueStyles}>{email}</td>
              </tr>
              <tr className={rowStyles}>
                <td className={keyStyles}>Phone</td>
                <td className={middleStyles}>:</td>
                <td className={valueStyles}>{phone?.split(" ")[0]}</td>
              </tr>
              <tr className={rowStyles}>
                <td className={keyStyles}>Website</td>
                <td className={middleStyles}>:</td>
                <td className={valueStyles}>{website}</td>
              </tr>
            </tbody>
          </table>
          <hr className="border-1 border-gray-300 w-full mt-4 mb-3" />
          <p className="text-xl text-gray-400 mb-2">Company</p>
          <table>
            <tbody>
              <tr className={rowStyles}>
                <td className={keyStyles}>Name</td>
                <td className={middleStyles}>:</td>
                <td className={valueStyles}>{companyName}</td>
              </tr>
              <tr className={rowStyles}>
                <td className={keyStyles}>catchphrase</td>
                <td className={middleStyles}>:</td>
                <td className={valueStyles}>{catchPhrase}</td>
              </tr>
              <tr className={rowStyles}>
                <td className={keyStyles}>bs</td>
                <td className={middleStyles}>:</td>
                <td className={valueStyles}>{bs}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-10 w-full">
          <p className="text-xl text-gray-400">Address :</p>
          <table>
            <tbody>
              <tr className={rowStyles}>
                <td className={keyStyles}>Street</td>
                <td className={middleStyles}>:</td>
                <td className={valueStyles}>{street}</td>
              </tr>
              <tr className={rowStyles}>
                <td className={keyStyles}>Suite</td>
                <td className={middleStyles}>:</td>
                <td className={valueStyles}>{suite}</td>
              </tr>
              <tr className={rowStyles}>
                <td className={keyStyles}>City</td>
                <td className={middleStyles}>:</td>
                <td className={valueStyles}>{city}</td>
              </tr>
              <tr className={rowStyles}>
                <td className={keyStyles}>Zipcode</td>
                <td className={middleStyles}>:</td>
                <td className={valueStyles}>{zipcode}</td>
              </tr>
            </tbody>
          </table>
          <Wrapper apiKey="AIzaSyCT9pp0GRfFO6z4cQTWBzlS-Xq1n_QrYsM">
            <MyMapComponent
              center={{ lat: Number(lat), lng: Number(lng) }}
              zoom={4}
            />
          </Wrapper>
          <p className="text-gray-600 font-semibold text-end mt-2">
            <span className="text-gray-400 font-normal">Lat:</span> {lat}
            <span className="text-gray-400 font-normal">&nbsp;&nbsp;&nbsp;&nbsp;Long:</span>
            {lng}
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default ProfilePage;
