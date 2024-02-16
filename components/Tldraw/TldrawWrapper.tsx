import { Button, Container, Grid } from "@mui/material";
import {
  Editor,
  Tldraw,
  useEditor,
} from "@tldraw/tldraw";
import { useEffect, useState } from "react";




interface SerializedSchema {
  recordVersions: Record<
    string,
    | {
        version: number;
        subTypeVersions: Record<string, number>;
        subTypeKey: string;
      }
    | {
        version: number;
      }
  >;
}

const TldrawWrapper = () => {
  const [editor,setEditor]=useState<Editor|null>(null)
  const [img,setImg]=useState<File| null>(null)
  const handleImg=()=>{
   !!editor && editor.store.getSnapshot()
    console.log(editor);
    localStorage.setItem('snap',editor?.store.getSnapshot() as any)
    
  }

  
  

  return (
    <Container>
      {/* {/ <Button onSubmit={handleSaveSnapShot} variant="contained" type="submit">Save</Button> /} */}
      <div style={{ position: "fixed", inset: 0, marginTop: "70px", padding:'100px' }}>
      <Button onClick={handleImg}>Save</Button>

        <Tldraw  onMount={e=>setEditor(e)} >
        </Tldraw>
      </div>

      {/* <Button onSubmit={handleSaveSnapShot} variant="contained" type="submit">Save</Button> */}

    </Container>
  );
};

export default TldrawWrapper;


