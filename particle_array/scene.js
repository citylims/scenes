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


  //particle arr
  var particles = new THREE.Geometry();
  //particle material
  var particleColor = "#F1DD3F";
  THREE.ImageUtils.crossOrigin = true;
  var pMaterial = new THREE.PointCloudMaterial({
    color: particleColor,
    size: 3,
    transparent:true,
    opacity:.75,
    map : THREE.ImageUtils.loadTexture(
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/61062/gradient.png"
    )
  });
  //push particle into array.
  for(var i=0; i<2000; i++){
    var x = (Math.random() - 0.5 ) * 400;
    var y = (Math.random() - 0.5 ) * 400;
    var z = (Math.random() - 0.5 ) * 400;
    particles.vertices.push(new THREE.Vector3(x,y,z));
  }
  // instanciate
  var particleSystem = new THREE.PointCloud(particles,pMaterial);
  scene.add(particleSystem);

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
