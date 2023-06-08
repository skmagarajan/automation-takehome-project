"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeData = void 0;
var playwright_1 = require("playwright");
var helpers_1 = require("../helpers/helpers");
var csvWriter_1 = require("./csvWriter");
var input_1 = require("./input");
function scrapeData(searchItem, website, itemCount) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, title, records, XpathID, i, productXPath, priceXPath, linkXPath, product, price, link, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, playwright_1.chromium.launch({
                        headless: false // setting this to true will not run the UI
                    })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto(helpers_1.helper[website].url)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.waitForTimeout(1000)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.title()];
                case 5:
                    title = _a.sent();
                    console.log('Visited to page', title);
                    console.log("Navigating to ".concat(searchItem, " page"));
                    return [4 /*yield*/, page.locator(helpers_1.helper[website].selectors.searchInput).fill(searchItem)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, page.locator(helpers_1.helper[website].selectors.searchIcon).click()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, page.waitForTimeout(5000)];
                case 8:
                    _a.sent();
                    //Sort Item
                    return [4 /*yield*/, page.locator(helpers_1.helper[website].selectors.sortDropdownButton).click()];
                case 9:
                    //Sort Item
                    _a.sent();
                    return [4 /*yield*/, page.locator(helpers_1.helper[website].selectors.selectSortItem).click()];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, page.waitForTimeout(5000)];
                case 11:
                    _a.sent();
                    records = [];
                    XpathID = 0;
                    console.log('Scrapping products and prices...');
                    i = 1;
                    _a.label = 12;
                case 12:
                    if (!(i <= itemCount)) return [3 /*break*/, 19];
                    _a.label = 13;
                case 13:
                    _a.trys.push([13, 17, , 18]);
                    productXPath = "(".concat(helpers_1.helper[website].scrapePaths[XpathID].product, ")[").concat(i, "]");
                    priceXPath = "(".concat(helpers_1.helper[website].scrapePaths[XpathID].price, ")[").concat(i, "]");
                    linkXPath = "(".concat(helpers_1.helper[website].scrapePaths[XpathID].link, ")[").concat(i, "]");
                    return [4 /*yield*/, page.locator(productXPath).innerText()];
                case 14:
                    product = _a.sent();
                    return [4 /*yield*/, page.locator(priceXPath).innerText()];
                case 15:
                    price = _a.sent();
                    return [4 /*yield*/, page.locator(linkXPath).getAttribute('href')];
                case 16:
                    link = (_a.sent()) || '';
                    // Add https to the link if not present
                    if (link.startsWith('/')) {
                        link = "".concat(helpers_1.helper[website].url).concat(link);
                    }
                    records.push({
                        product: product,
                        price: price,
                        searchItem: searchItem,
                        link: link
                    });
                    return [3 /*break*/, 18];
                case 17:
                    error_1 = _a.sent();
                    // Moving to next Xpath array element
                    XpathID++;
                    // Starting from initial amount of item
                    i = 0;
                    // Clearing the stored records
                    records = [];
                    if (XpathID === helpers_1.helper[website].scrapePaths.length) {
                        console.log('Please check XPATHs');
                        return [3 /*break*/, 19];
                    }
                    console.log('Trying Next XPath: ' + XpathID);
                    return [3 /*break*/, 18];
                case 18:
                    i++;
                    return [3 /*break*/, 12];
                case 19:
                    (0, csvWriter_1.writeToCSV)(helpers_1.helper[website].name, records);
                    return [4 /*yield*/, browser.close()];
                case 20:
                    _a.sent();
                    console.log('Browser closed {*_*} See you soon!!');
                    return [2 /*return*/];
            }
        });
    });
}
exports.scrapeData = scrapeData;
scrapeData(input_1.SEARCHTERM, helpers_1.website[input_1.WEBSITE], input_1.NUMBER_OF_ITEMS).catch(function (err) { return console.error(err); });
