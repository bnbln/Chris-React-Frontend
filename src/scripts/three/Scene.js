import React, { Component } from 'react'
import * as THREE from 'three'
import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader'
import path from 'path';


OBJLoader(THREE);


class Scene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      x: 0,
      y: 0,
      mouse: false,
      reverse: false
    };
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  _onMouseMove(e) {
    this.setState({ x: e.screenX, y: e.screenY, mouse: true });
  }
  _onMouseOut() {
    this.setState({  mouse: false });
  }
  updateDimensions(camera, renderer) {
    this.setState({
      width: window.innerWidth
    })
    camera.aspect = this.mount.clientWidth / this.mount.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
  }

  componentDidMount() {
    const width = this.state.width
    const height = this.mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      100,
      width / height,
      0.1,
      1000
    )
    camera.position.set(0,0,2)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor('#ffffff')
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(width, height)

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshLambertMaterial({ color: '#878787' })
    const cube = new THREE.Mesh(geometry, material)
    //scene.add(cube)

    const light = new THREE.PointLight(0xffffff, 1, 4000);
    light.position.set(-100, 10, 10);
    const light_two = new THREE.PointLight(0xffffff, 1, 4000);
    light_two.position.set(-100, 800, 800);
    const lightAmbient = new THREE.AmbientLight(0x404040);
    scene.add(light, light_two, lightAmbient);

    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();
    mtlLoader.load('untitled.mtl', (materials) => {
      materials.preload()
      objLoader.setMaterials(materials)
      objLoader.load('untitled.obj', (object) => {
        object.position.set(0,0,0);
        object.rotation.y = 0;
        scene.add(object);

      })
    })

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material
    this.cube = cube

    this.mount.appendChild(this.renderer.domElement)
    this.start()
    window.addEventListener("resize", this.updateDimensions(camera, renderer));
    console.log(this.scene);

  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId)
  }

  animate() {
    if (this.scene.children[3]) {
      if (this.state.x && this.state.y && this.state.mouse === true) {
        this.scene.children[3].rotation.y = (this.state.x - (this.state.width / 2)) * 0.001
      }
      if (this.state.mouse === false) {
        if (this.scene.children[3]) {
          this.cube.rotation.y=0;
        }
      }
    }
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    console.log(__dirname +"assets/");
    return (
        <div
          style={{ width: this.state.width, height: '400px' }}
          ref={(mount) => { this.mount = mount }}
          onMouseMove={this._onMouseMove.bind(this)}
          onMouseLeave={this._onMouseOut.bind(this)}
        />

    )
  }
}

export default Scene
