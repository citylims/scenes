jQuery(document).ready(function($) {
  var mainColor = 0x009EF2;
  var canvasHeight = window.innerHeight;
  var canvasWidth = window.innerWidth;
  //scene
  var scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(mainColor, 0.002);
  //cam
  var camera = new THREE.PerspectiveCamera(75, canvasWidth/canvasHeight, 0.1, 1000);
  camera.lookAt(new THREE.Vector3(0,50,0));
  camera.position.set(0,50,200);
  //spotlight
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(0, 300, 300);
  spotLight.intensity = 1;
  spotLight.castShadow = true;
  scene.add(spotLight);
  //controls
  var controls = new THREE.OrbitControls(camera);
  controls.damping = 0.2;
  controls.enabled = true;
  controls.maxPolarAngle = Math.PI/2;
  controls.minPolarAngle = 1;
  controls.minDistance = 100;
  controls.maxDistance = 250;
  //renderer
  var renderer = new THREE.WebGLRenderer({ alpha: true});
  renderer.setSize(canvasWidth, canvasHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(mainColor, 1);
  $('body').append(renderer.domElement);
  //responsive
  window.onresize = function() {
    var canvasHeight = window.innerHeight;
    var canvasWidth = window.innerWidth;
    camera.aspect = canvasWidth / canvasHeight;
  }
  //terrain obj constructor
  function genesisDevice() {
    //base terrain
    this.geometry =  new THREE.PlaneGeometry(canvasWidth * 2, canvasHeight * 2, 128,128);
    //terrain material
    this.material = new THREE.MeshLambertMaterial({
      color: mainColor
    });
    //wireframe material
    this.wireMaterial = new THREE.MeshLambertMaterial({
      color: 0x000000,
      wireframe: true,
      transparent: true
    })
    //build terrain
    this.inception = function() {
      //plot terrain vertices
      for (var i = 0; i < this.geometry.vertices.length; i++) {
        if (i % 2 === 0 || i % 5 === 0 || i % 7 === 0) {
          var num = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
          this.geometry.vertices[i].z = Math.random() * num;
        }
      }
      //define terrain model
      this.terrain = new THREE.Mesh(this.geometry, this.material);
      this.wire = new THREE.Mesh(this.geometry, this.wireMaterial);
      //set position
      this.terrain.rotation.x = -Math.PI/2;
      this.terrain.position.y = -20;
      this.wire.rotation.x = -Math.PI/2;
      this.wire.position.y = -19.8;
      //config shadows
      this.terrain.recieveShadow = true;
      this.terrain.castShadow = true;
      //push into scene
      scene.add(this.terrain, this.wire);
      return this;
    }
    //define obj
    this.inception();
  }
  //pass genesis to global scope
  var terrain = genesisDevice();
  //render
  var render = function() {
    requestAnimationFrame(render);
    animation();
    renderer.render(scene, camera);
  }

  function animation() {
    scene.rotation.y -= .0005;
  }

  render();

});
