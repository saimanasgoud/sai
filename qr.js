let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrtext = document.getElementById("qrtext");
let shareBtn = document.getElementById("shareBtn");


function generateQR(){
    qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrtext.value;
    imgBox.classList.add("show-img");
    shareBtn.style.display = "inline"; // Display the share button
}

function shareQR() {
    if (!qrImage.src || qrImage.src === "") {
        alert("Please generate a QR code first.");
        return;
    }

    // Convert the QR code image to a data URL
    let canvas = document.createElement('canvas');
    canvas.width = qrImage.width;
    canvas.height = qrImage.height;
    let context = canvas.getContext('2d');
    context.drawImage(qrImage, 0, 0);
    let dataURL = canvas.toDataURL('image/png');

    if (navigator.share) {
        navigator.share({
            title: "Share QR Code",
            files: [new File([dataURL], "qrcode.png", { type: "image/png" })],
        }).then(() => console.log("QR code shared successfully"))
        .catch((error) => console.error("Error sharing QR code:", error));
    } else {
        alert("Web Share API not supported in this browser.");
    }
}