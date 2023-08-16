import React, { Component } from 'react';

class FBposts extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        return (
        <div className="FBposts">
            <h3>Facebook Posts</h3>
            <div class="posts-box">
                {this.props.posts.map((post, index) => {
                    return(<p key={index}>{post}</p>);
                })}
            </div>
    
        </div>
        );

    }

}



export default FBposts;
