// start animations
const startTl = gsap.timeline(); // the timeline for the initial page load animations

// header animation
startTl.from('#header', {
    y: -50,
    opacity: 0,
    duration: 1,
})

startTl.from("#header .logo", {
    y: -20,
    opacity: 0,
    duration: 0.5,
}, "-=0.5");

startTl.from("#header nav a", {
    y: -20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1
}, "-=0.4");

startTl.from('#header #cta', {
    y: -10,
    opacity: 0,
    rotate: 3,
    duration: 0.5,
    scale: 0.9,
}, "-=0.3");

// hero section animation
startTl.from('.hero h1>span', {
    y:-30,
    opacity: 0,
    duration: 1,
    stagger: 0.3
}, "-=0.3");

startTl.from('.hero p', {
    y: -20,
    opacity: 0,
    duration: 0.8,
}, "-=0.5");

startTl.from('.waitlist-container', {
    y: -20,
    opacity: 0,
    duration: 0.8,
}, "-=0.5");

startTl.from('.badge', {
    y: -20,
    opacity: 0,
    duration: 0.8,
}, "-=0.5");