// Navigation Scroll Effect
// (Optional if strictly sticky, but good for adding shadow on scroll)
/*
const nav = document.querySelector('.nav-container');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
    } else {
        nav.style.boxShadow = "0 4px 15px rgba(0,0,0,0.05)";
    }
});
*/

// Modal Functions
const modal = document.getElementById("archive-modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");

function openModal(id) {
    modal.style.display = "block";

    // Simulate content loading based on ID
    modalTitle.innerText = `Activity Log: ${id}`;
    let contentHTML = `<p>${id}の活動記録です。佐治町の美しい自然の中で、メンバーと共に楽しい時間を過ごしました。</p>`;

    // Simple mock image placeholder
    contentHTML += `<div style="width:100%; height:200px; background:#f0f0f0; border-radius:15px; margin-top:20px; display:flex; align-items:center; justify-content:center; color:#ccc;">IMAGE for ${id}</div>`;

    modalBody.innerHTML = contentHTML;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside
window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Copy to Clipboard
function copyToClipboard() {
    const text = document.getElementById('wallet-address').innerText;
    navigator.clipboard.writeText(text).then(() => {
        const tooltip = document.getElementById('copy-success');
        tooltip.classList.add('show');
        setTimeout(() => {
            tooltip.classList.remove('show');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}
