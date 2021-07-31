import React from "react";
import axiosBase from "axios";

export function BandCampEmbed(props) {
  const url = props.url;
  let init = props.init;
  const [trackCode, setTrackID] = React.useState();
  const axios = axiosBase.create({
    params: {
      TrackURL: url,
    },
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Access-Control-Allow-Origin": "*",
    },
    responseType: "json",
  });
  if (init) {
    axios.get("api/getBandCampTrackID").then((res) => {
      setTrackID(res.data.trackCode);
    });
    init = false;
  }
  return (
    <>
      {trackCode === undefined ? (
        <div style={{ width: 350, height: 470, background: "#eee" }}></div>
      ) : (
        <iframe
          style={{ border: 0, width: 350, height: 470 }}
          src={trackCode}
          seamless
        ></iframe>
      )}
    </>
  );
}
