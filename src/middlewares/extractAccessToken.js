exports.extractAccessToken = (req, res, next) => {
  const access_token = req.headers.authorization?.slice(7);
  //console.log("access token header", access_token);
  req.user = {
    access_token,
  };
  next();
};
