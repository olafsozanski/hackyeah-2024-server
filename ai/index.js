const OpenAI = require('openai');

const client = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});

const analyzeReviews = async (reviews) => {
    return {
        "analysis": {
            "generalRate": 60,
            "profitabilityRate": 65,
            "credibilityRate": 55,
            "description": "Firma jest umiarkowanie godna zaufania i rentowna, jednak powtarzające się problemy z komunikacją i realizacją zamówień mogą stanowić wyzwanie. Mimo że sprzęt geologiczny został dostarczony na czas i spełniał oczekiwania, to błędy na fakturach i niespodziewane zmiany warunków płatności komplikują współpracę.",
            "mainPoints": [
                "Błędy na fakturach i długi czas oczekiwania na korektę.",
                "Niespodziewane zmiany warunków płatności.",
                "Opóźnienia w dostawach, brak wcześniejszej informacji o zmianach terminów.",
                "Dobra jakość dostarczonego sprzętu geologicznego.",
                "Drobne opóźnienia w komunikacji, ale ogólnie pozytywna obsługa."
            ]
        },
        "company": {
            "address": {
                "line1": "ul. Przemysłowa 12",
                "line2": "Lok. 5",
                "city": "Warszawa",
                "zipCode": "00-001"
            },
            "_id": "66f882b9273528af2c1f9b4b",
            "nip": "1137749935",
            "name": "Bandigo S.A.",
            "startDate": "2023-06-18T00:00:00.000Z",
            "__v": 0
        }
    };
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