var express = require('express');
var router = express.Router();
var pool = require('./../pool');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var multer  = require('multer');
var bcrypt = require('bcrypt');
var fs = require('fs-extra');
var passport = require('passport');
require('./passport')(passport);
var kafka = require('./kafka/client');
var nodemailer = require('nodemailer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/doc')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + "."+ file.originalname)
    }
})

var upload = multer({ storage: storage }).single('myfile');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/auth', function(req, res){
    console.log("INSIDE AUTH");
    if (req.isAuthenticated()) {
        res.status(200).send({ success: true, message: 'User already logged in!' });
    } else {
        res.status(401).send({ success: false, message: 'Authentication failed.' });
    }
});

router.get('/logout', function(req, res){
    console.log("Inside LogOut");
    req.logout();
    req.session.destroy();
    res.status(200).send({ success: true, message: 'User successfully logged out!' });
});

router.post('/doLogin', function (req, res, next) {

    //start kirati changes
    passport.authenticate('login', function(err, user) {
        // console.log("AFTER PASSPORT ");
        //
        if(err) {
            return res.status(500).json({message:"Login Error", success: false});
        }

        if(!user || user.code === 401 ) {
            return res.status(401).json({message:"Login Error", success: false});
        }

        else {
            req.logIn(req.body, function(err) {
                // console.log(err);
                if(err) {
                    return res.status(401).send({ success: false, message: 'The email and password you entered did not match our records. Please double-check and try again.' });
                }
                // var data = {
                //     userId : 1
                // };
                // var token = jwt.sign(data, req.app.get('secret'), {
                //     expiresIn : 60*60
                // });
                var sessiondata = {firstName : 'kirati',
                                    lastName : 'bhuva',
                                        email : 'kirati123@abc.com'};
                var token = jwt.sign(sessiondata , 'shhhhhh' , { expiresIn : 60*60 });
                    // console.log("--------------------------");
                    // console.log("user details" + user.userdetails);
                    return res.status(201).json({message: "Login successful",
                        success: true,
                        userId : user.userId,
                        token: token,
                        userDetails: user.userDetails
        });
            });
        }

    })(req, res);

});

router.post('/doSignUp', function (req, res, next) {

    //console.log(JSON.stringify(req.body));
    var reqEmail = req.body.email;
    var reqUsername = req.body.username;

    kafka.make_request('signup_topic',{"req": req.body , "topic_c" : "signup_topic_response"}, function(err,results){
        // console.log('in result');
        // console.log(results);
        var sessiondata = {firstName : 'kirati',
            lastName : 'bhuva',
            email : 'kirati123@abc.com'};
        var token = jwt.sign(sessiondata , 'shhhhhh' , { expiresIn : 60*60 });
        if(err){
            // console.log("ERROR KIRATI");
            done(err,{});
        }
        else
        {
            if(results.code == 200){
                // console.log("----------------------------");
                // console.log(results);
                // console.log("SIGNUP ID: " + results.userId);
                res.status(200).json({message: "Sign up successful", userId: results.userId,token: token, success: true});
            }
            else {
                res.status(401).json({message: "SignUp Failed", success: false});
            }
        }
    });


    //console.log(reqEmail);
    // bcrypt.hash(req.body.password, bcrypt.genSaltSync(10), function(err, password) {
    //     var query = "insert into user(email, username, password) values ('" + reqEmail + "','" + reqUsername + "','" + password + "')";
    //     //console.log("Query is :" + query);
    //
    //     //kirati start
    //     pool.fetchData(function (err, results) {
    //         if (err) {
    //             //console.log("401 error");
    //             res.status(401).json({message: "Existing Email or Username", success: false});
    //         }
    //         else {
    //             if (results.affectedRows > 0) {
    //                 //console.log("Entry Done");
    //                 res.status(200).json({message: "Sign up successful", userId: results.insertId, success: true});
    //             }
    //             else {
    //                 //console.log("Error in entry");
    //                 res.status(401).json({message: "Existing Email or Username", success: false});
    //             }
    //         }
    //     }, query);
    // });
});

