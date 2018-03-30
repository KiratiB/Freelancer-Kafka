var mongo = require("./mongo");
// var mongoURL = "mongodb://localhost:27017/freelancer";
var mongoURL = "mongodb://root:kirati@ds243059.mlab.com:43059/freelancer";
function handle_request(msg, callback) {

    var res = {};

    mongo.connect(mongoURL, function () {

        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('project');
        var user_entry = {
            "project_name": msg.req.projectname,
            "description":msg.req.projectdescription,
            "budget_range_start": msg.req.projectBudgetMin,
            "budget_range_end": msg.req.projectBudgetMax,
            "projectFile":msg.req.projectFile,
            "userDetails":msg.req.userDetails,
            "projectSkills":msg.req.selectedskills,
            "bid_count":parseInt(0),
            "bid_avg":parseInt(0),
            "bid_user":[],
            "project_status":"Open",
            "hired_freelancer":[]
        }

        coll.insertOne(user_entry, function (err, user1) {
            if (user1) {
                //res.userId = user1.insertedId;
                res.code = "200";
                res.value = "Success Signup";
                callback(null, res);
            }
            else {
                res.code = "401";
                res.value = "Failed Signup";
                callback(null, res);
            }
        });
    });
}
exports.handle_request = handle_request;