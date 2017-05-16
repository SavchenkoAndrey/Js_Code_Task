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
        if (this.checkup()) {
            return '\nPlease choose:\n ' +
                '1. "Clock"\n ' +
                '2. "Timer"\n';
        }
    }
}

function TuneUp(Setting, Clock, Timer) {
    if (Setting.checkup()) {
        Interface.Tune('Tune', Clock, Timer);
    }
}
