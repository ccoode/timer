function launchFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}

function toggleFullscreen() {
  const fullscreenElement = document.fullscreenElement ||
    document.mozFullScreenElement || document.webkitFullscreenElement
  if (!fullscreenElement) {
    launchFullscreen(document.documentElement)
  } else {
    exitFullscreen()
  }
}

export default toggleFullscreen
