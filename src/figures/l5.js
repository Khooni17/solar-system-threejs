import * as THREE from 'three';
// движение по окружности

const OrbitControls = require('../../src/figures/orbitControl')(THREE);

export default () => {
    var scene, camera, renderer;

    const init = () => {
        scene = new THREE.Scene();   // сцена

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);  // камера
        camera.position.y = 0;
        camera.position.z = 300;

        renderer = new THREE.WebGLRenderer({alpha: true});  // рендерер
        renderer.setSize(window.innerWidth, window.innerHeight); // размер приложения
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
        document.body.appendChild(renderer.domElement);  // хтмл
    };
    init();


    var light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 10, 0);
    light.castShadow = true;            // default false
    scene.add(light);


    const earth_geometry = new THREE.SphereGeometry(70,100,100);
    const earth_texture = new THREE.Texture();



    var loader = new THREE.ImageLoader();

    loader.load(
        'textures/earth.jpg',

        // onLoad callback
        ( image ) => {
            // use the image, e.g. draw part of it on a canvas
            earth_texture.image = image;
            earth_texture.needsUpdate = true;
        },

        // onProgress callback currently not supported
        undefined,

        // onError callback
        () => {
            console.error( 'An error happened.' );
        }
    );




    const earth_material = new THREE.MeshBasicMaterial({
        map: earth_texture,
        overdraw: true
    });


    const earth = new THREE.Mesh(earth_geometry, earth_material);
    earth.castShadow = true;
    earth.position.x = 0;
    earth.position.y = 0;
    earth.position.z = 0;

    scene.add(earth);
    let angle = 0;


    let controls = new OrbitControls( camera );
    const animate = function () {
        requestAnimationFrame(animate);

        //earth.rotation.y += 0.01;
        earth.position.x += 3*Math.sin(angle);
        earth.position.z += Math.cos(angle);
        angle += Math.PI/180*2;

        renderer.render(scene, camera);

        controls.update();
    };

    animate();
}