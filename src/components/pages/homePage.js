import React, { Component } from "react";
import {TweenMax, TimelineMax, Power1, Back, CSSPlugin, ScrollToPlugin, Draggable, Elastic} from "gsap/all";

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'



class HomePage extends React.Component {



conversationList: [];


  constructor(props) {
    super(props);

    this.state={
      numbers : [1, 2, 3, 4, 5],
      conversation: [],
      isTop: false,
      questionText: ''
    }


  }

  componentDidMount(){

      this.conversationList = [{
        message: "<h1>Hi I'm FINN</h1><h2>An AI assistant and react chat bot</h2><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore incidunt repellendus animi maiores minima neque nobis modi voluptate nemo qui blanditiis, distinctio cupiditate nihil! Autem et laboriosam mollitia, voluptates nisi?'</p>",

        reply: ''
      }]

    this.setState({ conversation: this.conversationList }, () =>{
      this.animateChat(0);
    });




  }


  sendChat = () =>{

    this.conversationList.push({
      message: this.state.questionText,
      reply: ""
    });

    this.setState({ conversation: this.conversationList }, ()=>{
      this.animateChat((this.conversationList.length - 1));
    });

    fetch("/ask", {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ input: this.state.questionText }),
      })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)


          this.conversationList[(this.conversationList.length - 1)].reply = result.output.generic[0].text;

          this.setState({ conversation: this.conversationList }, ()=>{

            var animateChat = new TimelineMax();
            animateChat
              .to('.chat-list-wrapper li', 0.5, { top: "-=50", autoAlpha: 1, ease: Power1.easeNone })
              .to('.left-container', 0.7, { 'margin-left': "15",  ease: Power1.easeNone })
              .to('.left-container', 0.3, { width : "40%",  ease: Power1.easeNone })

            if( parseInt(document.getElementById("chat-list-wrapper").style.top, 10) < 50){
                this.setState({ isTop: true });
            }

            this.scrollDown();

          });

        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {

        }
      )

    //setTimeout(function() {



    //}.bind(this), 1000);

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
    var val = 0;

    if (!this.state.isTop) {
      val =  "-=50"
    }else{
      val = '0'
    }

    animateChat
      .to('.chat-list-wrapper ', 0.5, { top: val, autoAlpha: 1, ease: Power1.easeNone })
      .to('.message'+index, 0.5, { y: "-=20", autoAlpha: 1, ease: Power1.easeNone })
      .to('.reply'+index , 0.5, { y: "-=20", autoAlpha: 1, ease: Power1.easeNone });

      this.scrollDown();
  }

  getChat = (event) =>{
    this.setState({ questionText: event.target.value });
  }

  scrollDown = () =>{
    TweenMax.to('.chat-box', 1.5, { scrollTo: { 	y: "+=60" }, ease: Back.easeNone});
  }

  onEnterPress = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();

      if (this.state.questionText != '') {
        this.sendChat();
        this.setState({ questionText: '' });
      }

    }
  }


  render() {

    return (
      <div className="container-fluid page dashboard-page">
        <div className="left-container centered-content">
          <div className="chat-wrapper">

            <PerfectScrollbar className="chat-box" id="chat-box">

                <ul className="chat-list-wrapper" id="chat-list-wrapper">

                   {this.state.conversation.map((value, index) => (

                      <li>
                        <div className={"message message"+index} dangerouslySetInnerHTML={{__html: value.message}}></div>
                        <div className={"reply reply"+index} dangerouslySetInnerHTML={{__html: value.reply}}></div>
                      </li>
                   ))}

                </ul>

            </PerfectScrollbar>

            <div className="chat-input-area">
              <input type="text" className="form-control" value={this.state.questionText} id="chat-text" onChange={this.getChat} onKeyDown={this.onEnterPress} />
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
