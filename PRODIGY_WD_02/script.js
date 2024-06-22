document.addEventListener("DOMContentLoaded", function() {
    let timerDisplay = document.querySelector(".timerDisplay");
    let stopBtn = document.getElementById("stopBtn");
    let startBtn = document.getElementById("startBtn");
    let resetBtn = document.getElementById("resetBtn");

    let msec = 0;
    let secs = 0;
    let mins = 0;
    let hrs = 0;

    let timerId = null;

    startBtn.addEventListener("click", () => {
        if (timerId === null) {
            timerId = setInterval(() => {
                startTimer();
            }, 10);
        }
    });

    stopBtn.addEventListener("click", () => {
        clearInterval(timerId);
        timerId = null;
    });

    resetBtn.addEventListener("click", () => {
        clearInterval(timerId);
        timerId = null;
        timerDisplay.innerHTML = `00 : 00 : 00 : 00`;
        msec = secs = mins = hrs = 0;
    });

    function startTimer() {
        msec++;
        if (msec == 100) {
            msec = 0;
            secs++;

            if (secs == 60) {
                secs = 0;
                mins++;

                if (mins == 60) {
                    mins = 0;
                    hrs++;
                }
            }
        }

        let msecString = msec < 10 ? `0${msec}` : msec;
        let secString = secs < 10 ? `0${secs}` : secs;
        let minString = mins < 10 ? `0${mins}` : mins;
        let hrsString = hrs < 10 ? `0${hrs}` : hrs;

        // Check if timerDisplay is not null before setting innerHTML
        if (timerDisplay !== null) {
            timerDisplay.innerHTML = `${hrsString} : ${minString} : ${secString} : ${msecString}`;
        }
    }
});