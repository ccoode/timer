var CountDown = function(left, display, startBtn, stopBtn) {
    this.left = left;
    this.orig = left;
    this.display = display;
    this.startBtn = startBtn;
    this.stopBtn = stopBtn;
    this.f1 = 1;
    this.f2 = 1;
};

CountDown.prototype.start = function() {
    this.f1 = 0;
    document.getElementById(this.display).innerText = convertTime(this.left);
    if (this.left <= 0) {
        this.stop();
    }
    this.left -= 1;
    var _this = this;
    if (this.left >= 0) {
        this.timeId = setTimeout(function() {
            CountDown.prototype.start.call(_this);
        }, 1000);
    }
    document.getElementById(this.startBtn).innerText = "Suspend";
};

CountDown.prototype.suspend = function() {
    this.f1 = 1;
    document.getElementById(this.startBtn).innerText = "Start";
    clearTimeout(this.timeId);
};

CountDown.prototype.stop = function() {
    this.f1 = 1;
    this.f2 = 0;
    clearTimeout(this.timeId);
    document.getElementById(this.display).innerText = "00:00";
    this.left = 0;
    document.getElementById(this.stopBtn).innerText = "Reset";
    document.getElementById(this.startBtn).innerText = "Start";
    document.getElementById(this.startBtn).style.visibility = "hidden";
};

CountDown.prototype.reset = function() {
    this.f2 = 1;
    clearTimeout(this.timeId);
    this.left = this.orig;
    document.getElementById(this.display).innerText = convertTime(this.orig);
    document.getElementById(this.stopBtn).innerText = "Stop";
    document.getElementById(this.startBtn).style.visibility = "visible";
};

CountDown.prototype.startF = function() {
    if (this.f1 === 1) {
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

CountDown.prototype.endF = function() {
    this.reset();
    document.getElementById(this.startBtn).onclick = null;
    document.getElementById(this.stopBtn).onclick = null;
}

function pad(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

function convertTime(time) {
    return pad(Math.floor(time / 60)) + ":" + pad(time % 60);
}

function init(l1, l2) {
    timer1 = new CountDown(l1, "display1", "start1", "stop1");
    startBtn1.innerText = "Start";
    stopBtn1.innerText = "Stop";
    display1.innerText = convertTime(timer1.left);
    timer2 = new CountDown(l2, "display2", "start2", "stop2");
    startBtn2.innerText = "Start";
    stopBtn2.innerText = "Stop";
    display2.innerText = convertTime(timer2.left);
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
}

function endUp() {
    timer1.endF();
    timer2.endF();
};

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
        endUp();
        pos = i;
        init(zftime[i], fftime[i]);
        next();
    }
    return fun;
};

function next() {
    var link = document.createElement('a');
    link.innerText = roundname[pos];
    pos = (pos + 1) % length;
    link.href = "#";
    link.onclick = getCallback(pos);
    nextBtn.replaceChild(link, nextBtn.firstChild);
}

function pushRound(zf, ff, name) {
    zftime.push(zf);
    fftime.push(ff);
    roundname.push(name);
}

var timer1 = null, timer2 = null,
    startBtn1 = null, stopBtn1 = null, display1 = null,
    startBtn2 = null, stopBtn2 = null, display2 = null,
    stepList = null, turnBtn = null, nextBtn = null;
var pos = 0,length;
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

window.onload = function() {
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
    next();
    for (var i = 0; i < length; i++) {
        var li = document.createElement('li');
        var link = document.createElement('a');
        link.innerText = roundname[i];
        link.href = "#";
        link.onclick = getCallback(i);
        li.appendChild(link);
        stepList.appendChild(li);
    }
    turnBtn.onclick = turn;
};
