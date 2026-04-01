import { create } from 'zustand'

interface PokedexState {
  favorites: number[]
  toggleFavorite: (id: number) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedType: string
  setSelectedType: (type: string) => void
  currentPage: number
  setCurrentPage: (page: number) => void
  shinyMode: boolean
  toggleShinyMode: () => void
}

export const usePokedexStore = create<PokedexState>((set) => ({
  favorites: [],
  toggleFavorite: (id: number) => set((state) => {
    if (state.favorites.includes(id)) {
      return { favorites: state.favorites.filter((favId) => favId !== id) }
    } else {
      return { favorites: [...state.favorites, id] }
    }
  }),

  searchQuery: '',
  setSearchQuery: (query: string) => set({ searchQuery: query }),

  selectedType: '',
  setSelectedType: (type: string) => set({ selectedType: type }),

  currentPage: 1,
  setCurrentPage: (page: number) => set({ currentPage: page }),

  shinyMode: false,
  toggleShinyMode: () => set((state) => ({ shinyMode: !state.shinyMode }))
}))