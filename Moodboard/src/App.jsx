import { useState } from "react"
import Board from "./Board"
import OprVrstica from "./oprVrstica"
import "./css/App.css"

function App() {
  const [activeTool, setActiveTool] = useState("pointer")

  return (
    <div className="GlavniDiv" data-tool={activeTool}>
      <Board activeTool={activeTool} setActiveTool={setActiveTool}/>
      <OprVrstica activeTool={activeTool} setActiveTool={setActiveTool} />
    </div>
  )
}

export default App