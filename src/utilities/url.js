export default {
  wrapUrl(url) {
    url = url || ''
    let href = window.location.href
    let targetUri = new URL(url, href)
    let currentUri = new URL(href)
    currentUri.searchParams.forEach((value, key) => {
      targetUri.searchParams.set(key, value)
    })
    return targetUri.href
  }
}