router.post('/addProject', function (req, res, next) {

    //
    // console.log("Inside addProject");
    // var reqProjectname = req.body.projectname;
    // var reqDescription = req.body.projectdescription;
    // var reqProjectBudgetMin = req.body.projectBudgetMin;
    // var reqProjectBudgetMax = req.body.projectBudgetMax;
    // var reqFilePath = req.body.projectFile;
    // var reqEmployer = req.body.userid;
    // var reqSkill = req.body.projectSkilstring
    //
    // var q = "insert into project(project_name, description, budget_range_start, budget_range_end) values ('website', 'simple site', 10, 50)"
    // var query = "insert into project(project_name, description, budget_range_start, budget_range_end, projectSkills, userid, filepath) values ('" + reqProjectname + "','" + reqDescription + "','" + reqProjectBudgetMin + "','" + reqProjectBudgetMax + "','" + reqSkill  + "','" + reqEmployer + "','"  + reqFilePath + "')"
    // console.log("Query is :" + query);

    //kafka start

    kafka.make_request('project_topic',{"req": req.body , "topic_c" : "project_topic_response", "key": "post_project"}, function(err,results){
        // console.log('in result');
        // console.log(results);
        if(err){
            // console.log("ERROR KIRATI");
            done(err,{});
        }
        else
        {
            if(results.code == 200){
                // console.log("----------------------------");
                // console.log(results);
                // console.log("SIGNUP ID: " + results.userId);
                res.status(201).json({message: "Project Added Successfully", success:true});
            }
            else {
                res.status(401).json({message: "Error in project add",success: false});
            }
        }
    });



    //kafka end




    //kirati start
    // pool.fetchData(function(err,results){
    //     //console.log('---------------------------------------');
    //     //console.log(results);
    //     if(err){
    //         res.status(401).json({message: "Error in project add",success: false});
    //     }
    //     else
    //     {
    //         if(results.affectedRows > 0){
    //             console.log("Entry Done" + results.insertId);
    //             res.status(201).json({message: "Project Added Successfully", success:true, projectId:  results.insertId });
    //         }
    //         else {
    //             console.log("Error in entry");
    //             res.status(401).json({message: "Error in project add",success: false});
    //         }
    //     }
    // },query);
});

router.post('/setProfile', function (req, res, next) {

    //kafka start

    kafka.make_request('signup_topic',{"req": req.body , "topic_c" : "signup_topic_response", "key": "set_profile"}, function(err,results){
        if(err){
            console.log("ERROR KIRATI");
            done(err,{});
        }
        else
        {
            if(results.code == 200){
                console.log("USER DETAILS** : " + results.userDetails);
                    if (results.userDetails.profileFile !== null) {
                        var buffer = fs.readFileSync(results.userDetails.profileFile);
                        var bufferBase64 = new Buffer(buffer);
                        results.userDetails.encodeImage = bufferBase64;
                    } else {
                        //console.log(obj);
                        var buffer = fs.readFileSync("./uploads/default/default_img.png");
                        var bufferBase64 = new Buffer(buffer);
                        results.userDetails.encodeImage = bufferBase64;
                    }
                res.status(201).json({message: "Profile Set Successfully", success:true, userDetails: results.userDetails });
            }
            else {
                res.status(401).json({message: "Error in profile set",success: false});
            }
        }
    });

    //kafka end


    // console.log("Inside setProfile");
    // var reqUserId = req.body.userId;
    // var reqfirstname = req.body.firstname;
    // var reqlastname = req.body.lastname;
    // var reqemail = req.body.email;
    // var reqphonenumber = req.body.phonenumber;
    // var reqaboutme = req.body.aboutme;
    // var reqSkills = req.body.userSkilstring;
    // var reqPath = req.body.profileFile;
    //
    // console.log(reqfirstname);
    //
    // //var q = "update user set firstname = 'Deep' ,lastname = 'Bhuva', email = 'deep@deep.com',phone = '012345678' where userid = 1"
    // var query = "update user set firstname = '" + reqfirstname + "' ,lastname = '" + reqlastname + "', email = '" + reqemail + "',phone = '" + reqphonenumber  + "', userskills = '" +  reqSkills + "' , profilepicpath = '" + reqPath + "' where userid = '" + reqUserId + "'";
    // console.log("Query is :" + query);
    //
    // //kirati start
    // pool.fetchData(function(err,results){
    //     //console.log('---------------------------------------');
    //     console.log(results);
    //     if(err){
    //         res.status(401).json({message: "Error in profile set",success: false});
    //     }
    //     else
    //     {
    //         if(results.affectedRows > 0){
    //             console.log("Entry Done");
    //             res.status(201).json({message: "Profile Set Successfully", success:true });
    //         }
    //         else {
    //             console.log("Error in entry");
    //             res.status(401).json({message: "Error in profile set",success: false});
    //         }
    //     }
    // },query);
});

