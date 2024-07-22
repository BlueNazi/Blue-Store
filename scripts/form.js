function validateUsername() {
    const username = document.getElementById('username').value;
    const usernameError = document.getElementById('username-error');
    const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;

    if (!usernameRegex.test(username)) {
        usernameError.textContent = 'Username must be 3-15 characters long and contain only letters and numbers.';
        usernameError.style.color = 'red';
        return false;
    } else {
        usernameError.textContent = 'Username is valid.';
        usernameError.style.color = 'green';
        return true;
    }
}

function validateEmail() {
    const email = document.getElementById('email').value;
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailError.style.color = 'red';
        return false;
    } else {
        emailError.textContent = 'Email is valid.';
        emailError.style.color = 'green';
        return true;
    }
}

function validatePassword() {
    const password = document.getElementById('password').value;
    const passwordError = document.getElementById('password-error');
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRegex.test(password)) {
        passwordError.textContent = 'Password must be at least 8 characters long and contain at least one letter and one number.';
        passwordError.style.color = 'red';
        return false;
    } else {
        passwordError.textContent = 'Password is valid.';
        passwordError.style.color = 'green';
        return true;
    }
}

function validatePasswordMatch() {
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;
    const password2Error = document.getElementById('password2-error');

    if (password !== password2) {
        password2Error.textContent = 'Passwords do not match.';
        password2Error.style.color = 'red';
        return false;
    } else {
        password2Error.textContent = 'Passwords match.';
        password2Error.style.color = 'green';
        return true;
    }
}

function validateForm() {
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isPasswordMatchValid = validatePasswordMatch();

    const isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isPasswordMatchValid;
    document.getElementById('signup-submit').disabled = !isFormValid;
    return isFormValid;
}

document.getElementById('signup-form').addEventListener('submit', function (event) {
    if (!validateForm()) {
        event.preventDefault();
        alert('Please fill out all fields correctly.');
    }
});
function showAlert() {
    Swal.fire({
        title: 'Select an Option',
        html: `
        <select id="mySelect" class="swal2-select">
         <option value="Bradenton">Bradenton</option>
<option value="Bremerton">Bremerton</option>
<option value="Bridgeport">Bridgeport</option>
<option value="Brighton">Brighton</option>
<option value="Brownsville">Brownsville</option>
<option value="Bryan">Bryan</option>
<option value="Buffalo">Buffalo</option>
<option value="Burbank">Burbank</option>
<option value="Burlington">Burlington</option>
<option value="Cambridge">Cambridge</option>
<option value="Canton">Canton</option>
<option value="Cape Coral">Cape Coral</option>
<option value="Carrollton">Carrollton</option>
<option value="Cary">Cary</option>
<option value="Cathedral City">Cathedral City</option>
<option value="Cedar Rapids">Cedar Rapids</option>
<option value="Champaign">Champaign</option>
<option value="Chandler">Chandler</option>
<option value="Charleston">Charleston</option>
<option value="Charlotte">Charlotte</option>
<option value="Chattanooga">Chattanooga</option>
<option value="Chesapeake">Chesapeake</option>
<option value="Chicago">Chicago</option>
<option value="Chula Vista">Chula Vista</option>
<option value="Cincinnati">Cincinnati</option>
<option value="Clarke County">Clarke County</option>
<option value="Clarksville">Clarksville</option>
<option value="Clearwater">Clearwater</option>
<option value="Cleveland">Cleveland</option>
<option value="College Station">College Station</option>
<option value="Colorado Springs">Colorado Springs</option>
<option value="Columbia">Columbia</option>
<option value="Columbus">Columbus</option>
<option value="Concord">Concord</option>
<option value="Coral Springs">Coral Springs</option>
<option value="Corona">Corona</option>
<option value="Corpus Christi">Corpus Christi</option>
<option value="Costa Mesa">Costa Mesa</option>
<option value="Dallas">Dallas</option>
<option value="Daly City">Daly City</option>
<option value="Danbury">Danbury</option>
<option value="Davenport">Davenport</option>
<option value="Davidson County">Davidson County</option>
<option value="Dayton">Dayton</option>
<option value="Daytona Beach">Daytona Beach</option>
<option value="Deltona">Deltona</option>
<option value="Denton">Denton</option>
<option value="Denver">Denver</option>
<option value="Des Moines">Des Moines</option>
<option value="Detroit">Detroit</option>
<option value="Downey">Downey</option>
<option value="Duluth">Duluth</option>
<option value="Durham">Durham</option>
<option value="El Monte">El Monte</option>
<option value="El Paso">El Paso</option>
<option value="Elizabeth">Elizabeth</option>
<option value="Elk Grove">Elk Grove</option>
<option value="Elkhart">Elkhart</option>
<option value="Erie">Erie</option>
<option value="Escondido">Escondido</option>
<option value="Eugene">Eugene</option>
<option value="Evansville">Evansville</option>
<option value="Fairfield">Fairfield</option>
<option value="Fargo">Fargo</option>
        </select>
      `,
        confirmButtonText: 'SAVE',

    });
}