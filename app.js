const shareBtn = document.getElementById('whatsappShareBtn');
const shareCounter = document.getElementById('shareCounter');
const submitBtn = document.getElementById('submitBtn');
const form = document.getElementById('registrationForm');
const successMsg = document.getElementById('successMessage');
const screenshotInput = document.getElementById('screenshot');

let count = Number(localStorage.getItem('tfg_share_count')) || 0;
let submitted = localStorage.getItem('tfg_submitted') === 'true';

// Initialize UI state
function updateUI() {
  shareCounter.textContent = `Click count: ${count}/5`;
  if (count >= 5) {
    shareBtn.disabled = true;
    shareCounter.textContent = "Sharing complete. Please continue.";
  }
  if (submitted) {
    form.querySelectorAll('input, button').forEach(el => el.disabled = true);
    successMsg.classList.remove('hidden');
  }
}
updateUI();

// WhatsApp Share Logic
shareBtn.addEventListener('click', () => {
  if (count < 5) {
    const msg = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
    window.open(`https://wa.me/?text=${msg}`, '_blank');
    count++;
    localStorage.setItem('tfg_share_count', count);
    updateUI();
  }
});

// Form Submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (count < 5) {
    alert('Please complete WhatsApp sharing (5/5) before submitting.');
    return;
  }
  if (submitted) return;

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  // Prepare form data
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const college = document.getElementById('college').value.trim();
  const file = screenshotInput.files[0];

  // 1. Upload file to Google Drive via Apps Script (get the upload URL from your script)
  // 2. Send all data to Google Sheets via Apps Script Web App
  // For demo, we'll just simulate success after 1s
  setTimeout(() => {
    localStorage.setItem('tfg_submitted', 'true');
    form.querySelectorAll('input, button').forEach(el => el.disabled = true);
    successMsg.classList.remove('hidden');
    submitBtn.textContent = "Submit Registration";
  }, 1000);

  // --- To integrate with Google Apps Script, replace the above with:
  // const formData = new FormData();
  // formData.append('name', name);
  // formData.append('phone', phone);
  // formData.append('email', email);
  // formData.append('college', college);
  // formData.append('screenshot', file);
  // fetch('YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL', {
  //   method: 'POST',
  //   body: formData
  // }).then(res => res.json()).then(data => {
  //   localStorage.setItem('tfg_submitted', 'true');
  //   form.querySelectorAll('input, button').forEach(el => el.disabled = true);
  //   successMsg.classList.remove('hidden');
  //   submitBtn.textContent = "Submit Registration";
  // }).catch(() => {
  //   alert('Submission failed. Try again.');
  //   submitBtn.disabled = false;
  //   submitBtn.textContent = "Submit Registration";
  // });
});

// On page load, disable form if already submitted
if (submitted) {
  form.querySelectorAll('input, button').forEach(el => el.disabled = true);
  successMsg.classList.remove('hidden');
}