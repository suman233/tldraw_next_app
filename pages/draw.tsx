// import TldrawWrapper from "@/components/Tldraw/TldrawWrapper";
import { Box, Button, Card, Container, Grid, TextField } from "@mui/material";
import { Typography } from "@mui/material/styles/createTypography";
import dynamic from "next/dynamic";
import { auth, storage } from "@/firebase";
// import firebase from 'firebase/app';
import { useState } from "react";

import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { Tldraw } from "@tldraw/tldraw";

const TldrawWrapper = dynamic(
  () => import("@/components/Tldraw/TldrawWrapper"),
  {
    ssr: false,
  }
);

export function toBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
    });
  });
}

const Draw = () => {
  // const editor=useEditor()
  const [drawing, setDrawing] = useState<CanvasDrawImage | null>(null);

  const saveDrawingToFirebase = async () => {
    if (!drawing) return;

    const drawingRef = storageRef(storage, "drawings/drawing.png");

    // const blob = await drawing.drawImage.toBlob()
    // drawingRef.put(blob).then((snapshot) => {
    //   console.log('Drawing saved to Firebase Storage!');
    // });
  };

  //   const canvasRef = useRef(null);
  //   const [drawing, setDrawing] = useState(null);

  //   useEffect(() => {
  //     // Load existing drawing from Firestore
  //     const loadDrawing = async () => {
  //       const docRef = await db.collection('drawings').doc('drawingId').get();
  //       if (docRef.exists) {
  //         setDrawing(docRef.data());
  //       }
  //     };
  //     loadDrawing();
  //   }, []);

  //   const saveDrawing = async () => {
  //     const drawingData = canvasRef.current.getDrawingData();
  //     await storage.ref('drawings/drawingId').putString(JSON.stringify(drawingData));
  //     setDrawing(drawingData);
  //   };
  // const updateDrawing = async () => {
  //     const drawingData = canvasRef.current.getDrawingData();
  //     await storage.ref('drawings/drawingId').putString(JSON.stringify(drawingData));
  //     setDrawing(drawingData);
  //   };

  const [image, setImage] = useState<string[] | {}>();
  // const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) setImage(e.target.files[0]);
  // };

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Button>Save</Button>
          </Grid>
          <Grid item xs={8}>
            <Box>
            <div style={{ position: "fixed", inset: 0 }}>
      
      <TldrawWrapper
      />
    </div>
            </Box>
          </Grid>

          {/* <div style={{ position: "absolute", marginTop: "42%" }}>
          <Canvas
          onChange={(e) => setDrawing(e)}
          defaultValue={/ default drawing data /}
      />

      
      
      
          <Button variant="contained">Save</Button>
        </div> */}
          <Grid item xs={2}>
            <Button>Load</Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Draw;
