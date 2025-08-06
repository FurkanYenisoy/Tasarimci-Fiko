const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send', async (req, res) => {
    const { name, email, message } = req.body;

    // Kendi e-posta bilgilerinle doldur
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yenisoyfurkan3@gmail.com',
            pass: '214120gmail'
        }
    });

    let mailOptions = {
        from: email,
        to: 'yenisoyfurkan3@gmail.com',
        subject: `Web Sitesinden Mesaj: ${name}`,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Mesajınız gönderildi!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Bir hata oluştu.' });
    }
});

app.listen(3001, () => {
    console.log('Server started on port 3001');
});