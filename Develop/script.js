$(function () {
  // Listener for click events on the save button
  $(".saveBtn").on("click", function () {
    // Get the hour ID of the time-block containing the clicked button
    var hourId = $(this).closest(".time-block").attr("id");
    
    // Get the user input from the textarea within the same time-block
    var userInput = $(this).siblings(".description").val();
    
    // Save the user input in local storage using the hour ID as the key
    localStorage.setItem(hourId, userInput);
    showSuccessAlert();
  });

  // Apply past, present, or future class to each time block
  var currentHour = dayjs().format("H");
  $(".time-block").each(function () {
    var blockHour = parseInt($(this).attr("id").split("-")[1]);
    
    if (blockHour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (blockHour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });

  $(function () {
    function updateTimeBlocks() {
      var currentHour = dayjs().hour();
  
      $(".time-block").each(function () {
        var blockHour = parseInt($(this).attr("id").split("-")[1]);
  
        if (blockHour < currentHour) {
          $(this).removeClass("present future").addClass("past");
        } else if (blockHour === currentHour) {
          $(this).removeClass("past future").addClass("present");
        } else {
          $(this).removeClass("past present").addClass("future");
        }
      });
    }
  
    // Update time blocks initially
    updateTimeBlocks();
  
    // Update time blocks every minute
    setInterval(function () {
      updateTimeBlocks();
    }, 60000);
  
  });

  // Retrieve user input from local storage and apply to textarea
  $(".time-block").each(function () {
    var hourId = $(this).attr("id");
    var userInput = localStorage.getItem(hourId);
    
    if (userInput) {
      $(this).find(".description").val(userInput);
    }
  });


  // Display the current date in the header
  var currentDate = dayjs().format("MMMM D, YYYY");
  $("#currentDay").text(currentDate);
});

  // Function to show success alert
  function showSuccessAlert() {
    // Create the alert element
    var alertElement = $("<div>", {
      class: "alert alert-success alert-dismissible fade show",
      role: "alert",
      text: "Input Saved Successfully",
    });

    // Create the close button
    var closeButton = $("<button>", {
      type: "button",
      class: "btn-close",
      "data-bs-dismiss": "alert",
      "aria-label": "Close",
    });

    // Append the close button to the alert element
    alertElement.append(closeButton);

    // Insert the alert element into the DOM (before the header)
    $(".container-lg").prepend(alertElement);
  }
