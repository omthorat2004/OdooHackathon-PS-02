import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signupUser } from '../features/authentication/authenticationSlice'
import '../styles/AuthForm.css'

const SignupForm = () => {
  const dispatch = useDispatch()
  const { loading, error, success, message } = useSelector(state => state.auth)

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(signupUser(formData))
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type='text'
        name='username'
        placeholder='Username'
        required
        onChange={handleChange}
      />
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
        {loading ? 'Creating...' : 'Create Account'}
      </button>
      {error && <p className='auth-error'>{error}</p>}
      {success && (
        <p className='auth-success'>{message || 'Signup successful!'}</p>
      )}
    </form>
  )
}

export default SignupForm
