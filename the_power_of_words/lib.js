jQuery(document).ready(function($) {
  var mainColor = "#E5214A";
  var canvasHeight = window.innerHeight;
  var canvasWidth = window.innerWidth;
  var scene = new THREE.Scene();

  var aspect_ratio = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 10000);
  camera.position.set(200,50,300);
  scene.add(camera);


  var renderer = new THREE.CanvasRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  window.onresize = function() {
    var canvasHeight = window.innerHeight;
    var canvasWidth = window.innerWidth;
    camera.aspect = canvasWidth / canvasHeight;
  }

  //seed vars
  var wordsArr = ["The", "Power", "Of", "Words"];
  var font = "helvetiker";

  function scribe3d(arr, font) {
    console.log(arr);
    this.textIndex = [];
    for (var i = 0; i < arr.length; i++) {
      var color = getRandomColor();
      var text = new THREE.TextGeometry(arr[i], {font: font});
      var material = new THREE.MeshNormalMaterial({color: color});
      var mesh = new THREE.Mesh(text, material);

      this.textIndex.push(mesh);
    }

    function getRandomColor() {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

  }

  var text3d = new scribe3d(wordsArr);
  var factoryText = text3d.textIndex;

  thePowerOfWords(factoryText);

  function thePowerOfWords(arr) {
    if (arr.length) {
      for (var i = 0; i < arr.length; i++) {
        console.log(arr[i])
        scene.add(arr[i]);
        var genX = genRange(-200, 200);
        var genY = genRange(-100, 100);
        var genZ = genRange(-600, 100);
        arr[i].position = new THREE.Vector3(genX, genY, genZ);
        console.log(arr[i].position);
      }
    }

    function genRange(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  }//

  var render = function() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
  render()
});
