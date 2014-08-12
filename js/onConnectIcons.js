/**
 * Created by Hilay Khatri on 8/1/2014.
 */

/* The following code responds to the onClick event for the connect icons: */

function openEmailApp() {
    var name = "hmkhatri";
    var dom = "@ncsu.edu"

    var my_em = name + dom;
    window.location.href = "mailto:" + my_em + "?subject=Hello%20from%20%3ccompany%3e&body=Hi%20Hilay%2C";
}

function openLinkedinApp() {
    var uname = "hilay-khatri";
    window.open("https://www.linkedin.com/pub/" + uname + "/45/241/97", '_blank');
}

function openFbApp() {
    var uname = "hilay.khatri";
    window.open("https://www.facebook.com/" + uname, '_blank');
}

function openResumeApp() {
    window.open("doc/resume.pdf", '_blank');
}

function openGitApp() {
    var uname = "hkhatri";
    window.open("https://github.com/" + uname ,'_blank');
}

function openThesisApp() {
    var uname = "1840.16/8393";
    window.open("http://www.lib.ncsu.edu/resolver/" + uname, '_blank');
}

function connectOnClick(e) {
    var evt = getTargetObj(e);

    if (evt.target.id == "email_icon_id") {
        openEmailApp();
    } else if (evt.target.id == "resume_icon_id") {
        openResumeApp();
    } else if (evt.target.id == "linkedin_icon_id") {
        openLinkedinApp();
    } else if (evt.target.id == "fb_icon_id") {
        openFbApp();
    } else if (evt.target.id == "github_icon_id") {
        openGitApp();
    } else if (evt.target.id == "thesis_icon_id") {
        openThesisApp();
    }
}
