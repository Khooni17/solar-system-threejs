import * as THREE from 'three';
// SpotLight


export default () => {
    let scene, camera, renderer;

    const init = () => {
        scene = new THREE.Scene();   // сцена

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);  // камера
        camera.position.y = 10;
        camera.position.z = 400;

        renderer = new THREE.WebGLRenderer({alpha: true});  // рендерер
        renderer.shadowMap.enabled = true;  // тени
        renderer.shadowMap.type = THREE.PCFShadowMap;
        renderer.setSize(window.innerWidth, window.innerHeight); // размер приложения
        document.body.appendChild(renderer.domElement);  // хтмл
    };
    init();


    const earth_geometry = new THREE.SphereGeometry(70,100,100);



    // свет SpotLight
    const light = new THREE.PointLight();
    light.castShadow = true;            // default false
    scene.add( light );
    light.position.set(-250,250,0);

    const sphereGeometry = new THREE.SphereBufferGeometry( 10, 32, 32 );
    const sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xfff } );
    const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    sphere.castShadow = true; //default is false
    sphere.receiveShadow = false; //default
    sphere.position.y = -50;
    scene.add( sphere );


    // поверхность
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(600,600,100,100),
        new THREE.MeshLambertMaterial({
            color: 0xfff
        })
    );
    plane.position.y = -85;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI/2;


    const cube = new THREE.Mesh(new THREE.CubeGeometry(50,50,50,10,10,10), new THREE.MeshLambertMaterial({color: 0x42aaff}));
    cube.position.y = -60;
    cube.position.z = -160;
    cube.castShadow = true;
    cube.receiveShadow = true;

    scene.add(cube);
    scene.add(light);
    scene.add(plane);
    //scene.add(earth);
    let angle = 0;
    const animate = function () {
        requestAnimationFrame(animate);

        cube.rotation.y += 0.01;

        sphere.position.x += 2*Math.sin(angle);
        sphere.position.z += Math.cos(angle);
        angle += Math.PI/180*2;

        renderer.render(scene, camera);
    };

    animate();
}