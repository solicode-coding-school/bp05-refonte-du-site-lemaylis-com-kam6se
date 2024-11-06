  // Elements
  const bookBtn = document.querySelector('.book-btn');
  const modal = document.querySelector('.modal');
  const closeBtn = document.querySelector('.close-btn');
  const form = document.querySelector('.booking-form');
  const successMessage = document.querySelector('.success-message');

  
  bookBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; 
  });

 
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
  });

  function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
      form.reset();
      successMessage.style.display = 'none';
  }

  
  form.addEventListener('submit', (e) => {
      e.preventDefault();

      
      const formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          activity: document.getElementById('activity').value,
          date: document.getElementById('date').value,
          participants: document.getElementById('participants').value
      };

      
      console.log('Booking Details:', formData);

      
      successMessage.style.display = 'block';

      
      setTimeout(() => {
          closeModal();
      }, 2000);
  });

  
  const dateInput = document.getElementById('date');
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;