// script.js
let points = parseInt(localStorage.getItem('points')) || 0;
let level = Math.floor(points / 100) + 1;

document.getElementById('points').innerText = points;
document.getElementById('level').innerText = level;

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

function toggleHabit(checkbox) {
  if (checkbox.checked) {
    addPoints(5);
  }
}

function addPoints(p) {
  points += p;
  level = Math.floor(points / 100) + 1;
  document.getElementById('points').innerText = points;
  document.getElementById('level').innerText = level;
  localStorage.setItem('points', points);
}

loadTodos();
