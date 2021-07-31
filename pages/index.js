import Head from "next/head";
import styles from "../styles/Home.module.css";
import React from "react";
import { BandCampEmbed } from "./components/bandcampEmbed.js";
import { YoutubeEmbed } from "./components/youtubeEmbed.js";
import { SoundCloudEmbed } from "./components/soundcloudEmbed.js";
import { SpotifyEmbed } from "./components/spotifyEmbed.js";

const fetch = require("node-fetch");

const api =
  "https://script.googleusercontent.com/macros/echo?user_content_key=YfoOZ0e6vE7w9A8sSY0RDI3hOyTRwAEmDJJcxHQ4jzgZBv0KbI6YPAJ3CHQhAJefncu-PGAsVuis5Xd4-eZ3doLBP9jFN4LUm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGGn-jv1zW0HvCFZJiGLeXhJIBnTz3iU52VBLYeuH12cGJe2xtZ560mYQPuZuHnDOIBBX4xV6km232z65N3Ky3-XijCblGpuWw&lib=MpX9rb-90rMYO9S6HI_TeypeSVVadBdJf";

function MusicList(props) {
  const currentMusicNo = props.currentMusic ? props.currentMusic["No"] : null;
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
          if (d["リンク(SoundCloud, Spotify, YouTube)"] == null) return;
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
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ width: "60vw" }}>
        {musicData ? (
          <>
            {serviceName == "youtube" && <YoutubeEmbed url={url} />}
            {serviceName == "soundcloud" && (
              <SoundCloudEmbed url={url} init={true} />
            )}
            {serviceName == "spotify" && <SpotifyEmbed url={url} />}
            {serviceName == "bandcamp" && (
              <BandCampEmbed url={url} init={true} />
            )}
            {serviceName == null && (
              <div className={styles.grayRect}>
                <a href={url}>再生できません</a>
              </div>
            )}
          </>
        ) : (
          <div className={styles.grayRect}>選択してください</div>
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
            おすすめ曲書き込み放題
          </a>
          専用のwebプレイヤーです
        </div>
      </div>
    );
  }
}
