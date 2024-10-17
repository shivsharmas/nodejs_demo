const UserRouter = require("./UserRoutes");

exports.RouterConfig = (app) => {
  app.use("/api/v1", UserRouter);
  
};
