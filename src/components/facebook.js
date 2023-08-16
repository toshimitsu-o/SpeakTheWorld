/*
    Facebook API
    App Control https://developers.facebook.com/apps/
*/

import $ from "jquery";
let fbAtoken;
const APPID = '';
const APPURL = 'https://elf.ict.griffith.edu.au:3000/a2/react/public/';
const LOGIN = 'https://www.facebook.com/dialog/oauth?client_id='+APPID+'&redirect_uri='+APPURL+'&response_type=token&scope=email,user_posts';
const GRAPH = 'https://graph.facebook.com/v13.0/me?fields=name%2Cposts%7Bmessage%7D&access_token=';
let openModal;

// Get Graph data and extract post messages and return array
export function getPosts(func) {
    return new Promise(function(resolve, reject) {
        let url = GRAPH + fbAtoken;

        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            let result = extractPosts(data);
            resolve(result);
        }).catch(error =>{
            alert('You are not logged in. Please login.');
            openModal();
        });
    });
    
}

function extractPosts(data) {
    let postsData = data.posts.data;
    let posts = [];
    postsData.forEach(post => {
        if (post.message != undefined) {
            posts.push(post.message);
        }
    });
    let result = posts.slice(0,5);
    return result;
}

// Retrieve Facebook Access Token from URL
export function getToken(url,close, open) {
    //let url = location.attr('href');

    if (url.includes('access_token')) {
        let params = url.split('?#')[1];
        params = params.split('&');
        params.forEach((i) => {
            let key = i.split('=')[0]
            let val = i.split('=')[1]
            if (key == 'access_token') {
                fbAtoken = val;
            }
        });
        close();
    } else if (fbAtoken === undefined) {
        open();
    }
}


// Redirect to Facebook API login
export function loginFB(close,open) {
    openModal = open;
    window.location.replace(LOGIN);
    if (fbAtoken != undefined || fbAtoken != '') {
        alert('Logged in!');
    } else {
        alert('Login failed.');
    }
}

// Logout Redirect
export function logoutFB() {
    fbAtoken = undefined;
    window.location.replace(APPURL);
    alert('You are logged out.');
}

export function gotToken() {
    if (fbAtoken != undefined) {
        return true;
    } else {
        return false;
    }
}