const express = require('express')
const request = require('request-promise')

const app = express();
const PORT = process.env.PORT || 5000;

const apiKey = 'db58537ffdd8a853d2999256bb43758f';
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scrapper API')
});

/**
 * Get Product details
 * @param productId e.g. B08G3YGDJ1
 * @author Kapol Brondon <kapolw@gmail.com>
 */
app.get('/products/:productId', async(req, res) => {
    const { productId } = req.params;
    const api_key = req.query;
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
});

/**
 * Get Product reviews
 * @param productId e.g. B08G3YGDJ1
 * @author Kapol Brondon <kapolw@gmail.com>
 */
app.get('/products/:productId/reviews', async(req, res) => {
    const { productId } = req.params;
    const api_key = req.query;
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
});


/**
 * Get Product offers
 * @param productId e.g. B08G3YGDJ1
 * @author Kapol Brondon <kapolw@gmail.com>
 */
app.get('/products/:productId/offers', async(req, res) => {
    const { productId } = req.params;
    const api_key = req.query;
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
});

/**
 * Get Search Results
 * @param query e.g. "MacBook"
 * @author Kapol Brondon <kapolw@gmail.com>
 */
app.get('/search/:query', async(req, res) => {
    const { query } = req.params;
    const api_key = req.query;
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${query}`);
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
});




app.listen(PORT, () => console.log(`
Server running on port ${PORT}
`));