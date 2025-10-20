const API_URL = 'http://localhost:3000/todos';

async function fetchTodos() {
  const res = await fetch(API_URL);
  const todos = await res.json();
  const list = document.getElementById('todo-list');
  list.innerHTML = '';

  todos.forEach(todo => {
    const item = document.createElement('li');

    const textSpan = document.createElement('span');
    textSpan.textContent = `${todo.text} ${todo.done ? '✅' : ''}`;
    textSpan.style.marginRight = '10px';
    textSpan.onclick = () => toggleTodo(todo.id, !todo.done);

    const editBtn = document.createElement('button');
    editBtn.textContent = '✏️';
    editBtn.style.marginRight = '5px';
    editBtn.onclick = () => editTodo(todo.id, todo.text);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.onclick = () => deleteTodo(todo.id);

    item.appendChild(textSpan);
    item.appendChild(editBtn);
    item.appendChild(deleteBtn);
    list.appendChild(item);
  });
}

async function addTodo() {
  const input = document.getElementById('todo-input');
  const text = input.value.trim();
  if (!text) return;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });

  input.value = '';
  fetchTodos();
}

async function toggleTodo(id, done) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ done })
  });

  fetchTodos();
}

async function editTodo(id, oldText) {
  const newText = prompt('Edit task:', oldText);
  if (!newText || newText.trim() === '') return;

  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: newText.trim() })
  });

  fetchTodos();
}

async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  fetchTodos();
}

fetchTodos();
