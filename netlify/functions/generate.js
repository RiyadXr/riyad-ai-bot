const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    try {
        const body = JSON.parse(event.body);
        const userPrompt = body.prompt;

        const response = await fetch(
            'https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.GOOGLE_API_KEY}`
                },
                body: JSON.stringify({
                    prompt: { text: userPrompt }
                })
            }
        );

        const data = await response.json();

        // Send back the AI reply
        const reply = data?.candidates?.[0]?.output?.[0]?.content?.[0]?.text || "No response";

        return {
            statusCode: 200,
            body: JSON.stringify({ reply })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
