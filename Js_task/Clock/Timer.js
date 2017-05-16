Number.prototype.zeroFix=function(l){
    return '00000000'.concat(this).slice(-l||-2)
};

class Timer {
    constructor() {
        this.timer = 0;
        this.timeType = true;
    }

    Tune(State) {
        if (State === 'Timer')
        this.State = State;
    }

    checkup() {
        return this.State === 'Timer';
    }

    Changer(IntState) {
        this.StateChanger = IntState === 1;
    }

    ChangeSec() {
        if (this.StateChanger) {
            this.timer += 1;
            this.maxTime();
        } else {
            this.timer -= 1;
            this.minTime();
        }
    }

    ChangeMin() {
        if (this.StateChanger) {
            this.timer += 60;
            this.maxTime();
        } else {
            this.timer -= 60;
            this.minTime();
        }
    }

    ChangeHour() {
        if (this.StateChanger) {
            this.timer += 3600;
            this.maxTime();
        } else {
            this.timer -= 3600;
            this.minTime();
        }
    }

    maxTime() {
        if (this.timer > 86400) {
            this.timer = 86400;
        }
    }

    minTime() {
        if (this.timer < 0) {
            this.timer = 0;
        }
    }

    setTime(NewTime) {
        this.timer = parseInt(NewTime);
    }

    setTimeType() {
        this.timeType = !this.timeType;
    }

    resetTime() {
        this.timer = 0;
        clearInterval(this.IntervalStartClock);
        this.IntervalStartClock = undefined;
    }

    correctStartTime() {
        if (this.timer > 86400) {
            this.timer -= 86400;
        }
    }

    StartTimer() {
        let CurrentTimer = this;
        this.IntervalStartClock = setInterval(function () {
            CurrentTimer.timer -= 1;
            if (CurrentTimer.timer === 0) {
                clearInterval(this);
            }
        }, 1000)
    }


    convertToHour() {
        return parseInt(this.timer / 3600);
    }

    convertToMin() {
        return parseInt((this.timer - (this.convertToHour() * 3600)) / 60);
    }

    convertToSec() {
        return parseInt((this.timer - (this.convertToHour() * 3600)) - this.convertToMin() * 60);
    }

    toString() {
        this.correctStartTime();
            return `Timer: ${this.convertToHour().zeroFix()} : ${this.convertToMin().zeroFix()} : ${this.convertToSec().zeroFix()}`;

        }
    }



//Testing
/*
let NewTimer = new Timer();
console.log(NewTimer.toString());
NewTimer.Changer(1);
NewTimer.ChangeSec();
NewTimer.ChangeSec();
NewTimer.ChangeSec();
NewTimer.ChangeSec();
NewTimer.ChangeSec();
console.log(NewTimer.toString());
NewTimer.StartTimer();
let intervalNewTimer = setInterval(function () {
    console.log(NewTimer.toString());
}, 1000);
setTimeout(function () {
    clearInterval(intervalNewTimer)
}, NewTimer.timer * 1000 + 1000);*/
