import React from 'react';
import Link from 'next/link';
import '../styles/global.css';

export default function About() {
  return (
    <>
      <nav>
        <Link href="/"><a>Home</a></Link>
        <Link href="/about"><a>About Us</a></Link>
      </nav>
      <h1>About Us</h1>
      <div className="container">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
      </div>
    </>
  );
}
