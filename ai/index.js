const OpenAI = require('openai');

const client = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});

const analyzeReviews = async (reviews) => {
    const response = await client.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                role: 'system',
                content: `
                    Given the following reviews in Polish rate a company in terms of credibility,
                    profitability and tell if it's legit. As a result provide a percentage rating for the company
                    as well as a reasoning for that in Polish. Most important aspects should be weighed the most.
                    Reviews are separated by semicolons. As a response format you must use an JSON object (and nothing
                    else) with keys: generalRate (float value), profitabilityRate (float value), 
                    credibilityRate (float value), description (string value), mainPoints (array of strings).
                    Main points has to be a list (up to 5 points) of key information about the company.
                `,
            },
            {
                role: 'user',
                content: reviews.join(';'),
            }
        ],
    });

    let content = response.choices[0].message.content;

    if (content.startsWith('```json')) content = content.substring(7);
    if (content.endsWith('```')) content = content.substring(0, content.length - 3);

    return JSON.parse(content);
};

module.exports = { analyzeReviews };