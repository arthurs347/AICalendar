document.addEventListener("DOMContentLoaded", function() {
  let calendarBoxes = document.querySelectorAll(".calendar-box");
  let dropdownMenu = document.getElementById("dropdown-menu");

  calendarBoxes.forEach(function(box) {
    box.addEventListener("click", function() {
      // Toggle dropdown menu visibility
      if (dropdownMenu.style.display === "block") {
        dropdownMenu.style.display = "none";
      } else {
        // Position the dropdown menu near the clicked box
        dropdownMenu.style.display = "block";
        dropdownMenu.style.top = (box.offsetTop + box.offsetHeight) + "px";
        dropdownMenu.style.left = box.offsetLeft + "px";
      }
    });
  });

  document.getElementById('task-form').addEventListener('submit', function(event) {
    // Prevent the form from submitting and refreshing the page
    event.preventDefault();

    // Access form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries()); // Convert FormData to an object

    // Log form data
    console.log('Form Data:', data);

    // Send the form data to the server
    fetch('http://your-server-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  });
});