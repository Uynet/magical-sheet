import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";
import getYoutubeID from "get-youtube-id";
import axiosBase from "axios";
const fetch = require("node-fetch");

const api =
  "https://script.googleusercontent.com/macros/echo?user_content_key=02h5-uVuYn9hN21A0dxfKobuMeyA7EDwIh5smQnUWTQjC3gdaGubyLaZwR8wIcSZrWjXZxT-GEmWaEQ5h-awWW2-zp6kq3Jjm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnF9JHnUKZDtXFUx0NPKGHUP6raWBymi1qgSUO-E3ZRnOO4kvFPlD74JeMC6jLfhKMkk-L_ReNOPV7PgbI06uhayqzFgB-1VsLQ&lib=MpX9rb-90rMYO9S6HI_TeypeSVVadBdJf";

function MusicList(props) {
  const currentMusicNo = props.currentMusic ? props.currentMusic["No"] : null;
  console.log(currentMusicNo);
  return (
    <>
      <div
        style={{
          textAlign: "left",
          height: "90vh",
          overflow: "auto",
        }}
      >
        {props.data.map((d, i) => {
          const isSelected = currentMusicNo == d["No"];
          const className = isSelected
            ? styles.selectedMusicItem
            : styles.musicItem;
          return (
            <div
              key={i}
              className={className}
              onClick={() => {
                props.onClick(d);
              }}
            >
              {d["曲名"]}
            </div>
          );
        })}
      </div>
    </>
  );
}
function SpotifyEmbed(props) {
  const url = props.url;
  const ID = url.split("track/")[1].split("?")[0];
  return (
    <>
      <iframe
        src={"https://open.spotify.com/embed/track/" + ID}
        width="100%"
        height="380"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    </>
  );
}
function SoundCloudEmbed(props) {
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
            "&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
          }
        ></iframe>
      )}
    </>
  );
}
function BandCampEmbed(props) {
  const url = props.url;
  let init = props.init;
  const [trackCode, setTrackID] = React.useState();
  const axios = axiosBase.create({
    baseURL: "http://localhost:3000", // バックエンドB のURL:port を指定する
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
      console.log(res.data.trackCode);
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
        >
          trackCode
        </iframe>
      )}
    </>
  );
}
function YoutubeEmbed(props) {
  const url = props.url;
  const ID = getYoutubeID(url);
  const embedURL = "https://www.youtube.com/embed/" + ID;
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

function MovieClip(props) {
  const URLtoService = (url) => {
    if (url.indexOf("spotify") > -1) return "spotify";
    if (url.indexOf("youtu") > -1) return "youtube";
    if (url.indexOf("soundcloud") > -1) return "soundcloud";
    if (url.indexOf("bandcamp") > -1) return "bandcamp";
    return null;
  };
  const musicData = props.musicData;
  const url = musicData
    ? musicData["リンク(SoundCloud, Spotify, YouTube)"]
    : "";
  const musicName = musicData ? musicData["曲名"] : "";
  const writer = musicData ? musicData["書いた人(not composer)"] : "";
  const comment = musicData ? musicData["コメント"] : "";
  const serviceName = URLtoService(url);
  //src = "https://www.youtube.com/embed/G2QGQd-yQ0s";
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ width: "60vw" }}>
        {serviceName == "youtube" && <YoutubeEmbed url={url} />}
        {serviceName == "soundcloud" && (
          <SoundCloudEmbed url={url} init={true} />
        )}
        {serviceName == "spotify" && <SpotifyEmbed url={url} />}
        {serviceName == "bandcamp" && <BandCampEmbed url={url} init={true} />}
        {serviceName == null && (
          <div
            style={{
              background: "#eee",
              width: "100%",
              height: "60vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
            }}
          >
            <div>
              <div>再生できません</div>
              <div>
                <a href={url}>{url}</a>
              </div>
            </div>
          </div>
        )}
      </div>
      {musicData && (
        <>
          <div className={styles.musicName}>{musicName}</div>
          <div style={{ fontSize: 9 }}>書いた人 : {writer} </div>
          <div style={{ fontSize: 9 }}>コメント : {comment} </div>
        </>
      )}
    </div>
  );
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentMusic: null };
    this.select = this.select.bind(this);
  }
  static async getInitialProps({ Component, router, ctx }) {
    try {
      const res = await fetch(api);

      const data = await res.json();
      return { data: data };
    } catch (e) {
      console.log(e);
      return { data: [] };
    }
  }
  select(music) {
    this.setState({ currentMusic: music });
  }
  render() {
    return (
      <div className={styles.container}>
        <Head>
          <title>おすすめ曲聴き放題</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div style={{ display: "flex" }}>
          <MovieClip musicData={this.state.currentMusic} />
          <MusicList
            data={this.props.data}
            onClick={this.select}
            currentMusic={this.state.currentMusic}
          />
        </div>

        <div style={{ fontSize: 8, padding: 10 }}>
          <a
            className={styles.link}
            href="https://docs.google.com/spreadsheets/d/1KasjqVSUkU0JHHYvpmytPJI_tBIkqpV_ZzhIBFBCjFc/edit#gid=0"
          >
            おすすめ曲き書放題
          </a>
          専用のwebプレイヤーです
        </div>
      </div>
    );
  }
}
