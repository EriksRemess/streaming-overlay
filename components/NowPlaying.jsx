import React from "react";
import useSWR from 'swr';
import style from './NowPlaying.module.css';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function NowPlaying() {
  const { data, error } = useSWR('/api/spotify', fetcher, { refreshInterval: 5000 });
  if (error) return "An error has occurred.";
  if (!data) return "Loading...";

  if (data.isPlaying) {
    return (
      <div className={style.notification}>
        <img src={data.albumImageUrl} />
        <div className={style.info}>
          <h2>{data.title}</h2>
          <h3>{data.artist}</h3>
        </div>
      </div>
    );
  } else {
    return <div></div>
  }
}
