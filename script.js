document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const savedDataContainer = document.getElementById('savedData');
  
    registrationForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const surname = document.getElementById('surname').value;
      const firstName = document.getElementById('firstName').value;
      const age = document.getElementById('age').value;
      const education = document.getElementById('education').value;
      const desiredPosition = document.getElementById('desiredPosition').value;
  
      const userData = {
        surname,
        firstName,
        age,
        education,
        desiredPosition
      };
  
      if (navigator.onLine) {
        sendDataToServer(userData);
      } else {
        saveUserDataLocally(userData);
      }
  
      registrationForm.reset();
    });
  
    window.addEventListener('online', function() {
      displaySavedData();
    });
  
    function saveUserDataLocally(userData) {
      const savedData = getSavedDataFromLocalStorage();
      savedData.push(userData);
      localStorage.setItem('savedData', JSON.stringify(savedData));
    }
  
    function getSavedDataFromLocalStorage() {
      const savedDataString = localStorage.getItem('savedData');
      return savedDataString ? JSON.parse(savedDataString) : [];
    }
  
    function sendDataToServer(userData) {
      // Емулюємо відправку даних на сервер і читання з сервера
      console.log('Дані відправлені на сервер:', userData);
    }
  
    function displaySavedData() {
      const savedData = getSavedDataFromLocalStorage();
  
      if (savedData.length > 0) {
        const savedDataHTML = savedData.map(userData => {
          return `
            <div>
              <p><strong>Прізвище:</strong> ${userData.surname}</p>
              <p><strong>Ім'я:</strong> ${userData.firstName}</p>
              <p><strong>Вік:</strong> ${userData.age}</p>
              <p><strong>Освіта:</strong> ${userData.education}</p>
              <p><strong>Бажана посада:</strong> ${userData.desiredPosition}</p>
            </div>
          `;
        }).join('');
  
        savedDataContainer.innerHTML = savedDataHTML;
        localStorage.removeItem('savedData');
      } else {
        savedDataContainer.innerHTML = '';
      }
    }
  
    displaySavedData();
  });
  