/**
 * Created by Hilay Khatri  on 7/29/2014.
 */

function rotateCoverImage() {
    var i = 0;
    var timer = setInterval(function() {
        var coverDiv = document.getElementById("cover");
        i = (i%5);
        coverDiv.src = "img/cover_" + i + ".jpg";
        i++;
    }, 5000)

}