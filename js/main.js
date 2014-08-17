/**
 * Created by Hilay Khatri on 7/27/2014.
 */

var global_width;
var global_height;
var page_height;

var work_data = [
    {
        company: "Cisco Systems, Inc.",
        title: "Software Engineer II",
        start: "Aug-2013",
        end: "Current",
        details: "Good work",
        icon: "img/cisco.png"
    },
    {
        company: "Riverbed Technology, Inc.",
        title: "Software Engineer",
        start: "Apr-2013",
        end: "Aug-2013",
        details: "At Riverbed, I worked on a few projects that closely involved enhancing user interaction of their application called VNE Server " + "<br><br>" +
                 "One of the features I developed was to estimate memory consumption based on the various selections made by the user" +
                 "This estimation should be fast and non-blocking. The backend was implemented in Java and required strong object oriented programming skills. " +
                 "XML and JSON formats were used for storing/retrieving data. This feature also required designing a very dynamic and professional looking UI that can provide instant " +
                 "feedback based on user selection. This required strong object oriented Javascript knowledge along with strong knowledge of Dojo, HTML, and CSS. " +
                 "For version controlling, we used ClearCase tool." + "<br><br>" +
                 "Next, I worked on a feature called “Synthetic Testing” which involved building a UI for their already existing backend. " +
                 "The UI should be user friendly. Again, this required strong object oriented Javascript knowledge along with strong knowledge of Dojo, HTML, and CSS." + "<br><br>" +
                 "Apart from the above projects, I did a thorough study of the major part of the VNE Server Application and provided" +
                 " suggestions and comments to improve its UI with the aim of enhancing overall user experience",
        icon: "img/riverbed.png"
    },
    {
        company: "Red Hat, Inc.",
        title: "Software Engineering Intern",
        start: "May-2012",
        end: "Aug-2012",
        details: "At Redhat, I got an opportunity to work from backend to frontend gaining valuable experience. I also gained valuable experience working on RHEL which is a Unix based OS system." + "<br><br>" +
                 "I started my internship by converting a backend of an application called “BeerShift” from php to JAVA. This was a very valuable experience as it helped me to architect a backend. It also involved applying strong object oriented programming skills in JAVA and database management skills. RestEasy framework was used to build RestFul services and no SQL database called MongoDB was used to store information. Some of the major features supported by this backend included authenticating users, adding beers drank by users, searching beers, displaying all beers drank by all users." +"<br><br>" +
                 "Next, I worked an application called 'Gardenshift' on Red Hats PaaS (OpenShift). Again, my contribution for this app was to architect both backend and frontend. The backend was developed using JAVA with no SQL database called MongoDB while frontend was developed using jQuery library. RestEasy framework was used that provided Restful Services over the Web. This type of web services can be easily executed using Javascript (Ajax) technology to create a dynamic UI. The biggest advantage of this design is that it doesn’t require reloading or moving between the pages since the contents of the web page are updated dynamically. This type of technology is heavily used in ‘Gmail’ and ‘Facebook’. Some of the major features implemented includes managing pictures uploaded by users, friend system, Wall Post, Feedback System, Notification System, Private Messaging, updating profile pictures, etc.",
        icon: "img/redhat.png"
    },
    {
        company: "Tata Consultancy Services, Ltd.",
        title: "Project Trainee",
        start: "Jan-2011",
        end: "Apr-2011",
        details: "At TCS, I started my training by working on developing shell scripts. These scripts were developed for processing data related to millions of phone numbers from different carriers in India. These scripts would convert data from one format to another, find errors with the aim to discover unusual discrepancies in the data. Major part of these shell scripts were written using “awk” for processing texts. This helped me to gain valuable experience working on Unix based OS system to automate data processing. " + "<br><br>" +
                 "Next, I helped our team in testing an application. Our team was porting an application from one framework to another. My primary goal was to make sure all the functionalities are present in the new framework and they work exactly the way it used to work in the old one. I developed very strong test cases, carried out manual testing, and maintained an excel sheet with results.",
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
},250);

function mainInitialize() {
    myAjaxCall("pages/home.html", "replace");
    updateScreenSizeInformation();
    this.home = true;
    window.onscroll = scrollTrue;
    this.timer = rotateCoverImage();
    this.skills = false;
    this.copyright = false;
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
    var top = window.pageYOffset || document.documentElement.scrollTop;

    if(this.home) {
        if (top > 100 && !myDiv.initialized) {
            moveDivTag(myDiv, 10, -50, 40);
        } else if (top < 100 && myDiv.initialized) {
            moveDivTag(myDiv, 10, 40, -50);
            myDiv.initialized = false;
        }

        if ((page_height - global_height - top < 10) || (page_height - global_height < 10)) {
            if (!this.skills) {
                myAjaxCall("pages/skills.html", "append");
                this.skills = true;
            } else if (!this.copyright) {
                myAjaxCall("pages/copyright.html", "append");
                this.copyright = true;
            }
        }
    } else {
        myDiv.style.top = 40;
        if (page_height - global_height === top && !this.copyright) {
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

function resetScroll() {
        window.pageYOffset = 0;
        document.documentElement.scrollTop = 0;
}

function changeCurrentDataToHome() {
    myAjaxCall("pages/home.html", "replace");
    resetScroll();
    mainInitialize();
}

function moveScrollTo(e) {
    var evt = getTargetObj(e);
    clearInterval(this.timer);

    if (evt.target.id == "td1" || evt.target.id == "td1_img1") {
        changeCurrentDataToWork();
    } else if (evt.target.id == "td4" || evt.target.id == "td4_img4") {
        changeCurrentDataToHome();
    }
}