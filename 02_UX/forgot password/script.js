document.getElementById('forgot-password-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const messageElement = document.getElementById('message');

    try {
        const response = await fetch('/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        messageElement.textContent = data.message;
    } catch (error) {
        messageElement.textContent = 'An error occurred. Please try again.';
    }
});
