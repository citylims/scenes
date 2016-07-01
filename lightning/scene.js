var Lightning = function(selector, data, images, opts) {

  var container;
  var camera, scene, renderer, composer;
  var has_gl = false;
  var delta;
  var time;
  var oldTime;
  var mesh, pmesh;
  var width = $(selector).width();
  var height = width;

  function init() {

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x000000, 20, 200 );

    camera = new THREE.PerspectiveCamera( 70, width / height, 1, 10000 );
    camera.position.z = -50;
    camera.lookAt(scene.position);
    scene.add( camera );

    var pg = new THREE.PlaneGeometry(170,10,80,1);

    for ( i = 0, il = pg.vertices.length; i < il; i ++ ) {
      pg.vertices[ i ].z = (4+(i/15)) * Math.cos( i/5 );
      pg.vertices[ i ].y = (6+(i/30)) * Math.sin( i/5 );
    }

    var mat = new THREE.MeshBasicMaterial({wireframe: true, color: 0xb2ffd8});
    mesh = new THREE.Mesh(pg, mat);
    mesh.rotation.x = -Math.PI/2;
    scene.add(mesh);

    var vertices = pg.vertices;
    var vl = vertices.length;

    var geometry = new THREE.Geometry();
    var vertices_tmp = [];

    for ( i = 0; i < vl; i ++ ) {
      p = vertices[ i ];

      geometry.vertices[ i ] = p.clone();
      vertices_tmp[ i ] = [ p.x, p.y, p.z, 0, 0 ];
    }


//        var material = new THREE.ParticleBasicMaterial( { color: 0xb2ffd8, depthTest:false, size: 5, blending: THREE.NormalBlending } );

    pmesh = new THREE.ParticleSystem( geometry);
    scene.add(pmesh);

    // renderer
    renderer = new THREE.WebGLRenderer({antialias: false});
    renderer.setSize( width, height );
    renderer.setClearColorHex( 0xFFFFFF, 1 );
    renderer.autoClear = false;
    $(selector)[0].appendChild( renderer.domElement );
    has_gl = true;


  }

  function animate() {
    requestAnimationFrame( animate );
    render();
  }

  function render() {
    time = new Date().getTime();
    delta = time - oldTime;
    oldTime = time;
    if (isNaN(delta) || delta > 1000 || delta == 0 ) {
      delta = 1000/60;
    }

    mesh.rotation.x += 0.02+Math.abs( Math.sin(time/3000) )/40;
    pmesh.rotation.x = mesh.rotation.x;

    mesh.scale.y = Math.cos(time/2500)*2.0;
    pmesh.scale.y = mesh.scale.y;

    // // if (has_gl) {
    // //     renderer.clear();
    // //     composer.render();
    // // }

    renderer.clear();
    renderer.render(scene, camera);
  }
  init();
  animate();
}

module.exports = Lightning;
