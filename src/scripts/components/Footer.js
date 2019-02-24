import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class Footer extends Component {
  constructor(props){
    super(props);
    this.state = {
      menu: []
    }
    }
    async componentDidMount() {
      const response = await fetch('https://chris.thesolu.com/wp-json/menus/footer');
      const json = await response.json();
      this.setState({ menu: json });
    }

  render() {
    return (
      <Grid container justify="center" style={{marginBottom: 20, marginTop: 20, zIndex: 1, position: "relative"}} className="footerMenu">
        {this.state.menu.map((item, i) =>
          <Button size="large" key={i} component={Link} to={item.url.substr(0 , 26) === "https://chris.thesolu.com/" ?
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

    );
  }
}

export default Footer;
