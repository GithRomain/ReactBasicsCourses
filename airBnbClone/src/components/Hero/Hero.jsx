import './Hero.css'
import image from '../../../public/images/photo-grid.png'

function Hero() {
  return (
    <div className="Hero">
      <section className="hero">
        <img src={image} className="hero--photo" />
        <h1 className="hero--header">Online Experiences</h1>
        <p className="hero--text">Join unique interactive activities led by 
        one-of-a-kind hosts—all without leaving home.</p>
      </section>
    </div>
  )
}

export default Hero