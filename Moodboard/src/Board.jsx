import React, {useState, useCallback} from "react"
import {useDropzone} from "react-dropzone"

function Board () {
  const [slike, setSlike] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      
      reader.onload = () => {
        setSlike(prev => [...prev, reader.result])
      }
      
      reader.readAsDataURL(file)
    })
  }, [])

  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div>
      <div {...getRootProps()} style={{border: '2px dashed #ccc', padding: '20px', textAlign: 'center'}}>
        <input {...getInputProps()} />
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px'}}>
          {slike.map((slika, i) => (
            <img key={i} src={slika} style={{width: '150px', height: '150px', objectFit: 'cover'}} />
          ))}
        </div>
      </div>
      

    </div>
  )
}

export default Board