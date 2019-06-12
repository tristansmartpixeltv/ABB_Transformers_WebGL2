pc.script.createLoadingScreen(function (app) {
    var showSplash = function () {
        
        document.body.id = "application-body";
        
        var newStyle = document.createElement('link');
        newStyle.setAttribute('rel','stylesheet');
        newStyle.setAttribute('href','https://tristansmartpixeltv.github.io/FrameworkWebGL/ABBVoice.css');
        document.head.appendChild(newStyle);
    
        //Fullscreen Hider
        /*var fullscreen = document.createElement('div');
        fullscreen.id = "application-fullscreen-wrapper";
        fullscreen.style.width = "100%";
        fullscreen.style.height = "100%";
        fullscreen.style.position = "fixed";
        fullscreen.style.top = "0";
        fullscreen.style.left = "0";
        fullscreen.style.zIndex = "10000000";
        
        var fullscreenIcon = document.createElement('div');
        fullscreenIcon.id = "application-fullscreen-icon";
        
        var fullscreenTitle = document.createElement('div');
        fullscreenTitle.innerHTML = "3D TRANSFORMER";
        fullscreenTitle.id = "application-fullscreen-title";
        
        var fullscreenButton = document.createElement('div');
        fullscreenButton.id = "application-fullscreen-button";
        fullscreenButton.innerHTML = "Learn more";
        fullscreenButton.classList.add('application-fullscreen-button-disabled');
        
        document.body.appendChild(fullscreen);
        fullscreen.appendChild(fullscreenIcon);
        fullscreen.appendChild(fullscreenTitle);
        fullscreen.appendChild(fullscreenButton);*/
        
        // splash wrapper
        var wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);

        // splash
        var splash = document.createElement('div');
        splash.id = 'application-splash';
        wrapper.appendChild(splash);
        splash.style.display = 'none';

        var logo = document.createElement('img');
        logo.src = 'https://advancedmanufacturing.org/wp-content/uploads/2016/10/ABB-Logo.jpg';
        splash.appendChild(logo);
        logo.onload = function () {
            splash.style.display = 'block';
        };

        var container = document.createElement('div');
        container.id = 'progress-bar-container';
        splash.appendChild(container);

        var bar = document.createElement('div');
        bar.id = 'progress-bar';
        container.appendChild(bar);

    };

    var hideSplash = function () {
        var splash = document.getElementById('application-splash-wrapper');
        //var fullscreenButton = document.getElementById('application-fullscreen-button');
        splash.parentElement.removeChild(splash);
        //fullscreenButton.classList.remove('application-fullscreen-button-disabled');
    };

    var setProgress = function (value) {
        var bar = document.getElementById('progress-bar');
        if(bar) {
            value = Math.min(1, Math.max(0, value));
            bar.style.width = value * 100 + '%';
        }
    };

    var createCss = function () {
        var css = [
            'body {',
            '    background-color: white;',
            '}',

            '#application-splash-wrapper {',
            '    position: absolute;',
            '    top: 0;',
            '    left: 0;',
            '    height: 100%;',
            '    width: 100%;',
            '    background-color: white;',
            '}',

            '#application-splash {',
            '    position: fixed;',
            '    top: 50%;',
            '    width: 264px;',
            '    margin-top: -74px;',
            '    left: calc(50% - 132px);',
            '}',

            '#application-splash img {',
            '    width: 100%;',
            '}',

            '#progress-bar-container {',
            '    margin: 20px auto 0 auto;',
            '    height: 2px;',
            '    width: 100%;',
            '    background-color: white;',
            '}',

            '#progress-bar {',
            '    width: 0%;',
            '    height: 100%;',
            '    background-color: #FF000FFF;',
            '}',

        ].join("\n");

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
          style.styleSheet.cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);
    };


    createCss();

    showSplash();
        
    app.on('preload:end', function () {
        app.off('preload:progress');
    });
    app.on('preload:progress', setProgress);
    
    app.on('start', hideSplash);
});