export interface PokemonType {
  slot: number
  type: {
    name: string
  }
}

export interface PokemonMove {
    move: {
        name: string;
        url: string;
    };
    version_group_details: {
        level_learned_at: number;
        move_learn_method: {
            name: string;
        };
    }[];
}

export interface PokemonStat {
    base_stat: number;
    stat: {
        name: string;
    }
}

export interface PokemonSprites {
  front_default: string | null
  front_shiny: string | null
  other: {
    'official-artwork': {
      front_default: string | null
      front_shiny: string | null
    }
  }
}

export interface PokemonAbility {
    ability: {
        name: string;
    }
    is_hidden: boolean;
}

export interface PokemonSpecies {
    flavor_text_entries: {
        flavor_text: string;
        language: {
            name: string;
        }
    }[];

    genera : {
        genus: string;
        language: {
            name: string;
        }
    }[];

    is_legendary: boolean;
    is_mythical: boolean;

    generation: {
        name: string;
    };

    egg_groups: {
        name: string;
    }[];

    gender_rate: number;

    hatch_counter: number;

    evolution_chain: {
        url: string;
    };

    varieties: {
        is_default: boolean;
        pokemon: {
            name: string;
            url: string;
        }
    }[];
}

export interface Pokemon {
    id: number;
    name: string;
    types: PokemonType[];
    moves: PokemonMove[];
    sprites: PokemonSprites;
    abilities: PokemonAbility[];
    height: number;
    weight: number;
    stats: PokemonStat[];
    species: {
        name: string;
        url: string;
    };
}

export const TYPE_COLORS: Record<string, string> = {
  normal:   '#A8A77A',
  fire:     '#EE8130',
  water:    '#6390F0',
  electric: '#F7D02C',
  grass:    '#7AC74C',
  ice:      '#96D9D6',
  fighting: '#C22E28',
  poison:   '#A33EA1',
  ground:   '#E2BF65',
  flying:   '#A98FF3',
  psychic:  '#F95587',
  bug:      '#A6B91A',
  rock:     '#B6A136',
  ghost:    '#735797',
  dragon:   '#6F35FC',
  dark:     '#705746',
  steel:    '#B7B7CE',
  fairy:    '#D685AD',
}

export const TYPE_LABELS_PT: Record<string, string> = {
  normal:   'Normal',
  fire:     'Fogo',
  water:    'Água',
  electric: 'Elétrico',
  grass:    'Planta',
  ice:      'Gelo',
  fighting: 'Lutador',
  poison:   'Veneno',
  ground:   'Terra',
  flying:   'Voador',
  psychic:  'Psíquico',
  bug:      'Inseto',
  rock:     'Pedra',
  ghost:    'Fantasma',
  dragon:   'Dragão',
  dark:     'Sombrio',
  steel:    'Aço',
  fairy:    'Fada',
}

export const STAT_LABELS: Record<string, string> = {
  hp:               'HP',
  attack:           'ATK',
  defense:          'DEF',
  'special-attack': 'SP.ATK',
  'special-defense':'SP.DEF',
  speed:            'SPD',
}