import React, { useRef, useEffect, useState } from 'react'
import { Text, Transformer } from 'react-konva'

function TextComponent({ textProps, isSelected, onSelect, onUpdate, setActiveTool }) {
  
  const textareaRef = useRef()
  const transformerRef = useRef()
  const [isEditing, setIsEditing] = useState(textProps.text === "")

  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([textareaRef.current])
      transformerRef.current.getLayer().draw() //draw je konva method ki ukaže layerju naj se re-rendera
    }
  }, [isSelected])

  useEffect(() => {   // Ko se nov textbox mounta ga odpre
    if (isEditing) {
      setActiveTool("pointer")
      setTimeout(() => openTextarea(), 0)  //1 tick timeout da konva zrendera component
    }
  }, [])

  function openTextarea() {
    const node = textareaRef.current
    const stage = node.getStage()
    const stageBox = stage.container().getBoundingClientRect()
    const nodePos = node.getAbsolutePosition()

    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)

    textarea.value = textProps.text
    textarea.style.position = 'absolute'
    textarea.style.top = `${stageBox.top + nodePos.y}px`
    textarea.style.left = `${stageBox.left + nodePos.x}px`
    textarea.style.fontSize = `${textProps.fontSize}px`
    textarea.style.border = '1px dashed #aaa'
    textarea.style.outline = 'none'
    textarea.style.resize = 'none'
    textarea.style.background = 'transparent'
    textarea.style.minWidth = '100px'
    textarea.focus()

    textarea.addEventListener('blur', () => { //blur je event ki se sprozi ko element izgubi fokus
      onUpdate({ text: textarea.value })
      document.body.removeChild(textarea)
      setIsEditing(false)
    })

    textarea.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault()        // preventa dodajo nove vrstice
    onUpdate({ text: textarea.value })
    document.body.removeChild(textarea)
    setIsEditing(false)
    setActiveTool("pointer")
  }
  // ce je shift+enter ne naredi nič in brskalnik samodejno doda novo vrstico
})
  }

  function handleDragEnd(e) {
    onUpdate({ x: e.target.x(), y: e.target.y() })
  }

  function handleTransformEnd() {
    const node = textareaRef.current
    onUpdate({
      x: node.x(),
      y: node.y(),
      fontSize: textProps.fontSize * node.scaleX(), //poveca velikost pisave namesto velikosti komponente
    })
    node.scaleX(1)
    node.scaleY(1)
  }

  return (
    <>
      <Text
        ref={textareaRef}
        text={textProps.text} 
        x={textProps.x}
        y={textProps.y}
        fontSize={textProps.fontSize}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
      />

      {isSelected && !isEditing && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 20) return oldBox //ce je manj kot 20 ne dovoli
            return newBox
          }}
        />
      )}
    </>
  )
}

export default TextComponent