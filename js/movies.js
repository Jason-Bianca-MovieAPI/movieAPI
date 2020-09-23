(function (){



const URL = "https://capable-zenith-layer.glitch.me/movies";
//fetch all movies on server
fetch(URL)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.forEach(movies => {
            $('.movies').append(`<div>${movies.title} ${movies.rating} <button class='deleteMovie'>X</button></div>`)
        });

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
            $('.movies').append("<div>" + $("#addInput").val() + " " + $(".addRating").val() + "<button class='deleteMovie'>X</button>" + "</div>");
        })


        function deleteID (id){
            const url = URL + "/" + id

            editData("DELETE", url)
        }

        deleteID(57)



        function editData(method, url, obj) {

            let editBody = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
            }



            if (obj) {
                editBody.body = JSON.stringify(obj);
            }

            fetch(URL, editBody)
                .then(response => console.log(response))
                .then()

        }

    });



// IIFE
})();