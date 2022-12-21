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
tasks.render();
tasks.getTasksById(0)

// end of task manager

//listen to submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
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
  tasks.getTasksById(1)

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

  if (status === "") {
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

//to reset the form after the input has been submitted

const resetForm = () => {
  inputTasks.value = "";
  detailsInput.value = "";
  assignTo.value = "";
  statusInput.value = "";
  calendar.value = "";

  // inputTasks.classList.remove("success");
  // detailsInput.classList.remove("success");
  // assignTo.classList.remove("success");
  // statusInput.classList.remove("success");
  // calendar.classList.remove("success");
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

//getting the task card to update the task

const taskCard = document.querySelector("#taskCard");
// console.log(taskCard);

taskCard.addEventListener("click", (event) => {
  event.preventDefault();

  // if(event.target.classlist.contains("fa-square-check")){
  //   const cardDone = event.target.parentElement.parentElement.parentElement;
  //   console.log(cardDone)
  // }

  cardDone(event.target);
  deleteCard(event.target);
  // tasks.render();
});

// card is done
let cardDone = (el) => {
  if (el.classList.contains("fa-square-check")) {
    let checkCard = el.parentElement.parentElement.parentElement;
    checkCard.classList.add("doneCard");

    let searchTask;
   searchTask = tasks.getTasksById(checkCard);


    // console.log(checkCard);
  }
};

// delete the card
let deleteCard = (el) => {
  if (el.classList.contains("fa-xmark")) {
    el.parentElement.parentElement.parentElement.remove();
  }

};
