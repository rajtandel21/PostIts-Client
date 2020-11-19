const expect = require('chai').expect;
const puppeteer = require('puppeteer'); 

const fs = require('fs');

let browser;
let page;

before(async () => {
    try {
        browser = await puppeteer.launch({headless: true});
        page = await browser.newPage();
        const html = fs.readFileSync('index.html', {encoding: 'utf-8'});
        await page.setContent(html)
    } catch {
        done();
    }
    
});

describe('index.html', () => {

    describe('form', () => {
        it('exists', async () => {
            const form = await page.$('form');
            expect(form).to.exist;
        });
        })
        after(async () => {
            await browser.close();
        })
    })