router.post('/fetchProject', function (req, res, next) {

    var query = "select p.project_id , p.project_name, p.description, p.budget_range_start,p.budget_range_end, p.projectSkills,p.userid,avg(pu.bid_value) AS 'bid_avg', count(pu.project_id) AS 'bid_count', u.firstname ,u.lastname  from project p left outer join user u on p.userid= u.userid left outer join project_user pu on p.project_id = pu.project_id where (p.userid is not NULL and p.userid != 0) group by pu.project_id" //console.log("Query is :" + query);

    //kafka start

    kafka.make_request('project_topic',{"req": req.body , "topic_c" : "project_topic_response","key": "fetch_all_projects"}, function(err,results){
        // console.log('in result Fetch Project');
        // console.log(results);
        if(err){
            console.log("ERROR KIRATI");
            done(err,{});
        }
        else
        {
            if(results.code == 200){
                if(results.value.length != 0) {
                    results.value.forEach(function (obj) {
                        if (obj.userDetails.profileFile !== ' ' && obj.userDetails.profileFile !== '') {
                            // console.log("PATH : " + obj.userDetails.profileFile);
                            var buffer = fs.readFileSync(obj.userDetails.profileFile);
                            var bufferBase64 = new Buffer(buffer);
                            obj.userDetails.encodeImage = bufferBase64;
                        } else {
                            var buffer = fs.readFileSync("./uploads/default/default_img.png");
                            var bufferBase64 = new Buffer(buffer);
                            obj.userDetails.encodeImage = bufferBase64;
                        }
                    });
                }
                // console.log(results);
                res.status(201).json(results);
            }
            else {
                res.status(401).json({message: "Error in fetching projects", success: false});
            }
        }
    });

});

router.post('/searchProject', function (req, res, next) {

    kafka.make_request('project_topic',{"req": req.body , "topic_c" : "project_topic_response","key": "search_project"}, function(err,results){
        console.log('in result Fetch Project');
        console.log(results);
        if(err){
            console.log("ERROR KIRATI");
            done(err,{});
        }
        else
        {
            if(results.code == 200){
                if(results.value.length != 0) {
                    results.value.forEach(function (obj) {
                        if (obj.userDetails.profileFile !== ' ' && obj.userDetails.profileFile !== '') {
                            console.log("PATH : " + obj.userDetails.profileFile);
                            var buffer = fs.readFileSync(obj.userDetails.profileFile);
                            var bufferBase64 = new Buffer(buffer);
                            obj.userDetails.encodeImage = bufferBase64;
                        } else {
                            //console.log(obj);
                            var buffer = fs.readFileSync("./uploads/default/default_img.png");
                            var bufferBase64 = new Buffer(buffer);
                            obj.userDetails.encodeImage = bufferBase64;
                        }
                    });
                }
                res.status(201).json(results);
            }
            else {
                res.status(401).json({message: "Error in fetching projects", success: false});
            }
        }
    });

    //kafka end


    // pool.fetchData(function(err,results){
    //     if(err){
    //         res.status(401).json({message: "Error in profile set",success: false});
    //     }
    //     else
    //     {
    //         res.status(201).json(results);
    //     }
    // },query);
});

