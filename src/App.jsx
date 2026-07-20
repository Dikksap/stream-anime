import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import ErrorBoundary from "./components/ErrorBoundary"
import AppRoutes from "./routes"

export default function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-bg text-text-primary">
        <Navbar />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}
