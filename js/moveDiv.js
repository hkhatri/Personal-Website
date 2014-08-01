/**
 * Created by Hilay Khatri  on 7/28/2014.
 */


/*
 The following code takes care of sliding the Drop Down Menu
 when the user scrolls.

 Arguments:
    myDiv = The DIV element to mov
    time = Time in ms
    from = start position of div
    to = end position of div
 */
function moveDivTag(myDiv, time, from, to) {
    var start = from;
    var end = to;
    myDiv.initialized = true;

    var startInterval = setInterval(function () {
        if (start > end) {
            start -= 5;
        } else {
            start += 5;
        }

        myDiv.style.top = start + "px";

        if (start == end) {
            clearInterval(startInterval);
        }
    }, time)
}