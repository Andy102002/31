import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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
const TU_CORREO_ADMIN = "andyodar2122@gmail.com"; 

// Seguridad de protección de código
document.addEventListener('contextmenu', e => e.preventDefault());
document.onkeydown = function(e) {
  if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 67 || e.keyCode == 74)) || (e.ctrlKey && e.keyCode == 85)) {
    return false;
  }
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

let configuracionRegalo = {
  titulo: "💙 Feliz 30 de Septiembre 💙",
  mensajeCentral: "Aceleras mi mundo en cada kilómetro recorrido 🏎️",
  fotoCentral: "auto5.png",
  mensajeGalaxia: "Gracias por ser el centro de mi galaxia.\n¡Feliz 30 de Septiembre!",
  fotoGalaxia: null
};

// ==========================================
// 1. CARGAR DATOS DESDE FIREBASE SI HAY ?id=
// ==========================================
async function iniciarApp() {
  const urlParams = new URLSearchParams(window.location.search);
  const regaloId = urlParams.get('id');
  const contenedorAuth = document.getElementById('contenedorAuth');

  if (regaloId) {
    if(contenedorAuth) contenedorAuth.style.display = 'none';
    
    try {
      const docRef = doc(db, "regalos", regaloId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let data = docSnap.data();
        if(data.titulo) configuracionRegalo.titulo = data.titulo;
        if(data.mensajeCentral) configuracionRegalo.mensajeCentral = data.mensajeCentral;
        if(data.fotoUrl) configuracionRegalo.fotoCentral = data.fotoUrl;
        if(data.mensajeGalaxia) configuracionRegalo.mensajeGalaxia = data.mensajeGalaxia;
        if(data.fotoGalaxia) configuracionRegalo.fotoGalaxia = data.fotoGalaxia;
      }
    } catch (e) { console.error("Error al cargar datos del regalo"); }
  } else {
    if(contenedorAuth) contenedorAuth.style.display = 'flex';
  }

  document.getElementById('tituloDinamico').innerText = configuracionRegalo.titulo;
  document.getElementById('tituloGalaxia').innerText = configuracionRegalo.titulo;
  dibujarCartas();
}

