import '../style/todo.scss';

// DOM elements
const taskForm = document.getElementById('submitForm');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskList = document.getElementById('taskList');

// DRY helpers
const statechange = new Event('statechange');

// State
const state = [];

// =======================================================
// Non-state changing helpers
// =======================================================

const formValidator = (title, description) => {
  const validated = { title, description };
  if (title === '') {
    validated.title = 'Feeling bored';
  }
  if (description === '') {
    validated.description = 'Hmm... Maybe I should write down a plan.';
  }
  return validated;
};

// Moves task to bottom of list if done. To top if marked as not done again.
const taskPositionHandler = (targetIndex, taskDone) => {
  const savedTask = state[targetIndex];
  state.splice(targetIndex, 1);
  if (taskDone) {
    state.unshift(savedTask);
  } else {
    state.push(savedTask);
  }
};

// =======================================================
// Builder functions
// =======================================================

const buildView = () => {
  const view = state.map(task => `
      <div id='${task.createdAt}' class='task-card ${task.done ? 'done' : ''}'>
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <button name='${task.createdAt}' class='delete-button'>Done and Dusted</button>
      </div>`)
    .join('');
  return view;
};

const createTask = (title, description) => {
  const date = new Date();
  const time = date.getTime().toString();
  state.unshift({
    createdAt: time,
    title,
    description,
  });
  window.dispatchEvent(statechange);
};

const deleteTask = taskId => {
  const ids = state.map(task => task.createdAt);
  const targetIndex = ids.indexOf(taskId);
  state.splice(targetIndex, 1);
  window.dispatchEvent(statechange);
};

const taskDoneToggle = taskId => {
  const ids = state.map(task => task.createdAt);
  const targetId = ids.indexOf(taskId);
  const taskDone = state[targetId].done;

  if (state[targetId].done) {
    state[targetId] = {
      ...state[targetId],
      done: false,
    };
  } else {
    state[targetId] = {
      ...state[targetId],
      done: true,
    };
  }
  taskPositionHandler(targetId, taskDone);
  window.dispatchEvent(statechange);
};

// =======================================================
// Event listeners
// =======================================================

taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const validated = formValidator(taskTitle.value, taskDescription.value);
  createTask(validated.title, validated.description);
  taskTitle.value = '';
  taskDescription.value = '';
});

taskList.addEventListener('click', e => {
  if (e.target.classList.contains('task-card')) {
    taskDoneToggle(e.target.id);
  } else if (e.target.parentNode.classList.contains('task-card')) {
    taskDoneToggle(e.target.parentNode.id);
  }
});

taskList.addEventListener('click', e => {
  if (e.target.classList.contains('delete-button')) {
    deleteTask(e.target.name);
  }
});

window.addEventListener('statechange', () => {
  taskList.innerHTML = buildView();
});
