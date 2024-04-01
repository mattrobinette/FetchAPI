const colorChecker = () => (req, res, next) => {
  // eslint-disable-next-line no-constant-condition
  if (req.body?.color?.toLowerCase() !== 'red' || 'green' || 'blue') {
    res.status(400).json({
      error: 'Invalid color submitted',
    });
  }
  const colors = {
    red: '#ff0000',
    green: '#00ff00',
    blue: '#0000ff',
  };

  const color = req.body.color.toLowerCase();

  if (colors[color]) {
    req.body.hexColor = colors[color];
  }

  req.body.validationPassed = true;
  next();
};

const errorHandler = (err, req, res, next) => {
  console.error(`ERROR : The Following Error occurred : ${err}`);

  // Send response to client.
  res.status(500).json({
    error: true,
    errorMessage: 'Something went wrong, please contact support.',
  });
  next();
};

export { colorChecker, errorHandler };
