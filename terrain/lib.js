var canvas_height = window.innerHeight;
var canvas_width = window.innerWidth;

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, canvas_width/canvas_height, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({ alpha: true});
renderer.setSize(canvas_width, canvas_height);
renderer.shadowMapEnabled = true;
renderer.shadowMapType = THREE.PCFSoftShadowMap;
renderer.setClearColor(0x33FFFF, 1);
$('body').append(renderer.domElement);

window.onresize = function() {
  var canvas_height = window.innerHeight;
  var canvas_width = window.innerWidth;
  camera.aspect = canvas_width / canvas_height;
}

function genesisDevice() {
  this.geometry = new THREE.PlaneGeometry(canvas_width * 2, canvas_height, 128, 128);
  this.material = new THREE.MeshLambertMaterial({
    color: 0x000000,
    wireframe: true,
    transparent: true
  })
  this.wire = null;

}

gensisDevice();
