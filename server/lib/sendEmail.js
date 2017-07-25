var aws = require('aws-sdk');
const env = require('env2');
env('./config.env');

aws.config = {
    accessKeyId: process.env.SES_ACCESS_ID,
    secretAccessKey: process.env.SES_ACCESS_KEY,
    region: 'eu-west-1'
};

var ses = new aws.SES({apiVersion: '2010-12-01'});

sendEmail = (from, to, subject, text, cb) => {
    console.log('to is', to);
    console.log('subject is', subject);
    console.log('text is', text);
    ses.sendEmail(
        {
            Source: from,
            Destination: {ToAddresses: to},
            Message: {
                Subject: {
                    Data: subject
                },
                Body: {
                    Text: {
                        Data: text
                    }
                }
            }
        },
        cb
    );
    // (err, res) => {
    //     console.log('inside callback in sendEmail');
    //     if (err) {
    //         cb(err);
    //     } else {
    //         cb(null, res);
    //     }
    // };
};

module.exports = sendEmail;
