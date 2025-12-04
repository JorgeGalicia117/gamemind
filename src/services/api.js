const moods = [
  { id: 1, name: "relajado" },
  { id: 2, name: "estresado" },
  { id: 3, name: "triste" },
  { id: 4, name: "motivado" },
  { id: 5, name: "curioso" }
];

const tags = [
  { id: 1, name: "historia" },
  { id: 2, name: "estrategia" },
  { id: 3, name: "relajante" },
  { id: 4, name: "competitivo" },
  { id: 5, name: "cooperativo" },
  { id: 6, name: "educativo" }
];

const games = [
  {
    id: 1,
    name: "Assassin's Creed Origins",
    description:
      "Aventura en Egipto. Excelente para aprender historia y explorar.",
    main_platform: "PC / Consola",
    moods: ["relajado", "curioso"],
    tags: ["historia", "educativo"]
  },
  {
    id: 2,
    name: "Civilization VI",
    description:
      "Estrategia por turnos, construye civilizaciones históricas.",
    main_platform: "PC",
    moods: ["relajado", "curioso"],
    tags: ["historia", "estrategia", "educativo"]
  },
  {
    id: 3,
    name: "Stardew Valley",
    description: "Simulador de granja muy relajante.",
    main_platform: "PC / Consola / Móvil",
    moods: ["relajado", "triste"],
    tags: ["relajante"]
  }
];


export function fetchMetadata() {
  return { moods, tags };
}


export function getRecommendations(mood, selectedTags) {
  let filtered = games.filter((g) =>
    g.moods.map((m) => m.toLowerCase()).includes(mood.toLowerCase())
  );

  if (selectedTags.length > 0) {
    filtered = filtered.filter((g) =>
      selectedTags.some((tag) =>
        g.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
      )
    );
  }
  return filtered;
}


export function saveRating(gameId, rating, comment = "") {
  console.log("Rating simulado:", {
    gameId,
    rating,
    comment,
    fecha: new Date().toISOString()
  });
}
