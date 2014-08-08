/**
 * Created by Hilay Khatri on 8/4/2014.
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
                document.getElementById("main_content_id").innerHTML += xmlhttp.responseText;
            } else if (action == "replace") {
                document.getElementById("main_content_id").innerHTML = xmlhttp.responseText;
            }
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}