"use client";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Input,
  TextField,
  Typography,
} from "@mui/material";
// import styles from "@/styles/Home.module.css";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { ChangeEvent, FormEvent, useState } from "react";
import dynamic from "next/dynamic";
import { db, storage } from "@/firebase";
import { v4 as uuidv4 } from "uuid";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
// export const storage = firebase.storage();

interface DrawingPost {
  imageUrl: string;
  title: string;
  createdAt: number;
  id: string;
}

interface Props {
  allDrawings: DrawingPost[];
}

export default function Home({ allDrawings }: Props) {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<Blob | null>(null);
  const [url, setURL] = useState("");

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(e.target.files[0]);
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
  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!title || !image) {
      alert("Please draw something");
      return;
    }

    try {
      const imageRef = storageRef(storage, `images/${uuidv4()}`);
      await uploadBytes(imageRef, image);

      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, "drawdb"), {
        title,
        imageUrl,
        createdAt: serverTimestamp(),
      });

      alert("drawing created successfully");
      setTitle("");
      setImage(null);
      router.push("/draw");
    } catch (error) {
      console.error("Error creating drawing:", error);
      alert("Failed to create drawings");
    }
  };

  return (
    <>
      <Container>
        <Typography sx={{ my: 5, textAlign: "center" }}>Home Page</Typography>

        <TextField
          label="Title"
          value={title}
          onChange={handleTitleChange}
          fullWidth
        />
        <Input type="file" onChange={handleImgChange} />
        <Button variant="contained" sx={{ mx: 2 }} onClick={handleSubmit}>
          Save
        </Button>
        <Typography variant="h1">My Drawings</Typography>
        <Grid container spacing={2}>
          {allDrawings.map((picture) => (
            <Grid item key={picture.id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <CardMedia
                    component="img"
                    height="200"
                    image={picture.imageUrl}
                    alt=""
                    style={{ maxWidth: "100%" }}
                  />

                  <Typography variant="h6">{picture.title}</Typography>
                  <Typography>
                    Created at: {new Date(picture.createdAt).toLocaleString()}
                  </Typography>
                  <Link href={`/dashboard/${picture.id}`}>
                    <Button variant="contained">Read More</Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const q = query(
    collection(db, "drawdb"),
    orderBy("createdAt", "desc"),
    limit(6)
  );
  const querySnapshot = await getDocs(q);
  // console.log(querySnapshot);
  const allDrawings: any = querySnapshot.docs.map((docSnap) => ({
    ...docSnap.data(),
    createdAt: docSnap.data().createdAt.toMillis(),
    id: docSnap.id,
  }));


  return {
    props: { allDrawings },
  };
};
