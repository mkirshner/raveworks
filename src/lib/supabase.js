import { createClient } from '@supabase/supabase-js'

// Supabase configuration
// Note: These would be environment variables in production
const supabaseUrl = 'https://your-project.supabase.co'
const supabaseAnonKey = 'your-anon-key'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database service functions
export const dbService = {
  // Create a new booking
  async createBooking(bookingData) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([
          {
            name: bookingData.name,
            email: bookingData.email,
            phone: bookingData.phone,
            company: bookingData.company,
            service_type: bookingData.serviceType,
            service_name: bookingData.serviceName,
            service_price: bookingData.servicePrice,
            preferred_date: bookingData.date,
            preferred_time: bookingData.time,
            requirements: bookingData.requirements,
            payment_method_id: bookingData.paymentMethodId,
            status: 'pending',
            created_at: new Date().toISOString()
          }
        ])
        .select()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error creating booking:', error)
      return { success: false, error: error.message }
    }
  },

  // Get all bookings (admin function)
  async getBookings() {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error fetching bookings:', error)
      return { success: false, error: error.message }
    }
  },

  // Update booking status
  async updateBookingStatus(bookingId, status) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', bookingId)
        .select()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error updating booking:', error)
      return { success: false, error: error.message }
    }
  },

  // Create contact form submission
  async createContact(contactData) {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([
          {
            name: contactData.name,
            email: contactData.email,
            subject: contactData.subject,
            message: contactData.message,
            created_at: new Date().toISOString()
          }
        ])
        .select()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error creating contact:', error)
      return { success: false, error: error.message }
    }
  }
}

// SQL for creating the tables (to be run in Supabase dashboard)
export const createTablesSQL = `
-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  service_type VARCHAR(100) NOT NULL,
  service_name VARCHAR(255) NOT NULL,
  service_price DECIMAL(10,2) NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  requirements TEXT,
  payment_method_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for production)
CREATE POLICY "Allow public to insert bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to insert contacts" ON contacts
  FOR INSERT WITH CHECK (true);

-- Create policy for admin access (you'll need to set up authentication)
-- CREATE POLICY "Allow admin to view all bookings" ON bookings
--   FOR SELECT USING (auth.role() = 'admin');
`;

export default supabase
