// First thing we do is wrap everything up in a nice document.ready call
$(document).ready(function () {
  $("#currentDay").html(moment().format("dddd, MMMM Do YYYY"));
  renderRows();

  //   var testHour = moment("10:00am", "h:mma");
  //   console.log("testHour", testHour.format("HH"));

  //   if (moment(testHour).isBefore(moment())) {
  //     console.log("it's before the time you put in!");
  //   } else if (moment(testHour).isAfter(moment())) {
  //     console.log("it's after the time you put in!");
  //   }

  //   var beginningTime = moment();
  //     console.log("isBefore -> beginningTime", beginningTime);
  //   var beginningTime = moment().format().getHours;
  //   console.log("isBefore -> beginningTime", beginningTime);
});
//TODO: how am I linked to moment? did i do that?

function parseTime() {}

//returns true if the time passed in is before the current time
function isBefore(time) {
  //   var beginningTime = moment();
  //   console.log("isBefore -> beginningTime", beginningTime);
}

////////////////////////////////////////RENDER ROWS//////////////////////////////////////////
function renderRows() {
  var mainBodyEl = $("#main-body");

  // loop through and add an hour for each time
  for (var i = 9; i < 18; i++) {
    // Building block for each hour element,
    // starting with a div with ID classes for hour names (can't figure out how to dynamically add id oh well)
    var newRow = $("<div class=' row time-block col-md-12 border text-right'>  </div>");
    var dayHour;
    // if it's am, append "am"
    // if (i < 12) {
    //   //   newRow.addClass("hour-" + i + "-am ");
    //   dayHour = moment(i + ":00am", "h:mma");

    //   // add pm if it's 12 noon
    // } else if (i === 12) {
    //   //   newRow.addClass("hour-" + i + "-pm ");
    //   dayHour = moment("12:00pm", "h:mma");

    //   // subtract 12 to get 12-hour pm time, and append pm
    // } else if (i > 12) {
    //   //   newRow.addClass("hour-" + (i - 12) + "-pm ");
    //   var temp = i - 12;
    //   dayHour = moment(temp + ":00", "hh:A");
    //   console.log(dayHour);
    // }

    dayHour = moment(i, "h");

    // TODO: How the heck am I gonna do present? probably I need to do a comparison with hours only? or math.floor?
    //  how do I use moment.js to compare ONLY the hour?

    //then we see if this hour row is before or after the current time, and assign its class accordingly (to be hooked with CSS)
    if (moment(dayHour).isBefore(moment())) {
      newRow.addClass("past");
    }
    if (moment(dayHour).isAfter(moment())) {
      newRow.addClass("future");
    }
    // Then we add the 1st column, which contains the hour
    // TODO: experiment with a template literal here!!
    var hourColumn = $("<div class='hour col-md-3 border'></div>");
    hourColumn.text(dayHour.format("ha"));
    newRow.append(hourColumn);
    // Next  we add the column which contains the todo item form
    // var toDoColumn = $("<input type='text' id='todo-input' class = 'col-md-4' placeholder='' name='todo-text'/>");

    var toDoColumn = $("<input type='text' class='col-md-6' id='test' placeholder=''></input>");
    toDoColumn.addClass("row-" + i);
    newRow.append(toDoColumn);
    //might have to do class and pass that pesky i

    // finally we add the third column, a save button
    var saveButtonColumn = $("<button  class = 'saveBtn col-md-3' />");

    saveButtonColumn.addClass("row-" + i);
    // and add the font awesome save disc icon. What's a flop-hee disk?
    saveButtonColumn.append($("<i class='fa fa-save fa-lg'></i>"));
    //append the button in all its splendor to the new row
    newRow.append(saveButtonColumn);

    // add our beautiful new dynamically rendered hour row
    mainBodyEl.append(newRow);
  }

  $(".saveBtn").on("click", function (event) {
    event.preventDefault();
    console.log("renderRows -> event", event);
    var hourToSave = event.currentTarget.classList[2];
    console.log("renderRows -> hourToSave", hourToSave);
  });
}
