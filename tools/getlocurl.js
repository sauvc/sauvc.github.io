const puppeteer = require('puppeteer');

var args = process.argv.slice(2);
var sterm = args[0];

(async () => {
  browser = await puppeteer.launch({headless: false});
  const [page] = await browser.pages();
  await page.setRequestInterception(true);
  await page.setJavaScriptEnabled(false);
  page.on("request", request => {
    request.resourceType() === "document"
      ? request.continue()
      : request.abort();
  });
  await page.goto("https://www.google.com/", {
    waitUntil: "domcontentloaded",
  });
  await page.type("textarea", sterm);
  await page.$eval('[aria-label="Google Search"]', el => el.click());
  try {
    await page.waitForSelector(".LrzXr", {visible: true});
  }catch(e){//ignored
  };
  let locResults = "";
  let urlResults = "";
  try {
    locResults = await page.$$eval(".LrzXr", els =>
      els.map(e => e.children.length == 0 ? e.innerHTML : "")[0]
    );
  }catch(e){//ignored
  };
  try {
    urlResults = await page.$$eval(".LC20lb", els =>
      els.map(e => e.parentNode.href)[0]
    );
  }catch(e){//ignored
  };
  console.log(`${sterm}:\t${urlResults}\t${locResults}`);
})()
  .catch(err => console.error(err))
  .finally(() => browser?.close())
;