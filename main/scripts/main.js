
var Context = function(iframe,ctaButton){
	this.iframe = iframe;
	this.ctaButton = ctaButton;
	this.isFocus = false;
	
	this.isTouchDevice =  function(){
            return 'ontouchstart' in window // works on most browsers 
                || navigator.maxTouchPoints; // works on IE10/11 and Surface
     };

     if (this.isTouchDevice()) {
            document.getElementById('main-header-cta').classList.add('main-header-touch');
     }

    var self = this;   
   
    iframe.addEventListener('mouseenter',function(){
             self.isFocus = true;
    });

    iframe.addEventListener('mouseout',function(){
             self.isFocus = false;
    });

    this.preventDefault = function(e) {
            if(!self.isFocus)
                return;
            
            e = e || window.event;
            if (e.preventDefault)
                e.preventDefault();
            e.returnValue = false;  
        }

    this.onClick = function(){
	 	 var image = document.getElementsByClassName('main-header-content-image')[0];
	     ctaButton.parentElement.removeChild(ctaButton);
	     image.parentElement.removeChild(image);
	     iframe.classList.add('main-header-iframe-enabled');
    };

       

};



// For Chrome PC Navigators
var ChromeContext = function(iframe,ctaButton){
	Context.call(this,iframe,ctaButton);
	this.iframe.contentWindow.addEventListener('wheel',this.preventDefault, {passive: false}); 
    this.onClick();
};


// For iPad, iPhone and iPod Touchs using Safari
var IOSContext = function(iframe,ctaButton){
	Context.call(this,iframe,ctaButton);
	this.iframe.parentElement.removeChild(iframe);
	this.url = "https://tristansmartpixeltv.github.io/ABB_Transformers_WebGL2/webgl/index.html";
	var self = this;
	
	this.onClick = function(){
			var win = window.open(self.url, '_blank');
            win.focus();
	};

};

// For the remaining navigators
var RegularContext = function(iframe,ctaButton){
	Context.call(this,iframe,ctaButton);
	this.iframe.contentWindow.addEventListener('wheel',this.preventDefault);
    this.onClick();
};


function GetContext(iframe,ctaButton){

	//var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    var isChrome = /Google Inc/.test(navigator.vendor);
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    var isIOSChrome = /CriOS/i.test(navigator.userAgent) &&
/iphone|ipod|ipad/i.test(navigator.userAgent);

	
    if(isChrome && !isIOSChrome)
    	return new ChromeContext(iframe,ctaButton);
    else if(isIOS)
    	return new IOSContext(iframe,ctaButton);
    else
    	return new RegularContext(iframe,ctaButton);

}
