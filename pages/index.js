import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";

const api =
  "https://script.googleusercontent.com/macros/echo?user_content_key=02h5-uVuYn9hN21A0dxfKobuMeyA7EDwIh5smQnUWTQjC3gdaGubyLaZwR8wIcSZrWjXZxT-GEmWaEQ5h-awWW2-zp6kq3Jjm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnF9JHnUKZDtXFUx0NPKGHUP6raWBymi1qgSUO-E3ZRnOO4kvFPlD74JeMC6jLfhKMkk-L_ReNOPV7PgbI06uhayqzFgB-1VsLQ&lib=MpX9rb-90rMYO9S6HI_TeypeSVVadBdJf";

function MusicList(props) {
  return (
    <>
      <div
        style={{
          textAlign: "left",
          height: "80vh",
          overflow: "auto",
        }}
      >
        {props.data.map((d, i) => {
          return (
            <div
              key={i}
              className={styles.musicItem}
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
function YoutubeEmbed(props) {
  const len = props.url.length;
  const ID = props.url.substr(len - 11, 11);
  console.log(ID);
  const embedURL = "https://www.youtube.com/embed/" + ID;
  //https://www.youtube.com/G2QGQd-yQ0s
  //https://www.youtube.com/embed/G2QGQd-yQ0s
  console.log(embedURL);
  return (
    <iframe
      style={{
        width: "100%",
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
  const serviceName = URLtoService(url);
  console.log(url);
  //src = "https://www.youtube.com/embed/G2QGQd-yQ0s";
  return (
    <div style={{ background: "#ddd", width: "50vw" }}>
      {serviceName == "youtube" && <YoutubeEmbed url={url} />}
      {serviceName == "soundcloud" && (
        <>
          <iframe
            width="100%"
            height="300"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1076869507&color=%23ff55d0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
          ></iframe>
          <div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;">
            <a href="https://soundcloud.com/uynet/45jqy2ydqyih"></a>
          </div>{" "}
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
          <MusicList data={this.props.data} onClick={this.select} />
        </div>
        <a
          className={styles.link}
          href="https://docs.google.com/spreadsheets/d/1KasjqVSUkU0JHHYvpmytPJI_tBIkqpV_ZzhIBFBCjFc/edit#gid=0"
        >
          おすすめ曲き書放題
        </a>
        の曲を自動で再生するwebプレイヤーです
      </div>
    );
  }
}
