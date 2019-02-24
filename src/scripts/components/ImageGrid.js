import React from 'react';
import Gallery from 'react-photo-gallery';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {HotKeys} from 'react-hotkeys';
import ReactPlayer from 'react-player';
import CircularProgress from '@material-ui/core/CircularProgress';




class ImageGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    currentImage: 0,
    lightboxIsOpen: false,
    loadedVideo: false };
    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }
  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
      loadedVideo: false
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
      loadedVideo: false
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
      loadedVideo: false
    });
  }

  render() {
    const keyMap = {
    moveUp: 'left',
    }
    const handlers = {
      'moveUp': () => this.closeLightbox
    };
    var htmlDoc = document.getElementsByTagName("html");
    if (this.state.lightboxIsOpen === true) {
      htmlDoc[0].style = "overflow: hidden"

    } else {
      htmlDoc[0].style = "overflow: scroll"
    }

    var iosSafariVideo = document.getElementsByTagName("video");
    for (var i = 0; i < iosSafariVideo.length; i++) {
      iosSafariVideo[i].setAttribute("playsinline", "true");
    }
    return (
        this.props.photos ?
        <div>
            <Gallery photos={this.props.photos} onClick={this.openLightbox} direction={"row"}/>

              {this.state.lightboxIsOpen === true ?
                <div style={{
                    position: "fixed",
                    width: "100%",
                    height: "100vh",
                    top: "0px",
                    left: "0px",
                    paddig: "20px",
                    zIndex: 1000
                  }} >
                    {this.props.posts[this.state.currentImage] ?
                      this.props.posts[this.state.currentImage].format === "video" ?
                        this.props.posts[this.state.currentImage].acf ?
                          this.props.posts[this.state.currentImage].acf.video_file ?
                          <Grid container alignItems="center" justify="center" style={{
                              backgroundColor: "rgba(0,0,0,0.9)",
                              height: "100vh",
                              width: "100%",
                              overflowY: "scroll",
                              paddingTop: 100,
                              paddingBottom: 50,
                            }}>
                          <Grid item>
                            <ReactPlayer url={this.props.posts[this.state.currentImage].acf.video_file} height="80vh" width="100%" playing loop
                              style={{

                                  maxWidth: "100%",
                                  position: "relative",
                                  transform: "translateX("+ this.state.loadedVideo === true ? 0 : -800+"px)",
                                  transition: "0.3s ease-in-out",
                                  opacity: this.state.loadedVideo === true ? 1 : 0
                                }}
                                onPlay={() => {
                                  this.setState({
                                    loadedVideo: true
                                  })
                                  console.log("ready")
                                }}
                                playsinline
                                />
                              {this.state.loadedVideo === false ?
                                <CircularProgress style={{
                                    color: "white",
                                    position: "fixed",
                                    top: "48vh",
                                    left: "48%"
                                  }} />
                              : null}
                            </Grid>
                            </Grid>
                          : null
                        : null
                      : this.props.posts[this.state.currentImage].format === "standard" ?
                      <Grid container  justify="center" style={{
                          backgroundColor: "rgba(0,0,0,0.9)",
                          height: "100vh",
                          width: "100%",
                          overflowY: "scroll",
                          paddingTop: 100,
                          paddingBottom: 50,
                        }}>
                      <Grid item xs={8}>
                        {console.log(this.props.posts[this.state.currentImage])}
                        {this.props.posts[this.state.currentImage].better_featured_image ?
                          this.props.posts[this.state.currentImage].better_featured_image.source_url ?
                          console.log(this.props.posts[this.state.currentImage].better_featured_image.source_url)
                        : null
                        :null}
                        <div dangerouslySetInnerHTML={{__html: this.props.posts[this.state.currentImage].content.rendered}}
                          style={{
                            color: "white"
                          }}
                          ></div>

                      </Grid>
                      </Grid>
                      : null
                    : null}
                    <Grid item>
                      {this.props.children}
                    </Grid>

                  <HotKeys keyMap={keyMap} handlers={handlers}>

                  <Grid container style={{
                      position: "fixed",
                      width: "100%",
                      top: "0px",
                      padding: "20px",
                      left: "0px",
                      tIndex: 1000,
                      backgroundColor: "rgba(27,27,27,0.44)",
                    }} justify="center">
                    <Grid item>
                      <Button onClick={this.closeLightbox} style={{color: "white"}}>Close</Button>
                    </Grid>
                    {this.props.posts[this.state.currentImage  - 1 ] ?
                      <Grid item>
                        <Button onClick={this.gotoPrevious} style={{color: "white"}}>Previous</Button>
                      </Grid>
                      : null}
                    {this.props.posts[this.state.currentImage  + 1 ] ?
                      <Grid item>
                        <Button onClick={this.gotoNext} style={{color: "white"}}>Next</Button>
                      </Grid>
                      : null}

                  </Grid>
                  </HotKeys>
                </div>
                :null}
        </div>
      : null
    )
  }
}

export default ImageGrid;
