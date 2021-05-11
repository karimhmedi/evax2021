
//************************* SCROLL FUNCTIONS***********************//
$(function ($) {

    $('.collapse.in').prev('.panel-heading').addClass('active');
    $('#accordion, #bs-collapse')
        .on('show.bs.collapse', function (a) {
            $(a.target).prev('.panel-heading').addClass('active');
        })
        .on('hide.bs.collapse', function (a) {
            $(a.target).prev('.panel-heading').removeClass('active');
        });
        /*Wow Animations*/
        if ($(".wow").length && $(window).outerWidth() >= 567) {
            let wow = new WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                mobile: false,
                live: true
            });
            wow.init();
        }

    // Navbar LARGE SCREEN STICK Function
    var $window = $(window);
    $window.scroll(function () {
        var $scroll = $window.scrollTop();
        var $navbar = $(".navbar");
        if (!$navbar.hasClass("sticky-bottom")) {
            if ($scroll > 250) {
                $(".main-logo").html('<img src="vendor/img/logo2.png" alt="logo" class="logo-dark default">');
                $navbar.addClass("fixed-menu");
            } else {
                $(".main-logo").html('<img src="vendor/img/logo2.png" alt="logo" class="logo-dark default">');
                $navbar.removeClass("fixed-menu");
            }
        }
    });

    $(".scroll").on("click", function (event) {
        event.preventDefault();
        $("html,body").animate({
            scrollTop: $(this.hash).offset().top - 100
        }, 1200);
    });

});

//******************PLAY AUDIO AND VIDEO************************//
$('video, audio').mediaelementplayer({
    // Do not forget to put a final slash (/)
    pluginPath: 'https://cdnjs.com/libraries/mediaelement/',
    // this will allow the CDN to use Flash without restrictions
    // (by default, this is set as `sameDomain`)
    shimScriptAccess: 'always'
    // more configuration
});

// *******************CAROUSAL********************
$('#carouselFade').carousel({
    interval: 5000,
});


//***************** MENU AND CLOSE BUTTON OF NAVBAR WINDOW*********************//
$('.my-tog-btn').on("click", function () {
    $('.outer-window').addClass('inner-window');
    setTimeout(function () {
        $('.navbar-content').addClass('middle-window');
    }, 300);
    setTimeout(function () {
        $('.navbar1').addClass('nav-visible');
    }, 800);

});
$('.close-outerwindow').on("click", function () {
    $('.outer-window').removeClass('inner-window');
    $('.navbar-content').removeClass('middle-window');
    setTimeout(function () {
        $('.navbar1').removeClass('nav-visible');
    }, 800);
});
$('.outer-window ul li a').click(function () {
    $('.outer-window').removeClass('inner-window');
    setTimeout(function () {
        $('.navbar1').removeClass('nav-visible');
    }, 800);
});



//****************ARROW BOX HIDE SND SHOW ON MOUSE HOVER ON BOXES***************
$('.custom-box.bg-blue-color').on("mouseenter", function () {
    $('.arrow-box').addClass('arrow-box-hidden');
    $('.arrow-box .las').addClass('las-hidden');
    $('.arrow-box1').addClass('arrow-box1-display');
    $('.arrow-box1 .las').addClass('las-visible');
});
$('.custom-box').on("mouseleave", function () {
    $('.arrow-box').removeClass('arrow-box-hidden');
    $('.arrow-box .las').removeClass('las-hidden');
    $('.arrow-box1').removeClass('arrow-box1-display');
    $('.arrow-box1 .las').removeClass('las-visible');
});

//********************COUNTER******************//
(function ($) {
    $.fn.countTo = function (options,viewCounter) {
        if(viewCounter == 1){
            options = options || {};

            return $(this).each(function () {
                // set options for current element
                var settings = $.extend({}, $.fn.countTo.defaults, {
                    from:            $(this).data('from'),
                    to:              $(this).data('to'),
                    speed:           $(this).data('speed'),
                    refreshInterval: $(this).data('refresh-interval'),
                    decimals:        $(this).data('decimals')
                }, options);

                // how many times to update the value, and how much to increment the value on each update
                var loops = Math.ceil(settings.speed / settings.refreshInterval),
                    increment = (settings.to - settings.from) / loops;

                // references & variables that will change with each update
                var self = this,
                    $self = $(this),
                    loopCount = 0,
                    value = settings.from,
                    data = $self.data('countTo') || {};

                $self.data('countTo', data);

                // if an existing interval can be found, clear it first
                if (data.interval) {
                    clearInterval(data.interval);
                }
                data.interval = setInterval(updateTimer, settings.refreshInterval);

                // initialize the element with the starting value
                render(value);

                function updateTimer() {
                    value += increment;
                    loopCount++;

                    render(value);

                    if (typeof(settings.onUpdate) == 'function') {
                        settings.onUpdate.call(self, value);
                    }

                    if (loopCount >= loops) {
                        // remove the interval
                        $self.removeData('countTo');
                        clearInterval(data.interval);
                        value = settings.to;

                        if (typeof(settings.onComplete) == 'function') {
                            settings.onComplete.call(self, value);
                        }
                    }
                }

                function render(value) {
                    var formattedValue = settings.formatter.call(self, value, settings);
                    $self.html(formattedValue);
                }
            });
        };
    }

    $.fn.countTo.defaults = {
        from: 0,               // the number the element should start at
        to: 0,                 // the number the element should end at
        speed: 1000,           // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,           // the number of decimal places to show
        formatter: formatter,  // handler for formatting the value before rendering
        onUpdate: null,        // callback method for every time the element is updated
        onComplete: null       // callback method for when the element finishes updating
    };

    function formatter(value, settings) {
        return value.toFixed(settings.decimals);
    }
}(jQuery));

