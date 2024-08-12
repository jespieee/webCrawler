import { JSDOM } from 'jsdom'

function normalizeURL(url) {
    const urlObj = new URL(url)
    let fullPath = `${urlObj.host}${urlObj.pathname}`
    if (fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0, -1) // handle ending in '/'
    }
    return fullPath
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const anchors = dom.window.document.querySelectorAll('a')

    for (const anchor of anchors) {
        if (anchor.hasAttribute('href')) {
            let href = anchor.getAttribute('href')
            try {
                href = new URL(href, baseURL).href
                urls.push(href)
            } catch(err) {
                console.log(`${err.message}: ${href}`)
            }
        }
    }
    return urls
}

async function crawlPage(url) {

    let response
    try {
        response = await fetch(url)
    } catch(err) {
        throw new Error(`Got Network error: ${err.message}`)
    }

    if (response.status > 399) {
        console.log(`Got HTTP error" ${response.status} ${response.statusText}`)
        return
    }

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('text/html')) {
        console.log(`Content-type is: ${contentType}`)
        return
    }

    console.log(await response.text())
}

export { normalizeURL, getURLsFromHTML, crawlPage};