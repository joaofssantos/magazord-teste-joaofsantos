import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GithubStore {

  username: string | null
  activeTab: 'repos' | 'starred'
  searchQuery: string

  setUsername: (username: string) => void
  clearUsername: () => void
  setActiveTab: (tab: 'repos' | 'starred') => void
  setSearchQuery: (query: string) => void
  reset: () => void
}

export const useGithubStore = create<GithubStore>()(
  persist(
    (set) => ({
      username: null,
      activeTab: 'repos',
      searchQuery: '',

      setUsername: (username) => set({ username }),
      clearUsername: () => set({ username: null }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      reset: () => set({ activeTab: 'repos', searchQuery: '' }),
    }),
    {
      name: 'github-store',
      partialize: (state) => ({ activeTab: state.activeTab, searchQuery: state.searchQuery }),
    }
  )
)