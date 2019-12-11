// Standard Functions
const descriptors = ["galaxies!", "planets!", "stars!", "nebulas!", "moons!", "comets!", "asteroids!", "meteors!", "space travel!", "aliens!"];
let count = 1;

function rotateHeroDescriptors() {
    setInterval(function () {
        $("#rotationText").fadeOut(400, function () {
            $(this).html(descriptors[count]);
            count++;
            if (count == descriptors.length)
                count = 0;
            $("#rotationText").fadeIn(400);
        });
    }, 2000);
}

// Animation Functions 

// API Info & Calls
function getAPOD() {
    const nasaApiKey = '385VvSe2S4wsLQadW6hwpbhgfBbnexcPWCcH4rmb'
    const nasaURL = `https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`
  
  fetch (nasaURL)
  .then (response => {
    if(response.ok){
      return response.json();
    } throw new Error (reponse.statusText)
  })
  .then (responseJson => displayAPOD(responseJson))
  .catch (err =>{
    $('.error-message').text(`We can't seem to find any stars today: ${err.message}`)
  })
  }
  

// Generation Functions (pages content)
function generateHero() {
    return `
    <h1> Let's learn about <span id="rotationText">.....</span></h1>
    <nav>
    <a class="intro">About Astrobébé</a>
    <a class="nasa">Check out NASA</a>
    <a class="activities">Activities</a>
    </nav>
    `
}

function generateIntroPage() {
    return `
     <h2> Welcome to the world of Astrobébé! </h2> 
     <p> Astrobébé loves all things space, and especially learning new things about space. 
     To learn more about space, Astrobébé likes to visit the NASA website and read as much
     as she can...but sometimes it's a little confusing and puts her to sleep. So, Astrobébé 
     thought it would be a good idea to get all the fun info from NASA and put it here for the
     other Astrobabies who might want to read all about it! </p>

     <p> Since you're here, we're guessing you are an ASTROBÉBÉ too. Congratulations! 
     As it happens, we are in desperate need of a captain for our ship, because Astrobébé 
     has gone missing. Will you help us find her? <p>
    `
}

function generateNasaPage() {
    return `
    <h1> NASA </h1>
    <p> Info about nasa </p>

    <h2> APOD </h2>
        <p> Info about pic of the day <p> 
            <p class='starButton'><input type='submit'></p>
                <div class='results'></div>
                     <p class='error-message'></p>
  

    <h2> Image search? </h2>

    <h2> Nasa Articles </h2>
    `
}

function generateActivitiesPage() {
    return `
    <h1> 3, 2, 1 Blast Off! </h1>

    <p> Are you ready for the adventure of a lifetime? </p>
    `
}


// Display Functions

function displayHero() {
    $(".hero").html(generateHero());
}
function displayIntroPage() {
    $("main").attr('class', 'intro').html(generateIntroPage());
}
function displayNasaPage() {
    $("main").attr('class', 'nasa').html(generateNasaPage());
}
function displayActivitiesPage() {
    $("main").attr('class', 'activities').html(generateActivitiesPage());
}

function displayAPOD(responseJson) {
    $('.results').empty();
    $('.results').html(`
    <p><img src='${responseJson.hdurl}'></p> 
    <p>${responseJson.explanation}</p>
    <p>${responseJson.copyright}</p>`)
   }

// Event Handlers
function handleIntroLink() {
    $('.intro').click(function (event) {
        displayIntroPage();
    })
}
function handleNasaLink() {
    $('.nasa').click(function (event) {
        displayNasaPage();
    })
}
function handleActivitiesLink() {
    $('.activities').click(function (event) {
        displayActivitiesPage();
    })
}
function watchInput() {
    $('.starButton').on('submit', event => {
      event.preventDefault();
      getAPOD();
    })
  }

function setUpEventHandlers() {
    handleNasaLink();
    handleIntroLink();
    handleActivitiesLink();
    watchInput();
}

function initializeUI() {
    displayHero();
    displayIntroPage();
    rotateHeroDescriptors();
    setUpEventHandlers();
}
$(initializeUI);