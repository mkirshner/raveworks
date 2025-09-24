import React, { useState, useEffect } from 'react';
import './OrbitalInterface.css';

const OrbitalInterface = ({ onSectionClick, activeSection }) => {
  const [hoveredBlob, setHoveredBlob] = useState(null);
  const [morphingBlob, setMorphingBlob] = useState(null);

  // Central blob data
  const centralBlob = {
    id: 'central',
    label: 'RAVEWORKS\nAN MBSE\nCOMPANY',
    previewText: 'Model-Based\nSystems\nEngineering\nConsulting\n& RAVE Tech',
    color: '#ff8c00',
    glowColor: '#9ACD32', // Green-yellow glow like deployed version
    animationDelay: Math.random() * 5,
    animationDuration: Math.random() * 3 + 4
  };

  // Navigation blobs positioned around the center
  const navigationBlobs = [
    {
      id: 'mbse',
      x: 25, // left position
      y: 35, // top position
      label: 'What is MBSE?',
      previewText: 'Model-Based\nSystems\nEngineering\nMethodology\n& Best Practices',
      color: '#ff6b00', // Warmer orange with red tint
      glowColor: '#ff8c00',
      animationDelay: Math.random() * 8 + 1,
      animationDuration: Math.random() * 4 + 6
    },
    {
      id: 'raves',
      x: 75, // right position
      y: 35, // top position
      label: 'What are RAVEs?',
      previewText: 'Requirements\nArchitecture\nVerification\nValidation\nEngineering\nSolutions',
      color: '#FFD700', // Bright yellow/gold
      glowColor: '#FFA500',
      animationDelay: Math.random() * 8 + 2,
      animationDuration: Math.random() * 4 + 5
    },
    {
      id: 'about',
      x: 25, // left position
      y: 75, // bottom position
      label: 'About Us',
      previewText: 'Our Mission &\nExperience in\nMBSE Consulting\n& RAVE Tech\nSolutions',
      color: '#ff6b00', // Warmer orange with red tint
      glowColor: '#ff8c00',
      animationDelay: Math.random() * 8 + 3,
      animationDuration: Math.random() * 4 + 7
    },
    {
      id: 'book',
      x: 75, // right position
      y: 75, // bottom position
      label: 'Book Consultation',
      previewText: 'Professional\nServices &\nConsulting\nfor MBSE\nImplementation',
      color: '#ff7f00', // Orange with slight red tint
      glowColor: '#ffa500',
      animationDelay: Math.random() * 8 + 4,
      animationDuration: Math.random() * 4 + 8
    }
  ];

  const handleBlobClick = (blobId) => {
    setMorphingBlob(blobId);
    setTimeout(() => {
      onSectionClick(blobId);
      setMorphingBlob(null);
    }, 300);
  };

  const handleMouseEnter = (blobId) => {
    setHoveredBlob(blobId);
  };

  const handleMouseLeave = () => {
    setHoveredBlob(null);
  };

  return (
    <div className="orbital-interface">
      {/* Central Blob */}
      <div 
        className="central-blob"
        onClick={() => handleBlobClick('central')}
        style={{ 
          cursor: 'pointer',
          '--blob-color': centralBlob.color,
          '--glow-color': centralBlob.glowColor,
          '--animation-delay': `${centralBlob.animationDelay}s`,
          '--animation-duration': `${centralBlob.animationDuration}s`
        }}
      >
        <div className="blob-shape">
          <div className="blob-sphere">
            <div className="sphere-outer-bubble"></div>
            <div className="sphere-middle-bubble"></div>
            <div className="sphere-inner-bubble">
              <div className="tablet-display-3d">
                <div className="tablet-3d-container">
                  <div className="tablet-screen-3d">
                    <div className="tablet-content">
                      {centralBlob.previewText.split('\n').map((line, index) => (
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
            <div className="bubble-surface-1"></div>
            <div className="bubble-surface-2"></div>
            <div className="bubble-surface-3"></div>
          </div>
          <div className="blob-glow-outer central-glow"></div>
          <div className="blob-glow-inner central-glow"></div>
        </div>
        <div className="blob-label-container">
          <div className="blob-label central-label">{centralBlob.label}</div>
        </div>
        <div className="vlorp-1" style={{ 
          animationDelay: `${Math.random() * 7}s`,
          animationDuration: `${Math.random() * 5 + 3}s`
        }}></div>
        <div className="vlorp-2" style={{ 
          animationDelay: `${Math.random() * 9}s`,
          animationDuration: `${Math.random() * 4 + 4}s`
        }}></div>
        <div className="vlorp-3" style={{ 
          animationDelay: `${Math.random() * 6}s`,
          animationDuration: `${Math.random() * 6 + 5}s`
        }}></div>
        <div className="vlorp-4" style={{ 
          animationDelay: `${Math.random() * 11}s`,
          animationDuration: `${Math.random() * 3 + 6}s`
        }}></div>
        <div className="bubble-1" style={{ 
          animationDelay: `${Math.random() * 8}s`,
          animationDuration: `${Math.random() * 7 + 4}s`
        }}></div>
        <div className="bubble-2" style={{ 
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${Math.random() * 5 + 5}s`
        }}></div>
        <div className="bubble-3" style={{ 
          animationDelay: `${Math.random() * 12}s`,
          animationDuration: `${Math.random() * 4 + 7}s`
        }}></div>
      </div>

      {/* Navigation Blobs */}
      {navigationBlobs.map((blob, index) => (
        <div
          key={blob.id}
          className={`nav-blob ${morphingBlob === blob.id ? 'morphing' : ''}`}
          style={{
            left: `${blob.x}%`,
            top: `${blob.y}%`,
            '--blob-color': blob.color,
            '--glow-color': blob.glowColor,
            '--animation-delay': `${blob.animationDelay}s`,
            '--animation-duration': `${blob.animationDuration}s`
          }}
          onClick={() => handleBlobClick(blob.id)}
          onMouseEnter={() => handleMouseEnter(blob.id)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="blob-shape">
            <div className="blob-sphere">
              <div className="sphere-outer-bubble"></div>
              <div className="sphere-middle-bubble"></div>
              <div className="sphere-inner-bubble">
                <div className="tablet-display-3d">
                  <div className="tablet-3d-container">
                    <div className="tablet-screen-3d">
                      <div className="tablet-content">
                        {blob.previewText.split('\n').map((line, index) => (
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
              <div className="bubble-surface-1"></div>
              <div className="bubble-surface-2"></div>
              <div className="bubble-surface-3"></div>
            </div>
            <div className="blob-glow-outer"></div>
            <div className="blob-glow-inner"></div>
          </div>
          <div className="blob-label-container">
            <div className="blob-label">{blob.label}</div>
          </div>
          <div className="vlorp-1" style={{ 
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${Math.random() * 6 + 4}s`
          }}></div>
          <div className="vlorp-2" style={{ 
            animationDelay: `${Math.random() * 12}s`,
            animationDuration: `${Math.random() * 5 + 3}s`
          }}></div>
          <div className="vlorp-3" style={{ 
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${Math.random() * 7 + 5}s`
          }}></div>
          <div className="vlorp-4" style={{ 
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${Math.random() * 4 + 6}s`
          }}></div>
          <div className="bubble-1" style={{ 
            animationDelay: `${Math.random() * 9}s`,
            animationDuration: `${Math.random() * 8 + 4}s`
          }}></div>
          <div className="bubble-2" style={{ 
            animationDelay: `${Math.random() * 11}s`,
            animationDuration: `${Math.random() * 6 + 5}s`
          }}></div>
          <div className="bubble-3" style={{ 
            animationDelay: `${Math.random() * 13}s`,
            animationDuration: `${Math.random() * 5 + 7}s`
          }}></div>
        </div>
      ))}

      {/* Ambient Particles */}
      <div className="ambient-particles">
        {[...Array(25)].map((_, index) => (
          <div
            key={index}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      {/* Tendrils/Trace Lines */}
      <svg className="tendrils" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 25 35 Q 50 25 75 35" className="tendril" style={{ animationDelay: '0s' }} />
        <path d="M 75 35 Q 85 55 75 75" className="tendril" style={{ animationDelay: '1.5s' }} />
        <path d="M 75 75 Q 50 85 25 75" className="tendril" style={{ animationDelay: '3s' }} />
        <path d="M 25 75 Q 15 55 25 35" className="tendril" style={{ animationDelay: '4.5s' }} />
        <path d="M 50 50 Q 37 42 25 35" className="tendril central-tendril" style={{ animationDelay: '2s' }} />
        <path d="M 50 50 Q 62 42 75 35" className="tendril central-tendril" style={{ animationDelay: '3.5s' }} />
        <path d="M 50 50 Q 37 58 25 75" className="tendril central-tendril" style={{ animationDelay: '1s' }} />
        <path d="M 50 50 Q 62 58 75 75" className="tendril central-tendril" style={{ animationDelay: '4s' }} />
      </svg>
    </div>
  );
};

export default OrbitalInterface;
