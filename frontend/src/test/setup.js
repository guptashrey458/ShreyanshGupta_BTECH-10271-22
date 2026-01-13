import '@testing-library/jest-dom'

// Mock environment variables for tests
global.import = {
  meta: {
    env: {
      VITE_API_BASE_URL: 'http://localhost:5000/api'
    }
  }
}