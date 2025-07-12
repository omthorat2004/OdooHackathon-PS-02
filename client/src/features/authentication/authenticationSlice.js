import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Base API URL
const API_BASE = 'http://localhost:3000'

// ======= ASYNC THUNKS =======

// --- Signup ---
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (formData, thunkAPI) => {
    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Signup failed')

      localStorage.setItem('token', data.token)
      return data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, thunkAPI) => {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Login failed')

      localStorage.setItem('token', data.token)
      return data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

const initialState = {
  loading: false,
  success: false,
  error: null,
  token: localStorage.getItem('token') || null,
  userData: null,
  message: ''
}

const authenticationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: state => {
      localStorage.removeItem('token')
      state.token = null
      state.userData = null
      state.success = false
      state.error = null
      state.message = 'Logged out successfully'
    },
    clearAuthState: state => {
      state.loading = false
      state.success = false
      state.error = null
      state.message = ''
    }
  },
  extraReducers: builder => {
    builder.addCase(signupUser.pending, state => {
      state.loading = true
      state.error = null
      state.success = false
    })
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.token = action.payload.token
      state.userData = action.payload.user
      state.message = 'Signup successful'
    })
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    })

    builder.addCase(loginUser.pending, state => {
      state.loading = true
      state.error = null
      state.success = false
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.token = action.payload.token
      state.userData = action.payload.user
      state.message = 'Login successful'
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    })
  }
})

export const { logoutUser, clearAuthState } = authenticationSlice.actions

export default authenticationSlice.reducer
