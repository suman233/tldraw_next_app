import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Container, Typography } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Container>
        <Typography sx={{my:5, textAlign:'center'}}>Home Page</Typography>
      </Container>
    </>
  );
}
