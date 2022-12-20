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
    this.currentID++;

    const arrObj = {
      id: this.currentID,
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
