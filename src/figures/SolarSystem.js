import * as THREE from 'three';
// система частиц
const OrbitControls = require('../../src/figures/orbitControl')(THREE);

export default () => {
    let scene, camera, renderer,W,H;
    W = parseInt(document.body.clientWidth);
    H = parseInt(document.body.clientHeight);

    const init = (() => {
        scene = new THREE.Scene();   // сцена

        camera = new THREE.PerspectiveCamera(45, W/H, 1, 1000000);  // камера
        camera.position.z = 25000;
        camera.rotation.z = -Math.PI/10;

        controls = new OrbitControls(camera);

        //  container
        const container = document.createElement('div');
        document.body.appendChild(container);

        renderer = new THREE.WebGLRenderer({alpha: true});  // рендерер
        renderer.setSize(window.innerWidth, window.innerHeight); // размер приложения
        container.appendChild(renderer.domElement);  // хтмл
    })();




    // Stars
    const starsGeometry = new THREE.Geometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xbbbbbb,
        opacity: 0.5,
        size: 1,
        sizeAttenuation: false
    });

    // заполнение звездами
    for(let i = 0; i < 45000; i++){
        const vertex = new THREE.Vector3(
            Math.random()*2-1,
            Math.random()*2-1,
            Math.random()*2-1
        );
        vertex.multiplyScalar(6300);
        starsGeometry.vertices.push(vertex);
    }
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    stars.scale.set(150,150,150);
    scene.add(stars);



    const starsGeometry2 = new THREE.Geometry();
    const starsMaterial2 = new THREE.PointsMaterial({
        color: 0xbbbbbb,
        opacity: 1,
        size: 1,
        sizeAttenuation: false
    });

    // заполнение звездами
    for(let i = 0; i < 10000; i++){
        const vertex2 = new THREE.Vector3(
            Math.random()*2-1,
            Math.random()*2-1,
            Math.random()*2-1
        );
        vertex2.multiplyScalar(6000);
        starsGeometry2.vertices.push(vertex2);
    }
    const stars2 = new THREE.Points(starsGeometry2, starsMaterial2);
    stars2.scale.set(70,150,30);
    scene.add(stars2);


    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    let light = new THREE.PointLight(0xffffff, 0.8, 180000);
    light.position.set(0, 0, 0);
    light.castShadow = true;
    // Will not light anything closer than 0.1 units or further than 25 units
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 25;
    scene.add(light);

    light.power = light.intensity * 10*Math.PI;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    scene.add(light);



    // Sun
    const sun_geo = new THREE.SphereGeometry(1600, 32, 32);
    const sun_textute = new THREE.ImageUtils.loadTexture('textures/sun.jpg');
    sun_textute.anisotropy = 8;
    const sun_mat = new THREE.MeshBasicMaterial({
        map: sun_textute,
        overdraw: true
    });
    const sun = new THREE.Mesh(sun_geo, sun_mat);
    sun.castShadow = true;
    sun.receiveShadow = true;
    scene.add(sun);


    // Planets

    // Mercury
    const mercury = new THREE.Mesh(
        new THREE.SphereGeometry(60, 60,60),
        new THREE.MeshPhongMaterial({
            map: new THREE.ImageUtils.loadTexture('textures/mercury.jpg'),
            overdraw: true
        })
    );
    mercury.castShadow = true;
    mercury.receiveShadow = true;
    scene.add(mercury);


    // Venus
    const venus = new THREE.Mesh(
        new THREE.SphereGeometry(80, 60,60),
        new THREE.MeshPhongMaterial({
            map: new THREE.ImageUtils.loadTexture('textures/venus.jpg'),
            overdraw: true
        })
    );
    venus.castShadow = true;
    venus.receiveShadow = true;
    scene.add(venus);


    // Earth
    const earth = new THREE.Mesh(
        new THREE.SphereGeometry(100, 60,60),
        new THREE.MeshPhongMaterial({
            map: new THREE.ImageUtils.loadTexture('textures/earth.jpg'),
            overdraw: true
        })
    );
    earth.castShadow = true;
    earth.receiveShadow = true;
    scene.add(earth);


    // Mars
    const mars = new THREE.Mesh(
        new THREE.SphereGeometry(100, 60,60),
        new THREE.MeshPhongMaterial({
            map: new THREE.ImageUtils.loadTexture('textures/mars.jpg'),
            overdraw: true
        })
    );
    mars.castShadow = true;
    mars.receiveShadow = true;
    scene.add(mars);

    // Jupiter
    const jupiter = new THREE.Mesh(
        new THREE.SphereGeometry(400, 60,60),
        new THREE.MeshPhongMaterial({
            map: new THREE.ImageUtils.loadTexture('textures/jupiter.jpg'),
            overdraw: true
        })
    );
    jupiter.castShadow = true;
    jupiter.receiveShadow = true;
    scene.add(jupiter);

    // Saturn
    const saturn = new THREE.Mesh(
        new THREE.SphereGeometry(300, 60,60),
        new THREE.MeshPhongMaterial({
            map: new THREE.ImageUtils.loadTexture('textures/saturn.jpg'),
            overdraw: true
        })
    );
    saturn.castShadow = true;
    saturn.receiveShadow = true;
    scene.add(saturn);

    let ringSaturnGeometry = new THREE.Geometry();
    let ringSaturnMaterial = new THREE.ParticleBasicMaterial({
       color: 0xfff12d,
       opacity: 0.5,
       size: 1,
       sizeAttenuation: false
    });

    for(let i = 0; i < 20000; i++){
        let vertex = new THREE.Vector3(
            Math.sin(Math.PI/180*i)*(450-i/60),
            Math.random()*30,
            Math.cos(Math.PI/180*i)*(450-i/60));

        ringSaturnGeometry.vertices.push(vertex);
    }
    let ring = new THREE.ParticleSystem(
        ringSaturnGeometry,
        ringSaturnMaterial
    );
    ring.castShadow = true;
    ring.rotation.x = Math.PI/180*20;
    scene.add(ring);


    let ringSaturnGeometry1 = new THREE.Geometry();
    let ringSaturnMaterial1 = new THREE.ParticleBasicMaterial({
        color: 0xe0dfd2,
        opacity: 0.5,
        size: 1,
        sizeAttenuation: false
    });

    for(let i = 0; i < 20000; i++){
        let vertex1 = new THREE.Vector3(
            Math.sin(Math.PI/180*i)*(550-i/60),
            Math.random()*30,
            Math.cos(Math.PI/180*i)*(550-i/60));

        ringSaturnGeometry1.vertices.push(vertex1);
    }
    let ring1 = new THREE.ParticleSystem(
        ringSaturnGeometry1,
        ringSaturnMaterial1
    );
    ring1.castShadow = true;
    ring1.rotation.x = Math.PI/180*20;
    scene.add(ring1);

    // Neptun
    const neptun = new THREE.Mesh(
        new THREE.SphereGeometry(400, 60,60),
        new THREE.MeshPhongMaterial({
            map: new THREE.ImageUtils.loadTexture('textures/neptun.png'),
            overdraw: true
        })
    );
    neptun.castShadow = true;
    neptun.receiveShadow = true;
    scene.add(neptun);


    // Pluton
    const pluton = new THREE.Mesh(
        new THREE.SphereGeometry(400, 60,60),
        new THREE.MeshPhongMaterial({
            map: new THREE.ImageUtils.loadTexture('textures/pluton.jpg'),
            overdraw: true
        })
    );
    pluton.castShadow = true;
    pluton.receiveShadow = true;
    scene.add(pluton);




    let controls = new OrbitControls( camera );

    let mercury_eagle = 0;
    let venus_eagle = 0;
    let earth_eagle = 0;
    let mars_eagle = 0;
    let jupiter_eagle = 0;
    let saturn_eagle = 0;
    let neptun_eagle = 0;
    let pluton_eagle = 0;


    function animate () {
        requestAnimationFrame(animate);

        sun.rotation.y += 0.001;

        mercury.position.x = Math.sin(mercury_eagle*0.01)*5000;
        mercury.position.z = Math.cos(mercury_eagle*0.01)*5500;

        venus.position.x = Math.sin(venus_eagle*0.2)*6000;
        venus.position.z = Math.cos(venus_eagle*0.2)*6500;


        earth.position.x = Math.sin(earth_eagle*0.18)*7000;
        earth.position.z = Math.cos(earth_eagle*0.18)*7500;


        mars.position.x = Math.sin(mars_eagle*0.15)*9000;
        mars.position.z = Math.cos(mars_eagle*0.15)*9500;


        jupiter.position.x = Math.sin(jupiter_eagle*0.01)*11000;
        jupiter.position.z = Math.cos(jupiter_eagle*0.01)*11500;

        saturn.position.x = Math.sin(saturn_eagle*0.1)*13000;
        saturn.position.z = Math.cos(saturn_eagle*0.1)*13500;
        ring.position.x = saturn.position.x;
        ring.position.z = saturn.position.z;

        ring1.position.x = saturn.position.x;
        ring1.position.z = saturn.position.z;


        neptun.position.x = Math.sin(neptun_eagle*0.06)*15000;
        neptun.position.z = Math.cos(neptun_eagle*0.06)*15500;

        pluton.position.x = Math.sin(pluton_eagle*0.06)*15000;
        pluton.position.z = Math.cos(pluton_eagle*0.06)*15500;


        mercury_eagle -= Math.PI/180*2;
        venus_eagle += Math.PI/180*2;
        earth_eagle -= Math.PI/180*2;
        mars_eagle += Math.PI/180*2;
        jupiter_eagle -= Math.PI/180*2;
        saturn_eagle += Math.PI/180*2;
        ring.rotation.y = 0.01;
        ring1.rotation.y = 0.01;

        neptun_eagle -= Math.PI/180*2;
        pluton_eagle += Math.PI/180*2;


        camera.lookAt(earth.position);

        controls.update();

        renderer.render(scene, camera);
    }
    animate();

}