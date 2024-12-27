// Intersection Observer options
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Callback function when elements intersect
function handleIntersect(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // If the element has stagger-children class, also add visible to parent
            if (entry.target.classList.contains('stagger-children')) {
                entry.target.classList.add('visible');
            }
            // Once the animation is done, unobserve the element
            observer.unobserve(entry.target);
        }
    });
}

// Create the observer
const observer = new IntersectionObserver(handleIntersect, observerOptions);

// Function to start observing elements
function initAnimations() {
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Observe all stagger-children elements
    document.querySelectorAll('.stagger-children').forEach(element => {
        observer.observe(element);
    });
}

// Initialize animations when the page loads
document.addEventListener('DOMContentLoaded', initAnimations);

// Optional: Reinitialize animations when dynamic content is loaded
function refreshAnimations() {
    initAnimations();
}
