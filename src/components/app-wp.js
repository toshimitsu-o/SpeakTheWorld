/*
A2 – 
*/

import $ from "jquery";
import styles from "./css/styles.css";
import * as view from "./view.js";
//import * as flickr from "./flickr.js";
import * as facebook from "./facebook.js";
import * as gMap from "./googleMap.js";
import * as gTrans from "./googleTrans.js";
import * as rVoice from "./rvoice.js";

$( document ).ready(function () {
    // Set up Google Map
    setGmap();

    // Facebook API
    let loc = $(location);
    // Get FB AToken
    facebook.getToken(loc);

    // Login Button
    $("#loginBt").click(function(){
        facebook.loginFB(loc);
    });
    // Logout Button
    $("#logout").click(function(){
        facebook.logoutFB(loc);
    });

    // Get posts Button
    $("#postsBtn").click(function(){
        getPosts();
    });

    $("#speakja").click(function(){
        let text = "おはようございます。";
        responsiveVoice.speak(text, "Japanese Male");
    });

});

// Set up Google Map and call initialiser
function setGmap() {
    // Create the script tag, set the appropriate attributes
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=&callback=initMap';
    script.async = true;

    // Attach your callback function to the `window` object
    window.initMap = function() {
    // JS API is loaded and available
    gMap.initMap(setLanguages);
    };

    // Append the 'script' element to 'head'
    document.head.appendChild(script);
}

// Display languages
function setLanguages(country, langs) {
    view.showLangs(country, langs, displayPosts);
}

// Display posts with translation
async function displayPosts(lang) {
    // Lookup and get language code for the selected language
    const p1 = new Promise((resolve, reject) => {
        const langCode = gTrans.gTransGetLangCode(lang);
        resolve(langCode);
        reject(`Failed to get the language code.`);
    });
    // Get user's facebook posts
    const p2 = new Promise((resolve, reject) => {
        const data = facebook.getPosts();
        resolve(data);
        reject(`Failed to get Facebook posts.`);
    });
    // Promise all: Show FB posts
    const pAll = Promise.all([p1, p2]).then((results) => {
        let src = 'en';
        let tar = results[0];
        let data = results[1];
        view.showFBPosts(data);

        // Get translations
        const p3 = new Promise((resolve, reject) => {
            const transData = gTrans.gTransPosts(src, tar, data);
            resolve(transData);
            reject(`Failed to get translations.`);
        }).then(resolve =>{
            // Display translations
            view.showTransPosts(resolve);
            // Set voice events
            let voice = rVoice.addSpeak(lang);
            if (voice != undefined) {
                view.addSpeakEvent(voice);
            } else {
                alert('Sorry, I can not speak the language.');
            }
        }).catch(error => alert(`Error: ${error}`));
        
    }).catch(error => alert(`Error: ${error}`));

}



// Display posts with translation
// async function displayPosts(lang) {
//     let langCode = await gTrans.gTransGetLangCode(lang);
//     if (langCode != undefined) {
//         let src = 'en';
//         let tar = langCode;
//         let data = await facebook.getPosts();
//         view.showFBPosts(data);
//         let transData = await gTrans.gTransPosts(src, tar, data);
//         view.showTransPosts(transData);
//         let voice = rVoice.addSpeak(lang);
//         if (voice != undefined) {
//             view.addSpeakEvent(voice);
//         } else {
//             alert('Sorry, I can not speak the language.');
//         }
//     } else {
//         alert('Sorry, the language is not supported.')
//     }
// }