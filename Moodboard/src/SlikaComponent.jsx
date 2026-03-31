import React, { useRef, useEffect } from 'react'
import { Image, Transformer } from 'react-konva'
import useImage from 'use-image' //da nam ni treba na roke pisati useEffect, sprozi izris slike ko je ta pripravljena

function SlikaComponent({ image, isSelected, onSelect, onUpdate, activeTool }) {
  const [loadedImage] = useImage(image.src)

  const imageRef = useRef()       
  const transformerRef = useRef() 

  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([imageRef.current])
      transformerRef.current.getLayer().draw() //draw je konva method ki ukaže layerju naj se re-rendera
    }
  }, [isSelected])

  function handleDragEnd(e) {
    onUpdate({
      x: e.target.x(),
      y: e.target.y(),
    })
  }

  function handleTransformEnd() {
    const node = imageRef.current

    const newWidth = node.width() * node.scaleX() //const ne let ker je izračunano enkrat in ni vec reasigned v funkciji
    const newHeight = node.height() * node.scaleY()

    node.scaleX(1) //rabi bit tako, ker konva upravlja s tem. Ko povecas sliko konva naredi node.scaleX npr. (2)
    node.scaleY(1)

    onUpdate({
      x: node.x(),
      y: node.y(),
      width: newWidth,
      height: newHeight,
    })
  }

  return (
    <>
      <Image
        ref={imageRef}
        image={loadedImage}
        x={image.x}
        y={image.y}
        width={image.width}    
        height={image.height}  
        draggable={activeTool !== "text"} // !=="text" ne dovoli upravljanja s slikami ko imamo text tool aktiviran
        onClick={() => {
          if (activeTool !== "text") onSelect()
        }}
        onTap={() => {
          if (activeTool !== "text") onSelect()
        }}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 20 || newBox.height < 20) return oldBox //ce je manj kot 20 ne dovoli spremembe
            return newBox
          }}
        />
      )}
    </>
  )
}

export default SlikaComponent