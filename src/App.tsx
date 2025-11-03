import { useState } from 'react'
import Header from './components/utils/Header'
import { ProfilePage } from './components/profile/ProfilePage'
import { ErrorBoundary } from './components/utils/ErrorBoundary'

export const App = () => {
  const raw = typeof window !== 'undefined' ? window.location.pathname : ''
  const segments = raw.split('/').filter(Boolean)
  const username = segments[0]

  const [input, setInput] = useState('')
  const [currentPath, setCurrentPath] = useState(username || '')

  const goTo = (name: string) => {
    const path = name.trim()
    if (!path) return
    const newPath = `/${encodeURIComponent(path)}`
    window.history.pushState({}, '', newPath)
    setCurrentPath(path)
    setInput('')
  }

  const goHome = () => {
    window.history.pushState({}, '', '/')
    setCurrentPath('')
    setInput('')
  }

  const currentUsername = currentPath || username

  if (currentUsername) {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-white">
          <Header onLogoClick={goHome} />
          <ProfilePage username={currentUsername} />
        </div>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <Header onLogoClick={goHome} />
        <main className="text-center w-11/12 mx-auto">
          <h1 className="font-bold my-8">Buscar perfil do GitHub</h1>
          <p className="mb-6 text-short text-light-dark">Digite o nome de usuário na URL ou use o campo abaixo para abrir /{`{username}`}</p>
          <div className="flex gap-2 justify-center">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Insira o usuario do Github" className=" border w-[320px] px-3" />
            <button onClick={() => goTo(input)} className="px-4 py-2 bg-gradient text-white rounded">Buscar</button>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  )
}
