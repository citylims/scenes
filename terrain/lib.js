jQuery(document).ready(function($) {
  var mainColor = 0x33FFFF;
  var canvasHeight = window.innerHeight;
  var canvasWidth = window.innerWidth;

  var scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(mainColor, 0.005);

  var camera = new THREE.PerspectiveCamera(75, canvasWidth/canvasHeight, 0.1, 1000);
  camera.lookAt(new THREE.Vector3(0,50,0));
  camera.position.set(0,50,200);

  var controls = new THREE.OrbitControls(camera);
  controls.damping = 0.2;
  controls.enabled = true;
  controls.maxPolarAngle = Math.PI/2;
  controls.minPolarAngle = 1;
  controls.minDistance = 100;
  controls.maxDistance = 250;

  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(0, 100, 100);
  spotLight.intensity = 1;
  spotLight.castShadow = true;
  scene.add(spotLight);

  var renderer = new THREE.WebGLRenderer({ alpha: true});
  renderer.setSize(canvasWidth, canvasHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(mainColor, 1);
  $('body').append(renderer.domElement);

  window.onresize = function() {
    var canvasHeight = window.innerHeight;
    var canvasWidth = window.innerWidth;
    camera.aspect = canvasWidth / canvasHeight;
  }

  function genesisDevice() {
    this.geometry =  new THREE.PlaneGeometry(canvasWidth * 2, canvasHeight * 2, 128,128);

    this.material = new THREE.MeshLambertMaterial({
      color: mainColor
    });

    this.wireMaterial = new THREE.MeshLambertMaterial({
      color: 0x000000,
      wireframe: true,
      transparent: true
    })

    console.log(this.wireMaterial);

    this.inception = function() {
      //plot terrain vertices
      for (var i = 0; i < this.geometry.vertices.length; i++) {
        this.geometry.vertices[i].z = Math.random() * 20;
      }
      //define terrain model
      this.terrain = new THREE.Mesh(this.geometry, this.material);
      this.wire = new THREE.Mesh(this.geometry.clone(),this.wireMaterial);
      //set position
      this.terrain.rotation.x = -Math.PI/2;
      this.terrain.position.y = -20;
      //push into scene
      scene.add(this.terrain, this.wire);
      return this;
    }

    this.inception();
  }

  //pass terrainObj to global scope
  var terrain = genesisDevice();

  var render = function() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  render();

});
