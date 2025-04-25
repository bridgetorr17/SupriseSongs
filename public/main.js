const likeButtons = document.querySelectorAll('.likeButton');

likeButtons.forEach(button => {
    button.addEventListener('click', _ => {
        const concertName = button.id;
        
        fetch('/like', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({concert: concertName})
        })
        .then(response => {
            if(!response.ok){
                throw new Error(`HTTP error, status ${response.status}`);
            }
            return response.json();
        })
        .then(updatedValue => {
            document.querySelector(`#${concertName.replace(/\s+/g, '_')}_votes`).innerHTML = updatedValue;
        })
        .catch(error => {
            console.error("Error updaing item:", error);
        })
    })
})
