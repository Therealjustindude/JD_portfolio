import nodemailer from "nodemailer";
const MAILTRAP_USER = "9abf2417298a90";
const MAILTRAP_PASS = "97edfac4c91a2a";
const actions = {
  sendEmail: async ({ request }) => {
    const formData = await request.formData();
    const name = String(formData.get("name"));
    const phone = String(formData.get("phone"));
    const email = String(formData.get("email"));
    const message = String(formData.get("message"));
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: MAILTRAP_USER,
        pass: MAILTRAP_PASS
      }
    });
    const mailOptions = {
      from: `${email}`,
      to: "therealjustindude@gmail.com",
      subject: `${name} is sending you a email from your app`,
      text: `Name: ${name} | Phone: ${phone ? phone : "n/a"} | Message: ${message}`
    };
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
};
export {
  actions
};
