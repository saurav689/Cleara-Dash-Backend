const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require('path');
const imagePath = '../images/GTR-sante.png';

function getImageBase64() {
    try {
        const imagePath = path.join(__dirname, '../images', 'GTR-sante.png');
        const imageBuffer = fs.readFileSync(imagePath);
        const imageBase64 = imageBuffer.toString('base64');
        const mimeType = path.extname(imagePath).slice(1);
        return `data:image/${mimeType};base64,${imageBase64}`;
    } catch (error) {
        console.error('Error reading image file:', error);
        return null;
    }
}

const generateHTMLForQuote = (viewData, totalPrice) => {
    const imageDataURL = getImageBase64();

    if (!imageDataURL) {
        console.error('Failed to get image data URL');
        return null;
    }
    return `
  <section style="padding: 1%; font-family: sans-serif; width: 730px; margin: 0px auto; color: #7c7b87;">
        <div>
            <p style="color:#5e5873; font-family: sans-serif;"><b>${viewData?.header} Details</b></p>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap:10px;">
            <div style="width: 25%;">
 
            </div>
            <div style="width: 34%;">
                <div>
                    <img src="${imageDataURL}" alt="" style="width: 100%;">
                    <p>275 Boulevard Armand-Frappier Laval, Québec H7V 4A7<br>
                    <span><b>Tel: </b></span>514-341-8908<br><span><b>Email: </b></span>info@gtrdiagnostics.com</p>
                </div>
            </div>
            <div style="width: 38%;">
                <div style="padding: 6% 0px 0px 10%;">
                    <p><span><b>Date:</b></span>${viewData?.createdAt}<br>
                    <span><b>Facture/Invoice N°:</b></span>GTR-070324</p>
                </div>
            </div>
        </div>
        <div>
            <div style="padding-top: 3%;">
                <p style="margin: 7px 0px;"><span><b>PERIODE DE FACTURATION: </b></span>${viewData?.createdAt} - ${viewData?.createdAt}</p>
                <p  style="margin: 7px 0px;"><span><b>INSTITUTION: </b></span>GTR Santé</p>
                <p  style="margin: 7px 0px;"><span><b>Email: </b></span>gtrsante@gmail.com</p>
            </div>
        </div>
    </section>
    <div style="display: flex;">
    <table style="border-collapse: collapse; width: 100%; border: 1px solid #dee2e6;">
        <tbody>
            <tr>
                <th style="width: 20%; border: 1px solid #dee2e6; padding: .75rem; text-align:left">Name</th>
                <td style="width: 80%; border: 1px solid #dee2e6; padding: .75rem;">${viewData?.fname}</td>
            </tr>
            <tr>
                <th style="width: 20%; border: 1px solid #dee2e6; padding: .75rem; text-align:left">Email</th>
                <td style="width: 80%; border: 1px solid #dee2e6; padding: .75rem;">${viewData?.email}</td>
            </tr>
        </tbody>
    </table>
    <table style="border-collapse: collapse; width: 100%; border: 1px solid #dee2e6;">
    <tbody>
        <tr>
            <th style="border-left: none; width: 20%; border: 1px solid #dee2e6; padding: .75rem; text-align: left;">Phone</th>
            <td style="width: 80%; border: 1px solid #dee2e6; padding: .75rem;">${viewData?.phone}</td>
        </tr>
        <tr>
            <th style="width: 20%; border: 1px solid #dee2e6; padding: .75rem; text-align: left; border-left: none;">Gender</th>
            <td style="width: 80%; border: 1px solid #dee2e6; padding: .75rem;">${viewData?.gender}${viewData?.Pregnant ? "(Pregnant)" : ""}</td>
        </tr>
    </tbody>
    </table>
    </div>
    <table style="border-collapse: collapse; width: 100%; border: 1px solid #dee2e6;">
        <thead>
            <tr>
                <th style="border: 1px solid #dee2e6; padding: .75rem; text-align:left;">Test Name</th>
                <th style="border: 1px solid #dee2e6; padding: .75rem; text-align:left;">Description</th>
                <th style="border: 1px solid #dee2e6; padding: .75rem; text-align:left;">Price</th>
            </tr>
        </thead>
        <tbody>
        ${viewData?.bloodtests &&
            Array.isArray(viewData?.bloodtests) &&
            viewData?.bloodtests.length > 0 ? viewData?.bloodtests?.map((test, i) => `
          <tr key=${i}>
            <td style="border: 1px solid #dee2e6; padding: .75rem;">${test?.name ? test?.name : ""}</td>
            <td style="border: 1px solid #dee2e6; padding: .75rem;">${test?.description ? test?.description : ""}</td>
            <td style="border: 1px solid #dee2e6; padding: .75rem;">${test?.GTRprice ? `$${test?.GTRprice}` : test?.dynacareprice ? `$${test?.dynacareprice}` : test?.CDLprice ? `$${test?.CDLprice}` : ""}</td>
          </tr>`).join("")
            : `<tr><td style="border: 1px solid #dee2e6; padding: .75rem;" colspan="2" class='text-center'>No Data Found</td></tr>`
        }
            <tr>
                <td style="border: 1px solid #dee2e6; padding: .75rem; width: 85%; text-align: right;" class="test-price" colspan="2">Total Price</td>
                <td style="border: 1px solid #dee2e6; padding: .75rem; width: 15%;" class="test-price">${totalPrice ? `$${totalPrice}` : ''}</td>
            </tr>
            </tbody>
    </table>
    <div style="margin-top: 20px;">
        <p>Interac e-Transfer : gtrsante@gtriagnostics.com</p>
        <p>Veuillez libeller les chèques à l'ordre de : GTR Diagnostics</p>
        <p>text-decoration: underline;">Instructions de virement:</p>
        <p>Nom de la banque: TD CANADA TRUST<br>
            Adresse de la banque: 3131 BOUL. DE LA COTE VERTU, SAINT-LAURENT, QUEBEC H4R 1Y8<br>
            #Swift: TDOMCATTTOR<br>
            # d'institution: 004 &nbsp; Transit #: 03611<br>
            #de compte: 5328322<br>
            Nom du compte: LILIUM DIAGNOSTICS INC.<br>
            Adresse du compte: 275 ARMAND FRAPPIER, LAVAL, QUEBEC H7V 4A7</p>
    </div>
`;
};

exports.generatePDF = async (data, totalPrice) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const content = generateHTMLForQuote(data, totalPrice);
    await page.setContent(content);
    const pdfBuffer = await page.pdf();
    await browser.close();
    return pdfBuffer;
};

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sauravsingh92177@gmail.com",
        pass: "gqsu xpyy qzxo uhxh",
    },
});

exports.sendEmail = async (to, subject, pdfBuffer, filename) => {
    const mailOptions = {
        from: "sauravsingh92177@gmail.com",
        to: to,
        subject: subject,
        text: "Quote Details",
        attachments: [
            {
                filename: filename,
                content: pdfBuffer,
            },
        ],
    };

    return transporter.sendMail(mailOptions);
};
