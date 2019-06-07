import React, { Component } from "react";
import {TweenMax, TimelineMax, Power1, Back, CSSPlugin, ScrollToPlugin, Draggable, Elastic} from "gsap/all";

class HomePage extends React.Component {


conversationList: []

  constructor(props) {
    super(props);

    this.state={
      numbers : [1, 2, 3, 4, 5],
      conversation: [],
    }


  }

  componentDidMount(){

      this.conversationList = [{
        message: "<h1>Hi I'm FINN</h1><h2>An AI assistant and react chat bot</h2>",

        reply: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore incidunt repellendus animi maiores minima neque nobis modi voluptate nemo qui blanditiis, distinctio cupiditate nihil! Autem et laboriosam mollitia, voluptates nisi?'
      }]

    this.setState({ conversation: this.conversationList }, () =>{
      this.animateChat(0);
    });



  }


  sendChat = () =>{

    this.conversationList.push({
      message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore incidunt repellendus.",

      // reply: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore incidunt repellendus animi maiores minima neque nobis modi voluptate nemo qui blanditiis, distinctio cupiditate nihil! Autem et laboriosam mollitia, voluptates nisi?'
    });

    console.log()

    this.setState({ conversation: this.conversationList }, ()=>{
      this.animateChat((this.conversationList.length - 1));
    });



  }

  initialAnim = () =>{

    var initialAnim = new TimelineMax();

      initialAnim
        .to('.message h1', 0.5, {autoAlpha: 1, y: "-=20", ease: Power1.easeNone })
        .to('.message h2', 0.5, {autoAlpha: 1, y: "-=20", ease: Power1.easeNone })
        .to('.reply', 0.5, {autoAlpha: 1, y: "-=20", ease: Power1.easeNone });
  }

  animateChat = (index) =>{
    console.log(index)
    var animateChat = new TimelineMax();
    animateChat
      .to('.chat-list-wrapper li', 0.5, { y: "-=20", autoAlpha: 1, ease: Power1.easeNone })
      .to('.message'+index, 0.5, { y: "-=20", autoAlpha: 1, ease: Power1.easeNone })
      .to('.reply'+index , 0.5, { y: "-=20", autoAlpha: 1, ease: Power1.easeNone });


      TweenMax.to('#chat-box', 1.5, {
			scrollTo: {
				y: "+=60"
			},
			ease: Back.easeNone});

  }

  render() {

    return (
      <div className="container-fluid page dashboard-page">
        <div className="left-container">
          <div className="chat-wrapper">

            <div className="chat-box" id="chat-box">
              <ul className="chat-list-wrapper">

                 {this.state.conversation.map((value, index) => (

                    <li>
                      <div className={"message message"+index} dangerouslySetInnerHTML={{__html: value.message}}></div>
                      <div className={"reply reply"+index} dangerouslySetInnerHTML={{__html: value.reply}}></div>
                    </li>
                 ))}

              </ul>

            </div>

            <div className="chat-input-area">
              <input type="text" className="form-control" id="chat-text" />
              <button type="button" className="btn btn-primary chat-btn" onClick={this.sendChat}>Chat</button>
            </div>
          </div>

        </div>
        <div className="right-container">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore incidunt repellendus animi maiores minima neque nobis modi voluptate nemo qui blanditiis, distinctio cupiditate nihil! Autem et laboriosam mollitia, voluptates nisi?</p>
        </div>
      </div>
    )
  }
}

export default HomePage;
