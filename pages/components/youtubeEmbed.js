import React from "react";
import getYoutubeID from "get-youtube-id";

export function YoutubeEmbed(props) {
  const url = props.url;
  const ID = getYoutubeID(url);
  const embedURL = "https://www.youtube.com/embed/" + ID + "?autoplay=1";
  return (
    <iframe
      style={{
        width: "100%",
        height: "60vh",
      }}
      src={embedURL}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}
