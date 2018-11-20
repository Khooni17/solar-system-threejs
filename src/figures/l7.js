import * as THREE from 'three';
// система частиц


export default () => {
    let scene, camera, renderer;
    const init = (() => {
        scene = new THREE.Scene();   // сцена

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000000);  // камера
        camera.position.z = 1;

        renderer = new THREE.WebGLRenderer({alpha: true});  // рендерер
        renderer.setSize(window.innerWidth, window.innerHeight); // размер приложения
        document.body.appendChild(renderer.domElement);  // хтмл
    })();

    const starsGeometry = new THREE.Geometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xff0000,
        size: 1,
        sizeAttenuation: false
    });

    // заполнение звездами
    for(let i = 0; i < 5000; i++){
        const vertex = new THREE.Vector3(
            Math.random()*2-1,
            Math.random()*2-1,
            Math.random()*2-1
        );
        starsGeometry.vertices.push(vertex);
    }

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    const animate = () =>  {
        requestAnimationFrame(animate);


        renderer.render(scene, camera);
    };
    animate();


}