import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  clearAuthState,
  loginUser
} from '../features/authentication/authenticationSlice'
import '../styles/AuthForm.css'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, success, message, token } = useSelector(
    state => state.auth
  )

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(loginUser(formData))
  }

  // Navigate on successful login
  useEffect(() => {
    if (success && token) {
      navigate('/') // or navigate('/') if you prefer
      dispatch(clearAuthState()) // Clear success message after navigation
    }
  }, [success, token, navigate, dispatch])

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Log In</h2>
      <input
        type='email'
        name='email'
        placeholder='Email'
        required
        onChange={handleChange}
      />
      <input
        type='password'
        name='password'
        placeholder='Password'
        required
        onChange={handleChange}
      />
      <button type='submit' disabled={loading}>
        {loading ? 'Logging in...' : 'Log In'}
      </button>
      {error && <p className='auth-error'>{error}</p>}
      {success && (
        <p className='auth-success'>{message || 'Login successful!'}</p>
      )}
    </form>
  )
}

export default LoginForm
