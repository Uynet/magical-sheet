import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axiosBase from "axios";
import React, { useState, useEffect } from "react";

const api =
  "https://script.googleusercontent.com/macros/echo?user_content_key=0fUxMW4mpkAyqS0ITItiV5PWMDRXpHW-zrtnWbHRcgX3-5zU2LhWWiq8iFXq2dyJMdV65EXDc6_tnVMg0nVxkPpLG5C5yhnIm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnEW-DLxYGLjYQy9XCtWxk3oO7qP1OkYMqXq_6MWsaFtqQ78f0v5BuIuOBiYQdpam5bZR2sTbrv4X_oUk-9xy9RDeuEw2opXKBw&lib=MpX9rb-90rMYO9S6HI_TeypeSVVadBdJf";

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
            <div key={i} className={styles.musicItem}>
              {d["曲名"]}{" "}
            </div>
          );
        })}
      </div>
    </>
  );
}
function MovieClip() {
  return <div style={{ background: "#888", width: "50vw" }}>ここに動画</div>;
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
  render() {
    return (
      <React.Fragment className={styles.container}>
        <Head>
          <title>おすすめ曲聴き放題</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div style={{ display: "flex" }}>
          <MovieClip />
          <MusicList data={this.props.data} />
        </div>
        <a
          className={styles.link}
          href="https://docs.google.com/spreadsheets/d/1KasjqVSUkU0JHHYvpmytPJI_tBIkqpV_ZzhIBFBCjFc/edit#gid=0"
        >
          おすすめ曲き書放題
        </a>
        の曲を自動で再生するwebプレイヤーです
      </React.Fragment>
    );
  }
}
