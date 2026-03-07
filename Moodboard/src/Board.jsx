import React, { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Stage, Layer } from 'react-konva'

import SlikaComponent from "./SlikaComponent"
import TextComponent from "./TextComponent"
import "./css/Board.css"

function Board({ activeTool, setActiveTool }) {
  const [images, setImages] = useState([])
  const [texts, setTexts] = useState([])
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

  function updateText(id, newProps) {
    setTexts(prev =>
      prev.map(txt => txt.id === id ? { ...txt, ...newProps } : txt)
    )
  }

  function handleStageClick(e) {
    const isStage = e.target === e.target.getStage()

    if (activeTool === "text" && isStage) {
      const pos = e.target.getStage().getPointerPosition()
      setTexts(prev => [...prev, {
        id: `txt-${Date.now()}-${Math.random()}`,
        x: pos.x,
        y: pos.y,
        text: "",
        fontSize: 20,
      }])
      return
    }

    if (isStage) setSelectedId(null)
  }

  return (
    <div className="BoardMain" {...getRootProps()}>
      <input {...getInputProps()} />

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

          {texts.map(txt => (
            <TextComponent
              key={txt.id}
              textProps={txt}
              isSelected={txt.id === selectedId}
              onSelect={() => setSelectedId(txt.id)}
              onUpdate={(newProps) => updateText(txt.id, newProps)}
              setActiveTool={setActiveTool}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}

export default Board