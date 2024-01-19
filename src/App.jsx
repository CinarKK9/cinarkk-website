import { useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";

function App() {
  useEffect(() => {
    //set scene
    const scene = new THREE.Scene();

    //create a prespective camera
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 96;

    //get canvas and create renderer
    const canvas = document.querySelector(".canvas");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //create ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    //Create a spotlight
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight);

    //create a box
    const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const torusMaterial = new THREE.MeshNormalMaterial();
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torusMesh);

    //create orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;

    //function to animate
    const animate = () => {
      torusMesh.rotation.x += 0.01;
      torusMesh.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();

    gsap.registerPlugin(TextPlugin);
    const tl = gsap.timeline({ defaults: { duration: 1 } });
    tl.fromTo(torusMesh.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 });
    tl.fromTo(".header", { y: "-100%" }, { y: "0%" });
    tl.fromTo(".okokok", { y: "200%" }, { y: "0%", ease: "bounce" });
  }, []);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 700);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isFocused, setIsFocused] = useState(false)
  return (
    <>
      <header>
      {isSmallScreen ? (
        <>
          <nav>
            <a href="/">CinarKK</a>
            <div className="hamburger-menu-icon" tabIndex={0} onFocus={() => {setIsFocused(true)}}></div>
            <div className={isFocused ? "focused navbar-content" : "navbar-content"}>
                <ul>
                <li>
                    <a href="/add-ideas">Add Ideas</a>
                </li>
                <li>
                    <a href="/ideas">Ideas</a>
                </li>
                <li>
                    <a href="/clicker-game">Clicker Game</a>
                </li>
                </ul>
            </div>
          </nav>
        </>
      ) : (
        <>
          <nav>
            <a href="/">CinarKK</a>
            <ul>
              <li>
                <a href="/add-ideas">Add Ideas</a>
              </li>
              <li>
                <a href="/ideas">Ideas</a>
              </li>
              <li>
                <a href="/clicker-game">Clicker Game</a>
              </li>
            </ul>
          </nav>
        </>
      )}
    </header>
      <canvas className="canvas"></canvas>
      <div
        style={{ position: "absolute", bottom: "7rem", width: "100%" }}
        className="okokok"
      >
        <h1 style={{ color: "#fff", textAlign: "center" }} className="textcin">
          The ultimate developer.
        </h1>
      </div>
    </>
  );
}

export default App;
