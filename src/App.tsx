import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from 'sonner'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

// Public Pages
import { Landing } from '@/pages/Landing'
import { Login } from '@/pages/Login'
import { Signup } from '@/pages/Signup'

// Protected Pages (Dashboard)
import { Dashboard } from '@/pages/Dashboard'
import { QRCodesList } from '@/pages/QRCodesList'
import { CreateQRCode } from '@/pages/CreateQRCode'
import { QRCodeDetails } from '@/pages/QRCodeDetails'

// Public Redirect Page (Dynamic QR Codes)
import { Redirect } from '@/pages/Redirect'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Public Redirect Route - Dynamic QR Codes */}
          <Route path="/r/:shortCode" element={<Redirect />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/qrcodes"
            element={
              <ProtectedRoute>
                <QRCodesList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/qrcodes/create"
            element={
              <ProtectedRoute>
                <CreateQRCode />
              </ProtectedRoute>
            }
          />
          <Route
            path="/qrcodes/:id"
            element={
              <ProtectedRoute>
                <QRCodeDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
