import 'dotenv/config';
import app from './app';
import { initDB } from './config/initDB';

const PORT = process.env.PORT || 4000;

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
  });
});
