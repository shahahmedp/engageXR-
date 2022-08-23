/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = function (app: any) {
    /**
   *  all routes imported and exported here .
   *
   * @param req
   * @param res
   */
    module.exports=require('./auth.routes')(app);
    module.exports=require('./user.routes')(app);
    module.exports=require('./company.routes')(app);
    module.exports=require('./employee.routes')(app)
}
