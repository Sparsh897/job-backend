const router = require('express').Router();
const jobController= require('../controllers/jobController');





router.get('/getAllJob',jobController.getAllJob);
router.get('/getJob/:id',jobController.getJob);
router.get('/searchJobs/:key',jobController.searchJob);
router.post('/createJob',jobController.createJob);
router.put('/updateJob/:id',jobController.updateJob);
router.delete('deleteJob/"id',jobController.deleteJob);








module.exports=router;