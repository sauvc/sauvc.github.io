window.addEventListener('load', function(){
    // if URL has a hash of #qualified, then default open the "Qualified Teams" collapsible
    if (window.location.hash === '#qualified') {
        if (document.getElementById('qualified')) document.getElementById('qualified').click();
    }
});