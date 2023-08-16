import $ from "jquery";
const PROXY = 'https://s5251464.elf.ict.griffith.edu.au:3001';
const KEY = "";
// Google Cloud Translate API
const TURL = PROXY + "?key="+ KEY + "&format=text";
const LURL = PROXY + "/languages?key=" + KEY;

// Post text and return translated text with Source and Target Langauge
// export function gTrans(src, tar) {
//     let text = "&q=" + getTxt();
//     let source = "&source=" + src;
//     let target = "&target=" + tar;
//     let url = TURL+source+target+text;
//     $.post(url, function(data) {
//         // console.log(data);
//     let result = data.data.translations[0].translatedText;
//     speakJP(result);
//     }, "json");
// }
// function getTxt() {
//     return $("#Trans").val();
// }

// Translate Facebook posts
export async function gTransPosts(src, tar, data) {
    return new Promise(function(resolve, reject) {
        let posts = [];
        let max = data.length;
        let source = "&source=" + src;
        let target = "&target=" + tar;
        data.forEach(post => {
            let text = "&q=" + post;
            let url = TURL+source+target+text;
            fetch(url).then(response => {
                return response.json();
            }).then(data => {
                let result = data.data.translations[0].translatedText;
            posts.push(result);
            // When all translated
            if (max == posts.length) {
                resolve(posts);
            }
            });
        });
    });
}

// Lookup language and get code from supported language list
export function gTransGetLangCode(lang) {
    return new Promise(function(resolve, reject) {
    let url = LURL + '&target=en';
    let langCode;
    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        let array = data.data.languages;
        for (let i = 0; i < array.length; i++) {
            let code = array[i].language;
            let name = array[i].name;
            if (name.startsWith(lang)) {
                langCode = code;
                break;
            }
        }
        if (langCode != undefined) {
            resolve(langCode);
        } else {
            reject(`Failed to find code for the language.`);
        }
    });
});
}