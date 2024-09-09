document.addEventListener("DOMContentLoaded", function() {
  let calendarBoxes = document.querySelectorAll(".calendar-box");
  let dropdownMenu = document.getElementById("dropdown-menu");

  calendarBoxes.forEach(function(box) {
    box.addEventListener("click", function() {
      if (dropdownMenu.style.display === "block") {
        dropdownMenu.style.display = "none";
      } else {
        dropdownMenu.style.display = "block";
        dropdownMenu.style.top = (box.offsetTop + box.offsetHeight) + "px";
        dropdownMenu.style.left = box.offsetLeft + "px";
      }
    });
  });

  document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert('Data saved successfully!');
        window.location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
    });
  });

  // Function to fetch tasks and populate the table
  function fetchTasks() {
    fetch('http://localhost:3000/tasks')
      .then(response => response.json())
      .then(tasks => {
        const taskTableBody = document.getElementById('task-table-body');
        taskTableBody.innerHTML = '';
        tasks.forEach(task => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${task.taskName}</td>
            <td>${task.description}</td>
            <td>${task.timeRequired}</td>
          `;
          taskTableBody.appendChild(row);
        });
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }

  // Load tasks when the tasks link is clicked
  document.getElementById('tasks-link').addEventListener('click', function(event) {
    event.preventDefault();
    fetchTasks();
  });

  // Load tasks immediately if we're on the tasks page
  if (window.location.pathname.endsWith('tasks.html')) {
    fetchTasks();
  }
});
