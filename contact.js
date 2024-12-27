(function() {
    // Initialize EmailJS with your public key
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key

    function showNotification(message, isSuccess = true) {
        const notification = document.createElement('div');
        notification.className = `notification ${isSuccess ? 'success' : 'error'}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Prepare template parameters
        const templateParams = {
            from_name: this.name.value,
            from_email: this.email.value,
            subject: this.subject.value,
            message: this.message.value
        };

        // Send email using EmailJS
        emailjs.send(
            'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
            'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
            templateParams
        )
        .then(() => {
            showNotification('Message sent successfully!');
            this.reset(); // Reset form
        })
        .catch((error) => {
            console.error('Error:', error);
            showNotification('Failed to send message. Please try again.', false);
        })
        .finally(() => {
            // Restore button state
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
        });
    });
})();
