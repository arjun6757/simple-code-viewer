// routes/api.js

import express from 'express';
const router = express.Router();
import { searchForQuery, getRepoUrl, getDirData, getQueryData, getPinnedRepos, getSelectedRepoData, getHomePageURL } from '../controllers/repoController.js';

// Route for /code/repo endpoint
router.get('/default', getRepoUrl); // will execute the getRepoUrl function from the controller

router.get('/search', searchForQuery);
router.get('/query', getQueryData);
router.get('/code/repo/:path', getDirData);
router.get('/user/pinned', getPinnedRepos);
router.get('/user/select/:selected_repo', getSelectedRepoData);
router.get('/current/homepage_url', getHomePageURL)

export default router;
