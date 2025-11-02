import { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="max-w-lg text-center p-6 border rounded">
            <h2 className="text-2xl font-bold mb-2">Algo deu errado</h2>
            <p className="text-short text-light-dark mb-4">
              {this.state.error?.message || 'Ocorreu um erro inesperado.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-secondary text-white rounded hover:bg-opacity-90 transition-colors"
            >
              Recarregar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
