const expect = require('chai').expect;
const puppeteer = require('puppeteer'); 

const fs = require('fs');

let browser;
let page;

beforeEach(async () => {
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
    describe('text input', () => {
        let textInput;
            it('has an id of "name"', async () => {
                textInput = await page.$('form input#name');
                expect(textInput).to.exist;
            });
            it('has a placeholder of "Please enter username"', async () => {
                const placeholder = await textInput.evaluate(el => el.getAttribute("placeholder"), textInput);
                expect(placeholder).to.equal("Please enter username");
            })
        })
        it("should have the title", async () => {
            expect(await page.title()).to.equal("PostIt's")
        });
after(async () => {
            await browser.close();
        })
    
    })
})

