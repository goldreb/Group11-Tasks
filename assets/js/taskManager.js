const createTaskHtml = (title, details, assignedTo, status, dueDate, id) => {
  const htmlCard = ` 

    <div class="container d-flex" data-task-id="${id}" >
        <div class="row ">
            <div class="col-12  mb-4 taskCard" > 
                <div class="cards shadow p-4">
                <div class="title">Title:   ${title}</div>
                <div class="details">Details:    ${details}</div>
                <div class="assignTo">Assign To:   ${assignedTo}</div>
                <div class="assignTo">Status: ${status}</div>
                <div class="assignTo">Due Date:   ${dueDate}</div>

                <div class="row">
                    <button class="col check-button" type="submit">
                        <i class="fa-regular fa-square-check fa-xl"></i>
                    </button>
                    <button class="col xmark-button" type="submit">
                        <i class="fa-solid fa-xmark fa-xl"></i>
                    </button>
                    <button class="col edit-button" type="submit">
                        <i class="fa-solid fa-pen-to-square fa-xl"></i>
                    </button>
                </div>
            </div>
    
        </div>
     </div>

  `;

  return htmlCard;
};

export default class TaskManager {
  constructor(currentID = 0) {
    this.tasks = [
      {
        id: 0,
        title: "grocery",
        details: "go to store",
        assignedTo: "me",
        status: "urgent",
        dueDate: "12/25/2022",
      },
    ];
    this.currentID = currentID;
  }
  addTasks(title, details, assignedTo, status, dueDate) {
    const task = {
      id: this.currentID++,
      title: title,
      details: details,
      assignedTo: assignedTo,
      status: status,
      dueDate: dueDate,
    };
    this.tasks.push(task);
    console.log(task);
  }

  //render collected data
  render() {
    //create array to record all the new data
    let taskHtmlList = [];

    this.tasks.forEach((element) => {
      const date = new Date(element.dueDate);

      const formattedDate = `${date.getMonth() + 1}/${
        date.getDate("0") + 1
      }/${date.getFullYear()}`;

      let taskHtml = createTaskHtml(
        element.title,
        element.details,
        element.assignedTo,
        element.status,
        formattedDate,
        element.id
      );
      //console.log(taskHtml)
      taskHtmlList.push(taskHtml);
    });
    //end of forEach

    let newCards = document.querySelector(".taskCard");
    let joinHtmlTasks = taskHtmlList.join("\n");
    newCards.innerHTML = joinHtmlTasks;
  }

  //getting the id
  getTasksById(taskId) {
    let taskFound;

    this.tasks.forEach((task) => {
      if (task.id === taskId) {
        taskFound = task;
        // console.log("found");
      }
    });
    console.log(taskFound);
    return taskFound;
  }

  //saving task to local storage
  save() {
    const tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem("tasks", tasksJson);
    const currentID = new String(this.currentID);
    localStorage.setItem("currentID", currentID);
  }
  load() {
    if (localStorage.getItem("tasks")) {
      const tasksJson = localStorage.getItem("tasks");
      this.tasks = JSON.parse(tasksJson);
      if (localStorage.getItem("currentId")) {
        const currentId = localStorage.getItem("currentId");
        this.currentId = new Number(currentId);
      }
    }
  }
  deleteTask(taskId) {
    const newTasks = [];
    this.tasks.forEach((task) => {
      if (task.id !== taskId) {
        newTasks.push(task);
      }
    });
    this.tasks = newTasks;
  }

  //change the color of the inputs once it is rendered in the page
}
