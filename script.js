let contentBanner2 = document.querySelector('.contentBanner2');
let projects = [];
let form = document.querySelector('.projNameInputForm')

function addTimer (){
    let projName = form.projNameInput.value;
    if (projName == ''){
        return;
    }
    if (projects.findIndex((element)=> element.projName == projName)!= -1){
        alert('This project name is already in use');
        return;
    }
    form.projNameInput.value = '';
    let timer = document.createElement('div');
    let timerTitle = document.createElement('p');
    let display = document.createElement('div');
    let startButton = document.createElement('button');
    timer.classList.add('circle');
    timerTitle.textContent = projName;
    display.classList.add('display');
    display.setAttribute('id',projName + 'display');
    display.textContent = '00:00:00';
    startButton.classList.add('startTimer');
    startButton.setAttribute('id',projName + 'button')
    startButton.textContent = 'Start Timer?'
    timer.append(timerTitle);
    timer.append(display);
    timer.append(startButton);
    contentBanner2.append(timer);
    let timerObj = new timerConstructor(projName);
    projects.push(timerObj);
    startButton.addEventListener('click',()=>timerClick(projName)); 
}

function timerConstructor (projName){
    this.projName = projName;
    this.display = document.getElementById(projName + 'display');
    this.startButton = document.getElementById(projName + 'button');
    this.running = false;
    this.id = 0;
    this.start = 0;
    this.lastUpdateTime = 0;
    this.time = 0;
    this.hours = 0;
    this.mins = 0;
    this.seconds = 0;
    // this.update = updateTimer;
}

timerConstructor.prototype = {
    update: updateTimer
}


function timerClick (projName){  
    let target = projects[projects.findIndex((element)=> element.projName == projName)]; 
    target.start = Date.now();
    if (target.running == true){
        clearInterval(target.id);
        target.running = false;
        target.startButton.classList.remove('stopTimer');
        target.startButton.classList.add('startTimer');
        target.startButton.textContent = 'Start timer?';
    }
    else {
        target.id = setInterval(()=>target.update(),1000)
        target.running = true;
        target.startButton.classList.remove('startTimer');
        target.startButton.classList.add('stopTimer');
        target.startButton.textContent = 'Stop timer?';
    }
}

function updateTimer(){  
    if (this.time > 3600*24*1000){
        clearInterval(this.id);
        this.running = false;
        return
    }
    let now = Date.now();
    this.time = this.time + now - Math.max(this.start,this.lastUpdateTime);
    let x = Math.floor(this.time/1000);
    Math.floor(x/3600) <= 9 ? this.hours = `0${Math.floor(x/3600)}`: this.hours = Math.floor(x/3600);
    Math.floor(x/60)-this.hours*60<=9 ? this.mins = `0${Math.floor(x/60)- this.hours*60}` : this.mins = Math.floor(x/60)- this.hours*60;
    Math.floor(x - this.hours*3600 - this.mins*60)<=9 ? this.seconds = `0${x - this.hours*3600 - this.mins*60}` : this.seconds = x - this.hours*3600 - this.mins*60;
    this.display.textContent = `${this.hours}:${this.mins}:${this.seconds}`; 
    this.lastUpdateTime = Date.now();
}


