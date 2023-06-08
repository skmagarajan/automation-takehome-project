export const helper = {
    '0': {
        name: 'Amazon',
        url: 'https://amazon.com',
        selectors: {
            searchInput: '//*[@id="twotabsearchtextbox"]',
            searchIcon: '//*[@id="nav-search-submit-button"]',
            sortDropdownButton: '//*[@class="a-dropdown-container"]',
            selectSortItem: '//*[@id="s-result-sort-select_1"]'
        },
        scrapePaths: [
            {
              id: 1,
              product: '//*[@data-component-type="s-search-result"]//*[@class="a-size-base-plus a-color-base a-text-normal"]',
              price:'//*[@data-component-type="s-search-result"]//*[@class="a-offscreen"]',
              link: '//*[@data-component-type="s-search-result"]//*[@class="a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal"]'
            },
            // For multiple XPaths setup
        ]
    }
}

export enum website {
    'amazon',
}