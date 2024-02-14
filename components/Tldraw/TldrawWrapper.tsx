import { Tldraw } from '@tldraw/tldraw'
import React from 'react'

const TldrawWrapper = () => {
  return (
    <div style={{ position: 'fixed', inset: 0 }}>
    <Tldraw />
  </div>
  )
}

export default TldrawWrapper