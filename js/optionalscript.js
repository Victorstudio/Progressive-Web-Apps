document.addEventListener("DOMContentLoaded", function () {
    //slider
    $('.carousel.carousel-slider').carousel({
       full_width: true,
       indicators : true,
       height: 800, // defaultnya - height : 400
       interval: 1000 // defaultnya - interval: 6000
    });
    //scrolling otomatis
    $('.scrollspy').scrollSpy(); 
})
