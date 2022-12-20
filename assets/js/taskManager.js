
const createTaskHtml = (title, details, assignedTo, status, dueDate) => {
 const htmlCard = `    <div class="col-12 col-md-4 mb-4">
<div class="cards shadow p-4">
  <div class="title">Title:${title}</div>
  <div class="details">Details:${details}</div>
  <div class="assignTo">Assign To:${assignedTo}</div>
  <div class="assignTo">Status:${status}</div>
  <div class="assignTo">Due Date:${dueDate}</div>

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
</div>`

return htmlCard;
}


export default class TaskManager {
  constructor(currentID = 0) {
    this.tasks = [
      {
        // id: 1,
        // title: "grocery",
        // details: "go to store",
        // assignedTo: "me",
        // statusInput: "urgent",
        // dueDate: "12/25/2022",
      },
    ];
    this.currentID = currentID;
  }
  addTasks(title, details, assignedTo, status, dueDate) {
    

    const arrObj = {
      id: this.currentID++,
      title: title,
      details: details,
      assignedTo: assignedTo,
      statusInput: status,
      dueDate: dueDate,
    };
    return this.tasks.push(arrObj);
    // return this.tasks.push({ title, details, assignedTo, status, dueDate, id });
  }
}
