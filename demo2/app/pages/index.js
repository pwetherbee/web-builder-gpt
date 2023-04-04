import React from 'react';
import Link from 'next/link';
import '../styles/global.css';

export default function Home() {
  return (
    <>
      <nav>
        <Link href="/"><a>Home</a></Link>
        <Link href="/about"><a>About Us</a></Link>
      </nav>
      <h1>Patrick</h1>
      <div className="greetings">
        <p>Hello (English)</p>
        <p>Hola (Spanish)</p>
        <p>Bonjour (French)</p>
      </div>
    </>
  );
}
