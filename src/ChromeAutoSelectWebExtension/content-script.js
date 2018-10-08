
console.log("!! starting execution of content script");

if (!document.head) {
    console.log("!! could not find a head element yet");
}

var actualCode = `// Code here.
    navigator.mediaDevices.jabra_unpatched_getUserMedia = navigator.mediaDevices.getUserMedia;

    navigator.mediaDevices.getUserMedia = function getUserMedia(constraints) {  
        console.log("!! in my accessible resource patch injected monkey patched getUserMedia !!");

        return new Promise((resolve, reject) => {
            return navigator.mediaDevices.jabra_unpatched_getUserMedia.bind(navigator.mediaDevices)(constraints)
            .then(stream => resolve(stream))
            .catch(rejected => reject(rejected));
        });
    };

    navigator.mediaDevices.jabra_unpatched_webkitGetUserMedia = navigator.mediaDevices.webkitGetUserMedia;
    if (navigator.mediaDevices.jabra_unpatched_webkitGetUserMedia) {
        navigator.mediaDevices.webkitGetUserMedia = function webkitGetUserMedia(constraints) {  
            console.log("!! in my accessible resource patch injected monkey patched getUserMedia !!");

            return new Promise((resolve, reject) => {
                return navigator.mediaDevices.jabra_unpatched_webkitGetUserMedia.bind(navigator.mediaDevices)(constraints)
                .then(stream => resolve(stream))
                .catch(rejected => reject(rejected));
            });
        };
    }


    console.log("!!! getUserMedia Patch installed");
`;

var lscript = document.createElement('script');
lscript.textContent = actualCode;
(document.head||document.documentElement).prepend(lscript);
lscript.remove();

window.onload = function() {
    var allMedia = document.querySelectorAll('audio,video');

    for (var j = 0; j < allMedia.length; j++) {
        var name = allMedia[j].nodeName;
        var id = allMedia[j].id;
        console.log('!!  Found audio/video element: ' + j + ': ' + name + ': ' +  id);
    }   
}

console.log("!! content script executed")


