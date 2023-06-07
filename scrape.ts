import { chromium, Browser, Page, Locator, ElementHandle } from 'playwright';

async function scrapeData(searchItem): Promise<void> {
    const browser: Browser = await chromium.launch({
      headless: false // setting this to true will not run the UI
  });
    const page: Page = await browser.newPage();

    await page.goto('https://amazon.com');
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
        product: '//*[@data-component-type="s-search-result"]//*[@class="a-section a-spacing-small puis-padding-left-small puis-padding-right-small"]//*[@class="a-size-base-plus a-color-base a-text-normal"]',
        price:'//*[@data-component-type="s-search-result"]//*[@class="a-section a-spacing-none a-spacing-top-small s-price-instructions-style"]//*[@class="a-offscreen"]',
        link: '//*[@data-component-type="s-search-result"]//*[@class="a-section a-spacing-small puis-padding-left-small puis-padding-right-small"]//*[@class="a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal"]'
      },
      {
        id: 2,
        product: '//*[@data-component-type="s-search-result"]//*[@class="a-section a-spacing-small puis-padding-left-small puis-padding-right-small"]//*[@class="a-size-base-plus a-color-base a-text-normal"]',
        price:'//*[@data-component-type="s-search-result"]//*[@class="a-section a-spacing-none a-spacing-top-small s-price-instructions-style"]//*[@class="a-offscreen"]',
        link: '//*[@data-component-type="s-search-result"]//*[@class="a-section a-spacing-small puis-padding-left-small puis-padding-right-small"]//*[@class="a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal"]'
      }
    ]

    let XpathID = 0;

    for(let i = 1 ; i <= 3;i++){
      try{
        let productXPath = `(${Xpaths[XpathID].product})[${i}]`;
        let priceXPath = '(//*[@data-component-type="s-search-result"]//*[@class="a-section a-spacing-none a-spacing-top-small s-price-instructions-style"]//*[@class="a-offscreen"])['+i+']';
        let linkXPath = '(//*[@data-component-type="s-search-result"]//*[@class="a-section a-spacing-small puis-padding-left-small puis-padding-right-small"]//*[@class="a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal"])['+i+']';
        const productLocator: Locator = page.locator(productXPath);
        const priceLocator: Locator = page.locator(priceXPath);
        const linkLocator: Locator = page.locator(linkXPath);
        const product: string = await productLocator.innerText();
        const price: string = await priceLocator.innerText();
        const link: string = await linkLocator.getAttribute('href') || '';
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
        console.log(error);
      }
    }

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

    await browser.close();
  }

  scrapeData('Mysore Sandal').catch((err) => console.error(err));

  