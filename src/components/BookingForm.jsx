import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button.jsx'
import { Calendar, Clock, User, Mail, Phone, Building } from 'lucide-react'
import { dbService } from '../lib/supabase'

// Initialize Stripe (using test key for now)
const stripePromise = loadStripe('pk_test_51234567890abcdef') // Replace with actual publishable key

const CheckoutForm = ({ selectedService, onSuccess, onCancel }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    date: '',
    time: '',
    requirements: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet.')
      setLoading(false)
      return
    }

    const cardElement = elements.getElement(CardElement)

    try {
      // Create payment method
      const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
      })

      if (paymentError) {
        setError(paymentError.message)
        setLoading(false)
        return
      }

      // Save booking to database
      const bookingData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        serviceType: selectedService.id,
        serviceName: selectedService.name,
        servicePrice: selectedService.price,
        date: formData.date,
        time: formData.time,
        requirements: formData.requirements,
        paymentMethodId: paymentMethod.id
      }

      // In a real implementation, you would process the payment on your backend
      // For now, we'll simulate a successful payment and save to database
      console.log('Payment method created:', paymentMethod)
      console.log('Booking data:', bookingData)

      // Save to Supabase (this will work when Supabase is configured)
      const result = await dbService.createBooking(bookingData)
      
      if (result.success) {
        console.log('Booking saved to database:', result.data)
        onSuccess({
          paymentMethod,
          bookingData,
          service: selectedService,
          databaseRecord: result.data
        })
      } else {
        // Even if database save fails, we can still show success for demo
        console.warn('Database save failed, but continuing with demo:', result.error)
        onSuccess({
          paymentMethod,
          bookingData,
          service: selectedService,
          databaseError: result.error
        })
      }
    } catch (err) {
      console.error('Booking error:', err)
      setError('An error occurred while processing your booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <div className="form-section">
        <h3 className="section-title">
          <User size={20} />
          Contact Information
        </h3>
        <div className="form-grid">
          <div className="form-field">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="form-input"
              placeholder="John Doe"
            />
          </div>
          <div className="form-field">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="form-input"
              placeholder="john@company.com"
            />
          </div>
          <div className="form-field">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="form-input"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div className="form-field">
            <label>Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Your Company Name"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">
          <Calendar size={20} />
          Scheduling
        </h3>
        <div className="form-grid">
          <div className="form-field">
            <label>Preferred Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className="form-input"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="form-field">
            <label>Preferred Time *</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
              className="form-input"
            >
              <option value="">Select time</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="13:00">1:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
            </select>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Project Requirements</h3>
        <div className="form-field">
          <label>Describe your project needs</label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleInputChange}
            rows="4"
            className="form-input"
            placeholder="Please describe your MBSE project requirements, goals, and any specific challenges you're facing..."
          />
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Payment Information</h3>
        <div className="service-summary">
          <div className="service-item">
            <span>{selectedService.name}</span>
            <span className="service-price">${selectedService.price}</span>
          </div>
          <div className="service-total">
            <span>Total</span>
            <span className="total-price">${selectedService.price}</span>
          </div>
        </div>
        
        <div className="card-element-container">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#ff8c00',
                  '::placeholder': {
                    color: '#cc7000',
                  },
                },
                invalid: {
                  color: '#ff4444',
                },
              },
            }}
          />
        </div>
        
        <div className="payment-note">
          <p>
            <strong>Note:</strong> This is a demo payment form. In production, you would need:
          </p>
          <ul>
            <li>A real Stripe publishable key</li>
            <li>A backend server to process payments securely</li>
            <li>Proper Supabase configuration for data storage</li>
          </ul>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="form-actions">
        <Button
          type="button"
          onClick={onCancel}
          className="cancel-button"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!stripe || loading}
          className="submit-button"
        >
          {loading ? 'Processing...' : `Pay $${selectedService.price} (Demo)`}
        </Button>
      </div>
    </form>
  )
}

const BookingForm = ({ service, onClose, onSuccess }) => {
  return (
    <div className="booking-container">
      <Elements stripe={stripePromise}>
        <CheckoutForm
          selectedService={service}
          onSuccess={onSuccess}
          onCancel={onClose}
        />
      </Elements>
    </div>
  )
}

export default BookingForm
