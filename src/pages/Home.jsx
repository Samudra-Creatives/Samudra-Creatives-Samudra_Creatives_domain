import Navbar from '../components/layout/Navbar'
import Hero from '../components/home/Hero'
import Footer from '../components/layout/Footer'

function Home() {
  return (
    <div className="site-shell">
      <Navbar />
      <main>
        <Hero />
        <section className="intro-section">
          <p className="eyebrow">Creative printing studio</p>
          <h2>Ideas made tangible.</h2>
          <p>Samudra Creatives helps people and businesses turn meaningful ideas into beautiful printed experiences.</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home
