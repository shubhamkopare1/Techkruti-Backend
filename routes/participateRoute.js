const express = require('express');
const fs = require('fs');
const cors = require('cors');
const router = express.Router();
const { createObjectCsvWriter } = require('csv-writer');

const csvWriter = createObjectCsvWriter({
  path: './uploads/participants.csv',
  header: [
    { id: 'email', title: 'Email' },
    { id: 'phone', title: 'Phone' },
    { id: 'leader', title: 'Leader' },
    { id: 'teamName', title: 'TeamName' },
    { id: 'members', title: 'Members' },
    { id: 'utrId', title: 'UTR ID' },
    { id: 'college', title: 'College' },
    { id: 'upiPlatform', title: 'UPI Platform' }, // corrected id and title
  ],
  append: true,
});

router.post('/submit', async (req, res) => {
  const data = req.body;

  // Optional: Convert members array to string if needed for CSV
  if (Array.isArray(data.members)) {
    data.members = data.members
      .map((member, index) => `Member ${index + 1}: ${member.name}, ${member.phone}`)
      .join(' | ');
  }

  try {
    await csvWriter.writeRecords([data]);
    res.status(200).json({ message: 'Data saved to CSV' });
  } catch (err) {
    console.error('CSV Write Error:', err);
    res.status(500).json({ message: 'Failed to save data' });
  }
});

module.exports = router;
