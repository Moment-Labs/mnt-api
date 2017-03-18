'use strict';

module.exports = {
  query_sessions,
  create_session
};


// GET /salesforce_sessions
function query_sessions(req, res, next) {
  res.json({
    session: [{
      id: 1,
      sf_id: "jndiu3ndiqjndkqw3ndi3un293djn"
    }]
  })
}

// POST /salesforce_sessions
function create_session(req, res, next) {
  console.log("Created Session");
  res.status(202).json({
    session: {
      id: 1,
      sf_id: req.body.sf_id
    }
  })
}