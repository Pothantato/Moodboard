import puscica from "/puscica.png"
import naloziBtn from "/oblak.png"
import brisiBtn from "/smeti.png"
import colourBtn from "/color.jpg"
import tekstImg from "/tekst.png"
import "./css/oprVrstica.css"

function OprVrstica({ activeTool, setActiveTool, zbrisi, selectedId, open, texts, colours, showColours, setShowColours, changeColour, fonts, showFonts, setShowFonts, changeFont}) {
  return ( 
    <>
    <div className="vrstMain">
      <button
        className="glavniBtn"
        onClick={() => setActiveTool("pointer")}
        style={{ opacity: activeTool === "pointer" ? 1 : 0.4 }} 
      >
        <img src={puscica}/>
      </button>

      <button
        className="glavniBtn"
        onClick={() => setActiveTool("text")}
        style={{ opacity: activeTool === "text" ? 1 : 0.4 }}
      >
        <img src={tekstImg}/>
      </button>

      <button 
      className="glavniBtn"
      onClick={open}
      >
        <img src={naloziBtn} />
      </button>
    
      {selectedId && (
        <>
        <div className="divider"/>
        <button 
        onClick={() => zbrisi()}
        className="zbrisiBtn glavniBtn"
      >
          <img src={brisiBtn} />
      </button>
      </>
)}

      {selectedId && texts.some(txt => txt.id === selectedId) && ( //preveri ce selected item obstaja v texts array
            <>
              <button 
              onClick={() => setShowColours(!showColours)}
              className="colourBtn glavniBtn">
                <img src={colourBtn}/>
              </button>
              <button 
              className="fontBtn glavniBtn"
              onClick={() => setShowFonts(!showFonts)}>
                Aa
              </button>
            </>
      )}
    </div>
    {showColours && (
        <div className="colourPicker">
          {colours.map(colour => (
        <button
          key={colour}
          onClick={() => {
            changeColour(colour)
            setShowColours(false)}}
          className="colourPickerBtn"
          style={{ backgroundColor: colour }}
        ></button>
          ))}
        </div>
      )}
      {showFonts && (
        <div className="fontPicker">
          {fonts.map(font => (
            <button
            key={font}
            onClick={()=>{
              changeFont(font)
              setShowFonts(false)}}
              className="fontPickerBtn"
              style={{fontFamily: font}}
            >{font}</button>
          ))}
        </div>
      )}
  </>
  )}

export default OprVrstica