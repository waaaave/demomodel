import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <a href="/demo" style={{'display': 'inline', 'fontSize':'24px', 'textAlign':'center'}}>click to see demo</a>
    </div>
  )
}
