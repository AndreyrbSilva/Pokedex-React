import { create } from 'zustand'

interface PokedexState {
  favorites: number[]
  toggleFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedType: string
  setSelectedType: (type: string) => void
  currentPage: number
  setCurrentPage: (page: number) => void
  shinyMode: boolean
  toggleShinyMode: () => void
}

export const usePokedexStore = create<PokedexState>()((set, get) => ({
  favorites: [],
  toggleFavorite: (id) => set((state) => ({
    favorites: state.favorites.includes(id)
      ? state.favorites.filter((f) => f !== id)
      : [...state.favorites, id]
  })),
  isFavorite: (id) => get().favorites.includes(id),

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  selectedType: '',
  setSelectedType: (type) => set({ selectedType: type }),

  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),

  shinyMode: false,
  toggleShinyMode: () => set((state) => ({ shinyMode: !state.shinyMode })),
}))