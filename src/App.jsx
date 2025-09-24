import { useState, useEffect } from 'react';
import OrbitalInterface from './components/OrbitalInterface';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showModal, setShowModal] = useState(false);

  const handleSectionClick = (section) => {
    setActiveSection(section);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getModalContent = () => {
    switch (activeSection) {
      case 'mbse':
        return {
          title: 'What is MBSE?',
          content: `Model-Based Systems Engineering (MBSE) is a formalized application of modeling to support system requirements, design, analysis, verification and validation activities beginning in the conceptual design phase and continuing throughout development and later life cycle phases.

MBSE represents a paradigm shift from document-centric engineering to model-centric engineering. It provides a unified, coherent view of the system throughout its lifecycle, enabling better communication, reduced errors, and improved system quality.

Key benefits include:
• Enhanced communication and collaboration
• Improved system understanding and visualization  
• Better requirements traceability
• Reduced development time and costs
• Higher quality systems with fewer defects`
        };
      case 'raves':
        return {
          title: 'What are RAVEs?',
          content: `RAVE stands for Requirements, Architecture, Verification, Validation, and Engineering solutions. RAVEs represent our comprehensive approach to systems engineering that integrates all critical aspects of system development.

Our RAVE methodology encompasses:

Requirements Engineering: Systematic approach to eliciting, analyzing, and managing requirements throughout the system lifecycle.

Architecture Design: Creating robust, scalable system architectures that meet stakeholder needs and technical constraints.

Verification & Validation: Ensuring systems are built right (verification) and that we're building the right system (validation).

Engineering Solutions: Delivering practical, implementable solutions that address real-world challenges in complex systems development.`
        };
      case 'about':
        return {
          title: 'About Raveworks',
          content: `Raveworks is a specialized consulting firm focused on Model-Based Systems Engineering (MBSE) and RAVE technology solutions. We help organizations transform their systems engineering practices through the adoption of modern, model-centric approaches.

Our Mission: To empower organizations with cutting-edge MBSE methodologies and RAVE solutions that enhance system quality, reduce development costs, and accelerate time-to-market.

Our Expertise:
• MBSE methodology implementation
• Systems architecture and design
• Requirements engineering and management
• Verification and validation strategies
• Tool integration and automation
• Training and capability development

We work with aerospace, defense, automotive, and other industries to deliver systems engineering excellence through proven methodologies and innovative solutions.`
        };
      case 'book':
        return {
          title: 'Book a Consultation',
          content: `Ready to transform your systems engineering practices with MBSE and RAVE solutions? Schedule a consultation with our experts to discuss your specific needs and challenges.

What to Expect:
• Comprehensive assessment of your current practices
• Identification of improvement opportunities
• Customized recommendations for MBSE implementation
• Discussion of RAVE solutions for your organization
• Roadmap for transformation and capability development

Our consultation process is designed to understand your unique requirements and provide actionable insights that drive real results.

Contact Information:
Email: info@raveworks.com
Phone: +1 (555) 123-4567

Schedule your consultation today and take the first step toward systems engineering excellence.`
        };
      case 'central':
        return {
          title: 'Welcome to Raveworks',
          content: `Raveworks specializes in ideospheric modeling for real-world predictive analytics, empowering decision makers with cutting-edge insights through our Reconfigurable Augmented Virtual Environment (RAVE) technology.

Our mission is to bridge the gap between complex systems modeling and practical business intelligence, delivering actionable insights that drive strategic decision-making through advanced Model-Based Systems Engineering methodologies.

Schedule a free consultation to learn how our MBSE expertise and RAVE solutions can transform your organization's approach to systems engineering and predictive analytics.`
        };
      default:
        return {
          title: 'Welcome to Raveworks',
          content: 'Select an orb to learn more about our MBSE consulting and RAVE technology solutions.'
        };
    }
  };

  const modalContent = getModalContent();

  return (
    <div className="app-container">
      <OrbitalInterface 
        onSectionClick={handleSectionClick}
        activeSection={activeSection}
      />
      
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>
              ×
            </button>
            <h2>{modalContent.title}</h2>
            <div className="modal-body">
              {modalContent.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index}>{paragraph}</p>
                )
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
