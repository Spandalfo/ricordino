let points = parseInt(localStorage.getItem('points')) || 0;
let level = Math.floor(points / 100) + 1;

document.getElementById('points').innerText = points;
document.getElementById('level').innerText = level;
updateProgressBar();

document.getElementById('note-area').value = localStorage.getItem('notes') || '';

function addTodo() {
  const input = document.getElementById('todo-input');
  const text = input.value.trim();
  if (text) {
    const li = document.createElement('li');
    li.innerHTML = `<span>${text}</span> <button onclick="completeTodo(this)">✓</button>`;
    document.getElementById('todo-list').appendChild(li);
    saveTodos();
    input.value = '';
  }
}

function completeTodo(button) {
  const li = button.parentElement;
  li.remove();
  addPoints(10);
  saveTodos();
}

function saveTodos() {
  const todos = [];
  document.querySelectorAll('#todo-list li span').forEach(span => todos.push(span.textContent));
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${todo}</span> <button onclick="completeTodo(this)">✓</button>`;
    document.getElementById('todo-list').appendChild(li);
  });
}

function saveNote() {
  const note = document.getElementById('note-area').value;
  localStorage.setItem('notes', note);
  addPoints(5);
}

function toggleHabit(checkbox, habitText) {
  if (checkbox.checked) {
    addPoints(5);
    checkbox.disabled = true;
  }
}

function addHabit() {
  const input = document.getElementById('habit-input');
  const habitText = input.value.trim();
  if (habitText) {
    const li = document.createElement('li');
    li.innerHTML = `<label><input type="checkbox" onchange="toggleHabit(this, '${habitText}')"> ${habitText}</label> <button onclick="this.parentElement.remove()">🗑️</button>`;
    document.getElementById('habit-list').appendChild(li);
    input.value = '';
    saveHabits();
  }
}

function saveHabits() {
  const habits = [];
  document.querySelectorAll('#habit-list li label').forEach(label => {
    habits.push(label.textContent.trim());
  });
  localStorage.setItem('habits', JSON.stringify(habits));
}

function loadHabits() {
  const habits = JSON.parse(localStorage.getItem('habits')) || [];
  habits.forEach(habitText => {
    const li = document.createElement('li');
    li.innerHTML = `<label><input type="checkbox" onchange="toggleHabit(this, '${habitText}')"> ${habitText}</label> <button onclick="this.parentElement.remove()">🗑️</button>`;
    document.getElementById('habit-list').appendChild(li);
  });
}

function addPoints(p) {
  points += p;
  level = Math.floor(points / 100) + 1;
  document.getElementById('points').innerText = points;
  document.getElementById('level').innerText = level;
  localStorage.setItem('points', points);
  updateProgressBar();
}

function updateProgressBar() {
  const progress = (points % 100);
  document.getElementById('level-progress').style.width = progress + '%';
}

function resetLevel() {
  localStorage.setItem('points', '0');
  points = 0;
  level = 1;
  document.getElementById('points').innerText = points;
  document.getElementById('level').innerText = level;
  updateProgressBar();
}

loadTodos();
loadHabits();
