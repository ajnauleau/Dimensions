
window.onload = function() {

    var form = document.getElementById("form-input");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        var subscribe = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value
        };

        fetch("/first", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(subscribe)
        })
            .then(function (response) {
                console.log(response);
                document.getElementById('form-input').style.display = "none";
                document.getElementById('submit').style.display = "block";
                return response.json();
            })
            .then(function (data) {
                console.log(data);
            })
    })

}
