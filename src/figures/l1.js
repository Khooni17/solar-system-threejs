import * as THREE from 'three';
export default () => {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.y = 40;
    camera.position.z = 200;
    const renderer = new THREE.WebGLRenderer( {alpha: true});

    renderer.setSize(window.innerWidth, window.innerHeight); // размер приложения
    document.body.appendChild(renderer.domElement);

    const line_geometry = new THREE.Geometry();    // фигура
    line_geometry.vertices.push(new THREE.Vector3(0,0,0));
    line_geometry.vertices.push(new THREE.Vector3(0,40,0));


    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xccc,
        linewidth: 20,
        opacity: 0.9
    });
    const line = new THREE.Line(line_geometry, lineMaterial);   // обьект

    scene.add(line);



    const geometry = new THREE.PlaneGeometry(window.innerWidth/window.innerHeight);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/2));
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff
    });

    const plane = new THREE.Mesh(geometry, material);

    scene.add(plane);

    const animate = () => {
        requestAnimationFrame(animate);

        line.rotation.z += 0.01;
        line.rotation.y += 0.01;

        renderer.render(scene, camera);
    };

    animate();


};