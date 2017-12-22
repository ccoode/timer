const unlisten = (arr, fn) => () => {
  for (let i = arr.length - 1; i > -1; i -= 1) {
    if (arr[i] === fn) {
      arr.splice(i, 1)
    }
  }
}

export default unlisten
