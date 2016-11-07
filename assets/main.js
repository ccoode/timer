(function() {
    var CountDown = function(left, display, startBtn, stopBtn) {
        this.left = left;
        this.orig = left;
        this.display = display;
        this.startBtn = startBtn;
        this.stopBtn = stopBtn;
        this.f1 = 1;
        this.f2 = 1;
    };

    var startSound = new Audio("assets/audio/begin.wav");
    var stopSound = new Audio("assets/audio/stop.wav");
    var alertSound = new Audio("assets/audio/alert.wav");

    var bgIcon = '<i class="fa fa-circle fa-stack-2x"></i>';
    var startIcon = bgIcon + '<i class="fa fa-play fa-stack-1x"></i>';
    var suspendIcon = bgIcon + '<i class="fa fa-pause fa-stack-1x"></i>';
    var stopIcon = bgIcon + '<i class="fa fa-stop fa-stack-1x"></i>';
    var resetIcon = bgIcon + '<i class="fa fa-repeat fa-stack-1x"></i>';

    CountDown.prototype.start = function() {
        this.f1 = 0;
        if (this.left <= 5 && this.left > 0 || this.left == 30) alertSound.play();
        this.display.innerText = convertTime(this.left);
        if (this.left <= 0) {
            this.stop();
        }
        this.left -= 1;
        if (this.left >= 0) {
            this.timeId = setTimeout(arguments.callee.bind(this), 1000);
        }
        this.startBtn.innerHTML = suspendIcon;
    };

    CountDown.prototype.suspend = function() {
        this.f1 = 1;
        this.startBtn.innerHTML = startIcon;
        clearTimeout(this.timeId);
    };

    CountDown.prototype.stop = function() {
        this.f2 = 0;
        stopSound.play();
        clearTimeout(this.timeId);
        this.display.innerText = "00:00";
        this.left = 0;
        this.stopBtn.innerHTML = resetIcon;
        this.startBtn.style.visibility = "hidden";
    };

    CountDown.prototype.reset = function() {
        this.f1 = 1;
        this.f2 = 1;
        if (this.timeId) clearTimeout(this.timeId);
        this.left = this.orig;
        this.display.innerText = convertTime(this.orig);
        this.stopBtn.innerHTML = stopIcon;
        this.startBtn.innerHTML = startIcon;
        this.startBtn.style.visibility = "visible";
    };

    CountDown.prototype.startF = function() {
        if (this.f1 === 1) {
            if (this.left == this.orig) startSound.play();
            this.start();
        } else {
            this.suspend();
        }
    };

    CountDown.prototype.stopF = function() {
        if (this.f2 === 1) {
            this.stop();
        } else {
            this.reset();
        }
    };

    function pad(number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    }

    function convertTime(time) {
        return pad(Math.floor(time / 60)) + ":" + pad(time % 60);
    }

    function init(left1, left2) {
        /* 初始化 timer */
        timer1 = new CountDown(left1, display1, startBtn1, stopBtn1);
        timer2 = new CountDown(left2, display2, startBtn2, stopBtn2);
        timer1.reset();
        timer2.reset();
        /* 初始化 nextBtn */
        var link = document.createElement('a');
        link.innerText = roundname[pos];
        pos = (pos + 1) % length;
        link.className = "myButton nextBtn";
        link.onclick = getCallback(pos);
        nextBtn.replaceChild(link, nextBtn.firstChild);
    }

    function turn() {
        if (timer1.f1 === 1 && timer1.f2 === 1 && (timer2.f1 === 0 || timer2.f2 === 0)) {
            timer1.start();
            if (timer2.f1 === 0) timer2.suspend();
        } else if (timer2.f1 === 1 && timer2.f2 === 1 && (timer1.f1 === 0 || timer1.f2 === 0)) {
            timer2.start();
            if (timer1.f1 === 0) timer1.suspend();
        }
    }

    function getCallback(i) {
        var fun = function() {
            timer1.reset();
            timer2.reset();
            pos = i;
            init(zftime[i], fftime[i]);
            stepList.classList.remove('active');
        };
        return fun;
    };

    function pushRound(zf, ff, name) {
        zftime.push(zf);
        fftime.push(ff);
        roundname.push(name);
    }

    var timer1 = null,
        timer2 = null,
        startBtn1 = null,
        stopBtn1 = null,
        display1 = null,
        startBtn2 = null,
        stopBtn2 = null,
        display2 = null,
        stepList = null,
        turnBtn = null,
        nextBtn = null;
    var pos = 0,
        length;
    var zftime = [],
        fftime = [],
        roundname = [];

    pushRound(180, 90, "正方立论");
    pushRound(90, 180, "反方立论");
    pushRound(90, 90, "对辩环节");
    pushRound(150, 150, "盘问环节");
    pushRound(90, 90, "攻辩小结");
    pushRound(90, 0, "暂停休整");
    pushRound(240, 240, "自由辩论");
    pushRound(240, 240, "总结陈词");

    length = zftime.length;

    startBtn1 = document.getElementById("start1");
    stopBtn1 = document.getElementById("stop1");
    display1 = document.getElementById("display1");
    startBtn2 = document.getElementById("start2");
    stopBtn2 = document.getElementById("stop2");
    display2 = document.getElementById("display2");
    stepList = document.getElementById("stepList");
    turnBtn = document.getElementById("turnBtn");
    nextBtn = document.getElementById('next');
    init(zftime[0], fftime[0]);
    startBtn1.onclick = function() {
        timer1.startF();
    };
    stopBtn1.onclick = function() {
        timer1.stopF();
    };
    startBtn2.onclick = function() {
        timer2.startF();
    };
    stopBtn2.onclick = function() {
        timer2.stopF();
    };
    turnBtn.onclick = turn;
    /* stepList 初始化 */
    for (var i = 0; i < length; i++) {
        var li = document.createElement('li');
        var link = document.createElement('a');
        link.innerText = roundname[i];
        link.className = "myButton";
        link.onclick = getCallback(i);
        li.appendChild(link);
        stepList.appendChild(li);
    }
    document.getElementById('stepBtn').onclick = function() {
        stepList.classList.toggle('active');
    };
    document.getElementById('subtitle').innerText = subtitle;
    var teamNames = document.getElementsByClassName('teamName');
    teamNames[0].appendChild(document.createTextNode(zfname));
    teamNames[1].insertAdjacentHTML('afterbegin', ffname);
    var views = document.getElementsByClassName('view');
    views[0].appendChild(document.createTextNode(zfbian));
    views[1].appendChild(document.createTextNode(ffbian));

})();
