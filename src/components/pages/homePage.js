import React, { Component } from "react";

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

    this.setState({ conversation: this.conversationList });

    // this.conversationList.push({
    //   message: 'Lorem ',
    //   reply: 'Lorem ipsum dolor'
    // })

  }

  render() {

    return (
      <div className="container-fluid page dashboard-page">
        <div className="left-container">
          <div className="chat-wrapper">

            <div className="chat-box">
              <ul>

                 {this.state.conversation.map((value, index) => (
                    <li>
                      <div className="message" dangerouslySetInnerHTML={{__html: value.message}}></div>
                      <div className="reply" dangerouslySetInnerHTML={{__html: value.reply}}></div>
                    </li>
                 ))}

              </ul>

            </div>

            <div className="chat-input-area">
              <input type="text" className="form-control" id="chat-text" />
              <button type="button" className="btn btn-primary chat-btn">Chat</button>
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
