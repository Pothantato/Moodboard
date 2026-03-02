import React, { useEffect, useRef } from 'react'
import { Image, Transformer } from 'react-konva'
import useImage from 'use-image'

function SlikaComponent({ imageProps, isSelected, onSelect, onChange }) {
  const [img] = useImage(imageProps.src)
  const shapeRef = useRef()
  const transformerRef = useRef()

  useEffect(() => {
    if (isSelected && transformerRef.current && shapeRef.current) {
      transformerRef.current.nodes([shapeRef.current])
      transformerRef.current.getLayer().batchDraw()
    }
  }, [isSelected])

  return (
    <>
      <Image
        ref={shapeRef}
        image={img}
        x={imageProps.x}
        y={imageProps.y}
        width={img ? img.width : undefined}
        height={img ? img.height : undefined}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
          })
        }}
        onTransformEnd={() => {
          const node = shapeRef.current
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()
          node.scaleX(1)
          node.scaleY(1)
          onChange({
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
          })
        }}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) =>
            newBox.width < 5 || newBox.height < 5 ? oldBox : newBox
          }
        />
      )}
    </>
  )
}

export default SlikaComponent