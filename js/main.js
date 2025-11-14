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
    setAlarmBtn.classList.remove('bg-violet-600', 'hover:bg-violet-700', 'bg-amber-600', 'hover:bg-amber-700');
    setAlarmBtn.classList.add('bg-emerald-600', 'hover:bg-emerald-700');
}

function resetAlarm() {
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    
    if (alarmInterval) {
        clearInterval(alarmInterval);
    }
    
    isAlarmSet = false;
    alarmTime = null;
    alarmTimeInput.value = '';
    
    setAlarmBtn.textContent = 'Set Alarm';
    setAlarmBtn.classList.remove('bg-emerald-600', 'hover:bg-emerald-700', 'bg-amber-600', 'hover:bg-amber-700');
    setAlarmBtn.classList.add('bg-violet-600', 'hover:bg-violet-700');
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
    
    setAlarmBtn.textContent = 'Reset Alarm';
    setAlarmBtn.classList.remove('bg-emerald-600', 'hover:bg-emerald-700');
    setAlarmBtn.classList.add('bg-amber-600', 'hover:bg-amber-700');
}

function stopAlarm() {
    if(!alarmAudio.paused) {
        alarmAudio.pause();
    }
    isAlarmSet = true;
    
    setAlarmBtn.textContent = 'Set Alarm';
    setAlarmBtn.classList.remove('bg-emerald-600', 'hover:bg-emerald-700');
    setAlarmBtn.classList.add('bg-violet-600', 'hover:bg-violet-700');
}

function continueAlarm() {
    if (!alarmTime) return;

    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    
    let now = new Date();
    let snoozeTime = new Date(now.getTime() + 5 * 60000);
    
    alarmTime = {
        hours: snoozeTime.getHours(),
        minutes: snoozeTime.getMinutes()
    };
    
    if (alarmInterval) clearInterval(alarmInterval);
    alarmInterval = setInterval(checkAlarm, 1000);
    isAlarmSet = true;}

setAlarmBtn.addEventListener('click', function() {
    if (setAlarmBtn.textContent === 'Reset Alarm') {
        resetAlarm();
    } else {
        setAlarm();
    }
});
stopBtn.addEventListener('click', function() {
    if (!alarmAudio.paused) {
        alarmAudio.pause();
        console.log("Alarm paused");
    }
});
continueBtn.addEventListener('click', function() {
    if (alarmAudio.paused) {
        alarmAudio.play();
        console.log("Alarm resumed");
    }
});


function formatTime(hours, minutes) {
    let ampm = hours >= 12 ? 'PM' : 'AM';
    let formattedHours = hours % 12 || 12;
    let formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
}