import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import userRoutes from './routes/user.routes.js';
import itemRoutes from './routes/Items.route.js';

dotenv.config();

//app config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/items', itemRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'TrackItDown API is running!' });
});

// Error handling middleware //new
// app.use((error, req, res, next) => {
//   if (error instanceof multer.MulterError) {
//     if (error.code === 'LIMIT_FILE_SIZE') {
//       return res.status(400).json({
//         success: false,
//         message: 'File size too large. Maximum size is 5MB.'
//       });
//     }
//     if (error.code === 'LIMIT_FILE_COUNT') {
//       return res.status(400).json({
//         success: false,
//         message: 'Too many files. Maximum is 5 images.'
//       });
//     }
//   }

//   res.status(500).json({
//     success: false,
//     message: error.message || 'Something went wrong!'
//   });
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});