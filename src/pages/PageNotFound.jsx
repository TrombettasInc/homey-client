import React from "react";
import styles from './PageNotFound.module.css';
import { useNavigate } from "react-router-dom"; 


function PageNotFound() {

  const navigate = useNavigate();  

  const handleGoBack = () => {
    navigate('/projects');  
  };
  
  return (
    <main className={styles.container}>
      <div className={styles.imageBg}>
        <img 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ac4729253b2ec0861ba630f90aa6742e41890347c7f43ae4ca617e29d1121f0b?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0" 
          alt="404 Error Illustration" 
          className={styles.errorImage} 
        />
      </div>
      <section className={styles.textContainer}>
        <div className={styles.textBox}>
          <h1 className={styles.title}>Oops!</h1>
          <p className={styles.subtitle}>
            seems like the page you're looking for doesn't exist...
          </p>
        </div>
      </section>
      <button className={styles.backButton}onClick={handleGoBack}>
        <div className={styles.backButtonContent}>
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c2f734fe01116cab2559be99bb82303d26b811b53bf6c0fa34f2819ddfe2885f?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0" 
            alt="" 
            className={styles.backButtonIcon} 
          />
          <span className={styles.backButtonText}>let's go back</span>
        </div>
      </button>
    </main>
  );
}

export default PageNotFound;