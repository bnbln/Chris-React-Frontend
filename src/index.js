import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { AnimatedSwitch } from 'react-router-transition';
import App from './scripts/App';
import Page from './scripts/Page';
import Header from './scripts/components/Header';
import Footer from './scripts/components/Footer';
import "index.scss";

  class Index extends Component {
    constructor(){
      super();
      this.state = {
        pages: []
      };
    }
    async componentDidMount() {
      const responseInfo = await fetch('https://chris.thesolu.com/wp-json/');
      const jsonInfo = await responseInfo.json();
      const responsePages = await fetch('https://chris.thesolu.com/wp-json/wp/v2/pages');
      const jsonPages = await responsePages.json();
      this.setState({ info: jsonInfo, pages: jsonPages, loaded: true });
    }

    render() {
      return(
        <Router>
          <div>

            <Route path="/" render={(props) => <Header {...props} info={this.state.info} />} />
            <AnimatedSwitch
              atEnter={{ opacity: 0 }}
              atLeave={{ opacity: 0 }}
              atActive={{ opacity: 1 }}
              className="switch-wrapper"
            >
              <Route path="/" exact render={(props) => <App {...props} />} />
              {console.log(this.state.pages)}
              {this.state.pages.map((index, i) =>
                <Route path={"/"+ index.slug} key={i} render={(props) => <Page {...props} pages={this.state.pages[i]}/>} />
              )}
              <Route path="/:slug" render={(props) => <Page {...props} />} />
            </AnimatedSwitch>
            <Route path="/" render={(props) => <Footer {...props} />} />
          </div>
        </Router>
      )
    }
  }

ReactDOM.render(
  <Index/>,
  document.getElementById("root")
);
registerServiceWorker();
