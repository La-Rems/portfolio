$(document).ready(function() {

$('.nav-link, .navbar-brand, #scroll-up, .scroll-downs > a').on('click', function(e) {
    e.preventDefault()
    var anchor = $(this.hash);
    $("html, body").animate( { scrollTop: anchor.offset().top }, 10);
});

$('.nav-link').on('click', function(e) {
    if( $('#navbarNav').hasClass('show') ) {
        $('#navbarNav').removeClass('show');
    }
});
    

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 120 - Math.random() * 100;

    if (this.isDeleting) { delta = 20; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = 2000;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
};

// Background color de la navbar au scroll
let barNav = $("#barreNavigation");
let home = $("#home");
let height = home.innerHeight() - 100;
$(window).scroll( () => {
    if($(window).scrollTop() > height) {
        barNav.addClass("scroll");
    } else {
        barNav.removeClass("scroll");
    }
})

// Background du burger
let btnBurger = $("#btn-burger");
let navbarNav = $("#barreNavigation");
let active = false;
btnBurger.click(function(){
    if(!active){
       navbarNav.attr("style","background-color : #333333 !important;"); 
       active = true;
    } else if (active){
        navbarNav.removeAttr("style");
        active = false;
    }
})

// Placement des formations en format mobile
let invertedTimeline = $('#inverted-timeline');
if(window.innerWidth <= 750 && invertedTimeline !== null) {
    invertedTimeline.addClass('timeline-inverted');
}
window.addEventListener('resize', function(e) {
    if(invertedTimeline !== null) {
        if(window.innerWidth <= 750) {
            invertedTimeline.removeClass('timeline-inverted');
        } else {
            invertedTimeline.addClass('timeline-inverted');
        }
    }
});

window.addEventListener('load', function(e) {
    if(invertedTimeline !== null) {
        if(window.innerWidth <= 750) {
            invertedTimeline.removeClass('timeline-inverted');
        } else {
            invertedTimeline.addClass('timeline-inverted');
        }
    }
});


// Lien de la navbar actif lors du scroll 
let navItems = $('#header').find('a');
let previousActive = null;
let threshold = window.innerHeight / 2;
$(window).on('scroll', function(){ 
    let currentScrollTop = $(this).scrollTop();
    let active = null;
    navItems.each(function(){
        let navItem = $(this);
        let target = $(navItem.attr('href'));
        if(target.offset().top <= currentScrollTop + threshold){ 
            active = navItem; 
        }
    });

    if(active != null && previousActive != active){
        if(previousActive != null){
           previousActive.removeClass('active'); 
        }  
        active.addClass('active');
        previousActive = active;
    }
});

});