const form = document.getElementById('business-card-form');
const generateButton = document.getElementById('generate-button');
const businessCard = document.getElementById('card-content');
const qrCodeContainer = document.createElement('div');
const downloadButton = document.getElementById('download-button');

let name, title, company, email, phone, url, fontFamily;
let frontSide = true;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    name = document.getElementById('name').value;
    title = document.getElementById('title').value;
    company = document.getElementById('company').value;
    email = document.getElementById('email').value;
    phone = document.getElementById('phone').value;
    url = document.getElementById('url').value;
    fontFamily = document.getElementById('font-family').value;

    generateBusinessCard(name, title, company, email, phone, url, fontFamily);
    downloadButton.classList.remove('hidden');
});

// Generate the business card with the selected font
function generateBusinessCard(name, title, company, email, phone, url, fontFamily) {
    businessCard.innerHTML = '';
    const cardContent = document.createElement('div');
    cardContent.classList.add('template');
    cardContent.style.fontFamily = fontFamily; // Apply the selected font

    if (frontSide) {
        cardContent.innerHTML = `
            <h2>${name}</h2>
            <p>${title}</p>
            <p>${company}</p>
        `;
    } else {
        cardContent.innerHTML = `
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
        `;

        // Append the QR code inside the card on the back side
        if (url) {
            qrCodeContainer.id = 'qr-code';
            qrCodeContainer.innerHTML = ''; // Clear previous QR code
            const qrCode = new QRCode(qrCodeContainer, {
                text: url,
                width: 100,
                height: 100
            });
            cardContent.appendChild(qrCodeContainer);
        }
    }

    businessCard.appendChild(cardContent);
    frontSide = !frontSide; // Toggle front/back side
}

// Toggle the business card on click
businessCard.addEventListener('click', () => {
    generateBusinessCard(name, title, company, email, phone, url, fontFamily);
});

// Download the business card
downloadButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'business-card.png';
    link.href = businessCard.toDataURL();
    link.click();
});
