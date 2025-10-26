const parseEnv = () => {
  // Берём все переменные окружения в виде пар 
  const rssVars = Object.entries(process.env)
    // Фильтруем только те,у которых ключ начинается с "RSS_"
    .filter(([key]) => key.startsWith('RSS_'))
    // Преобразуем каждую пару в строку вида "ключ=значение"
    .map(([key, value]) => `${key}=${value}`)
    // Склеиваем все строки в одну,разделяя их 
    .join('; ');
  console.log(rssVars);
};

parseEnv();