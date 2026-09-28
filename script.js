import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAWQoG9z9hs62RSLhUUB-IDHpbWHvWWeCc",
  authDomain: "regalohotwheels.firebaseapp.com",
  projectId: "regalohotwheels",
  storageBucket: "regalohotwheels.firebasestorage.app",
  messagingSenderId: "731044845743",
  appId: "1:731044845743:web:8bd3fe431832c4862d1c5a",
  measurementId: "G-3DWY1YM28Z"
};


const CLOUD_NAME = "d3xvtf0l"; 
const UPLOAD_PRESET = "ramo_preset"; 

document.addEventListener('contextmenu', e => e.preventDefault());
document.onkeydown = function(e) {
  if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 67 || e.keyCode == 74)) || (e.ctrlKey && e.keyCode == 85)) {
    return false;
  }
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let configuracionRegalo = {
  titulo: "💙 Feliz 30 de Septiembre 💙",
  mensajeCentral: "Aceleras mi mundo en cada kilómetro recorrido 🏎️",
  fotoCentral: "auto5.png"
};


async function iniciarApp() {
  const urlParams = new URLSearchParams(window.location.search);
  const regaloId = urlParams.get('id');

  if (regaloId) {
    try {
      const docRef = doc(db, "regalos", regaloId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let data = docSnap.data();
        configuracionRegalo.titulo = data.titulo;
        configuracionRegalo.mensajeCentral = data.mensajeCentral;
        if(data.fotoUrl) configuracionRegalo.fotoCentral = data.fotoUrl;
        
        document.getElementById('btnAbrirCreador').style.display = 'none';
      }
    } catch (e) { console.error("Error al cargar datos"); }
  }

  document.getElementById('tituloDinamico').innerText = configuracionRegalo.titulo;
  document.getElementById('tituloGalaxia').innerText = configuracionRegalo.titulo;
  dibujarCartas();
}

function dibujarCartas() {
  const cont = document.getElementById('contenedorCartas');
  cont.innerHTML = `
    <div class="blister-card hw2" style="--rot: -16deg; bottom: 205px; left: 125px; z-index: 15; animation: saltarAuto 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 1.7s;" onclick="abrirModal('TE AMO', 'No necesito un calendario para recordarte cuánto significas para mí ❤️')">
      <div class="blister-hueco"></div><div class="blister-logo">HOT WHEELS</div><div class="blister-burbuja"><img src="auto2.png" class="blister-auto-img"></div>
    </div>
    <div class="blister-card hw3" style="--rot: 16deg; bottom: 205px; right: 125px; z-index: 15; animation: saltarAuto 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 1.9s;" onclick="abrirModal('TE ADORO', 'Recuerda que eres capaz de todo. Yo creo en ti siempre ❤️')">
      <div class="blister-hueco"></div><div class="blister-logo">HOT WHEELS</div><div class="blister-burbuja"><img src="auto3.png" class="blister-auto-img"></div>
    </div>
    <div class="blister-card hw1" style="--rot: -30deg; bottom: 135px; left: 75px; z-index: 25; animation: saltarAuto 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 2.1s;" onclick="abrirModal('ERES MI ALEGRÍA', 'Tu alegría hace que mi vida sea más bonita 😍')">
      <div class="blister-hueco"></div><div class="blister-logo">HOT WHEELS</div><div class="blister-burbuja"><img src="auto1.png" class="blister-auto-img"></div>
    </div>
    <div class="blister-card hw4" style="--rot: 30deg; bottom: 135px; right: 75px; z-index: 25; animation: saltarAuto 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 2.3s;" onclick="abrirModal('ERES VALIOSO', 'Quiero desearte todo el éxito del mundo en cada meta que persigas 🥰')">
      <div class="blister-hueco"></div><div class="blister-logo">HOT WHEELS</div><div class="blister-burbuja"><img src="auto4.png" class="blister-auto-img"></div>
    </div>
    
    <!-- CARTA CENTRAL DINÁMICA -->
    <div class="blister-card hw5" style="--rot: 0deg; bottom: 110px; left: 50%; margin-left: -42.5px; z-index: 30; animation: saltarAuto 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 2.5s;" onclick="abrirModal('PARA TI', '${configuracionRegalo.mensajeCentral}')">
      <div class="blister-hueco"></div><div class="blister-logo">HOT WHEELS</div>
      <div class="blister-burbuja"><img src="${configuracionRegalo.fotoCentral}" class="blister-auto-img" style="border-radius:5px; object-fit:cover; width:100%; height:100%;"></div>
    </div>
  `;
}

// ==========================================
// CREADOR DE ENLACES (GUARDAR DATOS Y FOTOS)
// ==========================================
document.getElementById('btnAbrirCreador').onclick = () => document.getElementById('panelCreacion').style.display = 'flex';
document.getElementById('btnCerrarCreador').onclick = () => document.getElementById('panelCreacion').style.display = 'none';

