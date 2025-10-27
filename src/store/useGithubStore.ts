import { create } from 'zustand'

interface GithubStore {

  username: string | null

  setUsername: (username: string) => void
  clearUsername: () => void
}

export const useGithubStore = create<GithubStore>((set) => ({

  username: null,

  setUsername: (username) => set({ username }),
  clearUsername: () => set({ username: null }),
}))