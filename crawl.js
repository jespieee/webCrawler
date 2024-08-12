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

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {

    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    const normalCurrentURL = normalizeURL(currentURL)
    if (pages[normalCurrentURL] > 0) {
        pages[normalCurrentURL]++
        return pages
    }
    pages[normalCurrentURL] = 1

    console.log(`crawling ${currentURL}`)
    let response = ''
    try {
        response = await fetchAndParseURL(currentURL)
    } catch(err) {
        console.log(`${err.message}`)
        return pages
    }

    const responseURLs = getURLsFromHTML(response, baseURL)
    for (const url of responseURLs) {
        pages = await crawlPage(baseURL, url, pages)
    }

    return pages
}

async function fetchAndParseURL(url) {
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

    return response.text()
}

export { normalizeURL, getURLsFromHTML, crawlPage };