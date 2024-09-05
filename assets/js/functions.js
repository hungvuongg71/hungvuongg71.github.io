function render_window_content(id, url_content) {
    fetch(url_content)
        .then(function (response) { return response.text() })
        .then(function (body) {
            document.querySelector('#' + id + ' .window-body').innerHTML = body
        })
}

function show_window_panel(id, url_content) {
    var window_div = document.getElementById(id)
    window_div.classList.remove('window-hide')
    window_div.classList.remove('window-show')
    window_div.classList.add('window-show')
    render_window_content(id, url_content)
    window_div.focus()
}

function hide_window_panel(id) {
    var window_div = document.getElementById(id)
    window_div.classList.remove('window-hide')
    window_div.classList.remove('window-show')
    window_div.classList.add('window-hide')
}