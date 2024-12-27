// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg'),
        antialias: true
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Initial camera position
    camera.position.setZ(30);
    camera.position.setY(0);

    // Create torus
    const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x4ecdc4,
        wireframe: true 
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);

    // Lights
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(pointLight, ambientLight);

    // Stars
    function addStar() {
        const geometry = new THREE.SphereGeometry(0.25, 24, 24);
        const material = new THREE.MeshStandardMaterial({ 
            color: 0xffffff,
            transparent: true,
            opacity: Math.random() * 0.5 + 0.5
        });
        const star = new THREE.Mesh(geometry, material);

        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
        star.position.set(x, y, z);
        scene.add(star);
        return star;
    }

    const stars = Array(200).fill().map(addStar);

    // Background
    scene.background = new THREE.Color(0x0a0a0a);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate torus
        torus.rotation.x += 0.01;
        torus.rotation.y += 0.005;
        torus.rotation.z += 0.01;

        // Animate stars
        stars.forEach((star, index) => {
            star.rotation.x += 0.002;
            star.rotation.y += 0.002;
            star.material.opacity = 0.5 + Math.sin(Date.now() * 0.001 + index) * 0.3;
        });

        renderer.render(scene, camera);
    }

    // Scroll animation
    function moveCamera() {
        const t = document.body.getBoundingClientRect().top;
        
        camera.position.z = t * -0.01;
        camera.position.x = t * -0.0002;
        camera.rotation.y = t * -0.0002;
    }

    document.body.onscroll = moveCamera;

    // Handle window resize
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize, false);

    // Start animation
    animate();
});

// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navLinksItems = document.querySelectorAll(".nav-links a");

hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks?.classList.toggle("active");
});

navLinksItems.forEach(link => {
    link.addEventListener("click", () => {
        hamburger?.classList.remove("active");
        navLinks?.classList.remove("active");
    });
});

// Add active class to nav links on scroll
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(item => {
        item.classList.remove("active");
        if (item.getAttribute("href").slice(1) === current) {
            item.classList.add("active");
        }
    });
});
