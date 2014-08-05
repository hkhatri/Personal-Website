/**
 * Created by Hilay Khatri on 7/27/2014.
 */

var global_width;
var global_height;
var page_height;
var data;

function mainInitialize() {
    updateScreenSizeInformation();
    window.onscroll = setInterval(function(){slideHeaderChild()}, 200);
    rotateCoverImage();
    this.education = false;
    this.experience = false;
    this.copyright = false;

    var body = document.getElementById("main_body_id");
}

function updateScreenSizeInformation() {
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

    var body = document.body;
    var html = document.documentElement;

    page_height = Math.max( body.scrollHeight,
                            body.offsetHeight,
                            html.clientHeight,
                            html.scrollHeight,
                            html.offsetHeight );

    global_width = myWidth;
    global_height = myHeight;
}

function getPageHeight() {

}

/* The following code takes care of sliding the Drop Down Menu
   when the user scrolls
 */
function slideHeaderChild() {
    updateScreenSizeInformation();
    var myDiv = document.getElementById("header_child");
    var top = window.pageYOffset || document.documentElement.scrollTop;

    if (top > 100 && !myDiv.initialized) {
        moveDivTag(myDiv, 10, -45, 40);
    } else if (top < 100 && myDiv.initialized) {
        moveDivTag(myDiv, 10, 40, -45);
        myDiv.initialized = false;
    }

    if(page_height - global_height  === top) {
        if(!this.education) {
            myAjaxCall("pages/education.html");
            this.education = true;
        } else if(!this.copyright) {
            myAjaxCall("pages/copyright.html");
            this.copyright = true;
        }
    }
}

/* The following code takes care of changing the background color of the Drop Down Menu */

function getTargetObj(e) {
    var evt=window.event || e;
    if (!evt.target) {
        evt.target = evt.srcElement;
    }

    return evt;
}

function changeBGColorMouseOver(e) {
    changeBGColorTo(e, "#CCCCCC");
}

function changeBGColorMouseOut(e) {
    changeBGColorTo(e, "#EFEFE7");
}

function changeBGColorTo(e, color) {
    var evt = getTargetObj(e);
    if (evt.target.tagName.toLowerCase() === 'img') {
        document.getElementById(evt.target.offsetParent.id).style.backgroundColor = color;
    } else if (evt.target.tagName.toLowerCase() === 'td') {
        document.getElementById(evt.target.id).style.backgroundColor = color;
    }
}

function moveScrollTo(e) {
    var evt = getTargetObj(e);
    if ((evt.target.id == "td2" || evt.target.id == "td2_img2") && !this.education) {
        alert('clicked Edu');
    }
}

