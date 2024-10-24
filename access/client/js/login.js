// document.addEventListener('DOMContentLoaded', function () {
//     document.getElementById('login_form').addEventListener('submit', function (event) {
//         event.preventDefault(); // Ngăn chặn việc submit form mặc định
//         var password = document.getElementById('Password').value;
//         if (password === 'ftwg') {
//             window.location.href = 'home.html';
//         } else {
//             alert('Mật khẩu không đúng');
//         }
//     });
// });

document.getElementById('login_form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the form from submitting normally

    // Get the form data
    const email = document.getElementById('Email').value;
    const password = document.getElementById('Password').value;

    // Prepare the data to be sent in the POST request
    const loginData = {
        email: email,
        password: password
    };

    try {
        // Send a POST request to the login API
        const response = await fetch('https://furni1.transtechvietnam.com/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        // Parse the JSON response
        const result = await response.json();

        console.log(response.ok);


        if (response.ok) {
            // Check the role and redirect accordingly
            if (result.account.role === true) {
                // Redirect to the admin page
                window.location.href = '/homeAdmin';
            } else {
                // Redirect to the home page
                window.location.href = '/home';
            }
        } else {
            // Handle login errors
            alert('Login failed: ' + result.message);
        }

    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again.');
    }
});

