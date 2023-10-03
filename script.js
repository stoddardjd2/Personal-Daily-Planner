// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var timeNow;
$(function () {

  start();
  CurrentTime();
  createTimeBlock();

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});



function start() {
}
function CurrentTime() {
  
  var getTime = new Date();
  console.log("here: " + getTime.getHours());
  timeNow = getTime.getHours();
  var setDay = document.getElementById("currentDay")

  var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    , "Sunday"];
  var day = days[getTime.getDay() - 1];
  //get day and convert to string

  var month = getTime.getMonth() + 1;

  var date = getTime.getDate();



  setDay.innerHTML = day + " " + month + "/" + date;
  //$("block-9").css("background", "#0099cc");
  //document.getElementById("block-9").body.style.backgroundColor = "RED";
  // console.log("now: "+currentTime);
}


var timeBlock = ["9:00am", "10:00am", "11:00am", "12:00pm", "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm",];



function createTimeBlock() {

  for (var i = 9; i < timeBlock.length + 9; i++) {
    var block = document.createElement("div");
    document.querySelector('#time-block').appendChild(block);
    block.className = "row time-block"
    block.id = "block-" + (i);


    var time = document.createElement("div");
    time.innerHTML = timeBlock[i - 9];
    time.id = "time-" + i;
    time.className = "col-2 col-md-1 hour text-center py-3"
    document.querySelector('#block-' + (i)).appendChild(time);

    var agenda = document.createElement("textarea");
    agenda.innerHTML = "LOAD AGENDA HERE";
    agenda.id = "agenda-" + i;
    agenda.classname = "col-8 col-md-10 description";
    document.querySelector('#block-' + (i)).appendChild(agenda);


    var saveBtn = document.createElement("button");
    saveBtn.innerHTML = "save";
    saveBtn.id = "savebtn-" + i;
    saveBtn.className = "saveBtn col-2 col-md-1";
    document.querySelector('#block-' + (i)).appendChild(saveBtn);


    document.querySelector('#savebtn-' + (i)).addEventListener("click", selection);
    //save agenda to local storage

    if (i < timeNow) {
      console.log("test");
      agenda.className = agenda.classname + ", past";
    }
    if (i > timeNow) {
      agenda.className = agenda.classname + ", future";
    }
    if (i == timeNow) {
      agenda.className = agenda.classname + ", present";
    }
    //set background color based on if hour slot is past, future or present
  }


  
}

function selection(e) {
  var selection = e.target.getElementById;
  console.log("target: " + e.target);
  console.log("selection: " + selection);
  var btnElement = e.target;
  var btnId = btnElement.id
  var id = btnId.replace("savebtn-", "");
  console.log("id: " + id);
  var agendaValue = document.querySelector('#agenda-' + id).value;
  saveLocal(id, agendaValue);
}

function saveLocal(id, agendaValue) {
  localStorage.setItem(id, agendaValue);
  console.log(localStorage.getItem[0]);
  loadLocal();
}

function loadLocal() {
  for (i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (localStorage.key(i) != "debug") {
      console.log("local " + localStorage.getItem(key));
      console.log("I: "+i+" here: "+document.querySelector('#agenda-'+(i+9)).value);
      document.querySelector('#agenda-'+(i+9)).value = localStorage.getItem(key);
    }
  }
}