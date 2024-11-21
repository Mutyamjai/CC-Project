const node_mailer = require("nodemailer");
require("dotenv").config();

const mail_sender = async (email, title, body) => {

    try{
        let transporter = node_mailer.createTransport(
            {
                host: "smtp.gmail.com",
                auth:{
                    user: "lnmiitcampusconnect@gmail.com",
                    pass: "mwycazvfpfouycpo",
                }
            }
        )

        let info = await transporter.sendMail({
            from: 'CAMPUS CONNECT || RAM',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })

        return info;
    }
    catch(error){
        console.log("ERROR OCCURED WHILE SENDING THE MAIL");
        console.log(error.message);
    }
}

module.exports = mail_sender;