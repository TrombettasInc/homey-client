import React from 'react';
import { Link } from "react-router-dom";
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <main className={styles.homepage}>
      {/* Header Section */}
      <header className={styles.header}>
        <img 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/df815ec07b8c69a75a37f8b1d1fd22c58ef7d75971751f3b7bf6cc90c735e56f?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0" 
          alt="Homey logo" 
          className={styles.logo} 
        />
        <h2 className={styles.brandName}>homey</h2>
      </header>

      {/* Project Creation Section */}
      <section className={styles.projectCreation}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>Create projects!</h1>
          <p className={styles.subtitle}>
            Create awesome projects for your home in a fast and cool way
          </p>
        </div>
      </section>

      {/* Action Button with Link */}
      <Link to="/projects">
        <button className={styles.actionButton}>
          <span className={styles.buttonText}>To my projects!</span>
        </button>
      </Link>

      {/* Illustration */}
      <img 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c6b846af6823002d8745e9b4998e1459ddc102332e0d6fa398c5c1f0b85ac748?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0" 
        alt="Illustration of home projects" 
        className={styles.projectIllustration} 
      />
    </main>
  );
}

export default HomePage;
