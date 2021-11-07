import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import NowPlaying from '../components/NowPlaying'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Streaming overlay</title>
      </Head>
      <main className={styles.main}>
        <NowPlaying />
      </main>
    </div>
  )
}
