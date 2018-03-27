var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/freelancer";
var auth = require('passport-local-authenticate');

function handle_request(msg, callback) {

    var res = {};

    mongo.connect(mongoURL, function () {

        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('userA');
        //console.log("In handle request:" + JSON.stringify(msg));
        console.log(msg.req.username);
        console.log(msg.req.password);
        console.log(msg.req.email);



        auth.hash(msg.req.password, function (err, password) {
            console.log("hash password " + password);
            console.log(msg.req.password);
            var user_entry = {"username": msg.req.username, "password": password, "email": msg.req.email, "myFund":0, "transaction_history":[]}
            coll.insertOne(user_entry, function (err, user1) {
                if (user1) {
                    res.userId = user1.insertedId;
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
    });
}
exports.handle_request = handle_request;