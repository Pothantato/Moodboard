import React, { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Stage, Layer } from 'react-konva'
import OprVrstica from "./oprVrstica"

import SlikaComponent from "./SlikaComponent"
import TextComponent from "./TextComponent"
import "./css/Board.css"

function Board() {

  const [activeTool, setActiveTool] = useState("pointer")
  const [images, setImages] = useState([])
  const [texts, setTexts] = useState([])
  const [selectedId, setSelectedId] = useState(null)

//barve
  const [showColours, setShowColours] = useState(false)
  const colours = ["#000000", "#c50000", "#17c500", "#0014c5", "#ffffff"]

  function changeColour(colour) {
    updateText(selectedId, {fill: colour})
  }

//pisava
  const [showFonts, setShowFonts] = useState(false)
  const fonts = ["Roboto", "Courier New", "Barrio", "Grape Nuts", "Titan One"]

  function changeFont(font) {
    updateText(selectedId, {fontFamily: font})
  }

  useEffect(() => { //runna vsakic ko se selectedId spremeni
    if (!selectedId || !texts.some(txt => txt.id === selectedId)) {
      setShowColours(false) //barve izginejo kadar kliknemo dol s teksta
      setShowFonts(false)
    }
  }, [selectedId])

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

  const { getRootProps, getInputProps, open} = useDropzone({
    onDrop,
    noClick: true, //nemors kar kliknit na kanvas prazen za vstavljanje nove slike
    accept: { 'image/*': [] }
  })

  function updateImage(id, newProps) {
    setImages(prev =>
      prev.map(img => img.id === id ? { ...img, ...newProps } : img) //ce se id ujema img podatki overwritajo newProps (ce neka stvar ni defined v id ostane od props)
    )
  }

  function updateText(id, newProps) {
    setTexts(prev =>
      prev.map(txt => txt.id === id ? { ...txt, ...newProps } : txt)
    )
  }

  function handleStageClick(e) {
    const clickedStage = e.target === e.target.getStage()

    if (activeTool === "text" && clickedStage) {
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

    if (clickedStage) setSelectedId(null) //ce kliknes kanvas s pointer tool
  }

    function zbrisi() {
    setImages(prev => prev.filter(img => img.id !== selectedId))
    setTexts(prev => prev.filter(txt => txt.id !== selectedId))
    setSelectedId(null)
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key !== "Delete" && e.key !== "Backspace") return
      if (document.activeElement.tagName === "TEXTAREA") return
      zbrisi()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedId])

  return (
    <div className="BoardMain" {...getRootProps()} data-tool={activeTool}>
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
              activeTool={activeTool}
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
      <OprVrstica
      activeTool={activeTool}
      setActiveTool={setActiveTool}
      zbrisi={zbrisi}         
      selectedId={selectedId}
      images={images}         
      setImages={setImages}
      open={open}
      texts={texts}

      showColours={showColours}
      setShowColours={setShowColours}
      colours={colours}
      changeColour={changeColour}

      fonts={fonts}
      showFonts={showFonts}
      setShowFonts={setShowFonts}
      changeFont={changeFont}
      />
    </div>
  )}

export default Board