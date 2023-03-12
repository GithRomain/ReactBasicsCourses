import './NavBar.css'
import logo from '../../../public/images/airbnb-logo.png'

function NavBar() {

  return (
    <div className="NavBar">
        <div className='nav--bar'>
            <img className='logo' src={logo} alt="Airbnb Logo" />
        </div>
    </div>
  )
}

export default NavBar