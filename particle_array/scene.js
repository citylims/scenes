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
  var particles = [
    {
      color: "#F1DD3F",
      opacity: .75,
      size: 3,
      number: 500
    },
    {
      color: "#F92672",
      opacity: .55,
      size: 4,
      number: 1000
    },
    {
      color: "#2AA48E",
      opacity: .8,
      size: 2,
      number: 500
    },
  ]
  console.log(particles)
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
      var x = (Math.random() - 0.5 ) * 400;
      var y = (Math.random() - 0.5 ) * 400;
      var z = (Math.random() - 0.5 ) * 400;
      this.particles.vertices.push(new THREE.Vector3(x,y,z));
    }
  };

  function ParticleGalaxy(pArr) {
    this.systems = [];
    for (var i = 0; i < pArr.length; i++) {
      var customParticle = new ParticleMaterial(pArr[i].color, pArr[i].size, pArr[i].opacity);
      var pMaterial = customParticle.material;
      var customSystem = new ParticleSystem(pArr[i].number);
      var pSystem = customSystem.particles;
      var pObject = {
        material: pMaterial,
        system: pSystem
      };
      this.systems.push(pObject);
    }
  }

  var galaxy = new ParticleGalaxy(particles);
  console.log(galaxy);


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
