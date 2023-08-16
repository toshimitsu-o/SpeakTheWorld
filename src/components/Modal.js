import React, { Component } from 'react';

class Modal extends Component {
    

    constructor(props) {
        super(props)
    }


    render() {
        return (
        <div className="Modal">
            <h1>Speak the World</h1>
            <p>Are you ready to travel around the world? This app translate your Facebook posts in local languages. Furthermore it speaks many languages and you can hear your posts in different languages. Experience the cultures through languages.</p>
            <ol>
                <li>Start by login with Facebook user authentication. Please give permissions to share user details and your posts.</li>
                <li>Click anywhere on the map</li>
                <li>Select a language</li>
                <li>Translate your Facebook posts into the language</li>
                <li>Let it speak your posts in the language</li>
            </ol>
            <a class="login" onClick={()=>{this.props.login()}}>Login</a>
            <p class="technote">Technical description: This app access user’s posts data through Facebook Graph API using authentication. It uses Google Map API to display map and retrieves country name using geocoding method when users click on the map. The country name then passed through the country Json data and matched with country’s spoken languages to be presented as options. By clicking one of the languages, it fetches Facebook posts along with the ISO code for the language via Google Translate API, then combining both to retrieve translations  in the target language from Google Translate API. Finally text-to-speach is provided through ResponsiveVoice API. Run on React.js.</p>
            
        </div>
        );

    }

}



export default Modal;
