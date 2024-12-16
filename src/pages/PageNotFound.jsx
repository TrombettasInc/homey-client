import React from "react";
import styles from './PageNotFound.module.css';
import { useNavigate } from "react-router-dom"; 
import { motion } from 'framer-motion';


function PageNotFound() {

  const navigate = useNavigate();  

  const handleGoBack = () => {
    navigate('/projects');  
  };
  
  return (
    <motion.div 
    className={styles.notcontainer}
    
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    >
      <div className={styles.notimageBg}>
        <img 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ac4729253b2ec0861ba630f90aa6742e41890347c7f43ae4ca617e29d1121f0b?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0" 
          alt="404 Error Illustration" 
          className={styles.noterrorImage} 
        />
      </div>
      <section className={styles.nottextContainer}>
        <div className={styles.nottextBox}>
          <h1 className={styles.nottitle}>Oops!</h1>
          <p className={styles.notsubtitle}>
            seems like the page you're looking for doesn't exist...
          </p>
        </div>
      </section>
      <button className={styles.notbackButton}onClick={handleGoBack}>
        <div className={styles.notbackButtonContent}>
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c2f734fe01116cab2559be99bb82303d26b811b53bf6c0fa34f2819ddfe2885f?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0" 
            alt="" 
            className={styles.notbackButtonIcon} 
          />
          <span className={styles.notbackButtonText}>let's go back</span>
        </div>
      </button>
    </motion.div>
  );
}

export default PageNotFound;