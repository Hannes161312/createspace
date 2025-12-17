const element1 = document.getElementById("element1");
const element2 = document.getElementById("element2");
const element3 = document.getElementById("element3");
const heightSlider = document.getElementById("heightSlider");
const radiusSlider = document.getElementById("radiusSlider");
const bottomSlider = document.getElementById("bottomSlider");
const leftSlider = document.getElementById("leftSlider");
const column_right = document.getElementById('column_right');
const backgroundimage = document.getElementById('backgroundimage');
const rakete = document.getElementById('rakete');
const raketerotation = document.getElementById('raketerotation');
const raketeleft = document.getElementById('raketeleft');
const raketebottom = document.getElementById('raketebottom');
const sterne1 = document.getElementById('sterne1');
const sterne2 = document.getElementById('sterne2');
const planetenRotation = document.getElementById('planetenRotation');
const planeten = document.getElementById('planeten');
const saturnTop = document.getElementById('saturnTop');
const saturnLeft = document.getElementById('saturnLeft');
const saturnSize = document.getElementById('saturnSize');
const saturn = document.getElementById('saturn');

let starState = 0; // Zustand für Sterne: 0 = beide 0%, 1 = sterne1 100%, 2 = sterne2 100%

let isModified = false; // Zustand speichern

let planetenVisible = false; // Zustand für Planeten Sichtbarkeit

element1.addEventListener("click", function () {
  if (!isModified) {
    // Eigenschaften ändern
    element2.style.height = "400px";
    element2.style.width = "400px";
    element2.style.position = "absolute";
    element2.style.bottom = "200px";
    element2.style.left = "1000px";
    element2.style.transform = "rotate(100deg)";
    element2.style.transition = "4.0s";
    element2.style.backgroundImage = "linear-gradient(90deg, rgb(255, 202, 89), rgb(255, 96, 43))";
  } else {
    // Eigenschaften zurücksetzen
    element2.style.height = "";
    element2.style.width = "";
    element2.style.position = "";
    element2.style.bottom = "";
    element2.style.left = "";
    element2.style.transform = "";
    element2.style.transition = "";
    element2.style.backgroundImage = "";
  }

  isModified = !isModified; // Zustand umschalten
});

function newelement3() {
  const h = heightSlider.value;
  const r = radiusSlider.value;
  const b = bottomSlider.value;
  const l = leftSlider.value;

  element3.style.height = h + "px";
  element3.style.borderRadius = r + "px";
  element3.style.bottom = b + "px";
  element3.style.left = l + "px";
}

heightSlider.addEventListener("input", newelement3);
radiusSlider.addEventListener("input", newelement3);
bottomSlider.addEventListener("input", newelement3);
leftSlider.addEventListener("input", newelement3);
// initial draw
newelement3();

// Element1 Toggle durch Klick auf element3
element3.addEventListener("click", () => {
  element1.classList.toggle('element1-active');
});

// Toggle Planeten Sichtbarkeit durch Klick auf saturn
saturn.addEventListener("click", () => {
  if (!planetenVisible) {
    planeten.style.opacity = "100%";
  } else {
    planeten.style.opacity = "0%";
  }
  planetenVisible = !planetenVisible;
});

// Hintergrundbild-Auswahl (#backgroundimage) mit column_right verbinden
// Erwartet Werte "1".."5" (oder direkt Dateiname)
const bgMap = {
  '1': 'hintergrundbild1.jpg',
  '2': 'hintergrundbild2.jpg',
  '3': 'hintergrundbild3.jpg',
  '4': 'hintergrundbild4.jpg',
  '5': 'hintergrundbild5.jpg'
}

function updateBackgroundImage(value) {
  if (!column_right) return;
  // nutze gemappten Namen oder den Wert direkt (falls Dateiname)
  const file = bgMap[value] || value;
  column_right.style.backgroundImage = `url('${file}')`;
}

// Initial setzen und auf Änderungen reagieren
if (backgroundimage && column_right) {
  updateBackgroundImage(backgroundimage.value || '1');
  backgroundimage.addEventListener('input', (e) => updateBackgroundImage(e.target.value));
  backgroundimage.addEventListener('change', (e) => updateBackgroundImage(e.target.value));
}

function newrakete() {
  const rr = raketerotation.value;
  const rb = raketebottom.value;
  const rl = raketeleft.value;

  rakete.style.transform = 'rotate(' + rr + 'deg)';
  rakete.style.bottom = rb + "px";
  rakete.style.left = rl + "px";
}

function updatePlanetenRotation() {
  const pr = planetenRotation.value;
  planeten.style.transform = 'rotate(' + pr + 'deg)';
}

function updateSaturn() {
  const st = saturnTop.value;
  const sl = saturnLeft.value;
  const ss = saturnSize.value;
  saturn.style.top = st + "px";
  saturn.style.left = sl + "px";
  saturn.style.width = ss + "vw";
  saturn.style.height = ss + "vw";
}

raketerotation.addEventListener("input", newrakete);
raketebottom.addEventListener("input", newrakete);
raketeleft.addEventListener("input", newrakete);
// initial draw
newrakete();

planetenRotation.addEventListener("input", updatePlanetenRotation);
// initial draw
updatePlanetenRotation();

saturnTop.addEventListener("input", updateSaturn);
saturnLeft.addEventListener("input", updateSaturn);
saturnSize.addEventListener("input", updateSaturn);
// initial draw
updateSaturn();

// Event Listener für Klick auf rakete, um Sterne zu toggeln
rakete.addEventListener("click", function() {
  starState = (starState + 1) % 3;
  if (starState === 1) {
    sterne1.style.opacity = "1";
    sterne2.style.opacity = "0";
  } else if (starState === 2) {
    sterne1.style.opacity = "0";
    sterne2.style.opacity = "1";
  } else {
    sterne1.style.opacity = "0";
    sterne2.style.opacity = "0";
  }
});

// Download-Button für column_right als JPEG
const downloadBtn = document.getElementById('downloadBtn');

if (downloadBtn && column_right) {
    downloadBtn.addEventListener('click', () => {
        // Rendere nur column_right
        html2canvas(column_right, { 
            scale: 1,
            useCORS: true,
            allowTaint: true
        }).then(canvas => {
            // Als JPEG exportieren
            const imgData = canvas.toDataURL('image/jpeg', 0.9);
            
            // Download-Link erstellen
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'column_right_screenshot.jpg';
            link.click();
        }).catch(err => {
            console.error('Fehler beim Erstellen des Screenshots:', err);
        });
    });
}
