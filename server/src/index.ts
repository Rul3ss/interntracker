import express from 'express';
import cors from 'cors';
import { announcementController } from './controllers/AnnouncementController';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/announcements', (req, res) => announcementController.getAll(req, res));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
