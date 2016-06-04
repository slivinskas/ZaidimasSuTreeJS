var camera, scene, renderer;
var geometry, material, mesh;
var boxes = Array();

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 2000;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(200, 200, 200);

    boxes[0] = = new THREE.BoxGeometry(200, 200, 200);
    boxes[1] = = new THREE.BoxGeometry(200, 200, 200);
    boxes[2] = = new THREE.BoxGeometry(200, 200, 200);

    material = new THREE.MeshBasicMaterial({
        color: 0x555555,
        wireframe: false
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

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
