Step 2: Create a function file
Inside functions/, create a file called generate.js. Copy this code:

javascript
Copy code
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const userPrompt = JSON.parse(event.body).prompt;
    const apiKey = process.env.GOOGLE_API_KEY;

    const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: { text: userPrompt }
            })
        }
    );

    const data = await response.json();

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
};