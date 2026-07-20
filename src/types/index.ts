export interface Booking {
  id: string
  name: string
  phone: string
  booking_date: string | null
  people_count: number
  quad_type: string | null
  route: string | null
  comment: string | null
  status: string
  created_at: string
}

export interface BookingInsert {
  name: string
  phone: string
  booking_date?: string | null
  people_count?: number
  quad_type?: string | null
  route?: string | null
  comment?: string | null
}

export interface Contact {
  id: string
  name: string
  phone: string
  message: string
  created_at: string
}

export interface ContactInsert {
  name: string
  phone: string
  message: string
}
