const express = require('express')
const { getAllJobs, createJob, updateJob, deleteJob, getJob, deleteAll } = require('../controllers/Job')
const router = express.Router()

router.route('/').get(getAllJobs).post(createJob).delete(deleteAll)
router.route('/:id').patch(updateJob).delete(deleteJob).get(getJob)

module.exports = router