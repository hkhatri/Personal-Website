/**
 * Created by admin on 7/27/2014.
 */

var global_width;
var global_height;

function mainInitialize() {
    getScreenSize();
    window.onscroll = slideHeaderChild;
    rotateCoverImage();
}

function getScreenSize() {
    var myWidth = 0, myHeight = 0;
    if( typeof( window.innerWidth ) == 'number' ) {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }
    global_width = myWidth;
    global_height = myHeight;
}

function slideHeaderChild() {
    var myDiv = document.getElementById("header_child");
    var top = window.pageYOffset || document.documentElement.scrollTop;

    if (top > 100 && !myDiv.initialized) {
        moveDivTag(myDiv, 10, -45, 40);
    } else if (top < 100 && myDiv.initialized) {
        moveDivTag(myDiv, 10, 40, -45);
        myDiv.initialized = false;
    }
}


function changeBGColorMouseOver(e) {
    var evt=window.event || e;
    if (!evt.target) //if event obj doesn't support e.target, presume it does e.srcElement
        evt.target=evt.srcElement; //extend obj with custom e.target prop
    //do something with evt.target, which is cross browser
    console.log(evt);
    if (evt.target.tagName.toLowerCase() === 'img') {
        document.getElementById(evt.target.offsetParent.id).style.backgroundColor = "#CCCCCC";
    } else if (evt.target.tagName.toLowerCase() === 'td') {
        document.getElementById(evt.target.id).style.backgroundColor = "#CCCCCC";
    }
}

function changeBGColorMouseOut(e) {
    var evt=window.event || e;
    if (!evt.target) //if event obj doesn't support e.target, presume it does e.srcElement
        evt.target=evt.srcElement; //extend obj with custom e.target prop
    //do something with evt.target, which is cross browser
    console.log(evt);
    if (evt.target.tagName.toLowerCase() === 'img') {
        document.getElementById(evt.target.offsetParent.id).style.backgroundColor = "#EFEFE7";
    } else if (evt.target.tagName.toLowerCase() === 'td') {
        document.getElementById(evt.target.id).style.backgroundColor = "#EFEFE7";
    }
}
