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

class Clock {
    constructor() {
        this.time = 55511;
        this.timeType = true;
        this.light = true;
    }

    Tune(State) {
        this.State = State;
    }

    checkup() {
        return this.State === 'Clock';
    }

    Changer(IntState) {
        this.StateChanger = IntState === 1;
    }

    ChangeSec() {
        if (this.StateChanger) {
            this.time += 1;
            this.maxTime();
        } else {
            this.time -= 1;
            this.minTime();
        }
    }

    ChangeMin() {
        if (this.StateChanger) {
            this.time += 60;
            this.maxTime();
        } else {
            this.time -= 60;
            this.minTime();
        }
    }

    ChangeHour() {
        if (this.StateChanger) {
            this.time += 3600;
            this.maxTime();
        } else {
            this.time -= 3600;
            this.minTime();
        }
    }

    maxTime() {
        if (this.time > 86400) {
            this.time = 86400;
        }
    }

    minTime() {
        if (this.time < 0) {
            this.time = 0;
        }
    }

    setTime(NewTime) {
        this.time = parseInt(NewTime);
    }

    setTimeType() {
        this.timeType = !this.timeType;
    }

    stateTime() {
        return this.timeType === true;
    }

    resetTime() {
        this.time = 0;
        clearInterval(this.IntervalStartClock);
        this.IntervalStartClock = undefined;
    }

    correctStartTime() {
        if (this.time > 86400) {
            this.time -= 86400;
        }
    }

    StartClock() {
        this.IntervalStartClock = setInterval(function () {
            this.time += 1;
        }, 1000)
    }

    changeLedLight() {
        this.light = !this.light;
    }

    ConvertToHourWithConvention(){
        if (parseInt(this.time / 3600) > 12) {
            this.timeConvention = 'P.M.';
            return parseInt((this.time / 3600) - 12);
        } else {
            this.timeConvention = 'A.M.';
            return parseInt(this.time / 3600);

        }
    }

    convertToHour() {
        return parseInt(this.time / 3600);
    }

    convertToMin() {
        return parseInt((this.time - (this.convertToHour() * 3600)) / 60);
    }

    convertToSec() {
        return parseInt((this.time - (this.convertToHour() * 3600)) - this.convertToMin() * 60);
    }

    toString() {
        this.correctStartTime();

        if (this.stateTime()) {
            return `Time now: ${this.convertToHour().zeroFix()} : ${this.convertToMin().zeroFix()} : ${this.convertToSec().zeroFix()} Led: ${this.light.toString()}`;
        }
        else {
            return `Time now: ${this.ConvertToHourWithConvention().zeroFix()} ${this.timeConvention} : ${this.convertToMin().zeroFix()} : ${this.convertToSec().zeroFix()} Led: ${this.light.toString()}`;
        }
    }
}

class Setting {
    constructor() {
        this.State = 'Tune';
    }

    checkup() {
        return this.State === 'Tune';
    }

    static Changer(changer) {
        return !changer;
    }

    Tune(NewState, Clock, Timer) {
        this.State = NewState;
        Timer.Tune(NewState);
        Clock.Tune(NewState);
    }

    toString() {
            return 'Please choose:\n ' +
                '1. "Clock"\n ' +
                '2. "Timer"';
    }
}

function TuneUp(Setting, Clock, Timer) {
    if (Setting.checkup()) {
        Interface.Tune('Tune', Clock, Timer);
    }
}



//Testing
let NewClock = new Clock();
let NewTimer = new Timer();
let Interface = new Setting();
let Changer = false;

console.log('_____________\nStep 1\n');
TuneUp(Interface, NewClock, NewTimer);
if (Interface.checkup())
console.log(Interface.toString());
if (NewClock.checkup())
console.log(NewClock.toString());
if (NewTimer.checkup())
console.log(NewTimer.toString());

console.log('_____________\nStep 2\n');
Interface.Tune('Clock', NewClock, NewTimer);
if (Interface.checkup())
    console.log(Interface.toString());
if (NewClock.checkup())
    console.log(NewClock.toString());
if (NewTimer.checkup())
    console.log(NewTimer.toString());

console.log('_____________\nStep 3\n');
Interface.Tune('Timer', NewClock, NewTimer);
if (Interface.checkup())
    console.log(Interface.toString());
if (NewClock.checkup())
    console.log(NewClock.toString());
if (NewTimer.checkup())
    console.log(NewTimer.toString());