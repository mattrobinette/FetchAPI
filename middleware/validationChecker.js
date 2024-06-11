const middleware = () => (req, res, next) => {
  if (req.body?.color?.toLowerCase() === 'orange') {
    res.status(400).json({
      error: 'We do not allow orange',
    });

    return;
  }

  req.body.validationPassed = true;
  next();
};

export default middleware;
