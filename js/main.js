/**
 * Created by Hilay Khatri on 7/27/2014.
 */

var global_width;
var global_height;
var page_height;

/*
 * 
 * This array of objects works as the data store for the widget
 * developed. Eventually, this static code will be converted into webservice
 * so that it can optimized.
 */
var work_data = [
    {
        company: "Cisco Systems, Inc.",
        title: "Software Engineer II",
        start: "Aug-2013",
        end: "Current",
        details: "At Cisco, I work on adding features and enhancements for Cisco IOS XR that runs on NCS6000 and NCS4000 series routers. <br><br>" +
                 "I started working by enhancing NPU (Network Processing Unit) driver component to ease integration of new Optics and Line Cards. " +
                 "Next, I obtained ownership of maintaining Management Ethernet Port's infrastructure. " +
                 "Later, I worked on enhancing a library that maintains and publishes identifiers for core Hardware present in Chassis using lexical analysis and token parsing. " +
                 "Currently, I am working on developing the infrastructure for adding future Optics. " +
                 "As time passed, I started working on several components of Cisco IOS XR, obtaining their ownership and providing developer support for enhancing them as per requirements.",
        icon: "img/cisco.png"
    },
    {
        company: "Riverbed Technology, Inc.",
        title: "Software Engineer",
        start: "Apr-2013",
        end: "Aug-2013",
        details: "At Riverbed, I worked on projects that closely involved enhancing user interaction for an application called VNE Server. " + "<br><br>" +
                 "One of the features I developed was to estimate memory consumption based on the various selections made by the user. " +
                 "This estimation should be fast and non-blocking. The backend was implemented in Java and required strong object oriented programming skills. " +
                 "XML and JSON formats were used for storing/retrieving data. This feature also required designing a very dynamic UI that can provide instant " +
                 "feedback based on user selection. Next, I worked on a feature called “Synthetic Testing” which involved building UI for their already existing backend. " +
                 "All the UI related projects required strong object oriented Javascript knowledge along with strong grasp on Dojo, HTML, and CSS. " +
                 "It has to be cross-browser compatible. Plus, it should be backward compatible upto IE8. <br><br>" +                             
                 "I also performed a thorough study of the major part of the VNE Server Application and provided" +
                 " suggestions and comments to improve its UI with the aim of enhancing overall user experience",
        icon: "img/riverbed.png"
    },
    {
        company: "Red Hat, Inc.",
        title: "Software Engineering Intern",
        start: "May-2012",
        end: "Aug-2012",
        details: "At Redhat, I got an opportunity to work from backend to frontend gaining full stack software developer experience. <br><br>" +
                 "I started my internship by converting a backend of an application called “BeerShift” from php to JAVA. " +
                 "This was a very valuable experience as it helped me to architect a backend. " +
                 "It also involved applying strong object oriented programming skills in JAVA and database management skills. " +
                 "RestEasy framework was used to build RestFul services and a no SQL database called MongoDB was used to store information. " +
                 "Some of the major features supported by this backend included authenticating users, adding beers drank by users, searching beers, displaying all beers drank by all users." +"<br><br>" +
                 "Next, I developed an application called 'Gardenshift' on Red Hats PaaS (OpenShift). This application can be categorized as SoLoMo. My contribution was to architect both backend and frontend. " +
                 "The backend was developed using JAVA, php with no SQL database called MongoDB while frontend was developed using jQuery library. " +
                 "RestEasy framework was used to provide Restful Services over the Web. This type of web services can be easily executed using Javascript (Ajax) technology to create a dynamic UI. " +
                 "The biggest advantage of this design is that it doesn’t require reloading or moving between the pages since the contents of the web page are updated dynamically. " + 
                 "Some of the major features implemented for 'Gardenshift' includes managing pictures uploaded by users, friend system, Wall Post, Feedback System, Notification System, Private Messaging, updating profile pictures, etc. " +
                 "Checkout its demo <a href='http://gardenshift-khatri.rhcloud.com/'>here<a>.",
        icon: "img/redhat.png"
    },
    {
        company: "Tata Consultancy Services, Ltd.",
        title: "Project Trainee",
        start: "Jan-2011",
        end: "Apr-2011",
        details: "At TCS, I worked on developing shell scripts, automating data processing and developing tests cases for a new framework developed for an application. <br><br> " +
                 "I started my training by making myself familiar with UNIX environment and understanding its power to automate task. " +
                 "I developed several shell scripts for processing data related to millions of phone numbers from different carriers in India. " +
                 "These scripts would convert data from one format to another and find errors with the aim to discover unusual discrepancies. " +
                 "Major part of these shell scripts were written using 'awk'. " + "<br><br>" +
                 "Next, I helped our team in testing an application by making sure all the functionalities are present in the new framework and they work exactly the way it used to work in the old framework. " +
                 "I developed several test cases and applied black-box testing methodology. " +
                 "I generated reports for the tests performed, then contacted respective developers to address the issue with the aim to improve quality of product.",
        icon: "img/tcs.png"
    }
];

