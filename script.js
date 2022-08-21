let timer = document.querySelector('.timer');
timer.addEventListener('click',timerClick);
timer.textContent = '00:00:00';

var running = false;
var id = 0;
var start = 0;
var lastUpdateTime = 0;
var time = 0

function timerClick (){ 
    start = Date.now();
    console.log(`time on click = ${time}`);
    if (running == true){
        clearInterval(id);
        running = false;
    }
    else {
        id = setInterval(updateTimer2,1000)
    }
}

function updateTimer2(){

    running = true;
    if (time > 3600*24*1000){
        clearInterval(id);
        return
    }
    let now = Date.now();
    console.log(`time prior to update = ${time}`);
    time = time + now - Math.max(start,lastUpdateTime);
    console.log(`time on update = ${time}`);
    let x = Math.floor(time/1000);
    let hours = 0;
    let mins = 0;
    let seconds = 0;
    Math.floor(x/3600) <= 9 ? hours = `0${Math.floor(x/3600)}`: hours = Math.floor(x/3600);
    Math.floor(x/60)-hours*60<=9 ? mins = `0${Math.floor(x/60)- hours*60}`: mins = Math.floor(x/60)- hours*60;
    Math.floor(x - hours*3600 - mins*60)<=9 ? seconds = `0${x - hours*3600 - mins*60}` : seconds = x - hours*3600 - mins*60;
    timer.textContent = `${hours}:${mins}:${seconds}`;
    lastUpdateTime = Date.now();
    
}






function updateTimer(){ 
    running = true;
    let x = +(timer.textContent.substring(0,2))*3600    + 
                +(timer.textContent.substring(3,5))*60  +
                +(timer.textContent.substring(6));
    if (x >= 3600*24){
        clearInterval(id);
        return
    }
    let now = Date.now();
    x += Math.floor((now - (start+x*1000))/1000)
    // get current time, add x to Date.now add difference to x
    let hours = 0;
    let mins = 0;
    let seconds = 0;
    Math.floor(x/3600) <= 9 ? hours = `0${Math.floor(x/3600)}`: hours = Math.floor(x/3600);
    Math.floor(x/60)-hours*60<=9 ? mins = `0${Math.floor(x/60)- hours*60}`: mins = Math.floor(x/60)- hours*60;
    Math.floor(x - hours*3600 - mins*60)<=9 ? seconds = `0${x - hours*3600 - mins*60}` : seconds = x - hours*3600 - mins*60;
    timer.textContent = `${hours}:${mins}:${seconds}`;
    console.log(start);
    console.log(now);
}



// load script, get start time in ms
// just thinking if the button is clicked once
// button clicked at start + wait ms
// button updated at start + wait + lag ms
// how to calculate start + wait + lag? 
// inside update timer, we can do Date.now, to give us ms at time of updating
// but now - start = wait + button time, don't know wait, so can't give button time
// so need to track wait?
// declare start when the button is clicked?