const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = parseInt(movieSelect.value);

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update Total and Count
function updateSelectedCountAndTotal() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//Get data from localstorage and populate UI
function populateUI() {
	const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
	if(selectedSeats !== null && selectedSeats.length){
		seats.forEach((seat, index) => {
			if(selectedSeats.indexOf(index) > -1){
				seat.classList.add('selected');
			}
		})
	}
	const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
	if(selectedMovieIndex !== null){
		movieSelect.selectedIndex = selectedMovieIndex
	}
}

//Movie select event
movieSelect.addEventListener("change", e => {
    ticketPrice = parseInt(e.target.value);
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCountAndTotal();
});

// Seat click event
container.addEventListener("click", e => {
    if (
        e.target.classList.contains("seat") &&
        !e.target.classList.contains("occupied")
    ) {
        e.target.classList.toggle("selected");

        updateSelectedCountAndTotal();
    }
});

//Initial Count and total set
updateSelectedCountAndTotal();
