import React, { Component } from 'react';
import icon from '../sound.png';

class TransPosts extends Component {

    constructor(props) {
        super(props)

    }

    speak = (post) => {
        let txt = post.replace(/[:[]:;。：]/g, ',');
        window.responsiveVoice.speak(txt, this.props.voice);
    }

    render() {
        return (
        <div className="TransPosts">
            <h3>Translations</h3>
            <div class="posts-box">
                {this.props.posts.map((post, index) => {
                    return(<p key={index} onClick={()=>{this.speak(post)}}><img src={icon} className="soundicon" width="25px" alt="speak" />{post}</p>);
                })}
            </div>
    
        </div>
        );

    }

}



export default TransPosts;