/*
    Workaround for IE since it throws error for:
    window.onscroll = setinterval(fn, timer);
 */
function scrollTrue () {
    this.scrollHappen = true;
}

window.setInterval(function() {
    if(this.scrollHappen == true) {
        slideHeaderChild();
    }
    this.scrollHappen = false;
}, 250);

function mainInitialize() {
    myAjaxCall("pages/home.html", "replace");
    updateScreenSizeInformation();
    this.home = true;
    window.onscroll = scrollTrue;
    this.timer = rotateCoverImage();
    this.skills = false;
    this.copyright = false;
    resetScroll();
    enableShadowForHeaderChild(true);
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

/* The following code takes care of sliding the Drop Down Menu
   when the user scrolls
 */
function slideHeaderChild() {
    updateScreenSizeInformation();
    var myDiv = document.getElementById("header_child");
    var myTable = document.getElementById('menu_table_id');
    var top = window.pageYOffset || document.documentElement.scrollTop;

    if(this.home) {
        if (top > 100 && !myDiv.initialized) {
            moveDivTag(myDiv, 10, -50, 40);
        } else if (top < 100 && myDiv.initialized) {
            moveDivTag(myDiv, 10, 40, -50);
            myDiv.initialized = false;
        }

        if ((page_height - global_height - top < 200) || (page_height - global_height < 200)) {
            if (!this.skills) {
                myAjaxCall("pages/skills.html", "append");
                this.skills = true;
            } else if (!this.copyright) {
                myAjaxCall("pages/copyright.html", "append");
                this.copyright = true;
            }
        }
    } else {
        myDiv.style.top = '40px';
        enableShadowForHeaderChild(true);

        if (page_height - global_height == top && !this.copyright) {
            myAjaxCall("pages/copyright.html", "append");
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

function changeCurrentDataToWork() {
    var parent = document.getElementById("main_content_id");
    this.demo = new infoWidget(work_data, parent);
    this.demo.build();
    this.copyright = false;
    this.home = false;
    this.skills = false;
    resetScroll();
}

function changeCurrentDataToEducation() {
    myAjaxCall("pages/education.html", "replace");
    this.copyright = false;
    this.home = false;
    this.skills = false;
    resetScroll();
}

function changeCurrentDataToResearch() {
    myAjaxCall("pages/research.html", "replace");
    this.copyright = false;
    this.home = false;
    this.skills = false;
    resetScroll();
}

function resetScroll() {
    document.location = "#";
    resetScrollY();
}

function changeCurrentDataToHome() {
    myAjaxCall("pages/home.html", "replace");
    mainInitialize();
}

function resetScrollY() {
    if (typeof(window.pageYOffset) == 'number') {
        //Netscape compliant
        window.pageYOffset = 0;
    } else if (document.body && document.body.scrollTop) {
        //DOM compliant
        document.body.scrollTop = 0;
    } else if (document.documentElement && document.documentElement.scrollTop) {
        //IE6 standards compliant mode
        document.documentElement.scrollTop = 0;
    }
}

function moveScrollTo(e) {
    var evt = getTargetObj(e);
    clearInterval(this.timer);
    
    if (evt.target.id == "td1" || evt.target.id == "td1_img1") {
        changeCurrentDataToWork();
    } else if (evt.target.id == "td2" || evt.target.id == "td2_img2") {
        changeCurrentDataToEducation();
    } else if (evt.target.id == "td3" || evt.target.id == "td3_img3") {
        changeCurrentDataToResearch();
    } else if (evt.target.id == "td4" || evt.target.id == "td4_img4") {
        changeCurrentDataToHome();
    }
}

/*
 * The following function takes care of moving 
 * the menu icon down 
 */

function moveHeaderChildDownOnDemand() {
    var myDiv = document.getElementById("header_child");
    if(myDiv.initialized != true) {
        moveDivTag(myDiv, 10, -50, 40);       
    }
    
    if(this.home) {
        enableShadowForHeaderChild(true);
    }
}

function enableShadowForHeaderChild(bool) {
    var myTable = document.getElementById('menu_table_id');
    if(bool) {
        myTable.style.boxShadow = '2px 2px 5px #888888';
    }
    else {
        myTable.style.boxShadow = '0px 0px 0px #FFFFFF';
    }
}