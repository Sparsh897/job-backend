const Job = require("../models/Job-model");

module.exports = {
  createJob: async (req, res) => {
    const newJob = new Job(req.body);
    try {
      await newJob.save();
      res
        .status(201)
        .json({ status: true, message: "Job created Successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateJob: async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
      res.status(404);
      throw new Error("job not found");
    }

    const updatedNote = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedNote);
  },

  deleteJob: async (req, res) => {
    const JobId = req.params.id;
    try {
      const deleteJob = await findByIdAndDelete(JobId);
      if (!deleteJob) {
        return res
          .status(404)
          .json({ status: false, message: "Job not deleted" });
      }
      res
        .status(200)
        .json({ status: true, message: "Job deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getJob: async (req, res) => {
    const JobId = req.params.id;
    try {
      const job = await Job.findById(
        { _id: JobId },
        { createdAt: 0, updatedAt: 0, __V: 0 }
      );
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.status(200).json({ job });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getAllJob: async (req, res) => {
    const results = req.query.new;
    try {
      let jobs;
      if (results) {
        jobs = await Job.find({}, { createdAt: 0, updatedAt: 0, __V: 0 })
          .sort({ createdAt: -1 })
          .limit(2);
      } else {
        jobs = await Job.find({}, { createdAt: 0, updatedAt: 0, __V: 0 });
      }
      res.status(200).json({ jobs });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  searchJob: async (req, res) => {
    try {
      const search = await Job.aggregate([
        [
          {
            $search: {
              index: "jobsearch",
              text: {
                query: req.params.key,
                path: {
                  wildcard: "*",
                },
              },
            },
          },
        ],
      ]);
      res.status(200).json(search);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
