import React, { Component } from 'react';
import './App.css';
import * as facebook from "./components/facebook.js";
import * as gMap from "./components/googleMap.js";
import * as gTrans from "./components/googleTrans.js";
import * as rVoice from "./components/rvoice.js";
import Map from './components/Map';
import Infobar from './components/Infobar';
import FBposts from './components/FBposts';
import TransPosts from './components/TransPosts';
import Modal from './components/Modal';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      country: "",
      languages: [],
      targetLang: "",
      fbposts: [],
      transposts: [],
      voice: "",
      modalOn: undefined,
      showContent: false
    }

  }
  componentDidMount() {
      // Check FB Access Token
      facebook.getToken(window.location.href, this.closeModal, this.openModal);
  }
  
  // Check FB token
  checkToken = () => {
    let token = facebook.getToken();
    if (token) {
      this.setState({modalOn:false})
    } else {
      this.setState({modalOn:true})
    }
    this.modal();
  }

  // FB Login
  loginFB = () => {
    facebook.loginFB(this.closeModal, this.openModal);
  }
  // FB Logout
  logoutFB = () => {
    facebook.logoutFB();
  }
  // Display languages
  setLanguages = (country, languages) => {
    this.setState({country});
    this.setState({languages});
    console.log('setLanguages: '+country, languages)
  }

  // Display posts with translation
  displayPosts = (targetLang) => {
    this.setState({targetLang});

    // Lookup and get language code for the selected language
    const p1 = new Promise((resolve, reject) => {
        const langCode = gTrans.gTransGetLangCode(targetLang);
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
        this.setState({fbposts: data});
        //view.showFBPosts(data);

        // Get translations
        const p3 = new Promise((resolve, reject) => {
            const transData = gTrans.gTransPosts(src, tar, data);
            resolve(transData);
            reject(`Failed to get translations.`);
        }).then(resolve =>{
            // Display translations
            //view.showTransPosts(resolve);
            this.setState({transposts: resolve});
            // Set voice events
            let voice = rVoice.addSpeak(targetLang);
            if (voice != undefined) {
                //view.addSpeakEvent(voice);
                this.setState({voice});
            } else {
                alert('Sorry, I can not speak the language.');
            }
        }).catch(error => alert(`Error: ${error}`));
        
    }).catch(error => alert(`Error: ${error}`));

  }

  modal = () => {
    if (this.state.modalOn === false) {
    return;
    } else {
        return <Modal login = {this.loginFB} />
    }
  }
  closeModal = () => {
    this.setState({modalOn: false})
  }
  openModal = () => {
    this.setState({modalOn: true});
    this.modal();
  }
  showContent = () => {
    this.setState({showContent: true});
  }
  closeContent = () => {
    this.setState({showContent: false});
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Speak the World</h1>
          <div class="loginout"><a onClick={() => {this.loginFB()}}>Login</a> | <a onClick={() => {this.logoutFB()}}>Logout</a></div>
        </header>
        <div id="map">
          <Map setLang = {this.setLanguages} show={this.showContent}/>
        </div>
        { this.state.showContent && (<div id="content">
          <div id="infobar">
          <Infobar country = {this.state.country} languages = {this.state.languages} selectLang = {this.displayPosts} close={this.closeContent}/>
          </div>
          <div id="posts">
            <FBposts posts={this.state.fbposts}/>
            <TransPosts posts={this.state.transposts} voice={this.state.voice}/>
          </div>
        </div>)}
        {this.modal()}
      </div>
    );

  }

}



export default App;
