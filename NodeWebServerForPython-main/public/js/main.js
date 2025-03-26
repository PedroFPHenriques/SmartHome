jQuery(document).ready(function($) {

	'use strict';

    var top_header = $('.parallax-content');
    top_header.css({'background-position':'center center'}); // better use CSS

    $(window).scroll(function () {
    var st = $(this).scrollTop();
    top_header.css({'background-position':'center calc(50% + '+(st*.5)+'px)'});
    });

    $('body').scrollspy({
        target: '.fixed-side-navbar',
        offset: 200
    });

      // smoothscroll on sidenav click

    $('.tabgroup > div').hide();
        $('.tabgroup > div:first-of-type').show();
        $('.tabs a').click(function(e){
          e.preventDefault();
            var $this = $(this),
            tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
            others = $this.closest('li').siblings().children('a'),
            target = $this.attr('href');
        others.removeClass('active');
        $this.addClass('active');
        $(tabgroup).children('div').hide();
        $(target).show();

    });
});


let colorPicker = new iro.ColorPicker(document.getElementById("picker"), {
    width: 400,
    color: "rgb(255, 255, 255)",
    borderWidth: 3,
    borderColor: "#fff",
    sliderMargin: 50,
    layout: [
        {
            component: iro.ui.Wheel,

        },
        {
            component: iro.ui.Slider,
            options: {
                sliderType: 'alpha'
            }
        }
    ]
});

let socket = io();
/*let rgbvalue;
let checkBox = document.getElementById("check1");

colorPicker.on('input:change', function(color) {
    rgbvalue = colorPicker.color.rgbString.replace(/[^\d,]/g, '').split(',');
    document.getElementById("owl-item").style.borderColor = colorPicker.color.hexString;
    if (checkBox.checked === true){
        const sendrgb = {check:true, rgbvalue:rgbvalue, alpha:colorPicker.color.alpha};
        socket.emit("rgb",sendrgb);
    }
});

function rgbCheckTogle(){
    if (checkBox.checked === true){
        rgbvalue = colorPicker.color.rgbString.replace(/[^\d,]/g, '').split(',');
        const sendrgb = {type:"onoff", check:true, rgbvalue:rgbvalue, alpha:colorPicker.color.alpha};
        socket.emit("rgb",sendrgb);
    }else{
        rgbvalue = colorPicker.color.rgbString.replace(/[^\d,]/g, '').split(',');
        const sendrgb = {type:"onoff", check:false, rgbvalue:rgbvalue, alpha:colorPicker.color.alpha};
        socket.emit("rgb",sendrgb);
    }
}

function rgbFlowTogle(){
    if (checkBox.checked === true){
        const sendrgb = {type:"flow", check:true};
        socket.emit("rgb",sendrgb);
    }else{
        const sendrgb = {type:"flow", check:false};
        socket.emit("rgb",sendrgb);
    }
}

socket.on('rgbt', function (data) {
    var rgb = {r: data.rgbvalue[0], g: data.rgbvalue[1], b: data.rgbvalue[2]};
    document.getElementById("owl-item").style.borderColor = 'rgb('+data.rgbvalue[0]+',' + data.rgbvalue[1] + ',' + data.rgbvalue[2] + ')';
    colorPicker.color.set(rgb);
    document.getElementById('check1').checked = data.check;
});*/

