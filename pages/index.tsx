'use client'
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Box, Container, Typography } from "@mui/material";
// import styles from "@/styles/Home.module.css";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { ChangeEvent, FormEvent, useState } from "react";
import dynamic from "next/dynamic";
const TldrawWrapper=dynamic(()=>import("@/components/Tldraw/TldrawWrapper"),{
  ssr:false
})
const inter = Inter({ subsets: ["latin"] });
// export const storage = firebase.storage();

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setURL] = useState("");

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  // const handleUpload=async (e: FormEvent<HTMLFormElement>)=> {
  //   e.preventDefault();
  //   const path = `/images/${file.name}`;
  //   const ref = storage.ref(path);
  //   await ref.put(file);
  //   const url = await ref.getDownloadURL();
  //   setURL(url);
  //   setFile(null);
  // }

  return (
    <>
      <Container>
        <Typography sx={{ my: 5, textAlign: "center" }}>Home Page</Typography>
        <Box style={{ position: "fixed", inset: 0 }}>
         <TldrawWrapper/>
        </Box>

       
      </Container>
    </>
  );
}
