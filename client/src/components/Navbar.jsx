import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/navbar.css'

const Navbar = () => {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
    setMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className='navbar-container'>
        <Link to='/' className='navbar-logo'>
          <span className='logo-text'>Stack</span>
          <span className='logo-highlight'>It</span>
        </Link>

        <button
          className='navbar-toggle'
          onClick={toggleMobileMenu}
          aria-label='Toggle navigation'
        >
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        <nav className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`}>
          {token ? (
            <>
              <Link
                to='/post'
                className='nav-link'
                onClick={() => setMobileMenuOpen(false)}
              >
                Create Post
              </Link>
              <Link
                to='/profile'
                className='nav-link'
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <button className='nav-button' onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to='/login'
                className='nav-link'
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to='/signup'
                className='nav-button'
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
