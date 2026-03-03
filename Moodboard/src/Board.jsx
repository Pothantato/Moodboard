import React, { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Stage, Layer } from 'react-konva'
import SlikaComponent from "./SlikaComponent"

function Board() {
  const [images, setImages] = useState([])
  const [selectedId, setSelectedId] = useState(null)

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onload = () => {
        setImages(prev => [...prev, {
          id: `img-${Date.now()}-${Math.random()}`,
          src: reader.result,  
          x: 50,               
          y: 50,
          width: 200,          
          height: 200,
        }])
      }

      reader.readAsDataURL(file) 
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    accept: { 'image/*': [] }  
  })

  function updateImage(id, newProps) {
    setImages(prev =>
      prev.map(img => img.id === id ? { ...img, ...newProps } : img)
    )
  }

  function handleStageClick(e) {
    if (e.target === e.target.getStage()) setSelectedId(null)
  }

  return (
    <div
      {...getRootProps()}
      style={{
        width: '100vw',
        height: '100vh',
        border: isDragActive ? '3px dashed blue' : '3px dashed #ccc',
        boxSizing: 'border-box',
      }}
    >
      <input {...getInputProps()} />

      {images.length === 0 && (
        <p style={{ textAlign: 'center', color: '#aaa', pointerEvents: 'none' }}>
          Drop images here
        </p>
      )}

      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleStageClick}
      >
        <Layer>
          {images.map(img => (
            <SlikaComponent
              key={img.id}
              image={img}
              isSelected={img.id === selectedId}
              onSelect={() => setSelectedId(img.id)}
              onUpdate={(newProps) => updateImage(img.id, newProps)}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}

export default Board