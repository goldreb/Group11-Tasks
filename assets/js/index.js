import TaskManager from "./taskManager.js";

// form container
const form = document.querySelector("#form-container");
//input field
const inputTasks = document.querySelector("#inputTasks");
//details field
const detailsInput = document.querySelector("#inputDetails");
//
const assignTo = document.querySelector("#assignTo");
//status
const statusInput = document.querySelector("#statusInput");
//calendar

const calendar = document.querySelector("#dueDate");

// ----task manager----

const tasks = new TaskManager();
tasks.load();
tasks.render();
tasks.getTasksById(0);

// end of task manager

//listen to submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // e.stopPropagation();
  validFormInput();

  try {
    tasks.addTasks(
      inputTasks.value,
      detailsInput.value,
      assignTo.value,
      statusInput.value,
      calendar.value
    );
  } catch (error) {
    console.error(error);
  }
  resetForm();
  tasks.render();
  tasks.getTasksById(1);
  tasks.save();

  console.log(tasks);
});

//validation
const validFormInput = () => {
  const inputTitle = inputTasks.value;
  const details = detailsInput.value;
  const assign = assignTo.value;
  const status = statusInput.value;
  const dueDate = calendar.value;

  if (inputTitle === "") {
    showError(inputTasks, "Task cannot be empty");
  } else {
    showSuccess(inputTasks);
  }

  if (details === "") {
    showError(detailsInput, "Details cannot be empty");
  } else {
    showSuccess(detailsInput);
  }

  if (assign === "") {
    showError(assignTo, "Please assign task");
  } else {
    showSuccess(assignTo);
  }

  if (status === " ") {
    showError(statusInput, "Please assign status");
  } else {
    showSuccess(statusInput);
  }

  if (dueDate === "") {
    showError(calendar, "Do not forget due date");
  } else {
    showSuccess(calendar);
  }
};

const showError = (input, message) => {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-field error";
  small.innerText = message;
};

const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-field success";
};

//to reset the form after the input has been submitted

const resetForm = () => {
  inputTasks.value = "";

  detailsInput.value = "";
  assignTo.value = "";
  statusInput.value = "";
  calendar.value = "";
};

const taskCard = document.querySelector("#taskCard");
// console.log(taskCard);

taskCard.addEventListener("click", (event) => {
  event.preventDefault();

  cardDone(event.target);
  deleteCard(event.target);
  // removeLocalLists(deleteCard);
});

// card is done and will have a strikethrough on the card
let cardDone = (el) => {
  if (el.classList.contains("fa-square-check")) {
    let checkCard = el.parentElement.parentElement.parentElement;
    checkCard.classList.add("doneCard");

    // let searchTask;
    // searchTask = tasks.getTasksById(checkCard);

    //console.log(checkCard);
  }
};

// delete the card
let deleteCard = (el) => {
  if (el.classList.contains("fa-xmark")) {
    const parentTasks = el.parentElement.parentElement.parentElement;

    parentTasks.remove();
    removeLocalLists(parentTasks);
  }
};

//remove localstorage

function removeLocalLists(list) {
  let lists;

  if (localStorage.getItem("tasks") === null) {
    lists = [];
  } else {
    lists = JSON.parse(localStorage.getItem("tasks"));
  }

  const listIndex = list.innerText;
  console.log(list.innerText);

  lists.splice(lists.indexOf(listIndex), 1);
  localStorage.setItem("tasks", JSON.stringify(lists));
}
