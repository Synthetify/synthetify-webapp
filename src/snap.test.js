import puppeteer from 'puppeteer'

const takeScreen = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: 1366, height: 2100 })

  const app = 'http://localhost:9009/'
  await page.goto(app, { waitUntil: 'networkidle2' })
  await page.waitForSelector('#storybook-preview-wrapper', 0)
  const element = await page.$('#storybook-preview-wrapper')
  await page.waitForSelector('div.css-ohbggj', 0)
  const btns = await page.$$('div.css-ohbggj > button')
  await btns.map(async btn => {
    const idSplit = btn._remoteObject.description.split('.')[0]
    const itemId = idSplit.slice(idSplit.indexOf('#'))
    await page.evaluate(selector => document.querySelector(selector).click(), itemId)
  })
  const links = await page.$$('div.css-ohbggj a')
  for (let i = 0; i < links.length; i++) {
    const idSplit = links[i]._remoteObject.description.split('.')[0]
    const itemId = idSplit.slice(idSplit.indexOf('#'))
    await page
      .evaluate(selector => document.querySelector(selector).click(), itemId)
      .then(async () => {
        await new Promise(resolve => setTimeout(resolve, 500))
        await element.screenshot({ path: `screenshots/${itemId}.png` })
      })
  }
}

test('storybook snapshot', async () => {
  jest.setTimeout(100000)
  await takeScreen()
})
