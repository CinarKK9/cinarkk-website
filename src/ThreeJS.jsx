import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { useEffect } from "react";

function ThreeComponent() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const scene = new THREE.Scene(); //create a prespective camera

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 175; //get canvas and create renderer

    const canvas = document.querySelector(".canvas");
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement); //create a sphere

    const sphereGeometry = new THREE.SphereGeometry(8, 64, 64);
    const sphereMaterial = new THREE.MeshNormalMaterial();
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereMesh.position.set(40, 0, 0);
    scene.add(sphereMesh);
    const sphere1Mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere1Mesh.position.set(-40, 0, 0);
    scene.add(sphere1Mesh);
    const sphere2Mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere2Mesh.position.set(0, 30, 0);
    scene.add(sphere2Mesh);
    const sphere3Mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere3Mesh.position.set(0, -30, 0);
    scene.add(sphere3Mesh); //create a box

    const torusGeometry = new THREE.BoxGeometry(24, 24, 24);
    const torusMaterial = new THREE.MeshNormalMaterial();
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torusMesh); //create orbit controls

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false; //function to animate

    const animate = () => {
      torusMesh.rotation.x += 0.002;
      torusMesh.rotation.y += 0.002;
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    animate();

    function createSphereTimeline(mesh, properties) {
      return gsap
        .timeline({
          repeat: -1,
          yoyo: true,
          defaults: {
            duration: 1,
          },
        })
        .to(mesh.position, properties);
    }

    const tl1 = createSphereTimeline(sphere1Mesh, {
      y: 30,
      ease: "power2.out",
    });
    const tl2 = createSphereTimeline(sphere2Mesh, {
      x: 40,
      ease: "power2.out",
    });
    const tl3 = createSphereTimeline(sphereMesh, {
      y: -30,
      ease: "power2.out",
    });
    const tl4 = createSphereTimeline(sphere3Mesh, {
      x: -40,
      ease: "power2.out",
    });
    const masterTimeline = gsap
      .timeline({
        defaults: {
          duration: 1,
        },
      })
      .fromTo(
        ".header",
        {
          y: "-100%",
        },
        {
          y: "0%",
        }
      )
      .fromTo(
        ".okokok",
        {
          y: "200%",
        },
        {
          y: "0%",
          ease: "bounce",
        }
      )
      .fromTo(
        torusMesh.scale,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        {
          x: 1,
          y: 1,
          z: 1,
        }
      )
      .fromTo(
        sphere1Mesh.scale,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        {
          x: 1,
          y: 1,
          z: 1,
        }
      )
      .fromTo(
        sphereMesh.scale,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        {
          x: 1,
          y: 1,
          z: 1,
        }
      )
      .fromTo(
        sphere2Mesh.scale,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        {
          x: 1,
          y: 1,
          z: 1,
        }
      )
      .fromTo(
        sphere3Mesh.scale,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        {
          x: 1,
          y: 1,
          z: 1,
        }
      );
    masterTimeline.add(tl1, tl2, tl3, tl4);
  }, []);
}

export default ThreeComponent;
