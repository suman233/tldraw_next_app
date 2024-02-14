import { TLUiOverrides, Tldraw } from '@tldraw/tldraw'
import React from 'react'

const myOverrides: TLUiOverrides = {
  actions(editor, actions) {
    // You can delete actions, but remember to
    // also delete the menu items that reference them!
    delete actions['insert-embed']

    // Create a new action or replace an existing one
    actions['my-new-action'] = {
      id: 'my-new-action',
      label: 'My new action' as any,
      readonlyOk: true,
      kbd: '$u',
      onSelect(source: any) {
        // Whatever you want to happen when the action is run
        window.alert('My new action just happened!')
      },
    }
    return actions
  },
}
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

const TldrawWrapper = () => {
  return (
    <div style={{ position: 'fixed', inset: 0 }}>
    <Tldraw />
  </div>
  )
}

export default TldrawWrapper