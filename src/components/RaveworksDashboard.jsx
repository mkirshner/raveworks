import React, { useState } from 'react'
import './RaveworksDashboard.css'

const RaveworksDashboard = ({ onSectionClick, activeSection }) => {
  const [hoveredBlob, setHoveredBlob] = useState(null)
  const [morphingBlob, setMorphingBlob] = useState(null)

  const menuItems = [
    { 
      id: 'mbse', 
      label: 'What is MBSE?', 
      color: '#ff6600', 
      previewText: 'Model-Based Systems Engineering\n• 30% faster development\n• 50% fewer defects\n• Improved traceability\n• Digital transformation'
    },
    { 
      id: 'rave', 
      label: 'What are RAVEs?', 
      color: '#ffaa00', 
      previewText: 'Reconfigurable Augmented\nVirtual Environments\n• MBSE + Digital Engineering\n• Immersive visualization\n• Real-time collaboration'
    },
    { 
      id: 'about', 
      label: 'About Us', 
      color: '#cc5500', 
      previewText: 'Dr. Mitchell Kirshner\n• NASA Digital Engineering\n• PhD Systems Engineering\n• Space Systems Expert\n• MBSE Practitioner'
    },
    { 
      id: 'booking', 
      label: 'Book Consultation', 
      color: '#ff7700', 
      previewText: 'Professional Services\n• Initial Consultation $100\n• MBSE Workshop $400\n• Custom Solutions\n• Remote & On-site'
    }
  ]

  const centralOrb = {
    id: 'home',
    label: 'RAVEWORKS\nAN MBSE COMPANY',
    color: '#ff8c00',
    previewText: 'Ideospheric Modeling\n• Predictive Analytics\n• Decision Support\n• RAVE Technology\n• Digital Engineering'
  }

  const handleBlobClick = (sectionId) => {
    setMorphingBlob(sectionId)
    setTimeout(() => {
      onSectionClick(sectionId)
      setMorphingBlob(null)
    }, 600)
  }

  return (
    <div className="raveworks-dashboard">
      {/* Ambient Particles */}
      <div className="ambient-particles">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Trace Lines System */}
      <div className="trace-lines">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Central to orbital traces */}
          <line x1="50" y1="50" x2="50" y2="20" className="trace-line central-trace" />
          <line x1="50" y1="50" x2="80" y2="50" className="trace-line central-trace" />
          <line x1="50" y1="50" x2="50" y2="80" className="trace-line central-trace" />
          <line x1="50" y1="50" x2="20" y2="50" className="trace-line central-trace" />
          
          {/* Orbital connection traces */}
          <line x1="50" y1="20" x2="80" y2="50" className="trace-line orbital-trace" />
          <line x1="80" y1="50" x2="50" y2="80" className="trace-line orbital-trace" />
          <line x1="50" y1="80" x2="20" y2="50" className="trace-line orbital-trace" />
          <line x1="20" y1="50" x2="50" y2="20" className="trace-line orbital-trace" />
          
          {/* Cross traces */}
          <line x1="50" y1="20" x2="50" y2="80" className="trace-line cross-trace" />
          <line x1="20" y1="50" x2="80" y2="50" className="trace-line cross-trace" />
        </svg>
      </div>

      {/* Orbital Container */}
      <div className="orbital-container">
        {menuItems.map((item, index) => (
          <div 
            key={item.id} 
            className={`orbital-orb orb-${index + 1} nav-blob ${morphingBlob === item.id ? 'morphing' : ''} ${hoveredBlob === item.id ? 'hovered' : ''} ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => handleBlobClick(item.id)}
            onMouseEnter={() => setHoveredBlob(item.id)}
            onMouseLeave={() => setHoveredBlob(null)}
            style={{ 
              '--blob-color': item.color,
              '--blob-glow': item.color
            }}
          >
            <div className="blob-shape">
              <div className="blob-sphere">
                <div className="sphere-outer-bubble">
                  <div className="sphere-middle-bubble">
                    <div className="sphere-inner-bubble">
                      <div className="tablet-display-3d">
                        <div className="tablet-3d-container">
                          <div className="tablet-screen-3d">
                            <div className="tablet-content">
                              {item.previewText.split('\n').map((line, index) => (
                                <div key={index} className="tablet-line">{line}</div>
                              ))}
                            </div>
                          </div>
                          <div className="tablet-bezel-3d"></div>
                          <div className="tablet-back-3d"></div>
                          <div className="tablet-edge-3d"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bubble-surface-1"></div>
                  <div className="bubble-surface-2"></div>
                  <div className="bubble-surface-3"></div>
                </div>
                <div className="blob-glow-outer"></div>
                <div className="blob-glow-inner"></div>
              </div>
            </div>
            
            <div className="blob-label-container">
              <div className="blob-label">{item.label}</div>
            </div>
            
            <div className="vlorp-1" style={{ '--blob-color': item.color }}></div>
            <div className="vlorp-2" style={{ '--blob-color': item.color }}></div>
            <div className="vlorp-3" style={{ '--blob-color': item.color }}></div>
            <div className="vlorp-4" style={{ '--blob-color': item.color }}></div>
            
            <div className="bubble-1"></div>
            <div className="bubble-2"></div>
            <div className="bubble-3"></div>
          </div>
        ))}
      </div>

      {/* Central Company Blob */}
      <div 
        className={`central-blob nav-blob ${morphingBlob === 'home' ? 'morphing' : ''} ${hoveredBlob === 'home' ? 'hovered' : ''} ${activeSection === 'home' ? 'active' : ''}`}
        onClick={() => handleBlobClick('home')}
        onMouseEnter={() => setHoveredBlob('home')}
        onMouseLeave={() => setHoveredBlob(null)}
        style={{ 
          '--blob-color': centralOrb.color,
          '--blob-glow': centralOrb.color
        }}
      >
        <div className="blob-shape">
          <div className="blob-sphere">
            <div className="sphere-outer-bubble central-size">
              <div className="sphere-middle-bubble central-size">
                <div className="sphere-inner-bubble central-size">
                  <div className="tablet-display-3d">
                    <div className="tablet-3d-container">
                      <div className="tablet-screen-3d">
                        <div className="tablet-content">
                          {centralOrb.previewText.split('\n').map((line, index) => (
                            <div key={index} className="tablet-line">{line}</div>
                          ))}
                        </div>
                      </div>
                      <div className="tablet-bezel-3d"></div>
                      <div className="tablet-back-3d"></div>
                      <div className="tablet-edge-3d"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bubble-surface-1"></div>
              <div className="bubble-surface-2"></div>
              <div className="bubble-surface-3"></div>
            </div>
            <div className="blob-glow-outer central-glow"></div>
            <div className="blob-glow-inner central-glow"></div>
          </div>
        </div>
        
        <div className="blob-label-container">
          <div className="blob-label central-label">{centralOrb.label}</div>
        </div>
        
        <div className="vlorp-1" style={{ '--blob-color': centralOrb.color }}></div>
        <div className="vlorp-2" style={{ '--blob-color': centralOrb.color }}></div>
        <div className="vlorp-3" style={{ '--blob-color': centralOrb.color }}></div>
        <div className="vlorp-4" style={{ '--blob-color': centralOrb.color }}></div>
        
        <div className="bubble-1"></div>
        <div className="bubble-2"></div>
        <div className="bubble-3"></div>
      </div>
    </div>
  )
}

export default RaveworksDashboard
