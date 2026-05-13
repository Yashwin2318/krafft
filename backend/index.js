const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get('/', (req, res) => {
  res.send('Krafft API is running...');
});

// Mood curation route
app.post('/api/curate', async (req, res) => {
  const { mood, products } = req.body;

  if (!mood || !products) {
    return res.status(400).json({ error: 'Mood and products are required' });
  }

  try {
    const prompt = `
      You are a premium stationery curator for Krafft. 
      Given the mood "${mood}" and the following products:
      ${products.map(p => `${p.name} (${p.category}): ${p.description}`).join('\n')}
      
      Pick exactly 3 products that best fit this mood.
      For each product, provide a one-line reason (max 15 words) why it fits.
      Return the result as a JSON array of objects with "id" and "reason" fields.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' }
    });

    const curation = JSON.parse(response.choices[0].message.content);
    res.json(curation);
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ error: 'Failed to curate products' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
