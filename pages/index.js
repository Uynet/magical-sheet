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
function MovieClip(props) {
  const musicData = props.musicData;
  const url = musicData
    ? musicData["リンク(SoundCloud, Spotify, YouTube)"]
    : "a";
  if (musicData != null)
    console.log(musicData["リンク(SoundCloud, Spotify, YouTube)"]);
  return <div style={{ background: "#ddd", width: "50vw" }}>{url}</div>;
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
    console.log(music);
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
