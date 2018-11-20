import * as THREE from 'three';

const OrbitControls = require('../../src/figures/orbitControl')(THREE);

export default () => {
    var scene, camera, renderer;

    const init = (() => {
        scene = new THREE.Scene();   // сцена

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);  // камера
        camera.position.y = 0;
        camera.position.z = 30;

        renderer = new THREE.WebGLRenderer({alpha: true});  // рендерер
        renderer.setSize(window.innerWidth, window.innerHeight); // размер приложения
        document.body.appendChild(renderer.domElement);  // хтмл
    })();

    let controls = new OrbitControls(camera);
    // LIGHTS
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    //scene.add(ambientLight);

    let light = new THREE.PointLight(0xffffff, 0.8, 180);
    light.position.set(5, 20, 0);
    light.castShadow = true;
    // Will not light anything closer than 0.1 units or further than 25 units

    light.power = light.intensity * 10*Math.PI;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    scene.add(light);

    scene.add(light);

    // mesh
    const earth = new THREE.Mesh(
        new THREE.SphereGeometry(5,60,60),
        new THREE.MeshPhongMaterial({
            map: new THREE.ImageUtils.loadTexture('textures/earth.jpg')
        }));
    earth.castShadow = true;
    earth.receiveShadow = true;
    scene.add(earth);

    const animate = function () {
        requestAnimationFrame(animate);

        controls.update();
        renderer.render(scene, camera);
    };

    animate();
}