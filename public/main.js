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

            sortConcertList();
        })
        .catch(error => {
            console.error("Error updaing item:", error);
        })
    })
})

function sortConcertList(){
    let concertList = document.getElementById('concertListRanked');
    let concertListArr = Array.from(concertList.children);

    concertListArr.sort((a,b) => {
        const aVotes = a.querySelector('span[id$="_votes"]').textContent;
        const bVotes = b.querySelector('span[id$="_votes"]').textContent;
        return bVotes - aVotes;
    
    });

    concertListArr.forEach(item => concertList.appendChild(item));
}
