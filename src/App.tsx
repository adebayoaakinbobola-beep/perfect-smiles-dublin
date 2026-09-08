import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  HeartPulse,
  Menu,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  X,
} from 'lucide-react'

type Icon = typeof HeartPulse

type Treatment = {
  title: string
  description: string
  icon: Icon
  tone: string
}

const phoneNumber = '018559792'
const phoneLabel = '01 855 9792'

const treatments: Treatment[] = [
  {
    title: 'General Dentistry',
    description: 'Thoughtful care for your everyday dental health, from consultations to ongoing maintenance.',
    icon: Stethoscope,
    tone: 'gold',
  },
  {
    title: 'Dental Implants',
    description: 'Explore implant treatment with a calm, considered approach tailored to your needs.',
    icon: Sparkles,
    tone: 'blue',
  },
  {
    title: 'Crowns & Bridges',
    description: 'Restorative options designed to support your smile and your everyday confidence.',
    icon: ShieldCheck,
    tone: 'green',
  },
  {
    title: 'Orthodontics',
    description: 'Discuss options for creating a smile that feels comfortable, balanced and authentically yours.',
    icon: HeartPulse,
    tone: 'rose',
  },
  {
    title: 'Routine Dental Care',
    description: 'Regular visits and practical guidance to help you stay on top of your oral health.',
    icon: CalendarDays,
    tone: 'navy',
  },
]

const faqs = [
  ['How do I book an appointment?', 'You can call the clinic directly on 01 855 9792 or use the appointment enquiry form below. A member of the practice team can then respond to your request.'],
  ['Where is the practice located?', 'Perfect Smiles Dental Surgery is at Unit 1A, The Forge, Railway Street, Dublin 1, Ireland.'],
  ['What dental treatments do you offer?', 'The practice website presents General Dentistry, Dental Implants, Crowns & Bridges, Orthodontics and Routine Dental Care.'],
  ['Can I call the clinic directly?', 'Yes. The clinic can be reached on 01 855 9792.'],
  ['What should I bring to my first appointment?', 'Please bring any information that may help the practice understand your dental needs. The team can let you know if anything specific is needed when your appointment is arranged.'],
]

function scrollToBooking() {
  const booking = document.getElementById('booking')
  const header = document.querySelector<HTMLElement>('.site-header')
  if (!booking) return
  const offset = (header?.offsetHeight ?? 76) + 20
  const top = booking.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}

