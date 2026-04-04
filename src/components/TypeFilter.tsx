import { TYPE_COLORS } from "../types/pokemon";
import { usePokedexStore } from "../store/pokedexStore";

export function TypeFilter() {
  const { selectedType, setSelectedType, setCurrentPage } = usePokedexStore()

  return (
    <div className="">
        <button className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
        onClick={() => {
          setSelectedType(null)
          setCurrentPage(0)
        }}>Todos</button>
        {Object.keys(TYPE_COLORS).map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded ${
              selectedType === type ? "bg-gray-300" : "bg-gray-100"
            }`}
            onClick={() => {
              setSelectedType(type)
              setCurrentPage(0)
            }}
          >
            {type}
          </button>
        ))}
    </div>
    );
}

export default TypeFilter