window.addEventListener('load', function(){
    // If URL has a hash that matches a collapsible label, ensure that collapsible is open.
    // Only click when the corresponding checkbox is currently unchecked, otherwise we would
    // toggle an already-open section closed.
    var hash = window.location.hash;
    if (!hash) return;
    var label = document.getElementById(hash.substring(1));
    if (!label) return;
    var checkbox = document.getElementById('collapsible-' + hash.substring(1));
    if (checkbox && !checkbox.checked) {
        label.click();
    }
});