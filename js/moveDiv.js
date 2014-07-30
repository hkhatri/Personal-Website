/**
 * Created by admin on 7/28/2014.
 */

/*
 Time Function
 */

function moveDivTag(myDiv, time, from, to) {
    var start = from;
    var end = to;
    myDiv.initialized = true;

    var startInterval = setInterval(function () {
        if (start > end) {
            start -= 1;
        } else {
            start += 1;
        }

        myDiv.style.top = start + "px";

        if (start == end) {
            clearInterval(startInterval);
        }
    }, time)
}

function slideHeaderDiv(myDiv) {

}