router.post('/fetchprojectusers', function (req, res, next) {

    // console.log("Inside fetchprojectusers");
    // var query = "select * from project_user pu inner join user u on u.userid = pu.user_id where project_id ='"+req.body.project_id+"'";
    // console.log("Query is :" + query);

    //kafka start
    kafka.make_request('project_topic',{"req": req.body , "topic_c" : "project_topic_response","key": "fetch_all_project_users"}, function(err,results){
        // console.log('in result Fetch all users');
        //console.log(results);
        if(err){
            console.log("ERROR KIRATI");
            done(err,{});
        }
        else
        {
            if(results.code == 200){

                //image start
                if(results.users.length !== 0 && results.users[0] != '') {
                    results.users.forEach(function (obj) {
                        // console.log("Inside this");
                        if (obj.profileFile !== null) {
                            //console.log("PATH : " + obj.profileFile);
                            var buffer = fs.readFileSync(obj.profileFile);
                            var bufferBase64 = new Buffer(buffer);
                            obj.encodeImage = bufferBase64;
                        } else {
                            //console.log(obj);
                            var buffer = fs.readFileSync("./uploads/default/default_img.png");
                            var bufferBase64 = new Buffer(buffer);
                            obj.encodeImage = bufferBase64;
                        }
                    });
                }
                //image end

                //console.log("USERS + " + JSON.stringify(results.users));

                res.status(201).json(results.users);
            }
            else {
                res.status(401).json({message: "Error in fetching project users", success: false});
            }
        }
    });

    //kafka end



    // pool.fetchData(function(err,results){
    //     //console.log('---------------------------------------');
    //     if(err){
    //         res.status(401).json({message: "Error in profile set",success: false});
    //     }
    //     else
    //     {
    //         // results.forEach(function(obj) {
    //         //     console.log("Inside this");
    //         //     if (obj.profilepicpath !== null) {
    //         //         console.log(obj);
    //         //         var buffer = fs.readFileSync(obj.profilepicpath);
    //         //         var bufferBase64 = new Buffer(buffer);
    //         //         obj.encodeImage = bufferBase64;
    //         //     } else {
    //         //         console.log(obj);
    //         //         var buffer = fs.readFileSync("./uploads/default/default_img.png");
    //         //         var bufferBase64 = new Buffer(buffer);
    //         //         obj.encodeImage = bufferBase64;
    //         //     }
    //         // });
    //         res.status(201).send(JSON.stringify(results));
    //     }
    // },query);
});

router.post('/addmybid', function (req, res, next) {
    // console.log("Inside addmybid");
    // var q = "insert into project_user values (1,7,25,30)"
    // //var query_for_userid = "select userid from user where username ='"+req.body.username+"'";
    //
    // console.log(req.body);
    //
    // var query = "insert into project_user values ('" + req.body.project_id+ "','" + req.body.userId + "','" + req.body.bid_value + "','" + req.body.bid_period+"')";
    //console.log("Query is :" + query);

    //kafka start
    kafka.make_request('project_topic',{"req": req.body , "topic_c" : "project_topic_response","key": "add_my_bid" }, function(err,results){
        if(err){
            console.log("ERROR KIRATI");
            done(err,{});
        }
        else
        {
            if(results.code == 200){
                //image start
                if(results.users.length != 0) {
                    results.users.forEach(function (obj) {
                        //console.log("Inside this");
                        if (obj.profileFile !== null) {
                            var buffer = fs.readFileSync(obj.profileFile);
                            var bufferBase64 = new Buffer(buffer);
                            obj.encodeImage = bufferBase64;
                        } else {
                            //console.log(obj);
                            var buffer = fs.readFileSync("./uploads/default/default_img.png");
                            var bufferBase64 = new Buffer(buffer);
                            obj.encodeImage = bufferBase64;
                        }
                    });
                }
                //image end
                return res.status(201).json(results.users);
            }
            else {
                return res.status(401).json({message: "Bid add Failed", success: false});
            }
        }
    });
    //kafka end

    // pool.fetchData(function(err,results){
    //     //console.log('---------------------------------------');
    //     if(err){
    //         res.status(401).json({message: "Error in profile set",success: false});
    //     }
    //     else
    //     {
    //         console.log(results);
    //         res.status(201).json({message: "Success",success: true});
    //     }
    // },query);
});

router.post('/hireFreelancer', function (req, res, next) {

    console.log("Inside User hire FL");
    console.log(req.body.project_id);
    console.log(req.body.fl_id);


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kiratib216@gmail.com',
            pass: 'Jayu@216'
        }
    });

    var mailOptions = {
        from: 'kiratib216@gmail.com',
        to: req.body.fl_email,
        subject: 'Congratulations!!',
        text: 'You are Hired'

    };


    // kafka start
    kafka.make_request('project_topic',{"req": req.body , "topic_c" : "project_topic_response","key": "hire_freelancer" }, function(err,results){
        if(err){
            console.log("ERROR KIRATI");
            done(err,{});
        }
        else
        {
            if(results.code == 200){
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                        // res.status(400).send({message:"Success"});
                    } else {
                        console.log('Email sent: ' + info.response);
                        // res.status(200).send({message:"Success"});
                    }
                });
                return res.status(201).json(results);
            }
            else {
                return res.status(401).json({message: "Bid add Failed", success: false});
            }
        }
    });
    // kafka end
});

