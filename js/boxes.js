var camera, scene, renderer;
var geometry, material, mesh;
var boxes = Array();
var meshes = Array();

var arrow = { left: 37, up: 38, right: 39, down: 40 };
var delta = 0.05;
var xAxis = new THREE.Vector3(1,0,0);
var yAxis = new THREE.Vector3(0,1,0);
var speed = 1;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 2000;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(200, 200, 200);

    boxes[0]  = new THREE.BoxGeometry(200, 200, 200);
    boxes[1]  = new THREE.BoxGeometry(200, 200, 200);
    boxes[2]  = new THREE.BoxGeometry(200, 200, 200);

    texture = THREE.ImageUtils.loadTexture('img/grass-free-texture.jpg', {}, function() {
        renderer.render(scene);
    }),

    material = new THREE.MeshBasicMaterial({map: texture});
  /*  material = new THREE.MeshBasicMaterial({
        color: randomHex(),
      //  wireframe: false
    });/**/

    mesh = new THREE.Mesh(geometry, material);

    var i = 0;
    for(i = 0; i < 3; i++){
        meshes[i] = new THREE.Mesh(boxes[i], new THREE.MeshBasicMaterial({
            color: randomHex(),
        }));
        scene.add(meshes[i]);
        meshes[i].position.set( randomRange(-3,3)*200, randomRange(-3,3)*300, randomRange(-3,3)*300 );
    }

    camera.position.x = 1;
    camera.position.y = 1;
    camera.position.z = 1;
    camera.lookAt(new THREE.Vector3(0,0,0));



    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);



}





function animate() {

    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render(scene, camera);

}


function randomRange(min, max) {
  return ~~(Math.random() * (max - min + 1)) + min
}

function randomHex(){
    return Math.floor(Math.random()*16777215);/*.toString(16);*/
};
