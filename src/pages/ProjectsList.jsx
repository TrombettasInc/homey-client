import { useState, useEffect } from "react";
import axios from "axios";
import ProjectCard from "../Components/ProjectCard";
import { useNavigate } from "react-router-dom";
import styles from './ProjectsList.module.css';
import { motion } from 'framer-motion';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const colors = ['#E9E7FC', '#FFF3F8', '#FFF4CC', '#D6FCF7', '#FFE8E8'];

  const getAllProjects = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  const handleGoBack = () => {
    navigate('/create');
  };

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Animation variants for the container and cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.6, // Delays each child's animation
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
    >
      {projects.length === 0 ? (
        <main className={styles.listcontainer}>
          <div className={styles.listimageBg} role="img" aria-label="Decorative background image">
            <span className={styles.listpeoplecontainer}>
              <img
                src="/emptypage.png"
                alt=""
                className={styles.listpeople}
              />
            </span>
          </div>
          <section className={styles.listcontentBox}>
            <h1 className={styles.listtitle}>let's go!</h1>
            <p className={styles.listsubtitle}>
              looks like you don't currently have any projects, but no problem, click the button to
            </p>
            <button className={styles.listbutton} onClick={handleGoBack}>
              <span className={styles.listbuttonContent}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ea4d14243520560bc7e62b21d3eeffb65ecfd04a01105b59e25604071f1481c?placeholderIfAbsent=true&apiKey=60afd9c2e7064e039d088416e43472c0"
                  alt=""
                  className={styles.listbuttonIcon}
                />
                <span className={styles.listbuttonText}>create!</span>
              </span>
            </button>
          </section>
        </main>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={styles.projectListContainer} // Optional: Add a wrapper style
        >
          {projects.map((project) => (
            <motion.div key={project._id} variants={cardVariants}>
              <ProjectCard
                projects={projects}
                projectId={project._id}
                title={project.title}
                isDone={project.isDone}
                startDate={project.startDate}
                getProject={getAllProjects}
                color={getRandomColor()}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

export default ProjectList;
