// fungsi js untuk memblock back button dalam browser agar hanaya bisa diakses dari back yang disediakan
window.history.forward(); 
function noBack() { 
    window.history.forward();
    runPrompt = false; 
} 

// menonaktifkan back button untuk mobile device
    
function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);}

function onDeviceReady() {
        // mendafrakan event listener
    document.addEventListener("backbutton", onBackKeyDown, false);}

    // Mengatasi tombol back
function onBackKeyDown() {};