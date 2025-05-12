const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// LibreTranslate endpoint
const LT_URL = 'https://translate.argosopentech.com/translate ';

app.post('/api/translate-audio', async (req, res) => {
  const targetLang = req.body.lang || 'es';
  const fakeTranscript = "This is a sample spoken phrase from the video.";

  try {
    const translation = await axios.post(LT_URL, {
      q: fakeTranscript,
      source: 'en',
      target: targetLang,
      format: 'text'
    });

    res.json({
      original: fakeTranscript,
      translated: translation.data.translatedText
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Translation failed' });
  }
});

app.get('/', (req, res) => {
  res.redirect('/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
