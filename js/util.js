/**
 * Created by Hilay Khatri  on 7/29/2014.
 */

function rotateCoverImage() {
    var i = 0;
    var timer = setInterval(function () {
            var coverDiv = document.getElementById("cover");
            i = (i % 5);
            coverDiv.src = "img/cover_" + i + ".jpg";
            i++;
        }, 5000);
    return timer;
}

/*
 The following function takes care of sliding the Drop Down Menu
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

/*
 * This function is used to create a custom AJAX call to
 * dynamically load new pages
 * 
 * Arguments:
 *      url: The URL that needs to be fetched
 *      action: Append/Replace the existing main content
 */
function myAjaxCall(url, action)
{
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            if(action == "append") {
                document.getElementById("main_content_id").innerHTML += xmlhttp.responseText + "<br>";
            } else if (action == "replace") {
                document.getElementById("main_content_id").innerHTML = xmlhttp.responseText;
            }
            slideHeaderChild();
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}