
let points = parseInt(localStorage.getItem('points')) || 0;
let level = Math.floor(points / 100) + 1;

document.getElementById('points').innerText = points % 100;
updateProgressBar();

function addTodo() {
  const input = document.getElementById('todo-input');
  const val = input.value.trim();
  if (val) {
    const li = document.createElement('li');
    li.innerHTML = `<label><input type="checkbox" onchange="completeTask(this, 10)"> ${val}</label>`;
    document.getElementById('todo-list').appendChild(li);
    input.value = '';
  }
}

function addHabit() {
  const input = document.getElementById('habit-input');
  const val = input.value.trim();
  if (val) {
    const li = document.createElement('li');
    li.innerHTML = `<label><input type="checkbox" onchange="completeTask(this, 5)"> ${val}</label>`;
    document.getElementById('habit-list').appendChild(li);
    input.value = '';
  }
}

function completeTask(checkbox, score) {
  if (checkbox.checked) {
    addPoints(score);
    checkbox.disabled = true;
  }
}

function addPoints(p) {
  const prev = Math.floor(points / 100);
  points += p;
  const newLevel = Math.floor(points / 100);
  document.getElementById('points').innerText = points % 100;
  updateProgressBar();
  localStorage.setItem('points', points);
  if (newLevel > prev) {
    document.getElementById('level-up-sound').play();
    if (navigator.vibrate) navigator.vibrate(300);
  }
}

function updateProgressBar() {
  const progress = (points % 100);
  document.getElementById('level-progress').style.width = progress + '%';
}

// Water tracker
function loadWater() {
  const saved = JSON.parse(localStorage.getItem('water') || '[]');
  const container = document.getElementById('water-tracker');
  container.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const div = document.createElement('div');
    div.className = 'water-glass' + (saved[i] ? ' filled' : '');
    div.innerText = '0.3L';
    div.onclick = () => {
      div.classList.toggle('filled');
      saved[i] = div.classList.contains('filled');
      localStorage.setItem('water', JSON.stringify(saved));
    };
    container.appendChild(div);
  }
}
loadWater();
