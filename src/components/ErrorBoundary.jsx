import { Component } from "react"
import PrimaryButton from "./ui/PrimaryButton"

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-4 text-center">
          <div className="mb-4 text-5xl">!</div>
          <h1 className="mb-2 text-xl font-bold text-text-primary">Terjadi Kesalahan</h1>
          <p className="mb-6 max-w-md text-sm text-text-secondary">
            {typeof this.state.error?.message === 'string' ? this.state.error.message : "Aplikasi mengalami gangguan. Silakan muat ulang halaman."}
          </p>
          <div className="flex gap-3">
            <PrimaryButton onClick={() => window.location.reload()}>
              Muat ulang halaman
            </PrimaryButton>
            <PrimaryButton variant="outline" onClick={this.handleReset}>
              Coba lagi
            </PrimaryButton>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
