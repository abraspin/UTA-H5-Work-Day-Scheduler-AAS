//this displays a spinner in the main block in case a CDN call jams up or something
displayLoadingSpinner();

// First thing we do is wrap everything up in a nice document.ready call
$(document).ready(function (event) {
  //set the top box to display the current date
  $("#currentDay").html(moment().format("dddd, MMMM Do YYYY"));

  //call function to render the row elements
  renderRows();

  // call the function to prefill todo fields with pre-saved to-do strings
  prefill();

  // this function adds the clear all button
  renderClearAllButton($("#main-body"));

  // Now that the page is nice and rendered we can remove our lovely spinner
  $(".fa-spinner").remove();

  /////////////////////////EVENT LISTENERS/////////////////////////

  ///////////////////////INDIVIDUAL SAVE BUTTONS /////////////////
  $(".saveBtn").on("click", function (event) {
    event.preventDefault();

    // hourRowToSave will have format "row-#"
    var hourRowToSave = event.currentTarget.classList[2];

    // this is a reference to the entire row element containing hour, input, and save
    var hourRowToSaveEl = $("." + hourRowToSave + "");

    // this variable contains the todo string the user just saved
    var toDoItem = hourRowToSaveEl.val();

    // save the todo item to local storage with key "row-#"
    localStorage.setItem(hourRowToSave, toDoItem);

    // alternative way to capture adjacent element!
    // var anyVariableName = $(this).siblings("input").val();
  });

  // Alternative click listener: ANY button with saveBtn class in main body el
  // $("#main-body").on("click", ".saveBtn", function(){
  // })

  /////////////////// CLEAR SINGLE TODO ////////////////////
  /// the styling for clear row button fails at mobile screen size, so click event is deactivated.
  // $(".clear-hour").on("click", function (event) {
  //   event.preventDefault();
  //   // hourRowToClear will have format "row-#"
  //   //This contains a magic number that refers to the class name of the row we're currently referring to
  //   var hourRowToClear = event.currentTarget.classList[6];
  //   // this is a reference to the entire row element containing hour, input, and save btn
  //   var hourRowToClearEl = $(`.${hourRowToClear}`);
  //   // Empty out the form field on the page
  //   hourRowToClearEl.val("");
  //   // save blank todo string to local storage with key "row-#"
  //   localStorage.setItem(hourRowToClear, "");
  // });

  ///////////////////////CLEAR ALL TODOS  /////////////////
  $(".clear-hours-all").on("click", function (event) {
    clearAllToDos();
  });
});

////////////////////////////////////////FUNCTIONS////////////////////////////////////////////

////////////////////////////////////////RENDER ROWS//////////////////////////////////////////
function renderRows() {
  var mainBodyEl = $("#main-body");
  mainBodyEl.addClass("time-block");

  // loop through and add an hour for each time
  for (var i = 9; i < 18; i++) {
    // Building block for each hour element,
    // starting with a div with ID classes for hour names (can't figure out how to dynamically add id oh well)
    var newRow = $("<div class='row col-md-12 mx-auto'>  </div>");
    newRow.addClass("row-wrapper-" + i);

    // this variable holds the time of day each hour row represents
    var dayHour = moment(i, "h");

    // Then we add the 1st column, which contains the hour
    var hourColumn = $("<div class='text-right hour col-md-3 '></div>");

    //format and append the hour for this row
    hourColumn.text(dayHour.format("ha"));
    newRow.append(hourColumn);

    // Next  we add the column which contains the todo item form
    var toDoColumn = $("<input type='text' class='col-md-7 ' id='test' placeholder=''></input>");

    //we need this tag to match it with its corresponding save button
    toDoColumn.addClass(`row-${i}`);

    // then we see if this hour row is before or after the current time, and assign THE FORM ELEMENT its
    // class accordingly (to be hooked with CSS) for time-based coloring
    if (dayHour.isBefore(moment())) {
      toDoColumn.addClass("past");
    }
    if (dayHour.isAfter(moment())) {
      toDoColumn.addClass("future");
    }
    if (dayHour.isSame(moment(), "hour")) {
      toDoColumn.addClass("present");
    }

    newRow.append(toDoColumn);

    // finally we add the third column, a save button
    var saveButtonColumn = $("<button  class = 'saveBtn col-md-2' />");

    // and name it for future reference with loop index var
    saveButtonColumn.addClass("row-" + i);

    // and add the font awesome save disc icon. What's a flop-hee disk?
    saveButtonColumn.append($("<i class='fa fa-save fa-lg'></i>"));

    //append the button in all its splendor to the new row
    newRow.append(saveButtonColumn);

    // Bug: this button functions but will not style correctly on mobile, so it is deactivated.
    // Render the button on the end of each row to clear that row only
    // renderClearRowButton(newRow, i);

    // add our beautiful new dynamically rendered hour row
    mainBodyEl.append(newRow);
  }
}

////////////////////////PRE FILL PAGE FROM LOCAL STORAGE FUNCTION//////////////////
function prefill() {
  for (var i = 9; i < 18; i++) {
    // each hour's todo item is stored in local storage with key format "row-#"
    var storedToDo = localStorage.getItem("row-" + i) || "";

    $(".row-" + i).val(storedToDo);
  }
}

////////////////////////RENDER THE BOTTOM 'CLEAR ALL' BUTTON//////////////////
function renderClearAllButton(bodyElement) {
  var clearToDoButton = $("<button  class = 'clear-hours-all my-2 btn btn-primary  center ' />");
  clearToDoButton.text("Click Here to clear all To-do's");

  bodyElement.append(clearToDoButton);
}

////////////////////////CLEAR ALL TODOS FUNCTION //////////////////
//this function goes through and sets all the text values to "" out all to-do inputs
function clearAllToDos() {
  for (var i = 9; i < 18; i++) {
    $(".row-" + i).val("");
    localStorage.setItem("row-" + i, "");
  }
}

////////////////////////RENDER INDIVIDUAL ROW-CLEAR BUTTONS //////////////////
/// the styling for the clear row button fails at mobile screen size, so function is deactivated.
// function renderClearRowButton(rowElement, i) {
//   var newDiv = $("<div class='text-right'><div>");
//   var clearToDoButton = $("<button  class = 'clear-hour ml-5 text-right btn btn-danger  center col-sm-3 ' />");
//   clearToDoButton.addClass("row-" + i);
//   newDiv.append(clearToDoButton);
//   clearToDoButton.append($("<i class='fa fa-trash fa-lg'></i>"));
//   rowElement.append(newDiv);
// }

////////////FUNCTION TO DISPLAY SPINNER WHILE LOADING
function displayLoadingSpinner() {
  var spinnerEl = $("<div class='text-center mt-5'><i class='fa fa-spinner fa-spin ' style='font-size:36px'></i> </div>");

  $("#main-body").append(spinnerEl);
}