// ==========================================
// 2. DIBUJAR CARTAS DEL RAMO
// ==========================================
function dibujarCartas() {
  const cont = document.getElementById('contenedorCartas');
  if(!cont) return;
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
    
    <div class="blister-card hw5" style="--rot: 0deg; bottom: 110px; left: 50%; margin-left: -42.5px; z-index: 35; animation: saltarAuto 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 2.5s;" onclick="abrirModal('PARA TI', '${configuracionRegalo.mensajeCentral}')">
      <div class="blister-hueco"></div><div class="blister-logo">HOT WHEELS</div>
      <div class="blister-burbuja"><img src="${configuracionRegalo.fotoCentral}" class="blister-auto-img" style="border-radius:5px; object-fit:cover; width:100%; height:100%;"></div>
    </div>
  `;
}

// ==========================================
// 3. SISTEMA DE SOLICITUD Y ACCESOS
// ==========================================
const btnLogin = document.getElementById('btnLoginGoogle');
if (btnLogin) {
  btnLogin.onclick = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      verificarPermisosUsuario(result.user);
    } catch (error) {
      console.error("Error en el login:", error);
    }
  };
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    verificarPermisosUsuario(user);
  } else {
    ocultarPanelCreador();
    if(btnLogin) btnLogin.innerText = "✨ Solicitar acceso de Creador";
  }
});

async function verificarPermisosUsuario(user) {
  const correo = user.email;
  if(btnLogin) btnLogin.innerText = `👤 ${user.displayName.split(' ')[0]}`;

  if (correo === TU_CORREO_ADMIN) {
    activarPanelCreador();
    return;
  }

  const docRef = doc(db, "usuariosPermitidos", correo.replace(/\./g, '_'));
  const docSnap = await getDoc(docRef);

  if (docSnap.exists() && docSnap.data().aprobado === true) {
    activarPanelCreador();
  } else {
    await setDoc(docRef, {
      email: correo,
      nombre: user.displayName,
      aprobado: false,
      fechaSolicitud: new Date().toISOString()
    }, { merge: true });

    ocultarPanelCreador();

    const textoEspera = document.getElementById('textoEspera');
    const modalEspera = document.getElementById('modalEspera');
    if(textoEspera) textoEspera.innerText = `Hola ${user.displayName} (${correo}), tu solicitud ha sido enviada al administrador. En cuanto acepte tu acceso, podrás crear tus propios ramos.`;
    if(modalEspera) modalEspera.style.display = 'flex';
  }
}

function activarPanelCreador() {
  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.get('id')) {
    let btnCreador = document.getElementById('btnAbrirCreador');
    if (btnCreador) {
      btnCreador.style.display = 'block';
      btnCreador.onclick = () => {
        const panel = document.getElementById('panelCreacion');
        if (panel) panel.style.display = 'flex';
      };
    }
  }
}

function ocultarPanelCreador() {
  let btnCreador = document.getElementById('btnAbrirCreador');
  if (btnCreador) btnCreador.style.display = 'none';
  const panel = document.getElementById('panelCreacion');
  if (panel) panel.style.display = 'none';
}

window.cerrarEspera = () => {
  const modalEspera = document.getElementById('modalEspera');
  if(modalEspera) modalEspera.style.display = 'none';
  signOut(auth);
};

const btnCerrar = document.getElementById('btnCerrarCreador');
const panelCreacion = document.getElementById('panelCreacion');
if(btnCerrar && panelCreacion) btnCerrar.onclick = () => panelCreacion.style.display = 'none';

// ==========================================
// 4. CREADOR DE ENLACES (CLOUDINARY + FIREBASE)
// ==========================================
const btnGenerar = document.getElementById('btnGenerarEnlace');
if(btnGenerar) {
  btnGenerar.onclick = async function() {
    this.innerText = "Subiendo y creando... ⏳";
    this.disabled = true;

    let titulo = document.getElementById('inputTitulo').value;
    let msgCentral = document.getElementById('inputMsgCentral').value;
    let inputFoto = document.getElementById('inputFoto');
    
    let msgGalaxia = document.getElementById('inputMsgGalaxia').value;
    let inputFotoGalaxia = document.getElementById('inputFotoGalaxia');
    
    let fotoUrl = null;
    let fotoGalaxiaUrl = null;

    if (inputFoto && inputFoto.files.length > 0) {
      const formData = new FormData();
      formData.append("file", inputFoto.files[0]);
      formData.append("upload_preset", UPLOAD_PRESET);
      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: "POST", body: formData });
        const data = await res.json();
        fotoUrl = data.secure_url;
      } catch (e) { alert("Error subiendo foto del ramo."); }
    }

    if (inputFotoGalaxia && inputFotoGalaxia.files.length > 0) {
      const formData2 = new FormData();
      formData2.append("file", inputFotoGalaxia.files[0]);
      formData2.append("upload_preset", UPLOAD_PRESET);
      try {
        const res2 = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: "POST", body: formData2 });
        const data2 = await res2.json();
        fotoGalaxiaUrl = data2.secure_url;
      } catch (e2) { alert("Error subiendo foto de la galaxia."); }
    }

    let nuevoId = 'regalo_' + Math.random().toString(36).substring(2, 9);
    
    try {
      await setDoc(doc(db, "regalos", nuevoId), {
        titulo: titulo,
        mensajeCentral: msgCentral,
        fotoUrl: fotoUrl,
        mensajeGalaxia: msgGalaxia,
        fotoGalaxia: fotoGalaxiaUrl
      });

      let enlaceFinal = window.location.origin + window.location.pathname + "?id=" + nuevoId;
      const resEnlace = document.getElementById('resultadoEnlace');
      if(resEnlace) resEnlace.innerHTML = `¡Enlace creado con éxito!<br><br><a href="${enlaceFinal}" target="_blank" style="color:#fff; background:#000; padding:10px; border-radius:5px; display:inline-block;">${enlaceFinal}</a>`;
    } catch (err) {
      alert("Error al guardar en Firebase.");
    }
    
    this.innerText = "Generar Enlace Mágico";
    this.disabled = false;
  };
}

// ==========================================
// 5. CONTROL DE UI Y BARRA DE CARGA
// ==========================================
let porcentaje = 0;
const intervaloCarga = setInterval(() => {
  porcentaje += Math.floor(Math.random() * 8) + 2;
  if(porcentaje >= 100) {
    porcentaje = 100;
    clearInterval(intervaloCarga);
    const textoCarga = document.getElementById('textoCarga');
    const barraProg = document.getElementById('barraProgreso');
    const btnDescubrir = document.getElementById('btnDescubrir');
    if(textoCarga) textoCarga.innerText = "¡SISTEMA LISTO!";
    if(barraProg && barraProg.parentElement) barraProg.parentElement.style.display = 'none';
    if(btnDescubrir) btnDescubrir.style.display = 'block';
  }
  const textoCarga = document.getElementById('textoCarga');
  const barraProg = document.getElementById('barraProgreso');
  if(textoCarga) textoCarga.innerText = `ENSAMBLANDO SORPRESA... ${porcentaje}%`;
  if(barraProg) barraProg.style.width = `${porcentaje}%`;
}, 100);

const btnDescubrir = document.getElementById('btnDescubrir');
if(btnDescubrir) {
  btnDescubrir.onclick = () => {
    const musica = document.getElementById('musicaFondo');
    if(musica) musica.play().catch(e=>console.log(e));
    const pantalla = document.getElementById('pantallaEntrada');
    if(pantalla) {
      pantalla.style.opacity = '0';
      setTimeout(() => pantalla.style.display = 'none', 1000);
    }
  };
}

window.abrirModal = (titulo, texto) => {
  const mTit = document.getElementById('modalTitulo');
  const mTxt = document.getElementById('modalTexto');
  const mBox = document.getElementById('modalMensaje');
  if(mTit) mTit.innerText = titulo;
  if(mTxt) mTxt.innerText = texto;
  if(mBox) mBox.classList.add('mostrar');
};

const btnCerrarModal = document.getElementById('btnCerrarModal');
if(btnCerrarModal) {
  btnCerrarModal.onclick = () => {
    const mBox = document.getElementById('modalMensaje');
    if(mBox) mBox.classList.remove('mostrar');
  };
}

const btnGalaxia = document.getElementById('btnGalaxia');
if(btnGalaxia) {
  btnGalaxia.onclick = () => {
    const escenaRamo = document.getElementById('escenaRamo');
    if(escenaRamo) {
      escenaRamo.style.opacity = '0';
      setTimeout(() => {
        escenaRamo.style.display = 'none';
        const tCanvas = document.getElementById('threeCanvas');
        const uiGal = document.getElementById('ui-galaxia');
        if(tCanvas) tCanvas.style.display = 'block';
        if(uiGal) uiGal.style.display = 'block';
        initThreeJS();
      }, 1500);
    }
  };
}

// ==========================================
// 6. POLVO ESTELAR Y EFECTOS VISUALES
// ==========================================
document.addEventListener('pointermove', (e) => {
  const tCanvas = document.getElementById('threeCanvas');
  if(!tCanvas || tCanvas.style.display !== 'block') return;
  if(e.buttons === 0 && !e.touches) return; 
  let clientX = e.clientX; let clientY = e.clientY;
  if(e.touches && e.touches.length > 0) { clientX = e.touches[0].clientX; clientY = e.touches[0].clientY; }
  if(!clientX) return;

  let star = document.createElement('div');
  star.className = 'polvo-estelar';
  star.style.left = clientX + 'px';
  star.style.top = clientY + 'px';
  let dx = (Math.random() - 0.5) * 60;
  let dy = (Math.random() - 0.5) * 60 + 20;
  star.style.setProperty('--dx', dx + 'px');
  star.style.setProperty('--dy', dy + 'px');
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 600);
});

const bancoDeMensajes = [
  { t: "MI MEJOR DECISIÓN", p: "Amarte ha sido la carrera más hermosa de mi vida." },
  { t: "SIN FRENOS", p: "Me enamoré de ti sin frenos y sin marcha atrás." },
  { t: "MI PILOTO FAVORITO", p: "Aceleras mi corazón todos los días." },
  { t: "A TODA VELOCIDAD", p: "Mi corazón late a mil por hora cuando te veo." },
  { t: "MI DESTINO FINAL", p: "No importa la ruta, mi destino siempre eres tú." },
  { t: "HOT WHEELS", p: "Gracias por dejarme hacer feliz a tu niño interior." },
  { t: "MI COPILOTO IDEAL", p: "La vida es un viaje, gracias por ir a mi lado." },
  { t: "PRIMERA POSICIÓN", p: "En la carrera de mi vida, tú siempre tienes el primer lugar." },
  { t: "ADRENALINA PURA", p: "Eso es exactamente lo que siento cuando me miras." },
  { t: "MI META", p: "De todos los caminos posibles, siempre te elegiré a ti." },
  { t: "CERO A CIEN", p: "Me haces pasar de 0 a 100 de felicidad en un segundo." },
  { t: "MOTOR DE MI VIDA", p: "Tú le das la fuerza y energía a todos mis días." },
  { t: "PISTA FAVORITA", p: "Quiero recorrer cada curva de la vida a tu lado." },
  { t: "TURBO ACTIVADO", p: "Mi sonrisa se enciende a máxima potencia contigo." }
];

function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// ==========================================
// 7. GALAXIA THREE.JS
// ==========================================
let scene, camera, renderer, controls;
let universoGroup = new THREE.Group();
let carritosInteractivos = [];
let anillosGalaxia = [];
let shootingStars = [];
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.secretoRevelado = false;

function initThreeJS() {
  if (scene) return;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x020510);
  scene.fog = new THREE.FogExp2(0x020510, 0.00025);

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 15000);
  camera.position.set(0, 400, 1600); 

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  const canvasContainer = document.getElementById('threeCanvas');
  canvasContainer.innerHTML = "";
  canvasContainer.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.8;
  controls.maxDistance = 2500;
  controls.minDistance = 100; 

  scene.add(universoGroup);

  crearFondoEstelar();
  crearAgujeroNegroAnimado();
  crearGalaxiaConEstelas();
  crearEstrellasFugaces();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  renderer.domElement.addEventListener('pointerdown', onPointerDown);
  renderer.domElement.addEventListener('pointerup', onPointerUp);

  animate();
}

function crearFondoEstelar() {
  const starGeo = new THREE.BufferGeometry(); const starPos = [];
  for(let i=0; i<6000; i++) starPos.push((Math.random()-0.5)*8000, (Math.random()-0.5)*8000, (Math.random()-0.5)*8000);
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
  scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({color: 0xcceeff, size: 2.5, transparent: true, opacity: 0.8})));
}

function crearEstrellasFugaces() {
  for(let i=0; i<10; i++) {
    let geo = new THREE.CylinderGeometry(0.5, 3, 400, 4);
    geo.rotateZ(Math.PI/2);
    let mat = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending});
    let star = new THREE.Mesh(geo, mat);
    resetShootingStar(star);
    scene.add(star);
    shootingStars.push(star);
  }
}

function resetShootingStar(star) {
  star.position.set((Math.random()-0.5)*7000, Math.random()*2500 + 800, (Math.random()-0.5)*7000);
  star.userData = {
    vx: (Math.random()-0.5)*50 + 40,
    vy: -Math.random()*30 - 15,
    vz: (Math.random()-0.5)*50
  };
  star.lookAt(star.position.x + star.userData.vx, star.position.y + star.userData.vy, star.position.z + star.userData.vz);
}

function crearAgujeroNegroAnimado() {
  const diskGroup = new THREE.Group();
  
  const matAnillo = (color, opacidad) => new THREE.MeshBasicMaterial({ 
    color: color, 
    side: THREE.DoubleSide, 
    transparent: true, 
    opacity: opacidad, 
    wireframe: true 
  });

  const ring1 = new THREE.Mesh(new THREE.RingGeometry(180, 260, 64, 4), new THREE.MeshBasicMaterial({ color: 0xe0ffff, side: THREE.DoubleSide, transparent: true, opacity: 0.9 }));
  const ring2 = new THREE.Mesh(new THREE.RingGeometry(260, 360, 64, 2), matAnillo(0x00aaff, 0.4));
  const ring3 = new THREE.Mesh(new THREE.RingGeometry(360, 550, 64, 1), matAnillo(0x0055ff, 0.15));
  
  anillosGalaxia.push(ring1, ring2, ring3);
  diskGroup.add(ring1, ring2, ring3);
  diskGroup.rotation.x = Math.PI / 2;
  universoGroup.add(diskGroup);
  
  universoGroup.add(new THREE.Mesh(new THREE.SphereGeometry(175, 32, 32), new THREE.MeshBasicMaterial({ color: 0x000000 })));
}

function crearGalaxiaConEstelas() {
  const loader = new THREE.TextureLoader();
  const texturasAutos = ['auto1.png', 'auto2.png', 'auto3.png', 'auto4.png', 'auto5.png', 'auto6.png'].map(n => loader.load(n));
  const mensajesAleatorios = shuffleArray([...bancoDeMensajes]);

  for(let i=0; i<60; i++) {
    const radio = 500 + Math.random() * 2300;
    const angulo = Math.random() * Math.PI * 2;
    const altura = (Math.random() - 0.5) * 900 * (1 - radio/3000); 
    
    const canvas = document.createElement('canvas');
    canvas.width = 1024; canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff'; ctx.font = '50px "Caveat", cursive, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.shadowColor = '#00d4ff'; ctx.shadowBlur = 20;
    ctx.fillText("Acelerando hacia ti 🏎️", 512, 64);
    
    const texture = new THREE.CanvasTexture(canvas);
    const spriteTexto = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.8 }));
    spriteTexto.scale.set(380, 50, 1);
    spriteTexto.position.set(Math.cos(angulo) * radio, altura, Math.sin(angulo) * radio);
    spriteTexto.userData = { isText: true, anguloBase: angulo, radio: radio, velocidad: 0.0003 + Math.random() * 0.0006 };
    universoGroup.add(spriteTexto);
  }

  for(let i=0; i<40; i++) {
    const radio = 600 + Math.random() * 2000;
    const angulo = Math.random() * Math.PI * 2;
    const altura = (Math.random() - 0.5) * 500; 
    
    const textIdx = Math.floor(Math.random() * texturasAutos.length);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturasAutos[textIdx], transparent: true }));
    
    let baseWidth = 170;
    let baseHeight = 110;
    if(textIdx === 4 || textIdx === 5) baseHeight = 160;
    
    let carPivot = new THREE.Group();
    carPivot.position.y = altura;
    carPivot.rotation.y = angulo;
    carPivot.userData = { isPivot: true, velocidad: 0.0008 + Math.random() * 0.001 };

    let tColor = (i%3===0) ? 0x9b00ff : ((i%2===0) ? 0xff007f : 0x00d4ff);

    sprite.userData = { 
      mensaje: mensajesAleatorios[i % mensajesAleatorios.length], 
      baseWidth: baseWidth, 
      baseHeight: baseHeight
    };

    sprite.scale.set(baseWidth, baseHeight, 1); 
    sprite.position.set(radio, 0, 0);

    let puntosEstela = 30;
    let positions = new Float32Array(puntosEstela * 3);
    let colors = new Float32Array(puntosEstela * 3);
    let tColorObj = new THREE.Color(tColor);
    
    for(let j=0; j<puntosEstela; j++) {
      let a = -0.7 * (j / (puntosEstela - 1));
      positions[j*3] = Math.cos(a) * radio;
      positions[j*3+1] = 0;
      positions[j*3+2] = Math.sin(a) * radio;
      
      let fade = Math.pow(1 - (j / (puntosEstela - 1)), 2);
      colors[j*3] = tColorObj.r * fade;
      colors[j*3+1] = tColorObj.g * fade;
      colors[j*3+2] = tColorObj.b * fade;
    }
    
    let trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    trailGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    let trailMat = new THREE.LineBasicMaterial({vertexColors: true, blending: THREE.AdditiveBlending, transparent: true, linewidth: 3});
    let trail = new THREE.Line(trailGeo, trailMat);

    carPivot.add(trail);
    carPivot.add(sprite);
    universoGroup.add(carPivot);
    carritosInteractivos.push(sprite);
  }
}

let posInicio = { x: 0, y: 0 }, tiempoInicio = 0;
function onPointerDown(e) {
  posInicio.x = e.clientX || (e.touches ? e.touches[0].clientX : 0);
  posInicio.y = e.clientY || (e.touches ? e.touches[0].clientY : 0);
  tiempoInicio = Date.now();
}

function onPointerUp(e) {
  let endX = e.clientX || (e.changedTouches ? e.changedTouches[0].clientX : 0);
  let endY = e.clientY || (e.changedTouches ? e.changedTouches[0].clientY : 0);
  
  if (Math.hypot(endX - posInicio.x, endY - posInicio.y) < 15 && Date.now() - tiempoInicio < 400) {
    mouse.x = (endX / window.innerWidth) * 2 - 1; 
    mouse.y = -(endY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(carritosInteractivos, false);
    if (intersects.length > 0) {
      const obj = intersects[0].object; 
      if(obj.userData && obj.userData.mensaje) {
        abrirModal(obj.userData.mensaje.t, obj.userData.mensaje.p);
        const w = obj.userData.baseWidth || 170;
        const h = obj.userData.baseHeight || 110;
        obj.scale.set(w * 1.4, h * 1.4, 1); 
        setTimeout(() => obj.scale.set(w, h, 1), 300);
      }
    }
  }
}

function mostrarSecretoAgujeroNegro() {
  let sec = document.createElement('div');
  sec.id = 'pantalla-secreta';
  
  let contenidoFoto = '';
  if (configuracionRegalo.fotoGalaxia) {
    contenidoFoto = `<img src="${configuracionRegalo.fotoGalaxia}" style="width: 130px; height: 130px; object-fit: cover; border-radius: 50%; border: 3px solid #00d4ff; box-shadow: 0 0 30px #00d4ff; margin-bottom: 20px;">`;
  }

  sec.innerHTML = `
    <h1>MI UNIVERSO ERES TÚ</h1>
    ${contenidoFoto}
    <p style="max-width: 500px; padding: 0 20px; white-space: pre-line;">${configuracionRegalo.mensajeGalaxia}</p>
    <button onclick="cerrarSecreto()">VOLVER A ÓRBITA</button>
  `;
  
  document.body.appendChild(sec);
  setTimeout(() => sec.style.opacity = '1', 100);
}

window.cerrarSecreto = function() {
  let sec = document.getElementById('pantalla-secreta');
  if(sec) {
    sec.style.opacity = '0';
    setTimeout(() => sec.remove(), 800);
  }
  let dir = camera.position.clone().normalize().multiplyScalar(500);
  camera.position.copy(dir);
  setTimeout(() => { window.secretoRevelado = false; }, 1000);
};

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  universoGroup.rotation.y -= 0.0004;
  
  if(anillosGalaxia.length === 3) {
    anillosGalaxia[0].rotation.z -= 0.02; 
    anillosGalaxia[1].rotation.z -= 0.008; 
    anillosGalaxia[2].rotation.z -= 0.003;
  }
  
  universoGroup.children.forEach(c => {
    if(c.userData && c.userData.isPivot) {
      c.rotation.y -= c.userData.velocidad;
    } else if(c.userData && c.userData.isText) {
      c.userData.anguloBase += c.userData.velocidad;
      c.position.x = Math.cos(c.userData.anguloBase) * c.userData.radio;
      c.position.z = Math.sin(c.userData.anguloBase) * c.userData.radio;
    }
  });

  shootingStars.forEach(s => {
    s.position.x += s.userData.vx;
    s.position.y += s.userData.vy;
    s.position.z += s.userData.vz;
    if(s.position.y < -1800 || s.position.x > 5000 || s.position.x < -5000) resetShootingStar(s);
  });

  if(camera.position.length() < 190 && !window.secretoRevelado && document.getElementById('threeCanvas').style.display === 'block') {
    window.secretoRevelado = true;
    mostrarSecretoAgujeroNegro();
  }

  renderer.render(scene, camera);
}

document.addEventListener('DOMContentLoaded', () => {
  iniciarApp();
});
