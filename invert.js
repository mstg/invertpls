// ==UserScript==
// @name         ALL INVERT EVERYTHING
// @namespace    io.mstg.allinverteverything
// @version      0.1
// @description  Invert all pages
// @author       Mustafa Gezen
// @match        *://*/*
// @require      http://code.jquery.com/jquery.min.js
// @grant       GM_getValue
// @grant       GM_setValue
// @downloadURL https://raw.githubusercontent.com/mstg/invertpls/master/invert.js
// @updateURL https://raw.githubusercontent.com/mstg/invertpls/master/invert.js
// ==/UserScript==

$(document).ready(function() {
    var disable_for_site = ["facebook.com", "sync.d-ikt.no"];
    disable_for_site.forEach(function(entry) {
        if (window.location.host == entry || window.location.host == "www." + entry) { throw new Error("Disabled"); }
    });
    
    if (check_if_enabled()) {
      invert();
    }
    
    var button = $("<button id='invert' style='border-radius:0px;-webkit-border-radius:0px;-moz-border-radius:0px;-khtml-border-radius:0px;position:absolute;top:0;left:0;border:0;background-color:#0074D9;color:#fff;padding:3px;opacity:0.1;'>Invert</button>");
    $("body").append(button);
    
    $("#invert").hover(function() {
        $(this).animate({"opacity": 1}, 100); 
    }, function() {
        $(this).animate({"opacity": 0.1}, 100);
    });
    
    $("#invert").click(function() {
       invert();
        if (check_if_enabled()) {
         GM_setValue("invert", false);   
        } else {
         GM_setValue("invert", true);
        }
    });
    
    function check_if_enabled(){
     return GM_getValue("invert", false);
    }
    
    function invert() {
        var disable_ext = ["jpg", "png", "gif", "bmp"];
        disable_ext.forEach(function(entry) {
            var extension=window.location.pathname.split(".");
            extension=extension[extension.length-1];
            if (extension == entry) {
                throw new Error("Disabled");   
            }
        });

        var disable_for_site = ["facebook.com"];
        disable_for_site.forEach(function(entry) {
            if (window.location.host == entry || window.location.host == "www." + entry) { throw new Error("Disabled"); }
        });

        // the css we are going to inject
        var css = 'html {-webkit-filter: invert(100%);' +
            '-moz-filter: invert(100%);' + 
            '-o-filter: invert(100%);' + 
            '-ms-filter: invert(100%); }',

            head = document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        // a hack, so you can "invert back" clicking the bookmarklet again
        if (!window.counter) { window.counter = 1;} else  { window.counter ++;
                                                           if (window.counter % 2 == 0) { var css ='html {-webkit-filter: invert(0%); -moz-filter:    invert(0%); -o-filter: invert(0%); -ms-filter: invert(0%); }'}
                                                          };

        style.type = 'text/css';
        if (style.styleSheet){
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        //injecting the css to the head
        head.appendChild(style); 
    }
});
