const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const router = express.Router();
const { isAdmin ,isLoggedIn} = require('../middleware/authMiddleware');

// Util to normalize each row
function normalizeRow(row) {
  const membersRaw = row.members || '';

  const memberEntries = membersRaw.split('|').map(entry => {
    const match = entry.trim().match(/Member \d+: (.+), (\d{10})/);
    if (match) {
      return {
        name: match[1].trim(),
        phone: match[2].trim()
      };
    }
    return null;
  }).filter(Boolean);

  return {
    email: row.email || '',
    phone: row.phone || '',
    leaderName: row.leaderName || '',
    leaderPhone: row.phone || '', // same as phone if no separate field
    members: memberEntries,
    utrId: row.utrId || '',
    college: row.college || '',
    paymentPlatform: row.paymentPlatform || '',
    teamName: row.teamName || `Team_${Math.floor(Math.random() * 1000)}`
  };
}



router.get('/participants', async (req, res) => {
  const results = [];

 fs.createReadStream('./uploads/participants.csv')
  .pipe(csv({
    headers: ['email', 'phone', 'leaderName', 'teamName', 'members', 'utrId', 'college', 'paymentPlatform'],
    skipLines: 0
  }))
  .on('data', (row) => {
    const normalized = normalizeRow(row);
    results.push(normalized);
  })
  .on('end', () => {
    res.status(200).json({ participants: results });
  })
  .on('error', (err) => {
    console.error('CSV Read Error:', err);
    res.status(500).json({ message: 'Failed to read CSV' });
  });

});

module.exports = router;

