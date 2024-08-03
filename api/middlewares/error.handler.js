function logErrors (err,req,res,next) {
  console.error(err);
  next(err);
}

function errorHandlerlogErrors(err, req, res, next) {
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  })
}

function boomHandlerlogErrors(err, req, res, next) {
  if (err.isBoom) {
    const {output} = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

module.exports = { logErrors, errorHandlerlogErrors, boomHandlerlogErrors };