document.getElementById('btnGenerarEnlace').onclick = async function() {
  this.innerText = "Subiendo y creando... ⏳";
  this.disabled = true;

  let titulo = document.getElementById('inputTitulo').value;
  let msgCentral = document.getElementById('inputMsgCentral').value;
  let inputFoto = document.getElementById('inputFoto');
  
  let fotoUrl = null;

  // Subir foto a Cloudinary si el usuario seleccionó una
  if (inputFoto.files.length > 0) {
    const formData = new FormData();
    formData.append("file", inputFoto.files[0]);
    formData.append("upload_preset", UPLOAD_PRESET);
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: "POST", body: formData });
      const data = await res.json();
      fotoUrl = data.secure_url;
    } catch (e) {
      alert("Error subiendo la foto. Intenta sin foto.");
      this.innerText = "Generar Enlace Mágico"; this.disabled = false; return;
    }
  }

  // Crear el ID único y guardar en Firebase
  let nuevoId = 'regalo_' + Math.random().toString(36).substring(2, 9);
  
  try {
    await setDoc(doc(db, "regalos", nuevoId), {
      titulo: titulo,
      mensajeCentral: msgCentral,
      fotoUrl: fotoUrl
    });

    let enlaceFinal = window.location.origin + window.location.pathname + "?id=" + nuevoId;
    document.getElementById('resultadoEnlace').innerHTML = `¡Enlace creado con éxito! Cópialo y envíalo:<br><br><a href="${enlaceFinal}" target="_blank" style="color:#fff; background:#000; padding:10px; border-radius:5px; display:inline-block;">${enlaceFinal}</a>`;
  } catch (err) {
    alert("Error al guardar. Verifica tu Firebase Config.");
  }
  
  this.innerText = "Generar Enlace Mágico";
  this.disabled = false;
}

// ==========================================
// FUNCIONES UI (Botones, Carga, Modal)
// ==========================================
let porcentaje = 0;
const intervaloCarga = setInterval(() => {
  porcentaje += Math.floor(Math.random() * 8) + 2;
  if(porcentaje >= 100) {
    porcentaje = 100;
    clearInterval(intervaloCarga);
    document.getElementById('textoCarga').innerText = "¡SISTEMA LISTO!";
    document.getElementById('barraProgreso').parentElement.style.display = 'none';
    document.getElementById('btnDescubrir').style.display = 'block';
  }
  document.getElementById('textoCarga').innerText = `ENSAMBLANDO SORPRESA... ${porcentaje}%`;
  document.getElementById('barraProgreso').style.width = `${porcentaje}%`;
}, 100);

document.getElementById('btnDescubrir').onclick = () => {
  document.getElementById('musicaFondo').play().catch(e=>console.log(e));
  document.getElementById('pantallaEntrada').style.opacity = '0';
  setTimeout(() => document.getElementById('pantallaEntrada').style.display = 'none', 1000);
};

window.abrirModal = (titulo, texto) => {
  document.getElementById('modalTitulo').innerText = titulo;
  document.getElementById('modalTexto').innerText = texto;
  document.getElementById('modalMensaje').classList.add('mostrar');
}
document.getElementById('btnCerrarModal').onclick = () => document.getElementById('modalMensaje').classList.remove('mostrar');

document.getElementById('btnGalaxia').onclick = () => {
  document.getElementById('escenaRamo').style.opacity = '0';
  setTimeout(() => {
    document.getElementById('escenaRamo').style.display = 'none';
    document.getElementById('threeCanvas').style.display = 'block';
    document.getElementById('ui-galaxia').style.display = 'block';
    initThreeJS();
  }, 1500);
}

// ==========================================
// GALAXIA THREE.JS
// ==========================================
let scene, camera, renderer, controls, universoGroup;

function initThreeJS() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x020510);
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 15000);
  camera.position.set(0, 400, 1600); 

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('threeCanvas').appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true; controls.autoRotateSpeed = 0.8;

  universoGroup = new THREE.Group();
  scene.add(universoGroup);

  // Estrellitas de fondo simples
  const starGeo = new THREE.BufferGeometry(); const starPos = [];
  for(let i=0; i<3000; i++) starPos.push((Math.random()-0.5)*6000, (Math.random()-0.5)*6000, (Math.random()-0.5)*6000);
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
  scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({color: 0xcceeff, size: 2})));

  // Autos flotantes
  const loader = new THREE.TextureLoader();
  const texturasAutos = [loader.load('auto1.png'), loader.load('auto2.png'), loader.load('auto3.png')];
  
  for(let i=0; i<25; i++) {
    let sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturasAutos[i%3], transparent: true }));
    let carPivot = new THREE.Group();
    carPivot.position.y = (Math.random() - 0.5) * 450;
    carPivot.rotation.y = Math.random() * Math.PI * 2;
    carPivot.userData = { velocidad: 0.001 + Math.random() * 0.001 };
    sprite.scale.set(160, 100, 1);
    sprite.position.set(500 + Math.random() * 1000, 0, 0);
    carPivot.add(sprite);
    universoGroup.add(carPivot);
  }

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  universoGroup.rotation.y -= 0.0005;
  universoGroup.children.forEach(c => {
    if(c.userData && c.userData.velocidad) c.rotation.y -= c.userData.velocidad;
  });
  renderer.render(scene, camera);
}

// Arrancar validando
iniciarApp();
