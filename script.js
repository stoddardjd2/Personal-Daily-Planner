var timeNow;
$(function () {
  CurrentTime();
  createTimeBlock();
  loadLocal();
});

function CurrentTime() {
  var getTime = new Date();
  timeNow = getTime.getHours();
  var setDay = document.getElementById("currentDay")
  var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    , "Sunday"];
  var day = days[getTime.getDay() - 1];
  //get day and convert to string
  var month = getTime.getMonth() + 1;
  var date = getTime.getDate();

  setDay.innerHTML = day + " " + month + "/" + date;
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
    //agenda.innerHTML = "";
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
  var btnElement = e.target;
  var btnId = btnElement.id;
  var id = btnId.replace("savebtn-", "");
  var agendaValue = document.querySelector('#agenda-' + id).value;
  saveLocal(id, agendaValue);
}

function saveLocal(id, agendaValue) {
  localStorage.setItem(id, agendaValue);
}

function loadLocal() {
  for (i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (localStorage.key(i) != "debug") {
      document.querySelector('#agenda-' + (key)).value = localStorage.getItem(key);
    }
  }
}