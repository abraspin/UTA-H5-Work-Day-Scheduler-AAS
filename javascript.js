function renderRows() {
  var mainBodyEl = $("#main-body");

  // loop through and add an hour for each time
  for (var i = 9; i < 18; i++) {
    // Building block for each hour element,
    // starting with a div with ID classes for hour names (can't figure out how to dynamically add id oh well)
    var newRow = $("<div class=' row time-block col-md-12 border text-right'>  </div>");
    var dayHour;
    // if it's am, append "am"
    if (i < 12) {
      newRow.addClass("hour-" + i + "-am ");
      dayHour = i + "AM";
      //   newRow.text(i);

      // add pm if it's 12 noon
    } else if (i === 12) {
      newRow.addClass("hour-" + i + "-pm ");
      dayHour = i + "PM";
      //   newRow.text(i);

      // subtract 12 to get 12-hour pm time, and append pm
    } else if (i > 12) {
      newRow.addClass("hour-" + (i - 12) + "-pm ");
      dayHour = i - 12 + "PM";
      //   newRow.text(i - 12);
    }

    // Then we add the 1st column, which contains the hour
    // TODO: experiment with a template literal here!!
    var hourColumn = $("<div class='hour col-md-3 border'></div>");
    hourColumn.text(dayHour);
    newRow.append(hourColumn);
    // Next  we add the column which contains the todo item form
    // var toDoColumn = $("<input type='text' id='todo-input' class = 'col-md-4' placeholder='' name='todo-text'/>");

    var toDoColumn = $("<input type='text' class='col-md-6' id='test' placeholder=''></input>");

    newRow.append(toDoColumn);
    //might have to do class and pass that pesky i

    // finally we add the third column, a save button
    var saveButtonColumn = $("<button  class = 'saveBtn col-md-3' />");
    // and add the font awesome save disc icon. What's a flop-hee disk?
    saveButtonColumn.append($("<i class='fa fa-save fa-lg'></i>"));
    //append the button in all its splendor to the new row
    newRow.append(saveButtonColumn);

    // add our beatiful new dynamically rendered hour row
    mainBodyEl.append(newRow);
  }
  //   fa-floppy-o
}

renderRows();
