export function normalizeText(value = "") {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s./:#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildSearchFields(item) {
  return {
    title: normalizeText(item.title),
    category: normalizeText(item.category),
    description: normalizeText(item.description),
    tags: normalizeText(item.tags.join(" ")),
    aliases: normalizeText(item.aliases.join(" ")),
    language: normalizeText(item.language)
  };
}

function getSearchScore(item, rawQuery) {
  const query = normalizeText(rawQuery);

  if (!query) {
    return 0;
  }

  const fields = buildSearchFields(item);
  const combined = Object.values(fields).join(" ");
  const tokens = query.split(" ").filter(Boolean);

  const allTokensMatch = tokens.every((token) => combined.includes(token));
  if (!allTokensMatch) {
    return -1;
  }

  let score = 0;

  if (fields.title === query) score += 120;
  if (fields.title.startsWith(query)) score += 75;
  if (fields.title.includes(query)) score += 55;
  if (fields.aliases.includes(query)) score += 45;
  if (fields.tags.includes(query)) score += 35;
  if (fields.category.includes(query)) score += 25;
  if (fields.description.includes(query)) score += 15;

  tokens.forEach((token) => {
    if (fields.title.includes(token)) score += 12;
    if (fields.aliases.includes(token)) score += 9;
    if (fields.tags.includes(token)) score += 7;
    if (fields.description.includes(token)) score += 3;
  });

  return score;
}

export function searchCheats(items, { query = "", language = "all" } = {}) {
  return items
    .filter((item) => language === "all" || item.language === language)
    .map((item, index) => ({
      item,
      index,
      score: getSearchScore(item, query)
    }))
    .filter((result) => result.score >= 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((result) => result.item);
}
