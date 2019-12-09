const puppeteer = require('puppeteer');

var args = process.argv.slice(2);
var sterm = args[0];

// console.log('Searching for ' + sterm);

(async () => {
  try{
    console.log('Starting browser');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 946,
      deviceScaleFactor: 1,
    });
    console.log('Searching..');
    await page.goto('https://www.google.com/search?q=' + encodeURIComponent(sterm), {
      waitUntil: ['load', 'domcontentloaded', 'networkidle0']
    });
    await page.screenshot({path: sterm+'.png'});
    // let html = await page.$eval('div[data-attrid="kc:/location/location:address"]', el => el.innerHTML);
    console.log('Scraping..');
    let html = await page.$eval('.LrzXr', el => el.innerHTML);
    console.log('>> ' + sterm + ' : ' + html);

    await browser.close();
  } catch(ex){
    console.log('>> ' + sterm + ' : ');
    console.log(ex);
    process.exit(1);
  }
})();
