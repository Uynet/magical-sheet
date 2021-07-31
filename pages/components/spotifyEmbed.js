import React, { useState, useEffect } from "react";

export function SpotifyEmbed(props) {
  const ref = React.useRef();
  const url = props.url;

  const type = url.indexOf("track/") != -1 ? "track" : "album";
  const ID = url.split(type + "/")[1].split("?")[0];
  return (
    <>
      <iframe
        src={"https://open.spotify.com/embed/" + type + "/" + ID}
        ref={ref}
        width="100%"
        height="380"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    </>
  );
}
