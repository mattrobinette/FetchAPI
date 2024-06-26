const middleware = () => (req, res, next) => {
  if (req.body?.name?.age?.breed?.location?.() === null) {
    res.status(400).json({
      error: 'Required fields must be filled out',
    });

    return;
  }

  req.body.validationPassed = true;
  next();
};

export default middleware;
