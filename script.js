const btn = document.getElementById('generateBtn');
const responseDiv = document.getElementById('response');

btn.addEventListener('click', async () => {
  const prompt = document.getElementById('prompt').value.trim();
  if (!prompt) {
    responseDiv.textContent = 'Please enter a theme for your compliment 💬';
    return;
  }

  responseDiv.textContent = '✨ Thinking of something amazing...';

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_API_KEY_HERE`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an enthusiastic compliment generator that makes creative, funny, and heartfelt compliments tailored to user themes.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.9
      })
    });

    const data = await res.json();
    responseDiv.textContent = data.choices[0].message.content;
  } catch (error) {
    responseDiv.textContent = '⚠️ Something went wrong! Check console.';
    console.error(error);
  }
});
