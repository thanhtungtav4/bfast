$(window).on("load", function(e) {
    if ($(window).width() > 1199) {
        wow = new WOW({
            animateClass: 'animated',
            offset: 100,
            callback: function(box) {
                console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
            }
        });

        wow.init();
    }
});

$(document).ready(function($) {
   
    $("#cssmenu").menumaker({
        format: "multitoggle"
    });
    if ($(".btn-searchsg").length > 0) {
        $(".btn-searchsg").click(function() {
            if ($(".frm-search-1").hasClass("active")) {
                $(".frm-search-1").removeClass("active");
            } else {
                $(".frm-search-1").addClass("active");
                return false;
            }
        });
    }
    if ($(".btn-top").length > 0) {
        $(window).scroll(function() {
            var e = $(window).scrollTop();
            if (e > 100) {
                $(".btn-top").show()
            } else {
                $(".btn-top").hide()
            }
        });
        $(".btn-top").click(function() {
            $('body,html').animate({
                scrollTop: 0
            })
        });
    }
    setTimeout(function() {
        $('.loading').fadeOut(300, function() {
            $(this).remove();
        });
    }, 800);

    
    

});
$(document).click(function() {
    $(".a").removeClass("active");
    $(".a").removeClass("show");
    $("#a").removeClass("normal");
});
$('.list-cata, .btn-menu, #link-search,.frm-search,.frm-search-1, .layer-menu, .btn-action').click(function(event) {
    event.stopPropagation();
});

(function($) {
    $.fn.menumaker = function(options) {
        var cssmenu = $(this),
            settings = $.extend({
                format: "dropdown",
                sticky: false
            }, options);
        return this.each(function() {
            $(this).find(".button").on('click', function() {
                $(this).toggleClass('menu-opened');
                var mainmenu = $(this).next('ul');
                if (mainmenu.hasClass('open')) {
                    mainmenu.slideToggle().removeClass('open');
                } else {
                    mainmenu.slideToggle().addClass('open');
                    if (settings.format === "dropdown") {
                        mainmenu.find('ul').show();
                    }
                }
            });
            cssmenu.find('li ul').parent().addClass('has-sub');
            multiTg = function() {
                cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
                cssmenu.find('.submenu-button').on('click', function() {
                    $(this).toggleClass('submenu-opened');
                    if ($(this).siblings('ul').hasClass('open')) {
                        $(this).siblings('ul').removeClass('open').slideToggle();
                    } else {
                        $(this).siblings('ul').addClass('open').slideToggle();
                    }
                });
            };
            if (settings.format === 'multitoggle') multiTg();
            else cssmenu.addClass('dropdown');
            if (settings.sticky === true) cssmenu.css('position', 'fixed');
            resizeFix = function() {
                var mediasize = 1000;
                if ($(window).width() > mediasize) {
                    cssmenu.find('ul').show();
                }
                if ($(window).width() <= mediasize) {
                    cssmenu.find('ul').hide().removeClass('open');
                }
            };
            resizeFix();
            return $(window).on('resize', resizeFix);
        });
    };
})(jQuery);