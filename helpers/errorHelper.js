function handleError(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}

function handle404 (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
}

module.exports.handleError = handleError;
module.exports.handle404 = handle404;