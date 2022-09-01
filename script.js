let addTimerButton = document.querySelector('.addTimer');
addTimerButton.addEventListener('click',addTimer);
let contentBanner2 = document.querySelector('.contentBanner2');
let projects = [];

function addTimer (){
    let projName = prompt('Please enter the project name','Untitled project'); // replace with form validation(no same name twice)
    let timer = document.createElement('div');
    let timerTitle = document.createElement('p');
    let display = document.createElement('div');
    let startButton = document.createElement('button');
    timer.classList.add('circle');
    timerTitle.textContent = projName;
    display.classList.add('display');
    display.setAttribute('id',projName);
    display.textContent = '00:00:00';
    startButton.classList.add('startTimer');
    startButton.textContent = 'Start Timer?'
    timer.append(timerTitle);
    timer.append(display);
    timer.append(startButton);
    contentBanner2.append(timer);
    let timerObj = new timerConstructor(projName);
    projects.push(timerObj);
    console.log(projects);
    startButton.addEventListener('click',()=>timerClick(projName)); 
}

function timerConstructor (projName){
    this.projName = projName;
    this.display = document.getElementById(projName)
    this.running = false;
    this.id = 0;
    this.start = 0;
    this.lastUpdateTime = 0;
    this.time = 0;
    this.hours = 0;
    this.mins = 0;
    this.seconds = 0;
    this.update = updateTimer;
}

function timerClick (projName){  
    let target = projects[projects.findIndex((element)=> element.projName == projName)]; 
    target.start = Date.now();
    if (target.running == true){
        clearInterval(target.id);
        target.running = false;
    }
    else {
        target.id = setInterval(()=>target.update(),1000)
        target.running = true;
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


