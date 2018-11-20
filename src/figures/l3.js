import * as THREE from 'three';


export default () => {

    const scene = new THREE.Scene();   // сцена

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);  // камера
    camera.position.y = 0;
    camera.position.z = 600;

    const renderer = new THREE.WebGLRenderer({alpha: true});  // рендерер
    renderer.setSize(window.innerWidth, window.innerHeight); // размер приложения
    document.body.appendChild(renderer.domElement);  // хтмл



    const sphere_geometry = new THREE.SphereGeometry(30);
    const sphere_texture = new THREE.MeshNormalMaterial();
    const group = new THREE.Object3D();

    for(let i = 0; i < 100; i++){
        let sphere = new THREE.Mesh(sphere_geometry, sphere_texture);
        sphere.position.x += Math.random()*800-200;
        sphere.position.y += Math.random()*800-200;
        sphere.position.z += Math.random()*900-200;
        group.add(sphere);
    }

    scene.add(group);




    const animate = function () {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    };

    animate();
}