import NavBar from '../NavBar/NavBar'
import Hero from '../Hero/Hero'
import Card from '../Card/Card'
import './App.css'

import data from '../../../public/data'

function App() {
  const cards = data.map(item => {
    return (
      <Card 
      key={item.id}
      {...item}
      />
    )
  }) 

  return (
    <div className="App">
      <NavBar />
      <Hero className="Hero" />
      <section className="cards-list">
                {cards}
            </section>
    </div>
  )
}

export default App