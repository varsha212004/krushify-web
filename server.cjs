const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();
app.use(express.json());

const supabase = createClient(
  'https://YOUR_PROJECT_ID.supabase.co',
  'YOUR_SERVICE_ROLE_KEY' // Use service role key, NOT anon key
);

app.post('/api/login-phone', async (req, res) => {
  const { phone, password } = req.body;
  // Query auth.users for user with matching phone in user_metadata
  const { data, error } = await supabase
    .from('auth.users')
    .select('email, user_metadata')
    .eq('user_metadata->>phone', phone)
    .single();

  if (error || !data) {
    return res.status(401).json({ error: 'User not registered or invalid phone number' });
  }

  // Use email + password login
  const { error: loginErr, data: loginData } = await supabase.auth.signInWithPassword({
    email: data.email,
    password,
  });

  if (loginErr) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  // Return user/session info as needed
  res.json({ user: loginData.user });
});

app.listen(3001, () => console.log('API running on port 3001'));
