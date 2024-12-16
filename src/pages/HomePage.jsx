import React from 'react';
import { Link } from "react-router-dom";
import styles from './HomePage.module.css';
import {motion} from 'framer-motion';

function HomePage() {
  return (
    <motion.div 
    className={styles.homepage}
    
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    >

      {/* Project Creation Section */}
      <section className={styles.homepageprojectCreation}>
        <div className={styles.homepagecontentWrapper}>
          <h1 className={styles.homepagetitle}>create projects!</h1>
          <p className={styles.homepagesubtitle}>
            create awesome projects for your home in a fast and cool way
          </p>
        </div>
      </section>

      {/* Action Button with Link */}
      <Link to="/projects">
        <button className={styles.homepageactionButton}>
          <span className={styles.homepagebuttonText}>to my projects!</span>
        </button>
      </Link>

      {/* Illustration */}
      <img 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c6b846af6823002d8745e9b4998e1459ddc102332e0d6fa398c5c1f0b85ac748?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0" 
        alt="Illustration of home projects" 
        className={styles.homepageprojectIllustration} 
      />
    </motion.div>
  );
}

export default HomePage;
