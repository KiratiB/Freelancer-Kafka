
var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var signup = require('./services/signup');
var skill = require('./services/skill');
var profile = require('./services/setProfile');
var postProject = require('./services/post_project');
var fetchAllProjects = require('./services/fetch_all_projects');
var fetchAllProjectUsers = require('./services/fetch_all_project_users');
var addMyBid = require('./services/add_my_bid');
var fetchPostedProjects = require('./services/fetch_posted_projects');
var fetchBiddedProjects = require('./services/fetch_bidded_projects');
var hireFreelancer = require('./services/hire_freelancer');
var editProfile = require('./services/edit_profile');
var addSolution = require('./services/add_solution');
var makePayment = require('./services/make_payment');
var addMyMoney= require('./services/add_my_money');





    var topic_name = 'login_topic';
    var consumer = connection.getConsumer(topic_name);

    // Adding Signup topic
    consumer.addTopics(['signup_topic'], function (error, done) {
        console.log(error, done);
    });

    // Adding Skill topic
    consumer.addTopics(['skill_topic'], function (error, done) {
        console.log(error, done);
    });

    // Adding Project topic
    consumer.addTopics(['project_topic'], function (error, done) {
        console.log(error, done);
    });

    var producer = connection.getProducer();

    console.log('server is running');
    consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        console.log(data.data.topic_c)
        if(data.data.topic_c == "login_topic_response") {
            login.handle_request(data.data, function (err, res) {
                console.log('after handle' + res);
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });
                return;
            });
        }

    if (data.data.topic_c == "signup_topic_response" && data.data.key != "set_profile") {
        signup.handle_request(data.data, function (err, res) {
            console.log('after sign up handle' + res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });
    }

        if (data.data.topic_c == "signup_topic_response" && data.data.key == "set_profile") {
            profile.handle_request(data.data, function (err, res) {
                console.log('after sign up handle' + res);
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });
                return;
            });
        }


        if (data.data.topic_c == "project_topic_response" && data.data.key == "post_project") {
            postProject.handle_request(data.data, function (err, res) {
                console.log('after project handle' + res);
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });
                return;
            });
        }

        if (data.data.topic_c == "project_topic_response" && data.data.key == "fetch_all_projects") {
            fetchAllProjects.handle_request(data.data, function (err, res) {
                console.log('after project handle' + res);
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });
                return;
            });
        }


        if (data.data.topic_c == "project_topic_response" && data.data.key == "fetch_all_project_users") {
            fetchAllProjectUsers.handle_request(data.data, function (err, res) {
                console.log('after project handle' + res);
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });
                return;
            });
        }

        if (data.data.topic_c == "project_topic_response" && data.data.key == "add_my_bid") {
            addMyBid.handle_request(data.data, function (err, res) {
                console.log('after project handle' + res);
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });
                return;
            });
        }

        if (data.data.topic_c == "project_topic_response" && data.data.key == "fetch_posted_projects") {
            fetchPostedProjects.handle_request(data.data, function (err, res) {
                console.log('after project handle' + res);
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });
                return;
            });
        }

        if (data.data.topic_c == "project_topic_response" && data.data.key == "fetch_bidded_projects") {
            fetchBiddedProjects.handle_request(data.data, function (err, res) {
                console.log('after project handle' + res);
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });
                return;
            });
        }

        if (data.data.topic_c == "project_topic_response" && data.data.key == "hire_freelancer") {
            hireFreelancer.handle_request(data.data, function (err, res) {
                console.log('after project handle' + res);
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });
                return;
            });
        }

        if (data.data.topic_c == "project_topic_response" && data.data.key == "edit_Profile") {
            editProfile.handle_request(data.data, function (err, res) {
                console.log('after profile handle' + res);
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });
                return;
            });
        }

        if (data.data.topic_c == "project_topic_response" && data.data.key == "add_solution") {
            addSolution.handle_request(data.data, function (err, res) {
                console.log('after profile handle' + res);
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });
                return;
            });
        }

        if (data.data.topic_c == "project_topic_response" && data.data.key == "make_payment") {
            makePayment.handle_request(data.data, function (err, res) {
                console.log('after profile handle' + res);
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });
                return;
            });
        }

        if (data.data.topic_c == "project_topic_response" && data.data.key == "add_My_Money") {
            addMyMoney.handle_request(data.data, function (err, res) {
                console.log('after profile handle' + res);
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });
                return;
            });
        }


        if (data.data.topic_c == "skill_topic_response") {
            skill.handle_request(data.data, function (err, res) {
                console.log('after skill handle' + res);
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });
                return;
            });
        }

});

