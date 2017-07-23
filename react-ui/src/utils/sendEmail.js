var aws = require('aws-sdk');
const env = require('env2');
env('./config.env');

sendEmail = (from, to, subject, text, cb) => {
    aws.config = {
        accessKeyId: process.env.SES_ACCESS_ID,
        secretAccessKey: process.env.SES_ACCESS_KEY,
        region: 'eu-west-1'
    };
    console.log(process.env.SES_ACCESS_KEY);
    console.log('to is', to);
    console.log('subject is', subject);
    console.log('text is', text);
    var ses = new aws.SES({apiVersion: '2010-12-01'});
    try {
        ses.sendEmail({
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
        }), cb();
    } catch (error) {
        console.log(error.message);
    }
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
