console.log("!! About to install getUserMedia patch");

navigator.mediaDevices.jabra_unpatched_getUserMedia = navigator.mediaDevices.getUserMedia;

navigator.mediaDevices.getUserMedia = function getUserMedia(constraints) {  
    console.log("!! in my accessible resource patch injected monkey patched getUserMedia !!");

    return new Promise((resolve, reject) => {
        return jabra_unpatched_getUserMedia.bind(navigator.mediaDevices)(constraints)
        .then(stream => resolve(stream))
        .catch(rejected => reject(rejected));
    });
};

console.log("!! getUserMedia Patch installed");
