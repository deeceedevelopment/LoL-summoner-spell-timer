module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      next();
    }
  } else {
    res.redirect("/admin/login");
  }
};
