import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Fetch user data from your backend (adjust the URL as necessary)
      const response = await fetch('http://localhost:5000/api/user'); // BE API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      res.status(200).json(data); // Return the data to the frontend
    } catch (error) {
      res.status(500).json({ message: 'Failed to load user data' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}