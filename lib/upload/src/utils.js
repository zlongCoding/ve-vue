export const imgLoad = (src, callback) => {
  let img = new Image()
  img.src = src
  img.onload = () => {
    callback(img.width, img.height)
  }
}
