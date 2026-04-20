# Pokedex React

Interface de Pokedex construida com React e TypeScript, consumindo a [PokeAPI](https://pokeapi.co). Design dark com estetica neon, totalmente responsiva para mobile e desktop.

## Funcionalidades

- Listagem de todos os 1025 Pokemon com paginacao
- Busca por nome ou ID
- Filtro por tipo com dropdown customizado no mobile e pills no desktop
- Pagina de detalhes com stats, habilidades, moves, breeding e formas cosmeticas
- Cadeia de evolucao em layout de arvore
- Modo shiny global e por Pokemon
- Sistema de favoritos com persistencia local
- Navegacao bottom bar no mobile estilo Instagram
- Design responsivo mobile-first

## Stack

- React 18 com TypeScript
- Vite
- Tailwind CSS
- Zustand para gerenciamento de estado
- React Router DOM
- PokeAPI (REST, sem autenticacao)

## Como rodar

```bash
npm install
npm run dev
```

Build para producao:

```bash
npm run build
```

## Estrutura

```
src/
  components/    # PokemonCard, TypeFilter, StatBar, EvolutionChain, ...
  hooks/         # usePokemon, usePokemonList, usePokemonByType, usePokemonSpecies
  pages/         # HomePage, FavoritesPage, PokemonDetailPage
  store/         # pokedexStore (Zustand)
  types/         # tipos TypeScript e TYPE_COLORS
```

## Deploy

Disponivel em: [mypokedex-rct.vercel.app](https://mypokedex-rct.vercel.app)
