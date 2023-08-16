import $ from "jquery";
import thumbs from "./templates/photos.handlebars";
import list from "./templates/list.handlebars";

// Display Facebook Posts
export function showFBPosts(data) {
    $("#fbposts").remove();
    $("#trans-posts").remove();
    //console.log(data);
    let div = "<div id='fbposts'></div>";
    $("#languages").append(div);
    data.forEach(post => {
        if (post != "" || post != undefined) {
            let html = `<div>${post}</div>`;
            $("#fbposts").append(html);
        }
    });
    
}

// Display list of languages for the country
export function showLangs(country, langs, func) {
    // clear contents
    clearPosts();

    let div = "<div id='languages'></div>"
    let h2 = "<h2>"+ country +"</h2>";
    $("#container").append(div).append(h2).append(`<div id="langs"></div>`);
    langs.forEach(lang => {
        let html = `<a class="${lang}" lang="${lang}">${lang}</a>`;
        $("#langs").append(html);
    });
    $("#langs a").each(function(){
        $(this).click(function(){
            let ln = $(this).attr("lang");
            if (ln.includes("English")) {
                alert("Please select other languages.");
            } else {
                func(ln);
            }
        });
    });
}

// Display translate posts
export function showTransPosts(data) {
    let div = "<div id='trans-posts'></div>";
    $("#languages").append(div);
    data.forEach((post, index) => {
        let html = `<div><p class="trans-post">${post}</p></div>`;
        $("#trans-posts").append(html);
        
    });
}

export function addSpeakEvent(voice) {
    $(".trans-post").each(function(){
        $(this).on("click", function(){
            let txt = $(this).html().replace(/[:[]:;。：]/g, ',');
            responsiveVoice.speak(txt, voice);
        });
    });

}
export function clearPosts() {
    $("#languages").remove();
}