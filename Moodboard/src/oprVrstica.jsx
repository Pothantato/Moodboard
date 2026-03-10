import puscica from "/arrow-pointer.png"
import naloziBtn from "/upload.png"
import brisiBtn from "/trash-can.png"
import "./css/oprVrstica.css"

function OprVrstica({ activeTool, setActiveTool, zbrisi, selectedId, open}) {
  return (
    <div className="vrstMain">
      <button
        className="arrow"
        onClick={() => setActiveTool("pointer")}
        style={{ opacity: activeTool === "pointer" ? 1 : 0.4 }} 
      >
        <img src={puscica} />
      </button>

      <button
        className="napis"
        onClick={() => setActiveTool("text")}
        style={{ opacity: activeTool === "text" ? 1 : 0.4 }}
      >
        T
      </button>

      <button 
      className="nalozi"
      onClick={open}
      >
        <img src={naloziBtn} />
      </button>
    
      {selectedId && (
        <button 
        onClick={() => zbrisi()}
        className="zbrisiBtn"
      >
          <img src={brisiBtn} />
      </button>
)}

    </div>
  )
}

export default OprVrstica