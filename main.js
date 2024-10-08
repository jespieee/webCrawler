import { crawlPage } from "./crawl.js"
import { printReport } from "./report.js"

async function main() {
    if (process.argv.length < 3) {
        console.log('The number of arguments was less than 1, exiting!')
        return
    }
    else if (process.argv.length > 3) {
        console.log('The number of arguments was greater than 1, exiting!')
        return
    }
    const baseURL = process.argv[2]
    
    console.log(`Beginning to crawl starting at: ${baseURL}`)
        
    const pages = await crawlPage(baseURL)

    printReport(pages)
}

main()