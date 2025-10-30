import { useState } from 'react'
import Header from './components/Header'
import { ProfilePage } from './components/ProfilePage'

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
  }

  const goHome = () => {
    window.history.pushState({}, '', '/')
    setCurrentPath('')
  }

  const currentUsername = currentPath || username

  if (currentUsername) {
    return (
      <div className="min-h-screen bg-white">
        <Header onLogoClick={goHome} />
        <ProfilePage username={currentUsername} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onLogoClick={goHome} />
      <main className="text-center">
        <h1 className="font-bold mb-4">Buscar perfil do GitHub</h1>
        <p className="mb-6 text-short text-light-dark">Digite o nome de usuário na URL ou use o campo abaixo para abrir /{`{username}`}</p>
        <div className="flex gap-2 justify-center">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Insira o usuario do Github" className=" border" />
          <button onClick={() => goTo(input)} className="px-4 py-2 bg-gradient text-white rounded">Buscar</button>
        </div>
      </main>
    </div>
  )
}
