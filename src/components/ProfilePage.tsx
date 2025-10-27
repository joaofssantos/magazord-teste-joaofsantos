import React, { useEffect } from 'react'
import ProfileSection from './ProfileSection'
import { useUser } from '../hooks/useGithubApi'
import { useGithubStore } from '../store/useGithubStore'

const ProfilePage: React.FC<{ username: string }> = ({ username }) => {

  const { setUsername, clearUsername } = useGithubStore()
  const userQuery = useUser(username)

  useEffect(() => {
    setUsername(username)
    return () => clearUsername()
  }, [username, setUsername, clearUsername])

  if (userQuery.isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-lg">Carregando perfil...</div>
      </div>
    )
  }

  if (userQuery.isError) {
    return (
      <div className="flex items-center justify-center">
        <div className=" text-center">
          <h2 >Usuário não encontrado</h2>
          <p >
            Não foi possível localizar o usuário "{username}" no GitHub.
          </p>
          <a 
            href="/" 
            
          >
            Voltar para home
          </a>
        </div>
      </div>
    )
  }

  const user = userQuery.data

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1280px] mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <ProfileSection user={user} />
          </div>
          <div className="col-span-9 bg-black">
            <p className='text-white text-center'>section - repositories</p>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
