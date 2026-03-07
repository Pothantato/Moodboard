import puscica from "/arrow-pointer.png"
import naloziBtn from "/upload.png"
import "./css/oprVrstica.css"

function OprVrstica({ activeTool, setActiveTool }) {
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

      <button className="nalozi">
        <img src={naloziBtn} />
      </button>
    </div>
  )
}

export default OprVrstica