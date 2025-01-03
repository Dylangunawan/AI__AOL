const apiKey = 'sk-UTcfRbd5NPgSjJnzFD3cutS-LWcSM6TcbGWWM79S6ST3BlbkFJ0qwUz9XMqiM5hmtOT2rdR0Gd5LLdRxTqEafKmkxvIA'; 
// Don't expose this directly in production
// L IDGAF
async function chatRequest(ingr) {
    try {
        const message = `Look at the list of items in the ingredients and make a recipe step by step and don't use time for steps. Instead, explain its expected result or condition during the step. There will be (healthy) or (vegan) or etc., so follow those tags. The current ingredients are: ${ingr}`;
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }],
                temperature: 0,
                max_tokens: 1000,
            }),
        });

        // Parse the response to JSON
        const data = await response.json();

        // Log the full data to debug and see its structure
        console.log(data);

        // Check if choices array exists and has elements
        if (data.choices && data.choices.length > 0) {
            const content = data.choices[0].message.content;
            console.log(content);
            document.getElementById('modifiable-text').textContent = content;
        } else {
            console.error('Error: No choices returned in the response.');
        }
    } 
    catch (err) {
        console.error('Error:', err);
    }
    
};

// Variable to hold the input value
let ingr = "";

// Function to update the modifiable text
function updateText() {
    const inputElement = document.getElementById('input-text');
    ingr = inputElement.value;
    document.getElementById('modifiable-text').textContent = chatRequest(ingr);
}

// Wait for the DOM to fully load before adding event listener
document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-button');
    sendButton.addEventListener('click', updateText);
});