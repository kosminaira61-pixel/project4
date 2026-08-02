import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import Services from './components/Services'
import Routes from './components/Routes'
import Gallery from './components/Gallery'
import About from './components/About'
import Reviews from './components/Reviews'
import HowItWorks from './components/HowItWorks'
import Booking from './components/Booking'
import Contact from './components/Contact'
import Instagram from './components/Instagram'
import Footer from './components/Footer'
import MobileStickyCta from './components/MobileStickyCta'

export default function App() {
  useEffect(() => {
    const scrollToHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      if (!id) return

      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 150)
    }

    scrollToHash()
    window.addEventListener('hashchange', scrollToHash)
    return () => window.removeEventListener('hashchange', scrollToHash)
  }, [])

  return (
    <div className="min-h-screen bg-ink-950 pb-20 md:pb-0">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Routes />
        <Gallery />
        <About />
        <Reviews />
        <HowItWorks />
        <Booking />
        <Contact />
        <Instagram />
      </main>
      <Footer />
      <MobileStickyCta />
    </div>
  )
}
