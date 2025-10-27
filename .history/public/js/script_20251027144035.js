  //Ouvertur du modal avec chargement en premier du DOM pour éviter les erreurs
  document.addEventListener('DOMContentLoaded', function() {
  const element = document.getElementById('monElement');

    if (element) {
  document.getElementById('openModalBtn').addEventListener('click', function() {
    const myModal = new bootstrap.Modal(document.getElementById('jokesModal'));
    myModal.show();
  });
}});

//Modal ajout de blague
  document.getElementById('addJokeBtn').addEventListener('click', async function() {
    const question = document.getElementById('modal-question').value.trim();
    const answer = document.getElementById('modal-answer').value.trim();
    try {
      const response = await fetch('/api/v1/addJoke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question, answer })
      });
      const data = await response.json();
      if (response.ok) {
        alert('Blague ajoutée avec succès !');
        document.getElementById('modal-question').value = '';
        document.getElementById('modal-answer').value = '';
      } else {
        alert(`Erreur lors de l'ajout de la blague : ` + data.error);
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  })

  //Modal recherche de blague par son numéro
  document.addEventListener('DOMContentLoaded', function() {
    const btnSearchJoke = document.getElementById('btnSearchJoke');
    const numberJokeInput = document.getElementById('numberJoke');

    if (btnSearchJoke && numberJokeInput) {
      btnSearchJoke.addEventListener('click', async function() {
        const jokeId = numberJokeInput.value.trim();

        if (!jokeId) {
          alert('Veuillez entrer un numéro de blague.');
          return;
        }

        try {
          const response = await fetch(`/api/v1/${jokeId}`);

          if (!response.ok) {
            alert('Blague non trouvée.');
            return;
          }

          const joke = await response.json();

          document.getElementById('searchJokeId').textContent = joke.id;
          document.getElementById('searchJokeQuestion').textContent = joke.question;
          document.getElementById('searchJokeAnswer').textContent = joke.answer;

                  const modal = new bootstrap.Modal(document.getElementById('searchJokeModal'));
        modal.show();
        
      } catch (error) {
        console.error('Erreur:', error);
        alert('❌ Une erreur est survenue');
      }
    });
  }
  
});

//Modal random blague
document.addEventListener('DOMContentLoaded', async function() {
  const randomJokeModal = document.getElementById('randomJokeModal');
  const jokeContent = document.getElementById('randomJokeContent');
  const btnNewRandomJoke = document.getElementById('btnNewRandomJoke');
  
  try {
      const response = await fetch('/api/v1/random-joke');
      const joke = await response.json();
      
      if (response.ok) {
        jokeContent.innerHTML = `
          <p><strong>Question:</strong> ${joke.question}</p>
          <p><strong>Réponse:</strong> ${joke.answer}</p>
        `;
      } else {
        jokeContent.innerHTML = `<p class="text-muted">Aucune blague disponible.</p>`;
      }
    } catch (error) {
      console.error('Erreur:', error);
      jokeContent.innerHTML = `<p class="text-danger">Erreur lors du chargement de la blague.</p>`;
    }

  
  // Charger une blague lors de l'ouverture du modal
  randomJokeModal.addEventListener('show.bs.modal', function () {
    loadRandomJoke();
  });
  
  // Charger une nouvelle blague lors du clic sur le bouton
  btnNewRandomJoke.addEventListener('click', function() {
    loadRandomJoke();
  });
});