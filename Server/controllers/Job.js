const Job = require('../module/Job')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, NotFoundError } = require("../errors");
const getAllJobs = async (req, res) => {
  const {user: {userId},user: {name}} = req;
  const job = await Job.find({createdBy: userId})
  res.status(StatusCodes.OK).json({job,name, counts: job.length})
};
const createJob = async  (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create({...req.body})
  res.status(StatusCodes.CREATED).json({job})
}; 
const updateJob = async (req, res) => {
  const {user: {userId}, params: {id: jobId}} = req;
  const {company, position} = req.body;
  if(!company==='' || !position===''){
    throw new BadRequestError('Company or position field cannot be empty')
  }

  const job = await Job.findOneAndUpdate({ _id: jobId, createdBy: userId,}, {...req.body}, {new: true, runValidators: true})
  if(!job){
    throw new NotFoundError(`No job found with id ${jobId}`); 
  }
  res.status(StatusCodes.OK).json({job})
}; 
const deleteJob = async (req, res) => {  
  const {user: {userId}, params: {id: jobId}} = req;
  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId})
  if(!job){
    throw new NotFoundError(`No job found with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({msg: 'Successfully Deleted', job})
}; 
const getJob = async (req, res) => {
  const {user: {userId}, params: {id: jobId}} = req;
  const job = await Job.findOne({_id: jobId, createdBy: userId})
  if(!job){
    throw new NotFoundError(`No job found with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({job})
};

const deleteAll = async (req, res) => {
  const {user: {userId}} = req
  const job = await Job.deleteMany({})
  res.status(StatusCodes.OK).json({msg: 'Successfully deleted all Jobs'})
}

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  deleteAll 
};
