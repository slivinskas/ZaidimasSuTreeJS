var renderer = new THREE.WebGLRenderer();
var size = {
  width: window.innerWidth || document.body.clientWidth,
  height: window.innerHeight || document.body.clientHeight
}
renderer.setSize(size.width,size.height);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({color: randomHex()});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var directionalLight = new THREE.DirectionalLight(0xffffff, 1.125);
directionalLight.position.set( 1, 2, 0.5 );

directionalLight.position.normalize();
scene.add(directionalLight);

camera.position.x = 1;
camera.position.y = 0.75;
camera.position.z = 1.5;
camera.lookAt(new THREE.Vector3(0,0,0));

function render() {
  resize();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

var arrow = { left: 37, up: 38, right: 39, down: 40, w:87, a:65, s:83,d:68,f:70,k:75,l:76};
var delta = 0.05;
var xAxis = new THREE.Vector3(1,0,0);
var yAxis = new THREE.Vector3(0,1,0);

window.addEventListener('keydown', function(event) {
  event.preventDefault();
  switch (event.keyCode) {
    case arrow.left:
      camera.translateOnAxis(xAxis, -delta);
      break;
    case arrow.up:
      camera.translateOnAxis(yAxis, delta);
      break;
    case arrow.right:
      camera.translateOnAxis(xAxis, delta);
      break;
    case arrow.down:
      camera.translateOnAxis(yAxis, -delta);
      break;
    case arrow.k:
      camera.translateZ( - delta );
      break;
    case arrow.l:
      camera.translateZ(  delta );
      break;
    case arrow.w:
      camera.rotation.y -= delta;
      break;
    case arrow.a:
      camera.rotation.y += delta;
      break;
    case arrow.s:
      camera.rotation.x -= delta;
      break;
    case arrow.d:
      camera.rotation.x += delta;
      break;
  }
});

function resize() {
  var canvas = renderer.domElement;
  var width = canvas.clientWidth;
  var height = canvas.clientHeight;
  if (canvas.width !== width || canvas.height !== height) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}
function randomRange(min, max) {
  return ~~(Math.random() * (max - min + 1)) + min
}

function randomHex(){
    return Math.floor(Math.random()*16777215);/*.toString(16);*/
};
