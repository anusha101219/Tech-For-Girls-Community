document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const shareBtn = document.getElementById('whatsappBtn');
    const shareCounter = document.getElementById('clickCount');
    const submitBtn = document.getElementById('submitBtn');
    const form = document.getElementById('registrationForm');
    const successMsg = document.getElementById('successMessage');
    const screenshotInput = document.getElementById('screenshot');
    const fileName = document.getElementById('fileName');
    const shareComplete = document.getElementById('shareComplete');

    // Initialize state
    let count = Number(localStorage.getItem('tfg_share_count')) || 0;
    let submitted = localStorage.getItem('tfg_submitted') === 'true';

    // Update UI based on state
    function updateUI() {
        shareCounter.textContent = count;
        if (count >= 5) {
            shareComplete.classList.remove('hidden');
            shareBtn.disabled = true;
        }
        if (submitted) {
            form.style.display = 'none';
            successMsg.classList.remove('hidden');
        }
    }
    updateUI();

    // File upload display
    screenshotInput.addEventListener('change', function() {
        fileName.textContent = this.files[0] ? this.files[0].name : 'No file chosen';
    });

    // WhatsApp Share Logic
    shareBtn.addEventListener('click', () => {
        if (count < 5) {
            const msg = "Hey Buddy, Join Tech For Girls Community! Let's learn and grow together in tech! 🚀";
            window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
            count++;
            localStorage.setItem('tfg_share_count', count);
            updateUI();
        }
    });

    // Form Submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (count < 5) {
            alert('Please share with 5 friends before submitting!');
            return;
        }
        if (submitted) return;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

        // Google Apps Script Web App URL
        const scriptUrl = 'https://script.google.com/macros/s/AKfycbxRctsz-Gwj3mQCBHWTiGBkyIscSeYiSM5sVZXGKDX1Fgt5bheQyezNwADSQUsh9FS6cg/exec';

        try {
            // Prepare form data
            const formData = new FormData(form);
            
            // If you want to handle the file separately:
            if (screenshotInput.files[0]) {
                formData.append('file', screenshotInput.files[0]);
            }

            const response = await fetch(scriptUrl, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Network response was not ok');
            
            const result = await response.json();
            
            if (result.success) {
                localStorage.setItem('tfg_submitted', 'true');
                form.style.display = 'none';
                successMsg.classList.remove('hidden');
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Submission failed: ' + error.message);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Registration';
        }
    });
});
