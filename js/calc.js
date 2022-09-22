var taskPoints = 0;
var task2Points = 0;
var task4Points = 0;
var runTimePoints = 0;
var runTimeBonusLabel;
var totalEl;
var endOfAttemptInput;
var runtimeInput;
var runtimeMirror;
var runtimeCalc;
var task1Input;
var task2None;
var task3Input;
var task4None;

function main(){
  totalEl = document.getElementById('total-points');
  var allCheckInputs = document.querySelectorAll('input[type=checkbox]');
  for (var index = 0; index < allCheckInputs.length; index++){
    allCheckInputs[index].addEventListener('change', recalculatePoints);
  }
  var task2Inputs = document.querySelectorAll('#task2-inputs input[type=radio]');
  for (index = 0; index < task2Inputs.length; index++){
    task2Inputs[index].addEventListener('change', recalculateTask2Points);
  }

  var task4Inputs = document.querySelectorAll('#task4-inputs input[type=radio]');
  for (index = 0; index < task4Inputs.length; index++){
    task4Inputs[index].addEventListener('change', recalculateTask4Points);
  }

  runTimeBonusLabel = document.getElementById('run-time-bonus');
  runtimeInput = document.getElementById('run-time');
  runtimeMirror = document.getElementById('run-time-mirror');
  runtimeCalc = document.getElementsByClassName('runtime-calc');

  endOfAttemptInput = document.getElementById('end-of-attempt');
  task1Input = document.getElementById('task1-input');
  task2None =  document.getElementById('task2-none');
  task3Input = document.getElementById('task3-input');
  task4None = document.getElementById('task4-none');

  runtimeInput.addEventListener('input', recalculateRunTimeBonus);
}

function recalculateRunTimeBonus(){
    var bonus = (900 - parseFloat(runtimeInput.value)) * 0.03;
    if (!bonus || bonus < 0) bonus = 0;

    runtimeMirror.innerHTML = runtimeInput.value;
    runTimeBonusLabel.innerHTML = bonus.toFixed(2);
    runTimePoints = bonus;
    updateTotal();
}

function recalculatePoints(ev){
  if (ev.target.checked){
    taskPoints += parseInt(ev.target.dataset.points);
  }else {
    taskPoints -= parseInt(ev.target.dataset.points);
  }
  updateRunTimeBonus();
  updateTotal();
}

function updateRunTimeBonus(){
  if (runTimeBonusUnlocked()){
      for (var index = 0; index < runtimeCalc.length; index++){
        runtimeCalc[index].classList.remove('greyedout');
        runtimeCalc[index].disabled = false;
        recalculateRunTimeBonus();
      }
  }else{
      for (index = 0; index < runtimeCalc.length; index++){
        runtimeCalc[index].classList.add('greyedout');
        runtimeCalc[index].disabled = true;
      }
      runtimeInput.innerHTML = 0;
      runTimeBonusLabel.innerHTML = 0;
      runTimePoints = 0;
  }
}

function runTimeBonusUnlocked(){
  return endOfAttemptInput.checked && task1Input.checked && (!task2None.checked || task3Input.checked || !task4None.checked);
}

function recalculateTask4Points(ev){
  task4Points = parseInt(ev.target.dataset.points);
  updateRunTimeBonus();
  updateTotal();
}

function recalculateTask2Points(ev){
  task2Points = parseInt(ev.target.dataset.points);
  updateRunTimeBonus();
  updateTotal();
}

function updateTotal(){
  totalEl.innerHTML = 'Total = ' + (taskPoints+task2Points+task4Points+runTimePoints).toFixed(2) + ' pts';
}


main();