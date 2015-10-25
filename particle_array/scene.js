jQuery(document).ready(function($) {

  var color0 = "#151718"
  var main_color = color0;
  var canvas_height = window.innerHeight;
  var canvas_width = window.innerWidth;
  var scene = new THREE.Scene();

  //cam
  var camera = new THREE.PerspectiveCamera( 75, canvas_width/canvas_height, 0.1, 1000 );
  camera.position.set(0,50,200);
  camera.lookAt(new THREE.Vector3(0,50,0));

  //renderer
  var renderer = new THREE.WebGLRenderer({ alpha: true }); /// { alpha: true }
  renderer.setSize( canvas_width, canvas_height );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(main_color,1);
  document.body.appendChild( renderer.domElement );

  //window
  window.onresize = function(){
    canvas_height = window.innerHeight;
    canvas_width = window.innerWidth;
    camera.aspect = canvas_width / canvas_height;
    camera.updateProjectionMatrix();
    renderer.setSize( canvas_width, canvas_height );
  }

  //controls
  controls = new THREE.OrbitControls(camera);
  controls.damping = 0.2;
  controls.maxPolarAngle = Math.PI/2;
  controls.minPolarAngle = 1;
  controls.minDistance = 100;
  controls.maxDistance = 220;
  $('canvas').on( "mouseenter", function(e) {
  controls.enabled = true;
  });
  $('canvas').on( "mouseleave", function(e) {
  controls.enabled = false;
  });

  //lighting
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set( 0, 100, 100 );
  spotLight.intensity = 1;
  spotLight.castShadow = true;
  scene.add(spotLight);

  //particles
  THREE.ImageUtils.crossOrigin = true;

  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function Particles(num) {
    this.particleArray = []
    for (var i = 0; i < num; i ++) {
      var c = getRandomColor();
      var o = Math.floor(Math.random() * (100 - 0 + 1)) / 100;
      var s = Math.floor(Math.random() * ( 10 - 5 + 1)) + 5;
      var particleCount = Math.floor(Math.random() * (1000 - 250 + 1)) + 250;
      var particle = {
        color: c,
        opacity: o,
        size: s,
        number: particleCount
      }
      this.particleArray.push(particle);
    }
  }

  function ParticleMaterial(c, s, o) {
    this.material = new THREE.PointsMaterial({
      color: c,
      size: s,
      transparent:true,
      opacity: o,
      map: THREE.ImageUtils.loadTexture(
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/61062/gradient.png"
      )
    });
  }

  function ParticleSystem(number) {
    this.particles = new THREE.Geometry();
    for(var i=0; i < number; i++){
      var x = (Math.random() - 0.5 ) * 1100;
      var y = (Math.random() - 0.5 ) * 2300;
      var z = (Math.random() - 0.5 ) * 1100;
      this.particles.vertices.push(new THREE.Vector3(x,y,z));
    }
  };

  function ParticleUniverse(particles) {
    this.galaxies = [];
    var pArr = particles.particleArray;
    for (var i = 0; i < pArr.length; i++) {
      var customParticle = new ParticleMaterial(pArr[i].color, pArr[i].size, pArr[i].opacity);
      var pMaterial = customParticle.material;
      var customSystem = new ParticleSystem(pArr[i].number);
      var pSystem = customSystem.particles;
      var pObject = {
        material: pMaterial,
        system: pSystem
      };
      this.galaxies.push(pObject);
    }
  }

  function createUniverse(universe) {
    console.log(universe);
    var galaxies = universe.galaxies;
    console.log(galaxies);
    for (var i = 0; i < galaxies.length; i++) {
      var galaxy = new THREE.Points(galaxies[i].system,galaxies[i].material);
      console.log(galaxy);
      scene.add(galaxy);
    }
  };

  var particles = new Particles(30);
  var universe = new ParticleUniverse(particles);
  createUniverse(universe);

  //RENDER
  var render = function () {
    requestAnimationFrame( render );
    animation();
    renderer.render(scene, camera);
  };
  //animations
  function animation(){
    scene.rotation.y  -= .0005;
  };

  render();
});
