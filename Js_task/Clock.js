function CreateNewClock() {
    return new Clock();
}

class Clock {
    constructor() {
        this.time = 55511;
        this.timeType = 24;
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

    setTimeType(NewType) {
        if (NewType >= 24) {
            this.timeType = 24;
        } else {
            this.timeType = 12;
        }
    }

    stateTime() {
        return this.timeType === 24;
    }

    ConvertToHourWichConvention(){
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
            return `Time now: ${this.ConvertToHourWichConvention().toString()} ${this.timeConvention} : ${this.convertToMin().toString()} : ${this.convertToSec().toString()}`;
        }
    }
}

var NewClock = CreateNewClock();

console.log(NewClock.toString());

NewClock.decreaseSec();
console.log(NewClock.toString());

NewClock.increaseSec();
NewClock.increaseSec();
console.log(NewClock.toString());

NewClock.setTimeType(12);
console.log(NewClock.toString());

NewClock.setTime(69000);
console.log(NewClock.toString());