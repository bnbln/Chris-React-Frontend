import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';


class Page extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
    this.fetchPageData = this.fetchPageData.bind(this)
  }
  componentDidMount() {
    var page = this.props.pages;
    if (page) {
      if (page.slug) {
        console.log("props: ",page.slug);
        this.fetchPageData(page.slug);

      }

    }

  }

  fetchPageData(slug) {
    fetch("https://chris.thesolu.com/wp-json/wp/v2/pages?slug="+ slug +"")
    .then(res => res.json())
    .then(json => this.setState({ data: json }));
  }
  render() {

    console.log("data: ",this.state.data);

    return (
      <Grid container justify="center" style={{minHeight: "100vh"}}>

          {this.state.data.map((data,i) =>
            <Grid item xs={11} md={7} key={i}>
          <div dangerouslySetInnerHTML={{__html: data.content.rendered}}></div>
          </Grid>
          )}

      </Grid>

    );
  }
}

export default Page;
