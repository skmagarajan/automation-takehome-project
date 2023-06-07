import { chromium, Browser, Page, Locator, ElementHandle } from 'playwright';

async function scrapeData(searchItem, URL): Promise<void> {
    const browser: Browser = await chromium.launch({
      headless: false // setting this to true will not run the UI
  });
    const page: Page = await browser.newPage();

    await page.goto(URL);
    await page.waitForTimeout(1000); // wait for 5 seconds

    // Extract data from the webpage
    const title: string = await page.title();
    console.log('Page title:', title);

    await page.getByRole('textbox').fill(searchItem);
    await page.click('input[value="Go"]');
    await page.waitForTimeout(5000);

    await  page.selectOption('#s-result-sort-select','Price: Low to High')
    await page.waitForTimeout(5000);

    var records: any = [];

    let Xpaths = [
      {
        id: 1,
        product: '//*[@class="a-size-base-plus a-color-base a-text-normal"]',
        price:'//*[@class="a-offscreen"]',
        link: '//*[@class="a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal"]'
      }
    ]

    let XpathID = 0;

    for(let i = 1 ; i <= 3;i++){
      try{
        let productXPath = `(${Xpaths[XpathID].product})[${i}]`;
        let priceXPath = `(${Xpaths[XpathID].price})[${i}]`;
        let linkXPath = `(${Xpaths[XpathID].link})[${i}]`;
        const productLocator: Locator = page.locator(productXPath);
        const priceLocator: Locator = page.locator(priceXPath);
        const linkLocator: Locator = page.locator(linkXPath);
        const product: string = await productLocator.innerText();
        const price: string = await priceLocator.innerText();
        let link: string = await linkLocator.getAttribute('href') || '';
        if(link.startsWith('/')){
          link = `${URL}${link}`
        }
        console.log(product+" "+price+" "+link);
  
        let productItem = {
          product,
          price,
          searchItem,
          link
        }
  
        records.push(productItem)
      }
      catch(error){
        XpathID++;
        i = 0;
        records = [];
        if(XpathID === Xpaths.length){
          console.log('Please check XPATHs');
          break;
        }
        console.log('Trying Next XPath: '+ XpathID);
      }
    }
  if(records.length > 0) {
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        path: 'file.csv',
        header: [
            {id: 'product', title: 'Product'},
            {id: 'price', title: 'Price'},
            {id: 'searchItem', title: 'Search Item'},
            {id: 'link', title: 'Link'}
        ]
    });
      
    csvWriter.writeRecords(records)       // returns a promise
        .then(() => {
            console.log('CSV locally saved...');
        });
  }
  else{
    console.log('No records found');
  }

  await browser.close();
}

scrapeData('nike shoes', 'https://amazon.com').catch((err) => console.error(err));

  