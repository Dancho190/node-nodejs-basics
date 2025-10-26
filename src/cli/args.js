const parseArgs = () => {
  // Первые два это путь до node.exe и путь до текущего скрипта.
  const args = process.argv.slice(2);

  // Создаём array для хранения результатов.
  const result = [];
  // Фориком по элементам
  for (let i = 0; i < args.length; i += 2) {
    if (args[i].startsWith('--')) {
      // Убираем первые два символа чтобы получить имя параметра
      const propName = args[i].substring(2);
      // Берём следующее значение пойнтера в массиве
      const value = args[i + 1];
      // Пушим строку "имя is значение" и добавляем в result
      result.push(`${propName} is ${value}`);
    }
  }
  
  // Склеиваем все строки джойном через запятую и выводим в консоль
  console.log(result.join(', '));
};
parseArgs();