import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { ASSETS } from 'src/app/shared/assets';

@Injectable()

export class LandingPageService {
    threeActivator(elm) {
        var scene3d = elm
        var scene = new THREE.Scene(); //creating the scene
        // renderer = new THREE.CanvasRenderer( { alpha: true }); // gradient
        var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer({ alpha: true }); //rendering the scene
        renderer.setSize(window.innerWidth, window.innerHeight);
        scene3d.appendChild(renderer.domElement);

        window.addEventListener('resize', function () //resizing the canvas as per the size of window
        {
            var width = window.innerWidth;
            var height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });


        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var cubeMaterials =
            [
                new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(ASSETS + '/Jam.png'), side: THREE.DoubleSide }), //rightside
                new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(ASSETS + '/Bridge.png'), side: THREE.DoubleSide }), //leftside
                new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(ASSETS + '/Code.png'), side: THREE.DoubleSide }), //topside
                new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(ASSETS + '/Robo.png'), side: THREE.DoubleSide }), //bottomside
                new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(ASSETS + '/Poster.png'), side: THREE.DoubleSide }), //frontside
                new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(ASSETS + '/Debate.png'), side: THREE.DoubleSide }), //backside
            ];
        // var material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe:true } );
        var material = new THREE.MeshFaceMaterial(cubeMaterials);
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 3.5;
        camera.position.y = 0;

        // var ambientLight = new THREE.AmbientLight(0x00e576, 2.0);
        // scene.add(ambientLight);

        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.008;  //animating the cube
            cube.rotation.y += 0.02;
            cube.rotation.z = 1.2;
            renderer.render(scene, camera);
        }
        animate();
    }

}
