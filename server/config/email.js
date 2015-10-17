
var email = {
    user: 'iips.app.service@gmail.com',
    pass: 'I@manIIPSian'
};

module.exports = {
    options: {
        service: 'Gmail',
        auth: {
            user: email.user,
            pass: email.pass
        }
    },
    mailOptions: {
        from: email.user,
        to: '', // comma seperated list of receivers
        subject: '[IIPS APP SERVICE] Reset Password - One Time Passcode',
        text: '',
        //html: '<b>Hello world ✔</b>'
    }
};
