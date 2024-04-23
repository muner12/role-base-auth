const nodemailer=require('nodemailer');

const dotenv=require('dotenv').config();

const sendMail=async(req,res,next)=>{


    try {

        const accountSid = process.env.TWILIO_ACCOUNT_ID;
        const authToken = process.env.TWILIO_ACCOUNT_TOKEN;
        const client = require('twilio')(accountSid, authToken);
        
        client.messages
            .create({
                body: 'this is test email sended from twilio',
                from: '+12512764351',
                to: '+923329611333'
            })
            .then(message => console.log(message.sid))
            .done();
    


        
    } catch (error) {
        
    }
   



try {
   const testAccount=await nodemailer.createTestAccount(); 
const transporter= nodemailer.createTransport({
   service: "Gmail",
   secure: true,
    port: 465,
    auth: {
        user: 'ubunerstudent@gmail.com',
        pass: process.env.EMAIL_PWD
    }
});

let info=await transporter.sendMail({
    from:"ubunerstudent@gmail.com",
    to:"bakhtmuner06@gmail.com",
    subject:"Hello",
    html:"<h1>this is test email</h1>"
   
})

    if(info.accepted.length>0){
        res.json({
            STATUS:200,
            MESSAGE:"mail sent successfully"    
        })
    }


} catch (error) {
    console.log(error)

    next({MESSAGE:error.message})
}

}

module.exports=sendMail