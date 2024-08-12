function printReport(pages) {
    console.log('=======================')
    console.log('Beginning the report...')
    console.log('=======================')
    const sortedPages = sortPages(pages)
    for (const page of sortedPages) {
        const url = page[0]
        const count = page[1] 
        console.log(`Found ${count} internal links to ${url}`)
    }
}

function sortPages(pages) {
    const pagesArr = Object.entries(pages)
    pagesArr.sort((pageA, pageB) => {
        if (pageA[1] === pageB[1]) {
            return pageA[0].localeCompare(pageB[0])
        }
        return pageB[1] - pageA[1]
    })
    return pagesArr
}

export { printReport, sortPages };