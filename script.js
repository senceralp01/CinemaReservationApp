const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = container.querySelectorAll('.seat:not(.reserved)');


getFromLocalStorage();
calculateTotal();


container.addEventListener('click', function (e) {
    //console.log(e.target);

    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        //console.log('Successful!');

        e.target.classList.toggle('selected'); // toggle: Varsa kaldırır, yoksa ekler.
        calculateTotal();
    }
});


select.addEventListener('change', function (e) {
    calculateTotal();
});


function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected');
    //console.log(selectedSeats);
    //console.log(seats);
    selectedSeatsArr = [];
    seatsArr = [];

    selectedSeats.forEach(function (seat) {
        selectedSeatsArr.push(seat);
    });

    seats.forEach(function (seat) {
        seatsArr.push(seat);
    });

    let selectedSeatIndexs = selectedSeatsArr.map(function (seat) {
        return seatsArr.indexOf(seat);
    });

    //console.log(selectedSeatIndexs);

    //console.log(seatsArr);
    //console.log(selectedSeatsArr);

    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatIndexs);
}


function getFromLocalStorage(){
    
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats != null && selectedSeats.length > 0){
        seats.forEach(function(seat, indexInLocalStorage){
            if (selectedSeats.indexOf(indexInLocalStorage) > -1){
                seat.classList.add('selected');
            }
        });
    }


    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex != null){
        select.selectedIndex = selectedMovieIndex;
    }


}


function saveToLocalStorage(index) {
    localStorage.setItem('selectedSeats', JSON.stringify(index));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}

