Number.prototype.zeroFix=function(l){
    return '00000000'.concat(this).slice(-l||-2)
};

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


//Testing
/*
let NewClock = new Clock();
console.log(NewClock.toString());*/