(function () {


    const URL = "https://capable-zenith-layer.glitch.me/movies/";
//fetch all movies on server
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            function loadMovies() {
                let html = "";
                data.forEach(movies => {
                    html = `<div class="movieDiv">${movies.title} ${movies.rating} <button class='deleteMovie' type="submit" data-id=${movies.id}>X</button>`;
                    $('.movies').append(html);
                });
            }

            loadMovies();

//add movies
            $('.addMovie').click((e) => {
                e.preventDefault()
                let inputText = $("#addInput").val();
                let inputRating = $(".addRating").val();
//new movie object
                let movieObj = {
                    title: inputText,
                    rating: inputRating
                };
//adding it to server data
                let options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(movieObj),
                };

                fetch(URL, options)
                    .then(response => response.json())
                    .catch(error => console.log(error))
                $('.movies').append("<div>" + $("#addInput").val() + " " + $(".addRating").val() + `<button  type="submit" class='deleteMovie'>X</button>` + "</div>");

            })


//             $(document).on("click", ".deleteMovie", function (e) {
//                 e.preventDefault();
//                 console.log("getting here");
//                 console.log(`${URL}`+ $(this).data("id"));
//                 let newid = $(this).data("id");
//                 console.log(typeof newid);
//                 console.log(parseInt(newid));
//                 deleteMovie(newid);
//             })
// //delete movies by ID
//             function deleteMovie(id) {
//                 fetch(`${URL}${id}`,
//                     {method: 'DELETE'})
//             }
            $(document).on("click", ".deleteMovie", function (e) {
                e.preventDefault();
                let newID = $(this).data("id");
                console.log(newID)
                deleteMovie(newID);
            })

            function deleteMovie(newID) {
                const deleteOptions = {
                    "method": "DELETE",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                };
                let deleteURL = `${URL}${newID}`;

                fetch(deleteURL, deleteOptions)
                    .then(response => response.json)
                    .catch(error => console.log(error))

            }
        });


//EDIT
//     $(document).on("click", ".edit", function(e){
//         e.preventDefault();
//         console.log("something");
//         let editID = $(this).data("id");
//         console.log(editID);


// IIFE don't touch
})();