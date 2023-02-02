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
const button = document.querySelector(".cards-container");

// ----task manager----

const tasks = new TaskManager();
tasks.load();
tasks.render();
tasks.getTasksById(0);

// end of task manager

//listen to submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  validFormInput();
});

//validation
const validFormInput = () => {
  const inputTitle = inputTasks.value;
  const details = detailsInput.value;
  const assign = assignTo.value;
  const status = statusInput.value;
  const dueDate = calendar.value;

  if (
    inputTitle == "" ||
    details == "" ||
    assign == "" ||
    status == "" ||
    status == "" ||
    dueDate == ""
  ) {
    showError(inputTasks, "Task cannot be empty");
    showError(detailsInput, "Details cannot be empty");
    showError(assignTo, "Please assign task");
    showError(statusInput, "Please assign status");
    showError(calendar, "Do not forget due date");
  } else {
    showSuccess(inputTasks);
    showSuccess(detailsInput);
    showSuccess(assignTo);
    showSuccess(statusInput);
    showSuccess(calendar);
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
  editCard(event.target);
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

let editCard = (el) => {
  if (el.classList.contains("fa-pen-to-square")) {
    const card = el.parentElement.parentElement.parentElement;

    inputTasks.value = card.children[1].innerText;

    detailsInput.value = card.children[3].innerText;
    console.log(detailsInput.value);
    assignTo.value = card.children[5].innerText;
    statusInput.value = card.children[7].innerText;
    // calendar.value = card.children[9].innerText

    card.remove();
    removeLocalLists(card);
  }
};

// .querySelector(".title")
// card.querySelector(".details").
// .querySelector(".assignTo")
// .querySelector(".status")

//remove localstorage

function removeLocalLists(list) {
  let lists;

  if (localStorage.getItem("tasks") === null) {
    lists = [];
  } else {
    lists = JSON.parse(localStorage.getItem("tasks"));
  }

  const listIndex = list.innerText;
  // console.log(list.innerText);

  lists.splice(lists.indexOf(listIndex), 1);
  localStorage.setItem("tasks", JSON.stringify(lists));
}
