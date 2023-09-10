// Define an array of tasks
let tasks = [
  {
    "title": "Write a blog post",
    "date": "2023-03-08",
    "isDone": true,
  },
  {
    "title": "Meet with client",
    "date": "2023-03-09",
    "isDone": false
  },
  {
    "title": "Work on project proposal",
    "date": "2023-03-10",
    "isDone": false
  },
  {
    "title": "Finish project proposal",
    "date": "2023-03-10",
    "isDone": true
  }
];

// This code saves the current list of tasks to local storage.

function getTasksFromStorage() {
  let retrievedTasks = JSON.parse(localStorage.getItem("tasks"))
  tasks = retrievedTasks ?? []
}
getTasksFromStorage();



function fallTasksOnThePage() {

  document.getElementById("tasks").innerHTML = ""

  // Loop through the tasks array using for of
  let index = 0;

  for (task of tasks) {
    let content =
      `
            <div class="task ${task.isDone ? 'done' : ''}">
                    <!-- Start Task INFO -->
                    <div class="task-info">
                    <h2>${task.title}</h2>
                      <span class="material-symbols-outlined">
                        calendar_month
                      </span>
                      <span>
                      ${task.date}
                      </span>
                    </div>
                    <!-- End Task INFO -->
                    <!-- Start Task Action -->
                    <div class="task-Action">
                      <!--- Delete button --->
                      <button onclick="deleteTask(${index})" class="circular" style="background-color: rgb(114, 0, 0); color: white;"><span
                          class="material-symbols-outlined">
                          delete
                        </span></button>
                      <!--- Complete button --->
                      ${task.isDone ? `
                      <button onclick="toggleTaskCompletion(${index})" class="circular" style="background-color: rgb(118, 0, 101); color: white;"><span
                      class="material-symbols-outlined">
                      cancel
                    </span></button>
                      ` : `
                        <button onclick="toggleTaskCompletion(${index})" class="circular" style="background-color: rgb(0, 150, 30); color: white;"><span
                            class="material-symbols-outlined">
                            done
                          </span></button>
                      `}
                      <!--- Edit button --->
                      <button onclick="editTask(${index})" class="circular" style="background-color: rgb(0, 16, 197, 0.692); color: white;"><span
                          class="material-symbols-outlined">
                          edit
                        </span></button>
                    </div>
                    <!-- End Task Action -->
                  </div>
        `
    document.getElementById("tasks").innerHTML += content;
    index++
  }
};

fallTasksOnThePage();

document.getElementById("add-btn").addEventListener("click", function () {
  let taskName = prompt("Please Enter The Task Title")
  let taskDate = prompt("Please Enter The Task Date")
  let now = new Date()
  let date = now.getFullYear()
  date += "-" + (now.getMonth() + 1) + "-" + now.getDate() + " | " + now.getHours() + ":" + now.getMinutes()
  if (taskName && taskDate) {
    tasks.push({
      "title": taskName,
      "date": date,
      "isDone": false
    })
    storeTasks()
    fallTasksOnThePage()
  }
})



// This function deletes a task from the tasks array.
// It takes the index of the task to be deleted as an argument.

function deleteTask(index) {

  // Get the task to be deleted.
  let deletedTask = tasks[index];
  // Prompt the user to confirm the deletion.
  let confirmDelete = confirm(`Are you sure want to delete ${deletedTask['title']} ?`)
  // If the user confirms the deletion, delete the task.

  if (confirmDelete == true) {
    tasks.splice(index, 1)
    storeTasks()
    fallTasksOnThePage()
  }
}

// This function allows the user to edit a task.
// It takes the index of the task as an argument.

function editTask(index) {
  // Get the task that the user wants to edit.
  let editedTask = tasks[index]
  // Prompt the user to enter the updated title and date for the task.
  let newTaskName = prompt('Enter the updated Title', editedTask["title"])
  let newTaskDate = prompt('Enter the updated Date', editedTask["date"])
  // If the user cancels the prompt, return without making any changes.
  if (!newTaskName || !newTaskDate) {
    return;
  } else {
    // Update the title and date of the task in the tasks array.
    editedTask["title"] = newTaskName   // Edit the title of the task
    editedTask["date"] = newTaskDate    //Edit the date of the task
  }
  storeTasks()
  fallTasksOnThePage();
};

// This function toggles the completion status of a task.
// It takes the index of the task to be toggled as an argument.

function toggleTaskCompletion(index) {
  // Get the task to be toggled.
  let task = tasks[index];
  // Toggle the completion status of the task.
  task.isDone = !task.isDone
  storeTasks()
  fallTasksOnThePage();
}

//  Storage Function 
// The storeTasks() function is used to save the current list of tasks to local storage.
function storeTasks() {
  let tasksString = JSON.stringify(tasks)
  localStorage.setItem('tasks', tasksString);
}

