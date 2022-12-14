var AWS = require('aws-sdk')
var ses = new AWS.SES()

var RECEIVERS = ['alishia.m.patricio@gmail.com'];
var SENDER = 'alishia.m.patricio@gmail.com'; // make sure that the sender email is properly set up in your Amazon SES

exports.handler = (event, context, callback) => {
    console.log('Received event:', event);
    sendEmail(event, function (err, data) {
        var response = {
            "isBase64Encoded": false,
            "headers": { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://my-static-bucket-jenkins.s3-website-us-east-1.amazonaws.com' },
            "statusCode": 200,
            "body": "{\"result\": \"Success.\"}"
        };
        callback(err, response);
    });
};

function sendEmail (event, done) {
    console.log(event)
    var data = JSON.parse(event.body);
    
    var params = {
        Destination: {
            ToAddresses: RECEIVERS
        },
        Message: {
            Body: {
                Text: {
                    Data: 'Name: ' + data.name + '\nEmail: ' + data.email + '\nMessage: ' + data.message,
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: 'Contact Form inquiry: ' + data.name,
                Charset: 'UTF-8'
            }
        },
        Source: SENDER
    }
    
    console.log(params);
    ses.sendEmail(params, done);
}
