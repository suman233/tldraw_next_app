import React from "react";
import Header from "../Header/Header";
import { Box } from "@mui/material";
import Footer from "../Footer/Footer";

interface wrapperprops {
  children: JSX.Element | JSX.Element[];
}
const Wrapper = (props: wrapperprops) => {
  const { children } = props;
  return (
    <div>
      <Header />
      <Box className="body_content">{children}</Box>
      <Footer />
    </div>
  );
};

export default Wrapper;
