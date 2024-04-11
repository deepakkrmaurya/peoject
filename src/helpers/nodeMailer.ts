import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
const sendEmail = async ({ email, emailType, userId }: any) => {

    try {
        const hashToken = await bcryptjs.hash(email, 10)

        if (emailType === 'VERIFY') {
            const up = await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashToken,
                    verifiTokenExpiry: Date.now() + 3600000
                }
            })
            await up.save()
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            })
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "758abe5e4c1c17",
                pass: "7796e4c98d1b94"
            }
        });

        const mailOptions = {
            from: 'deepakmaurya2211@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : 'Reset your Password',
            html: `<p>Click<a href="${process.env.DOMAIN}/verifyemail/?token=${hashToken}">here</a> to ${emailType === 'VERIFY' ? "verify your email" : "reset your password"} or copy and past the link below in your browser . <br/>${process.env.DOMAIN}/verifyemail/?${hashToken}</p>`,
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse
    } catch (error: any) {
        throw new Error(error.message)
    }
}
export default sendEmail