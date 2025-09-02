const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace with your connection string)
mongoose.connect('mongodb+srv://yourUser:yourPassword@cluster0.mongodb.net/heroParticles?retryWrites=true&w=majority
', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Define User schema & model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  highScore: { type: Number, default: 0 },
  messages: [{ type: String }]
});

const User = mongoose.model('User', userSchema);

// Routes

// Add new user
app.post('/api/users', async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'Username required' });

    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ error: 'User already exists' });

    user = new User({ username });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user by username
app.get('/api/users/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user high score
app.put('/api/users/:username/score', async (req, res) => {
  try {
    const { highScore } = req.body;
    if (typeof highScore !== 'number') return res.status(400).json({ error: 'High score must be a number' });

    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      { $max: { highScore } },  // update if new score is higher
      { new: true }
    );

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add message for user
app.post('/api/users/:username/messages', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message required' });

    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      { $push: { messages: message } },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
