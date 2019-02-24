import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {ReactTitle} from 'react-meta-tags';
import sizeMe from 'react-sizeme';
import Scene from "../three/Scene";
import igSvg from "../../assets/instagram.svg"

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      menuopen: false,
      menu: [],
      social: []
    }
    }
    async componentDidMount() {
      const response = await fetch('https://chris.thesolu.com/wp-json/menus/header');
      const json = await response.json();
      this.setState({ menu: json });
      const responseSocial = await fetch('https://chris.thesolu.com/wp-json/menus/social');
      const jsonSocial = await responseSocial.json();
      this.setState({ social: jsonSocial });

      var value = "; " + document.cookie;
      var parts = value.split("; " + "useCookies" + "=");
      if (parts.length == 2)
       var result = parts.pop().split(";").shift();
       if (result === "true") {
          this.setState({cookies: true});
       }
    }

  render() {
    const {
      size: {
        width
      }
    } = this.props;
    if (this.state.cookies) {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-126668979-4');
    }
    return (
      <Grid container justify="center" style={{marginBottom: 20}}>
        <ReactTitle title={this.props.info ? this.props.info.name +" - "+this.props.info.description : null} />
        {this.state.cookies ?
          null
          :
          <div className="cookieBanner">
            <p style={{display: "inline"}}><b>Diese Seite nutzt Cookies  </b></p>
            <Link to={"/privacy-policy"} style={{paddingLeft: 10, paddingRight: 30}}>Mehr dazu</Link>
            <Button variant="contained" onClick={() => {
              document.cookie = "useCookies=true";
              this.setState({cookies: true})
            }}>
              Zustimmen
            </Button>
          </div>
        }
        <Scene />
        <Grid item xs={12}>
          <Grid container justify="center">
            {this.props.info ?
              <div style={{
                  display: "none"
                }}>
                <h1>{this.props.info.name}</h1>
                <h5 style={{textAlign: "center"}}>{this.props.info.description}</h5>
              </div>

              : null}
          </Grid>
          <Grid container justify="center" className="headerMenu">
              {this.state.menu.map((item, i) =>
                <Button size="large" key={i} component={Link}
                  style={{marginLeft: "17px"}}
                  to={item.url.substr(0 , 26) === "https://chris.thesolu.com/" ?
                 "/" + item.url.substr(26).slice(0,-1)
                 : item.url === "https://christophhalstenberg.com" ?
                  "/"
                 : item.url} onClick={() => {
                   window.scrollTo({
                      top: 400,
                      behavior: 'smooth'
                    });
                 }}>
                    {item.title}
                </Button>
              )}
          </Grid>
          <Grid container justify="center" className="headerMenu">
            {this.state.social.map((item, i) =>
              <a href={item.url} key={i}>
                {item.title === "Instagram" ?
                <Button size="large">
                  <img src={igSvg} style={{width: "15px"}}></img>
                </Button>
                :
                <Button size="large">
                  {item.title}
                </Button>}
              </a>
              )}

          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default sizeMe()(Header);
