import { useState } from 'react'
import './App.css'

export default function App() {
  const [deployments, setDeployments] = useState(0)

  return (
    <main className="app-shell">
      <section className="demo-panel">
        <p className="eyebrow">MONOLITH DEMO / CI-CD</p>
        <h1>Ship with confidence.</h1>
        <p className="intro">
          A React client and Express API living together in one workspace.
        </p>
        <button type="button" onClick={() => setDeployments((count) => count + 1)}>
          Simulate deployment <span aria-label="deployment count">{deployments}</span>
        </button>
        <p role="status" className="status">
          {deployments === 0
            ? 'Ready for the pipeline.'
            : `Deployment ${deployments} passed locally.`}
        </p>
      </section>
    </main>
  )
}
