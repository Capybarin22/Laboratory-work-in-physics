document.getElementById('experiment-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const radius = parseFloat(document.getElementById('radius').value);
  const density = parseFloat(document.getElementById('density').value);
  const viscosity = 0.001; // Вязкость среды (пример)
  const g = 9.81; // Ускорение свободного падения

  // Масса сферы
  const mass = (4/3) * Math.PI * radius**3 * density;

  // Сила тяжести
  const forceGravity = mass * g;

  // Инициализация холста
  const canvas = document.getElementById('visualization');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let y = 30;
  let velocity = 0; // Начальная скорость
  let forceStokes = 0; // Инициализируем forceStokes

  // Добавление данных в таблицу ПЕРЕД запуском анимации
  const tableBody = document.getElementById('results-table').querySelector('tbody');
  const newRow = document.createElement('tr'); // Создаем новую строку
  newRow.innerHTML = `
    <td>${(radius * 2).toFixed(2)}</td>
    <td>${forceGravity.toFixed(2)}</td> 
    <td>${forceStokes.toFixed(2)}</td> 
    <td>${velocity.toFixed(2)}</td>
  `;
  tableBody.appendChild(newRow); 

  const animate = () => {
    // Рассчет силы Стокса
    forceStokes = 6 * Math.PI * radius * viscosity * velocity; // Обновляем значение

    // Рассчет ускорения
    const acceleration = (forceGravity - forceStokes) / mass;

    // Обновление скорости
    velocity += acceleration * 0.016; // 0.016 - приблизительный временной шаг

    // Обновление положения
    y += velocity * 0.016;

    // Очистка и отрисовка
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(canvas.width / 2, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();

    // Обновление таблицы (теперь обновляем только созданную строку)
    newRow.innerHTML = `
      <td>${(radius * 2).toFixed(2)}</td>
      <td>${forceGravity.toFixed(2)}</td> 
      <td>${forceStokes.toFixed(2)}</td> 
      <td>${velocity.toFixed(2)}</td>
    `;

    // Продолжение анимации
    if (y < canvas.height - radius) {
      requestAnimationFrame(animate);
    }
  };

  animate(); // Запускаем анимацию
});