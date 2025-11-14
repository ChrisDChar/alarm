let alarmTimeInput = document.getElementById('alarmTime');
let setAlarmBtn = document.getElementById('setAlarmBtn');
let stopBtn = document.getElementById('stopBtn');
let continueBtn = document.getElementById('continueBtn');
let alarmAudio = document.getElementById('alarmAudio');

let alarmInterval;
let isAlarmSet = false;
let alarmTime = null;

function setAlarm() {
    let timeValue = alarmTimeInput.value;

    if (!timeValue) {
        return;
    }

    let [hours, minutes] = timeValue.split(':');
    alarmTime = { hours: parseInt(hours), minutes: parseInt(minutes) };
    
    if (alarmInterval) {
        clearInterval(alarmInterval);
    }

    alarmInterval = setInterval(checkAlarm, 1000);
    isAlarmSet = true;
    
    setAlarmBtn.textContent = 'Alarm Set';
    setAlarmBtn.classList.remove('bg-violet-600', 'hover:bg-violet-700');
    setAlarmBtn.classList.add('bg-emerald-600', 'hover:bg-emerald-700');
}

function checkAlarm() {
    let now = new Date();
    let currentHours = now.getHours();
    let currentMinutes = now.getMinutes();

    if (currentHours === alarmTime.hours && currentMinutes === alarmTime.minutes) {
        triggerAlarm();
    }
}

function triggerAlarm() {
    alarmAudio.play().catch(error => {
        console.error('Error playing audio:', error);
        alert('Error playing alarm sound. Please check the audio file.');
    });
    
    clearInterval(alarmInterval);
    isAlarmSet = false;
}

function stopAlarm() {
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    
    clearInterval(alarmInterval);
    isAlarmSet = false;
    
    setAlarmBtn.textContent = 'Set Alarm';
    setAlarmBtn.classList.remove('bg-emerald-600', 'hover:bg-emerald-700');
    setAlarmBtn.classList.add('bg-violet-600', 'hover:bg-violet-700');
}

function continueAlarm() {
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    
    let now = new Date();
    let snoozeTime = new Date(now.getTime() + 5 * 60000);
    
    alarmTime = {
        hours: snoozeTime.getHours(),
        minutes: snoozeTime.getMinutes()
    };
    
    if (alarmInterval) {
        clearInterval(alarmInterval);
    }
    alarmInterval = setInterval(checkAlarm, 1000);
    isAlarmSet = true;
}

setAlarmBtn.addEventListener('click', setAlarm);
stopBtn.addEventListener('click', stopAlarm);
continueBtn.addEventListener('click', continueAlarm);


function formatTime(hours, minutes) {
    let ampm = hours >= 12 ? 'PM' : 'AM';
    let formattedHours = hours % 12 || 12;
    let formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
}