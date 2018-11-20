import * as THREE from 'three';
export default () => {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight); // размер приложения
    document.body.appendChild(renderer.domElement);

    // геометрия куба
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

    // геометрия линии
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( -10, -10, 0) );
    geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );
    geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
    geometry.vertices.push(new THREE.Vector3( 10, 10, 0) );
    geometry.vertices.push(new THREE.Vector3( 0, 0, 10) );

    // линия
    var line = new THREE.Line( geometry, material );

    const material = new THREE.LineBasicMaterial({color: 0xfff});
    const cube = new THREE.Mesh(cubeGeometry, material);
    scene.add(cube, 1, 1, 1);

    camera.position.z = 3;

    const animate = function () {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    };

    animate();
};