import express from 'express';

import {
    searchForQuery,
    getDirectoryContent,
    getPinnedRepos,
    getHomePageURL,
} from '../controllers/repoControllerv2.js';


const router = express.Router();

router.get('/search', searchForQuery);
router.get('/contents', getDirectoryContent);
router.get('/pinned', getPinnedRepos);
router.get('/homepage', getHomePageURL);

export default router;