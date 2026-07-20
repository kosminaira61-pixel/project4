import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Routes from './components/Routes'
import Reviews from './components/Reviews'
import Booking from './components/Booking'
import Contact from './components/Contact'
import Instagram from './components/Instagram'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-ink-950">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Routes />
        <Reviews />
        <Booking />
        <Contact />
        <Instagram />
      </main>
      <Footer />
    </div>
  )
}
