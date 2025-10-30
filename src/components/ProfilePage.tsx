import { useEffect } from 'react'
import { ProfileSection } from './ProfileSection'
import { RepoPanel } from './RepoPanel'
import { useUser } from '../hooks/useGithubApi'
import { useGithubStore } from '../store/useGithubStore'

export const ProfilePage = ({ username }: { username: string }) => {

  const { setUsername, clearUsername, reset } = useGithubStore()
  const userQuery = useUser(username)

  useEffect(() => {
    setUsername(username)
    reset()
    return () => clearUsername()
  }, [username, setUsername, clearUsername, reset])

  if (userQuery.isLoading) return <div className="p-6">Carregando o perfil</div>
  if (userQuery.isError) {
    const status = (userQuery.error as any)?.response?.status
    const isNotFound = status === 404
    const title = isNotFound ? 'Usuário não encontrado' : 'Não foi possível carregar o usuário'
    const message = isNotFound
      ? `Não foi possível localizar o usuário "${username}" no GitHub.`
      : 'Pode ter ocorrido um limite de requisições da API do GitHub. Tente novamente em alguns minutos ou use um token em VITE_GITHUB_TOKEN.'
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-lg text-center p-6 border rounded">
          <h2 className="text-2xl font-semibold mb-2">{title}</h2>
          <p className="text-short text-light-dark mb-4">{message}</p>
          <a href="/" className="px-4 py-2 bg-secondary text-white rounded">Voltar</a>
        </div>
      </div>
    )
  }

  const user = userQuery.data

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1280px] mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-8">
          <div className="md:col-span-3 col-span-4">
            <ProfileSection user={user} />
          </div>
          <div className="md:col-span-9 col-span-8">
            <RepoPanel username={username} />
          </div>
        </div>
      </div>
    </div>
  )
}