router.post('/makePayment', function (req, res, next) {

    console.log("Inside User hire FL");
    console.log(req.body);

    // kafka start
    kafka.make_request('project_topic',{"req": req.body , "topic_c" : "project_topic_response","key": "make_payment" }, function(err,results){
        if(err){
            console.log("ERROR KIRATI");
            done(err,{});
        }
        else
        {
            if(results.code == 200){
                console.log(results);
                return res.status(201).json(results);
            }
            else {
                return res.status(401).json({message: "Bid add Failed", success: false});
            }
        }
    });
    // kafka end
});

router.post('/addMyMoney', function (req, res, next) {

    console.log("Inside User hire FL");
    console.log(req.body.project_id);
    console.log(req.body.fl_id);

    // kafka start
    kafka.make_request('project_topic',{"req": req.body , "topic_c" : "project_topic_response","key": "add_My_Money" }, function(err,results){
        if(err){
            console.log("ERROR KIRATI");
            done(err,{});
        }
        else
        {
            if(results.code == 200){
                return res.status(201).json(results);
            }
            else {
                return res.status(401).json({message: "Bid add Failed", success: false});
            }
        }
    });
    // kafka end
});

router.post('/fetchmybids', function (req, res, next) {

    //console.log("Inside fetchmybids");
    var query = "select * from project p inner join project_user pu on p.project_id = pu.project_id where pu.user_id = " + req.body.user_id

    //kafka start

    kafka.make_request('project_topic',{"req": req.body , "topic_c" : "project_topic_response","key": "fetch_bidded_projects"}, function(err,results){
        // console.log('in result Fetch Posted Project Users');
        // console.log(results);
        if(err){
            // console.log("ERROR KIRATI");
            done(err,{});
        }
        else
        {
            if(results.code == 200){

                //console.log(results.value)
                // var myJSON = JSON.stringify(results.value);
                res.status(201).json(results.value);
            }
            else {
                res.status(401).json({message: "Error in fetching projects", success: false});
            }
        }
    });

    //kafka end

    // pool.fetchData(function(err,results){
    //     //console.log('---------------------------------------');
    //     if(err){
    //         res.status(401).json({message: "Error",success: false});
    //     }
    //     else
    //     {
    //         //console.log(results);
    //         res.status(201).json(results);
    //     }
    // },query);
});

router.post('/fetchmyPostedprojects', function (req, res, next) {

    console.log("Inside fetchmyPostedprojects");
    var query = "select * from project where userid = 108"

    //kafka start

    kafka.make_request('project_topic',{"req": req.body , "topic_c" : "project_topic_response","key": "fetch_posted_projects"}, function(err,results){
        console.log('in result Fetch Posted Project Users');
        console.log(results);
        if(err){
            console.log("ERROR KIRATI");
            done(err,{});
        }
        else
        {
            if(results.code == 200){
                res.status(201).json(results.value);
            }
            else {
                res.status(401).json({message: "Error in fetching projects", success: false});
            }
        }
    });

    //kafka end

    // pool.fetchData(function(err,results){
    //     //console.log('---------------------------------------');
    //     if(err){
    //         res.status(401).json({message: "Error",success: false});
    //     }
    //     else
    //     {
    //         console.log(results);
    //         res.status(201).json(results);
    //     }
    // },query);
});

router.post('/fetchskills', function (req, res, next) {

    // console.log("Inside fetchskils");
    // var query = "select skill_id as id ,skill_name as name from skill "


    //kafka start
    kafka.make_request('skill_topic',{"req": req.body , "topic_c" : "skill_topic_response"}, function(err,results){
        console.log('in result SKILLS');
        console.log(results);
        if(err){
            console.log("ERROR KIRATI");
            done(err,{});
        }
        else
        {
            if(results.code == 200){
                res.status(201).json(results);
            }
            else {
                res.status(401).json({message: "Error", success: false});
            }
        }
    });
    //kafka end



    // pool.fetchData(function(err,results){
    //     //console.log('---------------------------------------');
    //     if(err){
    //         res.status(401).json({message: "Error",success: false});
    //     }
    //     else
    //     {
    //         console.log(results);
    //         res.status(201).json(results);
    //     }
    // },query);
});

