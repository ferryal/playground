import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Playground</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome candidates
        </h1>

        <p className={styles.description}>
          This is a playground project for Tomorrow's Education hiring process. you can fork this repository and continue with your assigment. If you need to do any backend stuff to complete your task check <a href="/api/hello">API example</a> for references to do the backend work in this repository
        </p>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
