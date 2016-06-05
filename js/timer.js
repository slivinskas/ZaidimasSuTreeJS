function Timer(){
    this.timer = -1;
    this.duration = 0;
    this.display;

    this.startTimer = function (duration, display) {
        var minutes, seconds, timer;
        this.duration = duration;
        this.display = display;
        this.timer = this.duration;
        var clock = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                document.exitPointerLock();
                clearTimeout(clock);
            }
        }, 1000);
        return this;
    }

    this.isRun = function (){
        return this.timer <= 0 ? false : true;
    }
}
