import { chromium, Browser, Page, Locator, ElementHandle } from 'playwright';
import { helper, website } from './helpers/helpers';

async function scrapeData(searchItem: string, website: number): Promise<void> {
    const browser: Browser = await chromium.launch({
      headless: false // setting this to true will not run the UI
    });
    const page: Page = await browser.newPage();

    await page.goto(helper[website].url);
    await page.waitForTimeout(1000); // wait for 5 seconds

    // Extract data from the webpage
    const title: string = await page.title();
    console.log('Page title:', title);

    await page.locator(helper[website].selectors.searchInput).fill(searchItem);
    await page.locator(helper[website].selectors.searchIcon).click();
    await page.waitForTimeout(5000);

    //Sort Item
    await page.locator(helper[website].selectors.sortDropdownButton).click();
    await page.locator(helper[website].selectors.selectSortItem).click();
    await page.waitForTimeout(5000);

    var records: any = [];

    let XpathID = 0;

    for(let i = 1 ; i <= 3;i++){
      try{
        let productXPath = `(${helper[website].scrapePaths[XpathID].product})[${i}]`;
        let priceXPath = `(${helper[website].scrapePaths[XpathID].price})[${i}]`;
        let linkXPath = `(${helper[website].scrapePaths[XpathID].link})[${i}]`;
        const productLocator: Locator = page.locator(productXPath);
        const priceLocator: Locator = page.locator(priceXPath);
        const linkLocator: Locator = page.locator(linkXPath);
        const product: string = await productLocator.innerText();
        const price: string = await priceLocator.innerText();
        let link: string = await linkLocator.getAttribute('href') || '';
        if(link.startsWith('/')){
          link = `${helper[website].url}${link}`
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
        if(XpathID === helper[website].scrapePaths.length){
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

scrapeData('nike shoes', website.amazon).catch((err) => console.error(err));

  