// script.js
const video = document.getElementById('webcam');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const output = document.getElementById('output');
const snap = document.getElementById('snap');

const FRAME_PATH = 'assets/my_cool_frame.png';
const WIDTH = 360;
const HEIGHT = 480;

// Setup canvas size
canvas.width = WIDTH;
canvas.height = HEIGHT;

// 1. Get user webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    alert("Webcam access denied.");
    console.error(err);
  });

// 2. Load frame image
const frameImg = new Image();
frameImg.src = FRAME_PATH;

// 3. When 'Take Photo' is clicked
snap.addEventListener('click', () => {
  // Don't flip! Match mirror preview
  ctx.drawImage(video, 0, 0, WIDTH, HEIGHT);
  ctx.drawImage(frameImg, 0, 0, WIDTH, HEIGHT);

  const dataUrl = canvas.toDataURL('image/png');
  output.src = dataUrl;
  download.href = dataUrl;
  const countdownEl = document.getElementById('countdown');

snap.addEventListener('click', () => {
  let count = 3;
  countdownEl.textContent = count;

  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownEl.textContent = count;
    } else {
      clearInterval(interval);
      countdownEl.textContent = '';

      ctx.drawImage(video, 0, 0, WIDTH, HEIGHT);
      ctx.drawImage(frameImg, 0, 0, WIDTH, HEIGHT);

      const dataUrl = canvas.toDataURL('image/png');
      output.src = dataUrl;
      download.href = dataUrl;

      uploadToImgBB(dataUrl).then(url => {
        QRCode.toCanvas(document.getElementById('qrcode'), url);
      });
    }
  }, 1000);
});

const IMGBB_API_KEY = '58b42c56969100dcf2ba9f7356c7fe4e'; // Replace with your key

function uploadToImgBB(imageDataURL) {
  const formData = new FormData();
  formData.append('image', imageDataURL.split(',')[1]);

  return fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: 'POST',
    body: formData,
  })
    .then(res => res.json())
    .then(data => data.data.url);
}

});

