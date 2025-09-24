import React, { useState } from 'react'
import RaveworksDashboard from './components/RaveworksDashboard'
import ContentPanel from './components/ContentPanel'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState(null)
  const [showPanel, setShowPanel] = useState(false)

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId)
    setShowPanel(true)
  }

  const handleClosePanel = () => {
    setShowPanel(false)
    setActiveSection(null)
  }

  return (
    <div className="App">
      <RaveworksDashboard 
        onSectionClick={handleSectionClick}
        activeSection={activeSection}
      />
      
      {showPanel && (
        <ContentPanel 
          section={activeSection}
          onClose={handleClosePanel}
        />
      )}
    </div>
  )
}

export default App
