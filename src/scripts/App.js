import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import ReactPlayer from 'react-player';
import sizeMe from 'react-sizeme';
import ImageGrid from "./components/ImageGrid"


class App extends Component {
  constructor(props){
    super(props);
    this.divElement = React.createRef();
    this.state = {
      posts: [],
      hasMore: false,
      page: 1,
      open: false,
      active: null,
      loaded: false,
      scroll: 0
    };
    this.updateDimensions = this.updateDimensions.bind(this);
    this.loadMore = this.loadMore.bind(this);

  }
  updateDimensions() {
    this.setState({
      scroll: window.scrollY
    })
    if (this.state.scroll > window.innerHeight) {
      if (this.state.scroll > document.body.offsetHeight - window.innerHeight ) {
        console.log("loading more posts...");
        this.loadMore(this.state.page)
      }
    }
  }
  async componentDidMount() {
    const response = await fetch('https://chris.thesolu.com/wp-json/wp/v2/posts?per_page=99');
    const json = await response.json();
    this.setState({ posts: json, loaded: true });

    if (this.state.posts.length > 8) {
      this.setState({hasMore: true})
    }
    const height = this.divElement.clientHeight;
    this.setState({ height });

    window.addEventListener('scroll', this.updateDimensions)
  }
  handleOpen = () => {
    this.setState({  });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.updateDimensions);
  }
  loadMore(page) {
    this.setState({page: page + 8})
  }

  render() {
    const {
    } = this.props;
    const photostring = []
    this.state.posts.slice(0, 8 + this.state.page ).map((post,i) =>
      post.better_featured_image ?
        photostring.push(
          {
            src: post.better_featured_image.source_url,
            width: post.acf ?
                    post.acf.format === "16x9" ? 16
                    : post.acf.format === "Quadrat" ? 1
                      : post.acf.format === "4x3" ? 4
                    : post.better_featured_image.media_details.width
                  : post.better_featured_image.media_details.width,
            height: post.acf ?
                    post.acf.format === "16x9" ? 9
                    : post.acf.format === "Quadrat" ? 1
                      : post.acf.format === "4x3" ? 3
                    : post.better_featured_image.media_details.height
                  : post.better_featured_image.media_details.height,
            key: "key-"+i+"",
            post
          }
      )
      : null
    )
    console.log(this.state);
    console.log(photostring);
    return (
      <div ref={this.divElement}>

        <Grid container justify="center" spacing={8}>
          {photostring[0] ?
            photostring[0].src ?
              <ImageGrid photos={photostring} posts={this.state.posts}/>
              :null
            : null}

            <Grid item xs={12}>
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
                onClose={this.handleClose}
                >
                {this.state.active ?
                  <Grid container justify="center" alignItems="center" style={{height: "100vh",pointerEvents: "none"}}>
                    <Grid item xs={11} sm={9}>
                      <ReactPlayer
                        url={this.state.active.acf.video_file}
                        playing={true}
                        loop
                        muted
                        width="100%"
                        height="100"
                        />
                    </Grid>
                  </Grid>
                  : null}
                </Modal>
              </Grid>
            </Grid>
          </div>
        );
      }
    }

    export default sizeMe()(App);
