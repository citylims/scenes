jQuery(document).ready(function($) {
  var mainColor = "#E5214A";
  var canvasHeight = window.innerHeight;
  var canvasWidth = window.innerWidth;
  var scene = new THREE.Scene();

  var aspect_ratio = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 10000);
  camera.position.z = 500;
  camera.position.set(600, 50,600);
  scene.add(camera);

  var renderer = new THREE.WebGLRenderer();
  var renderer = new THREE.CanvasRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  window.onresize = function() {
    var canvasHeight = window.innerHeight;
    var canvasWidth = window.innerWidth;
    camera.aspect = canvasWidth / canvasHeight;
  }

  var text3d = new THREE.TextGeometry("The Power of Words", {font: 'helvetiker'});
  var textMaterial = new THREE.MeshNormalMaterial({color: mainColor});
  var words = new THREE.Mesh(text3d, textMaterial);
  scene.add(words);


  var render = function() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
  render()
});
