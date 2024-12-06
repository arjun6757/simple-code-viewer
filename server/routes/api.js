// routes/api.js

import express from 'express';
const router = express.Router();
import { getRepoUrl, getDirData, getQueryData } from '../controllers/repoController.js';

// Route for /code/repo endpoint
router.get('/code/repo', getRepoUrl); // will execute the getRepoUrl function from the controller

// router.get('/code/pinned', getGraphQLData); // will execute the getGraphQLData function from the controller
// not now will user it later

router.get('/code/repo/query', getQueryData);
router.get('/code/repo/:path', getDirData);

export default router;
