import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import AppRoutes from "./routes"

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text-primary">
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}
