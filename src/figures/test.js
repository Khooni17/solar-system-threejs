import * as THREE from 'three';
const OrbitControls = require('../../src/figures/orbitControl')(THREE);

export default () => {
    var scene, camera, renderer, mesh, mesh1, controls;
    var meshFloor, ambientLight, light;

    function init() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(90, 1280 / 720, 0.1, 1000);
        controls = new OrbitControls(camera);
        mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshPhongMaterial({
                map: new THREE.ImageUtils.loadTexture('textures/mars.jpg')
            })
        );

        mesh1 = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshPhongMaterial({
                map: new THREE.ImageUtils.loadTexture('textures/mars.jpg')
            })
        );

        mesh.position.y += 1;
        mesh1.position.y += 2.5;
        // The cube can have shadows cast onto it, and it can cast shadows
        mesh.receiveShadow = true;
        mesh1.receiveShadow = true;
        mesh.castShadow = true;
        mesh1.castShadow = true;
        scene.add(mesh);
        scene.add(mesh1);

        meshFloor = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10, 10, 10),
            // MeshBasicMaterial does not react to lighting, so we replace with MeshPhongMaterial
            new THREE.MeshPhongMaterial({
                map: new THREE.ImageUtils.loadTexture('textures/mars.jpg')
            })
            // See threejs.org/examples/ for other material types
        );
        meshFloor.rotation.x -= Math.PI / 2;
        // Floor can have shadows cast onto it
        meshFloor.receiveShadow = true;
        scene.add(meshFloor);


        // LIGHTS
        ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);

        light = new THREE.PointLight(0xffffff, 0.8, 18);
        light.position.set(0, 10, 0);
        light.castShadow = true;
        // Will not light anything closer than 0.1 units or further than 25 units
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 25;
        scene.add(light);


        camera.position.set(2, 2, 5);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(1280, 720);

        // Enable Shadows in the Renderer
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.BasicShadowMap;
        document.body.appendChild(renderer.domElement);

        animate();
    }

    function animate() {
        requestAnimationFrame(animate);

        mesh.rotation.x += 0.01;
        mesh1.rotation.x += 0.01;
        mesh.rotation.y += 0.02;
        mesh1.rotation.y += 0.02;

        controls.update();
        renderer.render(scene, camera);
    }




    window.onload = init;
}