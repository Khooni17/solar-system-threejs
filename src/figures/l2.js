import * as THREE from 'three';


export default () => {

    const scene = new THREE.Scene();   // сцена

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);  // камера
    camera.position.y = 40;
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer( {alpha: true});  // рендерер
    renderer.setSize(window.innerWidth, window.innerHeight); // размер приложения
    document.body.appendChild(renderer.domElement);  // хтмл

    // куб
    const cube_geometry = new THREE.CubeGeometry(100,100,100);
//    const cube_texture = new THREE.MeshBasicMaterial({color: 0x8aff8a});
    const cube_texture = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(cube_geometry, cube_texture);
    cube.position.y = 250;
    cube.position.z -= 150;
    cube.rotation.x += 0.6;

    // цилиндр
    const cylinder_geometry = new THREE.CylinderGeometry(50,50,200);
    const cylinder_texture = new THREE.MeshNormalMaterial();
    const cylinder = new THREE.Mesh(cylinder_geometry, cylinder_texture);
    cylinder.rotation.x += 0.25;
    cylinder.position.x += -200;

    // сфера
    const sphere_geometry = new THREE.SphereGeometry(100);
    const sphere_texture = new THREE.MeshNormalMaterial();
    const sphere = new THREE.Mesh(sphere_geometry, sphere_texture);
    sphere.position.x += 100;

    scene.add(cube);
    scene.add(cylinder);
    scene.add(sphere);


    const animate = function () {
        requestAnimationFrame(animate);

        cylinder.rotation.y += 0.02;
        cube.rotation.y -= 0.02;
        sphere.rotation.y -= 0.02;
        sphere.rotation.x -= 0.02;
        renderer.render(scene, camera);
    };

    animate();

}