router.post('/addskillsToProject', function (req, res, next) {

    var reqProjectId = req.body.projectId;
    var skills = req.body.skills;

    console.log(reqProjectId);
    console.log(skills);


    //33
    //[ { id: 2, name: '.Net' }, { id: 6, name: 'ReactJS' } ]


    skills.map((skill,index) => {
            var query = "insert into project_skill(project_id, skill_id) values(" + reqProjectId + "," + skill.id + ");"
            pool.fetchData(function(err,results){
                //console.log('---------------------------------------');
                if(err){
                    res.status(401).json({message: "Error",success: false});
                }
                else if(index !== skills.length -1)
                {
                    console.log(results);
                }
                else
                {
                    res.status(201).json(results);
                }
            },query);
        }
    )
});

router.post('/addskillsToUser', function (req, res, next) {

    var reqUserId = req.body.userId;
    var skills = req.body.skills;

    console.log("USERID : " + reqUserId);
    console.log(skills);
    //33
    //[ { id: 2, name: '.Net' }, { id: 6, name: 'ReactJS' } ]
    skills.map((skill,index) => {
            var query = "insert into user_skill (user_id, skill_id) values(" + reqUserId + "," + skill.id + ");"
            pool.fetchData(function(err,results){
                //console.log('---------------------------------------');
                if(err){
                    res.status(401).json({message: "Error",success: false});
                }
                else if(index !== skills.length -1)
                {
                    console.log(results);
                }
                else
                {
                    res.status(201).json(results);
                }
            },query);
        }
    )
});

router.post('/fetchUserDetails', function (req, res, next) {

    console.log("Inside User hire FL");
    console.log(req.body.project_id);
    console.log(req.body.fl_id);

    // kafka start
    kafka.make_request('project_topic',{"req": req.body , "topic_c" : "project_topic_response","key": "edit_Profile" }, function(err,results){
        if(err){
            console.log("ERROR KIRATI");
            done(err,{});
        }
        else
        {
            if(results.code == 200){
                if(results.value.length != 0) {
                    results.value.forEach(function (obj) {
                        //console.log("Inside this");
                        if (obj.profileFile !== null) {
                            var buffer = fs.readFileSync(obj.profileFile);
                            var bufferBase64 = new Buffer(buffer);
                            obj.encodeImage = bufferBase64;
                        } else {
                            //console.log(obj);
                            var buffer = fs.readFileSync("./uploads/default/default_img.png");
                            var bufferBase64 = new Buffer(buffer);
                            obj.encodeImage = bufferBase64;
                        }
                    });
                }
                //console.log(results);
                return res.status(201).json(results);


            }
            else {
                return res.status(401).json({message: "Bid add Failed", success: false});
            }
        }
    });
    // kafka end
});

router.post('/uploadFile', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.status(501).send({error:err});
        }
        //res.json({originalname :req.file.originalname, uploadname :req.file.filename});
        res.status(200).send(JSON.stringify({filename : req.file.filename, originalname :req.file.originalname,success: true}))
    })
})

router.post('/downloadFile', function(req, res) {
    console.log(req.body.filepath);
    console.log("DOWNLOAD");
    res.download(req.body.filepath);
});

router.post('/addmySolution', function (req, res, next) {

    console.log("Inside add my Solution");
    console.log(req.body.project_id);
    console.log(req.body.submissionDetails);

    // kafka start
    kafka.make_request('project_topic',{"req": req.body , "topic_c" : "project_topic_response","key": "add_solution" }, function(err,results){
        if(err){
            console.log("ERROR KIRATI");
            done(err,{});
        }
        else
        {
            if(results.code == 200){
                return res.status(201).json(results);
            }
            else {
                return res.status(401).json({message: "Bid add Failed", success: false});
            }
        }
    });
    // kafka end
});

module.exports = router;

