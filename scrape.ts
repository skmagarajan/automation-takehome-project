import { chromium, Browser, Page, Locator, ElementHandle } from 'playwright';

async function scrapeData(): Promise<void> {
    const browser: Browser = await chromium.launch({
      headless: false // setting this to true will not run the UI
  });
    const page: Page = await browser.newPage();

    await page.goto('https://amazon.com');
    await page.waitForTimeout(1000); // wait for 5 seconds

    // Extract data from the webpage
    const title: string = await page.title();
    console.log('Page title:', title);

    await page.getByRole('textbox').fill('fathers day card');
    await page.click('input[value="Go"]');
    await page.waitForTimeout(5000);

    await  page.selectOption('#s-result-sort-select','Price: Low to High')
    await page.waitForTimeout(5000);

    for(let i = 1 ; i <= 3;i++){
      console.log(i);
      let productXPath = '(//*[@data-component-type="s-search-result"]//*[@class="a-section a-spacing-small puis-padding-left-small puis-padding-right-small"]//*[@class="a-size-base-plus a-color-base a-text-normal"])['+i+']';
      let priceXPath = '(//*[@data-component-type="s-search-result"]//*[@class="a-section a-spacing-none a-spacing-top-small s-price-instructions-style"]//*[@class="a-offscreen"])['+i+']';
      const productLocator: Locator = page.locator(productXPath);
      const priceLocator: Locator = page.locator(priceXPath);
      const titler: string = await productLocator.innerText();
      const price: string = await priceLocator.innerText();
      console.log(titler+" "+price);
    }

    await browser.close();
  }

  scrapeData().catch((err) => console.error(err));

  