//*************************START COUNTERS WHEN COUNTER SECTION SCROLL ON SCREEN****************//
jQuery(function ($) {
    // custom formatting example
    if ($( ".count-number" ) && $( ".count-number" ).length ) {
        $('.count-number').data('countToOptions', {
            formatter: function (value, options) {
                return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
            }
        });

        // start all the timers
        var viewCounter = 0;
        $(document).on('scroll', function () {
            if ($('.timer').each(count).isOnScreen() && viewCounter < 2) {
                viewCounter++;
                console.log(viewCounter);
            }
        });
    }
    function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options, viewCounter);
    }

});

// check if element visible in viewport

$.fn.isOnScreen = function() {
    var win = $(window);
    var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

};

//***************PARALLEX******************
if (screen.width > 768) {
    $('.bg-admission-img').parallaxie({
        speed: 0.5,
        offset: -290,
    });
}

$('.bg-gallery-img').parallaxie({
    speed: 0.5,
    offset: -200,
});

$('.bg-contact-img').parallaxie({
    speed: 0.5,
    offset: -350,
});
$('.bg-courses-img').parallaxie({
    speed: 0.5,
    offset: -250,
});
$('.bg-course-detail-img').parallaxie({
    speed: 0.5,
    offset: -100,
});
$('.bg-blog-img').parallaxie({
    speed: 0.5,
    offset: -150,
});
$('.bg-blog-detail-img').parallaxie({
    speed: 0.5,
    offset: -150,
});



//********************LOADER************************//
$(window).on("load", function () {
    "use strict";
    setTimeout(function () {
        $(".loader1").fadeOut(800);
    }, 1000);
});

//**************PARALLEX OF HEADER OF ALL PAGES*****************//
if (screen.width > 768) {
    $('.bg-counter-img').parallaxie({
        speed: 0.5,
        offset: -170,
    });
}

$('.bg-about-img').parallaxie({
    speed: 0.5,
    offset: -200,
});

$('.bg-testimonial-img').parallaxie({
    speed: 0.5,
    offset: 0,
});

$('.img-class').parallaxie({
    speed: 0.5,
    offset: -290,
});

//*************CONTACT FORM DATA SEND**********/
function send_mails() {
    var name=$("#candidate_name").val();
    var email=$("#user_email").val();
    var subject=$("#user_subject").val();
    var msg=$("#user_message").val();


    var post_data = {
        'userName': name,
        'userEmail': email,
        'userSubject': subject,
        'userMessage': msg
    };
    $("#error").text('Sending');

//////Ajax post data to server
    $.post('contact.php', post_data, function (response) {

        var  output;
        // load json data from server and output message
        if (response.type == 'error') {

            output = '<div class="alert-danger">' + response.text + '</div>';
        } else {

            output = '<div class="alert-success">' + response.text + '</div>';

            //reset values in all input fields
            $('.contact-form input').val('');
            $('.contact-form textarea').val('');
        }

        $("#error").hide().html(output).slideDown();

    },'json');


}

//*************SCROLL TOP APPEAR**********8
$(window).on('scroll', function () {
    if ($(this).scrollTop() > 500)
        $('.scroll-top-arrow').fadeIn('slow');
    else
        $('.scroll-top-arrow').fadeOut('slow');
});

//Click event to scroll to top
$(document).on('click', '.scroll-top-arrow', function () {
    $('html, body').animate({scrollTop: 0}, 800);
    return false;
});


//*******************BLOG SECTION CAROUSAL***************
$('#blog-carousal').owlCarousel({
    items:3,
    loop:true,
    center:true,
    // margin:20,
    nav:false,
    dots:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:3
        }
    }
});





/*************************FACULTY MEMBER OWL CAROUSAL*********************/
$("#ourteachers-slider").owlCarousel({
    items: 3,
    margin: 20,
    center:true,
    autoplay: true,
    autoplayHoverPause: true,
    loop: true,
    nav: false,
    responsive: {
        1280: {
            items: 3,
        },
        600: {
            items: 2,
        },
        320: {
            items: 1,
        },
    }
});


$('[data-fancybox]').fancybox({
    'transitionIn': 'elastic',
    'transitionOut': 'elastic',
    'speedIn': 600,
    'speedOut': 200,
    buttons: [
        'slideShow',
        'fullScreen',
        'thumbs',
        'share',
        // 'download',
        'zoom',
        'close'
    ],
});



