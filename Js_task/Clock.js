function CreateNewClock() {
    return new Clock();
}

class Clock {
    constructor() {
        this.time = 55511;
        this.timeType = true;
    }

    increaseSec() {
        this.time += 1;
        this.maxTime();
    }
    decreaseSec() {
        this.time -= 1;
        this.minTime();
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
        this.maxTime();
        this.minTime();
        if (this.stateTime()) {
            return `Time now: ${this.convertToHour().toString()} : ${this.convertToMin().toString()} : ${this.convertToSec().toString()}`;
        }
        else {
            return `Time now: ${this.ConvertToHourWithConvention().toString()} ${this.timeConvention} : ${this.convertToMin().toString()} : ${this.convertToSec().toString()}`;
        }
    }
}

let NewClock = CreateNewClock();

console.log(NewClock.toString());

NewClock.decreaseSec();
console.log(NewClock.toString());

NewClock.increaseSec();
NewClock.increaseSec();
console.log(NewClock.toString());

NewClock.setTimeType();
console.log(NewClock.toString());

NewClock.setTime(69000);
console.log(NewClock.toString());

function createClock_V1_2() {
    return new Clock_V1_2();
}

Number.prototype.zeroFix=function(l){
    return '00000000'.concat(this).slice(-l||-2)
};

class Clock_V1_2 extends Clock {
    constructor() {
        super();
        this.light = true;
    }

    increaseMin() {
        this.time += 60;
        this.maxTime();
    }
    decreaseMin() {
        this.time -= 60;
        this.minTime();
    }

    increaseHour() {
        this.time += 3600;
        this.maxTime();
    }
    decreaseHour() {
        this.time -= 3600;
        this.minTime();
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

    correctStartTime() {
        if (this.time > 86400) {
            this.time -= 86400;
        }
    }

    resetTime() {
        this.time = 0;
    }

    changeLedLight() {
        this.light = !this.light;
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


let ClockWithLed = createClock_V1_2();
console.log('\nClock Version 2\n');
console.log(ClockWithLed.toString());

ClockWithLed.resetTime();
ClockWithLed.changeLedLight();
console.log(ClockWithLed.toString());

ClockWithLed.increaseMin();
console.log(ClockWithLed.toString());

ClockWithLed.increaseHour();
ClockWithLed.increaseHour();
ClockWithLed.increaseHour();
ClockWithLed.increaseHour();
ClockWithLed.increaseHour();
ClockWithLed.setTimeType();
console.log(ClockWithLed.toString());

ClockWithLed.decreaseHour();
ClockWithLed.decreaseMin();
ClockWithLed.decreaseMin();
console.log(ClockWithLed.toString());

function createClock_V1_3() {
    return new Clock_V_1_3();
}

class Clock_V_1_3 extends Clock_V1_2 {
    constructor() {
        super();
        this.timer = 0;
        this.changer = true;
        this.counter = 0;
    }

    increaseSecTimer() {
        this.timer += 1;
    }

    convertToHour() {
        if (this.changer) {
            return parseInt(this.time / 3600);
        } else {
            return parseInt(this.timer / 3600);
        }

    }

    convertToMin() {
        if (this.changer) {
            return parseInt((this.time - (this.convertToHour() * 3600)) / 60);
        } else {
            return parseInt((this.timer - (this.convertToHour() * 3600)) / 60);
        }
    }

    convertToSec() {
        if (this.changer) {
            return parseInt((this.time - (this.convertToHour() * 3600)) - this.convertToMin() * 60);
        } else {
            return parseInt((this.timer - (this.convertToHour() * 3600)) - this.convertToMin() * 60);
        }
    }

    DisplayTimer() {
        return `Timer: ${this.convertToHour().zeroFix()} : ${this.convertToMin().zeroFix()} : ${this.convertToSec().zeroFix()}`;
    }

    SetTimerSec(NewValue) {
        this.counter = parseInt(NewValue * 1000 + 1000);
    }

    StartTimer() {
        let CurentClock = this;
        CurentClock.changer = false;
        let timerID = setInterval(function () {
            CurentClock.increaseSecTimer();
        },1000);
        setTimeout(function () {
            clearInterval(timerID);
        },CurentClock.counter)
    }

    toString() {
        this.correctStartTime();
        this.changer = true;
        if (this.stateTime()) {
            return `Time now: ${this.convertToHour().zeroFix()} : ${this.convertToMin().zeroFix()} : ${this.convertToSec().zeroFix()} Led: ${this.light.toString()}`;
        }
        else {
            return `Time now: ${this.ConvertToHourWithConvention().zeroFix()} ${this.timeConvention} : ${this.convertToMin().zeroFix()} : ${this.convertToSec().zeroFix()} Led: ${this.light.toString()}`;
        }
    }
}

let ClockWithTimer = createClock_V1_3();

console.log('\n Clock version 3\n');
console.log(ClockWithTimer.toString());

ClockWithTimer.SetTimerSec(10);
ClockWithTimer.StartTimer();
let intervalNewTimer = setInterval(function () {
    console.log(ClockWithTimer.DisplayTimer().toString());
}, 1000);
setTimeout(function () {
    clearInterval(intervalNewTimer)
}, ClockWithTimer.counter);