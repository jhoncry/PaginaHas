document.addEventListener("DOMContentLoaded", function () {
  PayPal.Donation.Button({
    env: 'production',
    hosted_button_id: '2K4QKQ3RYZYWG',
    image: {
      src: 'https://pics.paypal.com/00/s/MDAxM2Q5MmMtZDZiYy00NmExLThkM2MtYTM1YTljMzUyYTYy/file.PNG',
      alt: 'Apoya la señal',
      title: 'Sostener la señal 🔊'
    }
  }).render('#donate-button');
});