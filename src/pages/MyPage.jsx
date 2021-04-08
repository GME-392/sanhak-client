import React from "react";
//Page Components
import Main from "../components/Main/Main";
import ServicesSection from "../components/ServicesSection";
import FaqSection from "../components/FaqSection";
//Animations
import { motion } from "framer-motion";
import { pageAnimation } from "../animation";
import ScrollTop from "../components/ScrollTop";

const MyPage = () => {
  return (
    <motion.div
      exit="exit"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
    >
      <Main />
      <div>hihi</div>
    </motion.div>
  );
};

export default MyPage;
