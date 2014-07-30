/**
 * Created by admin on 7/28/2014.
 */

/*
 Time Function
 */

function moveDivTag(myDiv, time, from, to) {
    this.start = from;
    this.end = to;
    myDiv.initialized = true;

    this.startInterval = setInterval(function () {
        slideHeaderDiv.call(this, myDiv)
    }, time)
}

function slideHeaderDiv(myDiv) {
    if (this.start > this.end) {
        this.start -= 1;
    } else {
        this.start += 1;
    }

    myDiv.style.top = this.start + "px";

    if (this.start == this.end) {
        clearInterval(this.startInterval);
    }
}