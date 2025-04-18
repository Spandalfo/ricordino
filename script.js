let points = parseInt(localStorage.getItem('points')) || 0;
let level = Math.floor(points / 100) + 1;

document.getElementById('points').innerText = points % 100;
document.getElementById('level').innerText = level;
updateProgressBar();
document.getElementById('note-area').value = localStorage.getItem('notes') || '';

function addTodo() {
  const input = document.getElementById('todo-input');
  const text = input.value.trim();
  if (text) {
    const li = document.createElement('li');
    li.innerHTML = `<label><input type="checkbox" onchange="completeTask(this, 10)"> ${text}</label>`;
    document.getElementById('todo-list').appendChild(li);
    input.value = '';
    saveList('todo-list');
  }
}

function addHabit() {
  const input = document.getElementById('habit-input');
  const text = input.value.trim();
  if (text) {
    const li = document.createElement('li');
    li.innerHTML = `<label><input type="checkbox" onchange="completeTask(this, 5)"> ${text}</label>`;
    document.getElementById('habit-list').appendChild(li);
    input.value = '';
    saveList('habit-list');
  }
}

function completeTask(checkbox, pts) {
  if (checkbox.checked) {
    addPoints(pts);
    checkbox.disabled = true;
  }
}

function addPoints(p) {
  const prevLevel = level;
  points += p;
  localStorage.setItem('points', points);
  level = Math.floor(points / 100) + 1;
  document.getElementById('points').innerText = points % 100;
  document.getElementById('level').innerText = level;
  updateProgressBar();
  if (level > prevLevel) {
    document.getElementById('level-up-sound').play();
    if (navigator.vibrate) navigator.vibrate(300);
  }
}

function updateProgressBar() {
  const progress = (points % 100);
  document.getElementById('level-progress').style.width = progress + '%';
}

function saveList(id) {
  const items = [];
  document.querySelectorAll(`#${id} li`).forEach(li => {
    const label = li.querySelector('label');
    if (label) items.push(label.innerText.trim());
  });
  localStorage.setItem(id, JSON.stringify(items));
}

function loadList(id) {
  const items = JSON.parse(localStorage.getItem(id)) || [];
  items.forEach(text => {
    const li = document.createElement('li');
    li.innerHTML = `<label><input type="checkbox" onchange="completeTask(this, ${id === 'todo-list' ? 10 : 5})"> ${text}</label>`;
    document.getElementById(id).appendChild(li);
  });
}

loadList('todo-list');
loadList('habit-list');

document.getElementById('note-area').addEventListener('input', () => {
  localStorage.setItem('notes', document.getElementById('note-area').value);
});
