import React from "react";
import axiosBase from "axios";

export function SoundCloudEmbed(props) {
  const url = props.url;
  let init = props.init;
  const [trackID, setTrackID] = React.useState();
  const axios = axiosBase.create({
    //baseURL: "http://localhost:3000", // バックエンドB のURL:port を指定する
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
    axios.get("api/getSoundCloudTrackID").then((res) => {
      setTrackID(res.data.trackID);
    });
    init = false;
  }

  return (
    <>
      {trackID === undefined ? (
        <div
          style={{
            width: "100%",
            height: 300,
            background: "#eee",
          }}
        ></div>
      ) : (
        <iframe
          width="100%"
          height="300"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={
            "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" +
            trackID +
            "&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
          }
        ></iframe>
      )}
    </>
  );
}
