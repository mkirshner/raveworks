import React, { useState } from 'react'
import { X, Calendar, DollarSign, Clock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import BookingForm from './BookingForm'

const ContentPanel = ({ section, onClose }) => {
  const [showBooking, setShowBooking] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const services = [
    {
      id: 1,
      name: 'Initial Consultation',
      description: '1-hour discovery session to understand your MBSE needs',
      price: 200,
      duration: '1 hour',
      features: ['Requirements assessment', 'Project scoping', 'Methodology recommendations']
    },
    {
      id: 2,
      name: 'MBSE Workshop',
      description: 'Half-day intensive training on SysML and MBSE practices',
      price: 800,
      duration: '4 hours',
      features: ['SysML fundamentals', 'OOSEM methodology', 'Hands-on exercises', 'Team training']
    },
    {
      id: 3,
      name: 'Project Consulting',
      description: 'Full-day on-site or remote MBSE project implementation',
      price: 1500,
      duration: '8 hours',
      features: ['Project-specific modeling', 'Tool implementation', 'Process development', 'Team mentoring']
    }
  ]

  const handleBookService = (service) => {
    setSelectedService(service)
    setShowBooking(true)
  }

  const handleBookingSuccess = (bookingData) => {
    console.log('Booking successful:', bookingData)
    setBookingSuccess(true)
    setShowBooking(false)
    // In a real app, you would save this to your database
  }

  const handleBackToServices = () => {
    setShowBooking(false)
    setSelectedService(null)
  }

  const getContent = () => {
    if (bookingSuccess) {
      return {
        title: 'Booking Confirmed!',
        content: (
          <div className="success-content">
            <CheckCircle size={64} className="success-icon" />
            <p>
              Thank you for booking with Raveworks! We've received your consultation request 
              and will contact you within 24 hours to confirm your appointment details.
            </p>
            <p>
              You'll receive a confirmation email shortly with all the details of your booking.
            </p>
            <Button 
              onClick={() => {
                setBookingSuccess(false)
                onClose()
              }}
              className="success-button"
            >
              Continue Exploring
            </Button>
          </div>
        )
      }
    }

    if (showBooking && selectedService) {
      return {
        title: `Book ${selectedService.name}`,
        content: (
          <div>
            <Button 
              onClick={handleBackToServices}
              className="back-button mb-4"
            >
              ← Back to Services
            </Button>
            <BookingForm
              service={selectedService}
              onClose={handleBackToServices}
              onSuccess={handleBookingSuccess}
            />
          </div>
        )
      }
    }

    switch (section) {
      case 'home':
        return {
          title: 'Welcome to Raveworks',
          content: (
            <div>
              <p>
                Raveworks specializes in <strong>ideospheric modeling</strong> for real-world predictive analytics, 
                empowering decision makers with cutting-edge insights through our Reconfigurable Augmented Virtual Environment (RAVE) technology.
              </p>
              <p>
                Our mission is to bridge the gap between complex systems modeling and practical business intelligence, 
                delivering actionable insights that drive strategic decision-making.
              </p>
              <div className="cta-section">
                <Button 
                  onClick={() => handleBookService(services[0])}
                  className="cta-button"
                >
                  Schedule Free Consultation
                </Button>
              </div>
            </div>
          )
        }
      
      case 'mbse':
        return {
          title: 'SysML Model-Based Systems Engineering',
          content: (
            <div>
              <p>
                Our MBSE consultancy services leverage the power of Systems Modeling Language (SysML) to help organizations 
                design, analyze, and optimize complex systems throughout their entire lifecycle.
              </p>
              <h3 className="text-lg font-semibold text-orange-400 mt-4 mb-2">Services Include:</h3>
              <ul className="list-disc list-inside space-y-2 text-orange-300">
                <li>Project-specific MBSE consulting (on-site or remote)</li>
                <li>OOSEM methodology implementation</li>
                <li>System requirements analysis and design</li>
                <li>Model verification and validation</li>
                <li>Team training and capability development</li>
              </ul>
              <p className="mt-4">
                Our certified consultants guide your team through the complete OOSEM modeling process, 
                enabling you to build integrated models that accomplish your project goals and satisfy stakeholder needs.
              </p>
            </div>
          )
        }
      
      case 'rave':
        return {
          title: 'RAVE Technology',
          content: (
            <div>
              <p>
                The Reconfigurable Augmented Virtual Environment (RAVE) represents the next generation of 
                predictive analytics and decision support systems.
              </p>
              <h3 className="text-lg font-semibold text-orange-400 mt-4 mb-2">Key Features:</h3>
              <ul className="list-disc list-inside space-y-2 text-orange-300">
                <li>Real-time ideospheric modeling</li>
                <li>Advanced predictive analytics algorithms</li>
                <li>Immersive visualization environments</li>
                <li>Configurable decision support interfaces</li>
                <li>Integration with existing enterprise systems</li>
              </ul>
              <p className="mt-4">
                RAVE technology transforms complex data into intuitive, actionable insights, 
                enabling organizations to make informed decisions with confidence.
              </p>
            </div>
          )
        }
      
      case 'manus':
        return {
          title: 'Manus Prototype Device',
          content: (
            <div>
              <p>
                The Manus prototype device represents our latest innovation in human-computer interaction 
                and augmented decision-making interfaces.
              </p>
              <p>
                This cutting-edge device integrates seamlessly with our RAVE technology platform, 
                providing users with intuitive control over complex virtual environments and analytical processes.
              </p>
              <h3 className="text-lg font-semibold text-orange-400 mt-4 mb-2">Capabilities:</h3>
              <ul className="list-disc list-inside space-y-2 text-orange-300">
                <li>Gesture-based interface control</li>
                <li>Real-time data manipulation</li>
                <li>Immersive analytics interaction</li>
                <li>Collaborative virtual workspaces</li>
              </ul>
            </div>
          )
        }
      
      case 'booking':
        return {
          title: 'Book a Consultation',
          content: (
            <div>
              <p>
                Ready to transform your systems engineering approach? Choose from our consultation services 
                to discuss your specific needs and objectives.
              </p>
              <div className="services-grid">
                {services.map((service) => (
                  <div key={service.id} className="service-card">
                    <div className="service-header">
                      <h4 className="service-name">{service.name}</h4>
                      <div className="service-price">${service.price}</div>
                    </div>
                    <div className="service-details">
                      <div className="service-duration">
                        <Clock size={16} />
                        {service.duration}
                      </div>
                      <p className="service-description">{service.description}</p>
                      <ul className="service-features">
                        {service.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <Button 
                      onClick={() => handleBookService(service)}
                      className="book-service-button"
                    >
                      <Calendar size={16} />
                      Book Now
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )
        }
      
      default:
        return {
          title: 'Welcome to Raveworks',
          content: <p>Select a section to learn more about our services and technology.</p>
        }
    }
  }

  const { title, content } = getContent()

  return (
    <div className="content-panel">
      <button className="close-button" onClick={onClose}>
        <X size={16} />
      </button>
      <h2>{title}</h2>
      {content}
    </div>
  )
}

export default ContentPanel
