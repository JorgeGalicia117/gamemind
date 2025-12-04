import { useEffect, useState } from "react";
import {
  fetchMetadata,
  getRecommendations,
  saveRating
} from "./services/api";

function App() {
  const [moods, setMoods] = useState([]);
  const [tags, setTags] = useState([]);

  const [selectedMood, setSelectedMood] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const { moods, tags } = fetchMetadata();
    setMoods(moods);
    setTags(tags);
  }, []);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSearch = () => {
    if (!selectedMood) {
      setError("Selecciona un estado de ánimo.");
      return;
    }
    setError("");
    setLoading(true);

    setTimeout(() => {
      const results = getRecommendations(selectedMood, selectedTags);
      setGames(results);
      setLoading(false);
    }, 300);
  };

  return (
    <div className="page-wrapper">
      <div className="card-container">

        <h1>GameMind 🎮</h1>
        <p>Recomienda juegos según tu estado de ánimo.</p>

        {/* Estado de ánimo */}
        <h2>Estado de ánimo</h2>
        <select
          value={selectedMood}
          onChange={(e) => setSelectedMood(e.target.value)}
        >
          <option value="">Selecciona uno</option>
          {moods.map((m) => (
            <option key={m.id} value={m.name}>
              {m.name}
            </option>
          ))}
        </select>

        {/* Tags */}
        <h2>Intereses</h2>
        <div className="tags-container">
          {tags.map((tag) => {
            const active = selectedTags.includes(tag.name);
            return (
              <button
                key={tag.id}
                className={`tag-btn ${active ? "active" : ""}`}
                onClick={() => toggleTag(tag.name)}
                type="button"
              >
                {tag.name}
              </button>
            );
          })}
        </div>

        {error && <p className="error">{error}</p>}

        <button className="search-btn" onClick={handleSearch}>
          {loading ? "Buscando..." : "Buscar"}
        </button>

        {/* Resultados */}
        <h2>Recomendaciones</h2>
        {games.length === 0 && <p>No hay resultados.</p>}

        {games.map((game) => (
          <div key={game.id} className="game-card">
            <h3>{game.name}</h3>
            <p>{game.description}</p>
            <p>
              <strong>Plataformas:</strong> {game.main_platform}
            </p>

            <div className="rating-box">
              <button onClick={() => saveRating(game.id, 5)}>👍</button>
              <button onClick={() => saveRating(game.id, 2)}>👎</button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default App;
