var renderer = new THREE.WebGLRenderer();
  //and set the size to your window dimensions
    renderer.setSize(window.innerWidth, window.innerHeight );
  //if you want shadows this should be true
    renderer.shadowMapEnabled = true;
  //soften the shadows but slower
    renderer.shadowMapType = THREE.PCFSoftShadowMap;
  //actual background color
    renderer.setClearColor(0x000000,1);

// Append the renderer to your DOM Element of choice
    document.body.appendChild( renderer.domElement );
