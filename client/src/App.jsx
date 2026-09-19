import { useState } from 'react'
import './App.css'

export default function App() {
  const [deployments, setDeployments] = useState(0)

  return (
    <main className="app-shell">
      <section className="demo-panel">
        <p className="eyebrow">MONOLITH DEMO / CI-CD</p>
        <h1>CI CD Demo.</h1>
        <p className="intro">
          A React client + Express API.
        </p>
      </section>
    </main>
  )
}
