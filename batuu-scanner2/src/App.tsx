import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div id="logo">
      <img id="logo-image" src="images/aarc-aurebesh.jpg" alt="AARC Logo" />
    </div>
    <img id="contents-image" src="images/aarc.jpg" alt="Crate Contents" />
    <h1 id="results-header" className="multi-line">None</h1>
    <div id="multiple-choice"></div>
    <div id="badge-large">
      <img
        id="badge-image-large"
        src="images/badge/unearned-bw.jpeg"
        alt="Badge"
      />
      <h1 id="badge-text-large" className="multi-line">None</h1>
      <h1 id="badge-date-large" className="multi-line">None</h1>
    </div>
    <div id="qr-reader"></div>
    <div id="cargo-hold">
      <h1 id="cargo-hold-title">Cargo Hold</h1>
      <ul id="cargo-hold-list"></ul>
    </div>
    <div id="crew-manifest">
      <h1 id="crew-manifest-title">Dossiers</h1>
      <ul id="crew-manifests-list"></ul>
    </div>
    <div id="crew-member">
      <img
        id="crew-member-picture"
        src="images/outfit.jpeg"
        alt="Crew Member"
      />
      <h1 id="crew-member-name">Darth Plagueis the Wise</h1>
      <ul id="crew-member-details"></ul>
    </div>
    <div id="chain-code">
      <h1 id="chain-code-title">Chain Code Value</h1>
      <h1 id="chain-code-message"></h1>
    </div>
    <div id="puzzle"></div>
    <button id="stop-button" className="major-button">Home</button>
    <br />
    <button id="start-button" className="major-button">Scan</button>
    <br />
    <button id="scanned-button" className="major-button">Cargo Hold</button>
    <br />
    <button id="crew-manifest-button" className="major-button">Dossiers</button>
    <br />
    <button id="decode-chain-code-button" className="major-button">
      Decode Chain Code
    </button>
    <br />

    <script src="https://unpkg.com/html5-qrcode"></script>
    <script src="./puzzle/15-puzzle.js" type="module"></script>
    <script src="./src/main.ts" type="module"></script>
    </>
  )
}

export default App
