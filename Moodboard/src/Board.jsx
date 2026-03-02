import React, { useState, useCallback, useRef } from "react"
import { useDropzone } from "react-dropzone"
import { Stage, Layer } from 'react-konva'

import SlikaComponent from "./SlikaComponent"

function Board() {
  const [slike, setSlike] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const stageRef = useRef()

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        setSlike(prev => [
          ...prev,
          {
            id: `img-${Date.now()}-${Math.random()}`,
            src: reader.result,
            x: 50,
            y: 50,
          }
        ])
      }
      reader.readAsDataURL(file)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: false,
    accept: { 'image/*': [] }
  })

  const deselect = (e) => {
    // Deselect when clicking on empty stage area
    if (e.target === e.target.getStage()) {
      setSelectedId(null)
    }
  }

  return (
    <div
      {...getRootProps()}
      style={{
        border: isDragActive ? '2px dashed #4a90e2' : '2px dashed #ccc',
        padding: '20px',
        textAlign: 'center',
        width: '100vw',
        height: '100vh',
        boxSizing: 'border-box',
        background: isDragActive ? '#f0f7ff' : '#fff'
      }}
    >
      <input {...getInputProps()} />
      {slike.length === 0 && (
        <p style={{ color: '#aaa', pointerEvents: 'none' }}>
          Drop images here to build your moodboard
        </p>
      )}
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={deselect}
      >
        <Layer>
          {slike.map((slika) => (
            <SlikaComponent
              key={slika.id}
              imageProps={slika}
              isSelected={slika.id === selectedId}
              onSelect={() => setSelectedId(slika.id)}
              onChange={(newAttrs) => {
                setSlike(prev =>
                  prev.map(s => s.id === slika.id ? { ...s, ...newAttrs } : s)
                )
              }}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}

export default Board