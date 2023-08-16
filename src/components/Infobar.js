import React, { Component } from 'react';

class Infobar extends Component {
    

    constructor(props) {
        super(props)
    }


    render() {
        return (
        <div className="Infobar">
            <a class="closebtn" onClick={()=>{this.props.close()}}>X CLOSE</a>
            <h2>{this.props.country}</h2>
            <div id="languages">
                {this.props.languages.map((language, index) => {
                    return(<a key={index} onClick={()=>{this.props.selectLang(language)}}>{language}</a>);
                })}
            </div>
    
        </div>
        );

    }

}



export default Infobar;
