/*
# Create bookings and contacts tables (single-tenant, no auth)

1. New Tables
- `bookings` — заявки на бронювання квадроциклів
  - `id` (uuid, primary key)
  - `name` (text, ім'я клієнта)
  - `phone` (text, телефон клієнта)
  - `booking_date` (date, бажана дата поїздки)
  - `people_count` (int, кількість людей)
  - `quad_type` (text, тип квадроцикла: одномісний / двомісний)
  - `route` (text, обраний маршрут)
  - `comment` (text, коментар клієнта)
  - `status` (text, статус заявки: new / confirmed / cancelled)
  - `created_at` (timestamptz, час створення)
- `contacts` — повідомлення з форми зворотного зв'язку
  - `id` (uuid, primary key)
  - `name` (text, ім'я)
  - `phone` (text, телефон або email)
  - `message` (text, текст повідомлення)
  - `created_at` (timestamptz, час створення)

2. Security
- Enable RLS on both tables.
- Allow anon + authenticated INSERT only (public can submit forms).
- No SELECT/UPDATE/DELETE for anon (only service role can read/manage).
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  booking_date date,
  people_count int DEFAULT 1,
  quad_type text,
  route text,
  comment text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_bookings" ON bookings;
CREATE POLICY "anon_insert_bookings"
ON bookings FOR INSERT
TO anon, authenticated WITH CHECK (true);

CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contacts" ON contacts;
CREATE POLICY "anon_insert_contacts"
ON contacts FOR INSERT
TO anon, authenticated WITH CHECK (true);
