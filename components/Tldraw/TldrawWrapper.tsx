// import { SerializedSchema } from "@/typescript/interface/tldraw";
import { Button, Container, Grid } from "@mui/material";
import {
  BaseRecord,
  TLBaseBoxShape,
  TLShapeId,
  TLStoreWithStatus,
  TLUiOverrides,
  Tldraw,
  createTLStore,
  defaultShapeUtils,
  useEditor,
} from "@tldraw/tldraw";
import React, { ChangeEvent, useEffect, useState } from "react";

const myOverrides: TLUiOverrides = {
  actions(editor, actions) {
    // You can delete actions, but remember to
    // also delete the menu items that reference them!
    delete actions["insert-embed"];

    // Create a new action or replace an existing one
    actions["my-new-action"] = {
      id: "my-new-action",
      label: "My new action" as any,
      readonlyOk: true,
      kbd: "$u",
      onSelect(source: any) {
        // Whatever you want to happen when the action is run
        window.alert("My new action just happened!");
      },
    };
    return actions;
  },
};
// import {
//   ColorStyle,
//   DashStyle,
//   SizeStyle,
//   Tldraw,
//   TDDocument,
//   TDShapeType,
//   TldrawApp
// } from "@tldraw/tldraw";

// const initialDocument: TDDocument = {
//   id: "doc",
//   name: "New Document",
//   version: TldrawApp.version,
//   pages: {
//     page1: {
//       id: "page1",
//       shapes: {
//         rect1: {
//           id: "rect1",
//           type: TDShapeType.Rectangle,
//           parentId: "page1",
//           name: "Rectangle",
//           childIndex: 1,
//           point: [0, 0],
//           size: [100, 100],
//           style: {
//             dash: DashStyle.Draw,
//             size: SizeStyle.Medium,
//             color: ColorStyle.Blue
//           }
//         },
//         rect2: {
//           id: "rect2",
//           parentId: "page1",
//           name: "Rectangle",
//           childIndex: 2,
//           type: TDShapeType.Rectangle,
//           point: [200, 200],
//           size: [100, 100],
//           style: {
//             dash: DashStyle.Draw,
//             size: SizeStyle.Medium,
//             color: ColorStyle.Blue
//           }
//         }
//       },
//       bindings: {}
//     }
//   },
//   pageStates: {
//     page1: {
//       id: "page1",
//       selectedIds: [],
//       camera: {
//         point: [0, 0],
//         zoom: 1
//       }
//     }
//   },
//   assets: {}
// };
// editor.setCurrentTool('draw')
interface TLBaseShape<Type extends string, Props extends object>
  extends BaseRecord<"shape", TLShapeId> {}

// type CardShape = TLBaseShape<'card', { w: number; h: number }>
// export default function () {
// 	const [store] = useState(() => {
// 		// Create the store
// 		const newStore = createTLStore({
// 			shapeUtils: defaultShapeUtils,
// 		})

// 		// Get the snapshot
// 		const stringified = localStorage.getItem('my-editor-snapshot')
// 		const snapshot = JSON.parse(stringified)

// 		// Load the snapshot
// 		newStore.loadSnapshot(snapshot)

// 		return newStore
// 	})

// 	return <Tldraw persistenceKey="my-persistence-key" store={store} />
// }

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
// import { HTMLContainer, ShapeUtil } from '@tldraw/tldraw'
// import { TLBaseShape } from '@tldraw/tldraw'

// type CardShape = TLBaseBoxShape<'card', {  }>

// class CardShapeUtil extends ShapeUtil<CardShape> {
// 	static override type = 'card' as const

// 	getDefaultProps(): CardShape['props'] {
// 		return {
// 			w: 100,
// 			h: 100,
// 		}
// 	}

// 	getGeometry(shape: ICardShape) {
// 		return new Rectangle2d({
// 			width: shape.props.w,
// 			height: shape.props.h,
// 			isFilled: true,
// 		})
// 	}

// 	component(shape: CardShape) {
// 		return <HTMLContainer>Hello</HTMLContainer>
// 	}

// 	indicator(shape: CardShape) {
// 		return <rect width={shape.props.w} height={shape.props.h} />
// 	}
// }
// const MyCustomShapes = [MyCardShape]
const TldrawWrapper = () => {
  const editor=useEditor()
  const [store, setStore] = useState(null);
  const [btn, setBtn] = useState<boolean>(false);

  function HideUi() {
    setBtn(!btn);
  }

  // Get the snapshot
  //   const stringified = localStorage.getItem("my-editor-snapshot");
  //   const snapshot = JSON.parse(stringified as any);
  //   if (snapshot) {
  //     // Load the snapshot
  //     newStore?.loadSnapshot(snapshot);
  //   }

  //   return newStore;
  // });
  // editor.setCurrentTool('draw')

  console.log(editor)
  const handleSaveSnapShot = () => {
    const snap=editor.store.getSnapshot();
    console.log('snap',snap);
    
    
    // editor.store.loadSnapshot()
  };
  const [storeWithStatus, setStoreWithStatus] = useState<TLStoreWithStatus>({
    status: "loading",
  });
  const [image, setImage] = useState<string[] | {}>();
  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(e.target.files[0]);
  };

  // useEffect(() => {
  // 	let cancelled = false
  // 	async function loadRemoteSnapshot() {
  // 		// Get the snapshot
  // 		const snapshot = await getRemoteSnapshot()
  // 		if (cancelled) return

  // 		// Create the store
  // 		const newStore = createTLStore({
  // 			shapeUtils: defaultShapeUtils,
  // 		})

  // 		// Load the snapshot
  // 		newStore.loadSnapshot(snapshot)

  // 		// Update the store with status
  // 		setStoreWithStatus({
  // 			store: newStore,
  // 			status: 'ready',
  // 		})
  // 	}

  // 	loadRemoteSnapshot()

  // 	return () => {
  // 		cancelled = true
  // 	}
  // })

  return (
    <Container>
      {/* <Button onSubmit={handleSaveSnapShot} variant="contained" type="submit">Save</Button> */}
      <div style={{ position: "fixed", inset: 0, marginTop: "70px", padding:'100px' }}>
        <Tldraw persistenceKey="my-persistance-key" />
      </div>
      <Button onSubmit={handleSaveSnapShot} variant="contained" type="submit">Save</Button>

    </Container>
  );
};

export default TldrawWrapper;