function Logo() {
  return (
    <a className="brand" href="#home" aria-label="Perfect Smiles Dental Surgery home">
      <span className="brand-mark"><Sparkles size={15} strokeWidth={1.8} /></span>
      <span><strong>Perfect Smiles</strong><small>Dental Surgery</small></span>
    </a>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 760px)').matches)
  const mobileNavRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (menuOpen) mobileNavRef.current?.scrollTo(0, 0)
  }, [menuOpen])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 760px)')
    const updateIsMobile = () => setIsMobile(mediaQuery.matches)
    mediaQuery.addEventListener('change', updateIsMobile)
    return () => mediaQuery.removeEventListener('change', updateIsMobile)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const mobileNav = (
    <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
      <div ref={mobileNavRef} className="main-nav-scroll">
        <a href="#home" onClick={closeMenu}>Home</a>
        <a href="#treatments" onClick={closeMenu}>Treatments</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#why-us" onClick={closeMenu}>Why choose us</a>
        <a href="#faq" onClick={closeMenu}>FAQ</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
        <button className="button button-dark nav-cta" onClick={() => { closeMenu(); scrollToBooking() }}>Book an Appointment <ArrowRight size={16} /></button>
      </div>
    </nav>
  )

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container nav-wrap">
          <Logo />
          {!isMobile && mobileNav}
          <div className="nav-actions">
            <a className="header-phone" href={`tel:${phoneNumber}`} aria-label={`Call Perfect Smiles on ${phoneLabel}`}><Phone size={17} /> <span>{phoneLabel}</span></a>
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {isMobile && menuOpen && createPortal(mobileNav, document.body)}

      <main>
        <section className="hero" id="home">
          <div className="hero-sun" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span /> Dublin 1 · Private dental care</p>
              <h1>Confident smiles <em>start here.</em></h1>
              <p className="hero-lede">Professional dental care for individuals and families in the heart of Dublin.</p>
              <div className="hero-buttons">
                <button className="button button-gold" onClick={scrollToBooking}>Book an Appointment <ArrowRight size={17} /></button>
                <a className="button button-quiet" href={`tel:${phoneNumber}`}><Phone size={17} /> Call Our Clinic</a>
              </div>
              <div className="hero-details">
                <span><Check size={15} /> General Dentistry</span><span><Check size={15} /> Dental Implants</span><span><Check size={15} /> Orthodontics</span>
              </div>
            </div>
            <div className="hero-image">
              <img src="/images/hero-dental-clinic.jpg" alt="Dentist caring for a patient in a bright modern dental clinic" />
              <div className="hero-image-note"><MapPin size={16} /><span><strong>The Forge</strong><small>Railway Street, Dublin 1</small></span></div>
            </div>
          </div>
          <div className="hero-bottom container"><span>Care that feels considered</span><span>01 <i /> 05</span></div>
        </section>

        <section className="section intro-section" id="about">
          <div className="container intro-grid">
            <div className="intro-visual">
              <img className="practice-image" src="/images/practice-dental-clinic.jpg" alt="Bright modern dental clinic interior with a dental chair" />
            </div>
            <div className="intro-copy">
              <p className="eyebrow">A better kind of visit</p>
              <h2>Dental care <em>centred around you.</em></h2>
              <p>Perfect Smiles Dental Surgery is a Dublin dental practice focused on professional, comfortable and personalised care. We take the time to understand what matters to you, so every conversation can begin in the right place.</p>
              <div className="signature-line"><span className="signature-mark">PS</span><span>Thoughtful care,<br /><strong>right in Dublin 1.</strong></span></div>
              <a className="text-link" href="#why-us">Discover our approach <ArrowRight size={16} /></a>
            </div>
          </div>
        </section>

        <section className="section treatments-section" id="treatments">
          <div className="container">
            <div className="section-heading"><div><p className="eyebrow">Our treatments</p><h2>Care for every <em>chapter.</em></h2></div><p className="heading-aside">From routine visits to more considered treatment conversations, our care is shaped around the individual.</p></div>
            <div className="treatment-grid">{treatments.map(({ title, description, icon: TreatmentIcon, tone }) => <article className="treatment-card" key={title}><div className={`treatment-icon ${tone}`}><TreatmentIcon size={21} strokeWidth={1.6} /></div><h3>{title}</h3><p>{description}</p><a href="#booking" className="card-link" aria-label={`Learn more about ${title}`}>Learn more <ArrowRight size={15} /></a></article>)}</div>
          </div>
        </section>

        <section className="section why-section" id="why-us">
          <div className="container why-grid">
            <div className="why-copy"><p className="eyebrow">Why Perfect Smiles</p><h2>A little more <em>considered.</em></h2><p>Choosing a dental practice is personal. Our approach is built around clear conversations, thoughtful care and making your visit feel as comfortable as possible.</p><a className="button button-outline" href="#contact">Find the practice <ArrowRight size={16} /></a></div>
            <div className="reasons"><div className="reason"><span>01</span><div><h3>Personalised care</h3><p>Time to listen, understand your needs and talk through your options.</p></div></div><div className="reason"><span>02</span><div><h3>Conveniently in Dublin 1</h3><p>A central practice at The Forge on Railway Street, Dublin.</p></div></div><div className="reason"><span>03</span><div><h3>A range of treatments</h3><p>Support for routine dental care and broader treatment conversations.</p></div></div><div className="reason"><span>04</span><div><h3>Patient-focused experience</h3><p>A calm, professional environment designed around you.</p></div></div></div>
          </div>
        </section>

        <section className="journey-section">
          <div className="container"><div className="section-heading journey-heading"><div><p className="eyebrow">Your patient journey</p><h2>Three steps to a <em>brighter start.</em></h2></div><p className="heading-aside">Starting a conversation is simple. We will help you understand what comes next.</p></div><div className="journey-grid"><div className="journey-step"><span>01</span><div className="journey-icon"><Phone size={20} /></div><h3>Get in touch</h3><p>Call the clinic or send an appointment enquiry to begin the conversation.</p></div><div className="journey-step"><span>02</span><div className="journey-icon"><MapPin size={20} /></div><h3>Visit the practice</h3><p>Find us at The Forge, Railway Street, in the centre of Dublin 1.</p></div><div className="journey-step"><span>03</span><div className="journey-icon"><HeartPulse size={20} /></div><h3>Discuss your treatment</h3><p>Talk through your needs and the options that may be right for you.</p></div></div></div>
        </section>

        <section className="cta-section"><div className="container cta-inner"><div><p className="eyebrow light">The next step is yours</p><h2>Ready to take the next step<br className="desktop-only" /> for your <em>smile?</em></h2></div><div className="cta-actions"><button className="button button-gold" onClick={scrollToBooking}>Book an Appointment <ArrowRight size={17} /></button><a href={`tel:${phoneNumber}`} className="cta-phone"><Phone size={17} /> Call {phoneLabel}</a></div></div></section>

        <section className="section faq-section" id="faq"><div className="container faq-grid"><div><p className="eyebrow">Questions, answered</p><h2>Good to <em>know.</em></h2><p className="faq-intro">A few useful details before you get in touch. If you have another question, our team is happy to help.</p><a className="text-link" href={`tel:${phoneNumber}`}>Speak to the clinic <ArrowRight size={16} /></a></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? 'open' : ''}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{question}</span><ChevronDown size={18} /></button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></div></section>

        <section className="section contact-section" id="contact"><div className="container contact-grid"><div className="contact-info"><p className="eyebrow">Come and see us</p><h2>Let's make time for <em>your smile.</em></h2><p>Whether you are due a routine visit or want to explore a treatment, we are here to start a useful conversation.</p><div className="address"><MapPin size={19} /><div><strong>Perfect Smiles Dental Surgery</strong><span>Unit 1A, The Forge<br />Railway Street<br />Dublin 1<br />Ireland</span></div></div><a className="contact-phone" href={`tel:${phoneNumber}`}><Phone size={18} /><span>01 855 9792<small>Call the clinic</small></span></a><div className="hours"><Clock3 size={18} /><span>Appointments by arrangement<small>Contact the clinic to find a suitable time.</small></span></div></div><div className="booking-card" id="booking"><div className="booking-top"><p className="eyebrow">Appointment enquiry</p><span>01 / 01</span></div>{submitted ? <div className="form-success"><div className="success-icon"><Check size={22} /></div><h3>Thank you for your enquiry.</h3><p>This demo form has received your request. The clinic team would respond to confirm the next steps.</p><button className="text-link" onClick={() => setSubmitted(false)}>Send another enquiry <ArrowRight size={16} /></button></div> : <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}><div className="form-row"><label>Full name<input required name="name" placeholder="Your full name" /></label><label>Phone number<input required type="tel" name="phone" placeholder="01 000 0000" /></label></div><div className="form-row"><label>Email address<input required type="email" name="email" placeholder="you@example.com" /></label><label>Treatment of interest<select name="treatment" defaultValue=""><option value="" disabled>Select a treatment</option>{treatments.map((treatment) => <option key={treatment.title}>{treatment.title}</option>)}</select></label></div><div className="form-row"><label>Preferred date<input type="date" name="date" /></label><label>Message<textarea name="message" placeholder="How can we help?"></textarea></label></div><button className="button button-dark form-submit" type="submit">Request an Appointment <ArrowRight size={17} /></button><p className="form-note">This is a demonstration enquiry form. Submitting does not book an appointment.</p></form>}</div></div></section>

        <section className="location-section"><div className="container location-inner"><div className="location-map" aria-label="Map-style placeholder showing Dublin 1 location"><div className="map-lines map-lines-one" /><div className="map-lines map-lines-two" /><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-pin"><MapPin size={20} /></div><span className="map-label">The Forge<br /><small>Railway Street</small></span><span className="map-town">DUBLIN 1</span></div><div className="location-copy"><p className="eyebrow">Find your way here</p><h2>At the heart of <em>Dublin 1.</em></h2><p>Our practice is located at The Forge on Railway Street. Use the details below to plan your visit.</p><a className="text-link" href="#contact">View contact details <ArrowRight size={16} /></a></div></div></section>
      </main>

      <footer className="site-footer"><div className="container footer-main"><div className="footer-brand"><Logo /><p>Professional, personalised dental care<br />in the heart of Dublin.</p></div><div className="footer-links"><div><span>Explore</span><a href="#home">Home</a><a href="#treatments">Treatments</a><a href="#about">About</a></div><div><span>Visit</span><a href="#why-us">Why choose us</a><a href="#faq">FAQ</a><a href="#contact">Contact</a></div></div><div className="footer-contact"><span>Start a conversation</span><a href={`tel:${phoneNumber}`}>{phoneLabel} <ArrowRight size={15} /></a><button className="button button-gold" onClick={scrollToBooking}>Book an Appointment</button></div></div><div className="container footer-bottom"><span>© 2026 Perfect Smiles Dental Surgery</span><span>Website concept / demonstration.</span><span>Dublin 1, Ireland</span></div></footer>

      <div className="mobile-cta"><a href={`tel:${phoneNumber}`}><Phone size={18} /><span><strong>Call Clinic</strong><small>{phoneLabel}</small></span></a><button onClick={scrollToBooking}><CalendarDays size={18} /><span><strong>Book Appointment</strong><small>Request a visit</small></span></button></div>
    </div>
  )
}

export default App
