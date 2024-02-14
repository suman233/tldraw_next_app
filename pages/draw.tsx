// import TldrawWrapper from "@/components/Tldraw/TldrawWrapper";
import { Box, Button, Card } from "@mui/material";
import { Typography } from "@mui/material/styles/createTypography";
import dynamic from "next/dynamic";
import { auth, storage } from "@/firebase";
// import firebase from 'firebase/app';
import { useState } from "react";
import { Canvas, TLUiOverrides } from "@tldraw/tldraw";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

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
  const [drawing, setDrawing] = useState<CanvasDrawImage | null>(null);

  const saveDrawingToFirebase = async () => {
    if (!drawing) return;

    const drawingRef = storageRef(storage, "drawings/drawing.png");

    // const blob = await drawing.drawImage.toBlob()
    // drawingRef.put(blob).then((snapshot) => {
    //   console.log('Drawing saved to Firebase Storage!');
    // });
  };

  
  return (
    <>
      <Box style={{ position: "fixed", inset: 0 }}>
        <TldrawWrapper />
        <div style={{ position: "absolute", marginTop: "42%" }}>
          {/* <Canvas
          onChange={(e) => setDrawing(e)}
          defaultValue={/ default drawing data /}
      /> */}
      
          <Button variant="contained">Save</Button>
        </div>
      </Box>
    </>
  );
};

export default Draw;
