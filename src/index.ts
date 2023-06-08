import { chromium, Browser, Page } from 'playwright';
import { helper, website } from '../helpers/helpers';
import { writeToCSV } from './csvWriter';
import { WEBSITE, NUMBER_OF_ITEMS, SEARCHTERM } from './input';

export async function scrapeData(searchItem: string, website: number, itemCount: number): Promise<void> {
    const browser: Browser = await chromium.launch({
      headless: false // setting this to true will not run the UI
    });
    const page: Page = await browser.newPage();

    await page.goto(helper[website].url);
    await page.waitForTimeout(1000); 

    // Extract data from the webpage
    const title: string = await page.title();
    console.log('Visited to page', title);
    console.log(`Navigating to ${searchItem} page`);
    await page.locator(helper[website].selectors.searchInput).fill(searchItem);
    await page.locator(helper[website].selectors.searchIcon).click();
    await page.waitForTimeout(5000);

    //Sort Item
    await page.locator(helper[website].selectors.sortDropdownButton).click();
    await page.locator(helper[website].selectors.selectSortItem).click();
    await page.waitForTimeout(5000);

    var records: any = [];

    let XpathID = 0;
    console.log('Scrapping products and prices...');
    for(let i = 1 ; i <= itemCount;i++){
      try{
        let productXPath = `(${helper[website].scrapePaths[XpathID].product})[${i}]`;
        let priceXPath = `(${helper[website].scrapePaths[XpathID].price})[${i}]`;
        let linkXPath = `(${helper[website].scrapePaths[XpathID].link})[${i}]`;

        const product: string = await page.locator(productXPath).innerText();
        const price: string = await page.locator(priceXPath).innerText();
        let link: string = await page.locator(linkXPath).getAttribute('href') || '';

        // Add https to the link if not present
        if(link.startsWith('/')){
          link = `${helper[website].url}${link}`
        }

        records.push({
          product,
          price,
          searchItem,
          link
        })
      }
      catch(error){
        // Moving to next Xpath array element
        XpathID++;
        // Starting from initial amount of item
        i = 0;
        // Clearing the stored records
        records = [];

        if(XpathID === helper[website].scrapePaths.length){
          console.log('Please check XPATHs');
          break;
        }
        console.log('Trying Next XPath: '+ XpathID);
      }
    }
  
  writeToCSV(helper[website].name,records);
  await browser.close();
  console.log('Browser closed {*_*} See you soon!!')
}

scrapeData(SEARCHTERM, website[WEBSITE], NUMBER_OF_ITEMS).catch((err) => console.error(err));

  