var windowDivs = document.querySelectorAll('.window')
var isDragging = true
var offsetX, offsetY

windowDivs.forEach(function (windowDiv) {
    var titleBar = document.querySelector('.title-bar')

    titleBar.addEventListener("mousedown", function(event) {
        isDragging = true
        offsetX = event.clientX - windowDiv.getBoundingClientRect().left
        offsetY = event.clientY - windowDiv.getBoundingClientRect().top
        titleBar.style.cursor = "grabbing"
    })
    
    titleBar.addEventListener("mousemove", function(event) {
        if (isDragging) {
            windowDiv.style.left = event.clientX - offsetX + "px"
            windowDiv.style.top = event.clientY - offsetY + "px"
        }
    })
    
    titleBar.addEventListener("mouseup", function() {
        isDragging = false
        titleBar.style.cursor = "grab"
    })
})

