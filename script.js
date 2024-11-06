document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    const modal = document.getElementById('confirmationModal');
    const btnConfirm = modal.querySelector('.btn-confirm');
    const btnCancel = modal.querySelector('.btn-cancel');
    
    const prices = {
        single: { first: 500, additional: 250 },
        double: { first: 800, additional: 400 },
        suite: { fixed: 1200 },
        child: { fixed: 150 }
    };

    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkIn').min = today;
    document.getElementById('checkOut').min = today;

    document.getElementById('checkIn').addEventListener('change', function(e) {
        document.getElementById('checkOut').min = e.target.value;
        calculatePrice();
    });

    form.addEventListener('change', calculatePrice);

    function calculatePrice() {
        const roomType = document.getElementById('roomType').value;
        const checkIn = new Date(document.getElementById('checkIn').value);
        const checkOut = new Date(document.getElementById('checkOut').value);
        const adults = parseInt(document.getElementById('adults').value);
        const children = parseInt(document.getElementById('children').value);

        if (!roomType || !checkIn || !checkOut || isNaN(checkIn) || isNaN(checkOut)) {
            return;
        }

        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        let total = 0;

        if (roomType === 'suite') {
            total = prices.suite.fixed * nights;
        } else {
            total += prices[roomType].first;
            
            if (nights > 1) {
                total += prices[roomType].additional * (nights + 1);
            }
        }

        total += children * prices.child.fixed * nights;

        const priceDetails = document.querySelector('.price-details');
        priceDetails.innerHTML = `
            <p>Nombre de nuits: ${nights}</p>
            <p>Adultes: ${adults}</p>
            <p>Enfants: ${children}</p>
        `;
        document.getElementById('totalPrice').textContent = `${total} MAD`;
    }

    // Nouvelles fonctions pour gérer le modal
    function showModal() {
        modal.classList.add('active');
    }

    function hideModal() {
        modal.classList.remove('active');
    }

    // Gestionnaire de soumission 
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        showModal();
    });

    // Gestionnaires 
    btnConfirm.addEventListener('click', function() {
        console.log('Réservation envoyée ! Nous vous contacterons bientôt.');
        
        hideModal();
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    });

    btnCancel.addEventListener('click', function() {
        hideModal();
    });

    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideModal();
        }
    });

    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            hideModal();
        }
    });
});
