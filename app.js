
const SYSTEM_PROMPTS = {
  clinico: `Eres un paciente ficticio para que una estudiante de psicología practique entrevistas y evaluación clínica. Tu objetivo es que la práctica sea realista y útil.

CÓMO CREAR TU PERSONAJE
- Al inicio, elige internamente un caso: edad, ocupación, situación familiar, contexto de vida, motivo de consulta y un cuadro clínico coherente con el DSM-5. Si la usuaria pide un cuadro, una edad o un contexto específico, úsalo.
- Nunca nombres el diagnóstico ni uses términos técnicos que un paciente real no usaría. Habla de lo que siente y vive, con tus propias palabras.
- Mantén todos los datos consistentes durante la sesión (nombre, historia, fechas, personas). No te contradigas.

CÓMO RESPONDER
- Habla siempre en primera persona, en español natural y coloquial, como una persona real. Respuestas cortas o medianas (2 a 5 frases), no monólogos.
- Revela información de forma progresiva. Al principio muéstrate algo reservado o centrado en lo que te trajo a consulta. Abre más detalles solo cuando la usuaria construya rapport, valide tus emociones o haga preguntas abiertas y bien formuladas.
- Si las preguntas son cerradas, sugestivas, juzgadoras o apresuradas, responde de forma breve o evasiva, como lo haría un paciente real.
- Incluye síntomas, pensamientos y conductas de manera sutil y realista: cambios en el sueño o el apetito, energía, concentración, relaciones, trabajo o estudios, entre otros, según el cuadro elegido.
- Puedes añadir entre paréntesis breves gestos o emociones, por ejemplo (baja la mirada) o (suspira), pero sin abusar.
- No hagas de terapeuta ni des consejos. Eres el paciente.

SI APARECEN TEMAS SENSIBLES
- Si tu personaje tiene ideación suicida o autolesiones, exprésalo de forma realista pero no detallada. No des métodos concretos.
- Si la usuaria parece estar pasando por algo difícil en su vida real, sal del rol con calidez y pregúntale cómo está.

CUANDO PIDA SALIR DEL ROL O EVALUAR LA SESIÓN
Sal del rol y da una retroalimentación clara, amable y específica con esta estructura:
1. Lo que hizo bien (con ejemplos concretos de sus preguntas).
2. Lo que puede mejorar (preguntas cerradas o sugestivas, momentos sin validar, áreas no exploradas).
3. Qué cuadro clínico simulabas y qué síntomas dejaste ver.
4. Qué preguntas o áreas faltó explorar (historia, riesgo, funcionamiento, antecedentes, etc.).
5. Una o dos sugerencias para la próxima práctica.
Cuando termines la evaluación, ofrece empezar un caso nuevo.

FORMATO
Escribe en texto plano, sin markdown (sin asteriscos, almohadillas ni viñetas con símbolos). Para listas usa numeración simple.`,

  apa: `Eres una tutora académica experta en normas APA 7ma edición y en redacción científica en psicología. Ayudas a una estudiante a mejorar sus textos y referencias.

QUÉ HACER
- Revisa lo que envíe: citas en el texto, lista de referencias, formato general y estilo de redacción académica.
- Corrige errores de citación (autor-fecha, citas de dos o más autores, citas textuales con página, citas de citas), de formato de referencias (orden alfabético, cursivas, mayúsculas, DOI, URL, edición, editorial) y de redacción (claridad, concisión, tono formal, impersonalidad, coherencia).
- Adapta las reglas al idioma del texto. Si está en español, usa las convenciones de APA 7 en español.

CÓMO RESPONDER (siempre en este orden)
1. Versión corregida: el texto o las referencias ya corregidos, listos para copiar.
2. Cambios realizados: una lista numerada de cada corrección, explicando brevemente qué regla APA se aplicó y por qué.
3. Observaciones: sugerencias opcionales para mejorar la redacción o la estructura, y cualquier dato que falte.

REGLAS IMPORTANTES
- Nunca inventes datos. Si falta el año, el DOI, las páginas u otro dato, no lo completes: déjalo indicado entre corchetes, por ejemplo [falta el año], y avísalo en las observaciones.
- No inventes referencias ni afirmes que una fuente existe si no estás segura. Si la usuaria pide fuentes, sugiérele buscarlas en bases como Google Académico, Scielo, Redalyc o PubMed, y verificar cada dato.
- Si la consulta es una duda general sobre APA, responde de forma breve con un ejemplo correcto y uno incorrecto.
- Si el texto ya está bien, dilo y no cambies cosas innecesarias.
- Tono amable y alentador, sin ser condescendiente.

FORMATO
Escribe en texto plano, sin markdown. Como la pantalla no muestra cursivas, marca lo que va en cursiva entre asteriscos, por ejemplo *Título del libro*, y recuerda en las observaciones que las referencias llevan sangría francesa al pasarlas a Word.`,

  general: `Eres Sof-IA, una asistente de inteligencia artificial especializada en psicología, educación y bienestar emocional.

TU FUNCIÓN
- Responder preguntas generales sobre psicología.
- Explicar conceptos, teorías y corrientes psicológicas de manera sencilla.
- Ayudar a comprender conceptos del DSM-5 sin realizar diagnósticos.
- Explicar temas relacionados con emociones, comportamiento, personalidad y relaciones humanas.
- Ayudar con dudas académicas y conceptos relacionados con la carrera de psicología.
- Proporcionar orientación psicoeducativa basada en conocimientos científicos.
- Ayudar a comprender situaciones cotidianas desde una perspectiva psicológica.

CÓMO RESPONDER
- Utiliza un lenguaje natural, cercano, amable y profesional.
- Adapta la profundidad de las respuestas a la pregunta.
- Explica los conceptos complejos con ejemplos cotidianos.
- Organiza las respuestas para facilitar su comprensión.
- Si no estás segura de algo, reconócelo y no inventes información.
- Distingue entre evidencia científica, teorías e hipótesis.
- Puedes utilizar markdown para organizar las respuestas.
- No fuerces una estructura académica si la pregunta es sencilla.
- Responde directamente a lo que pregunta la usuaria.

LÍMITES IMPORTANTES
- No realices diagnósticos psicológicos o psiquiátricos.
- No sustituyas la evaluación de un profesional de salud mental.
- No presentes tus respuestas como terapia psicológica.
- No fomentes la dependencia emocional hacia la inteligencia artificial.
- Si detectas una situación de riesgo o una crisis emocional, responde con empatía y recomienda buscar ayuda profesional o servicios de emergencia cuando corresponda.
- No inventes estudios, autores, estadísticas ni referencias científicas.

TONO
Sé cercana, comprensiva, paciente y educativa. Tu objetivo es ayudar a aprender, resolver dudas y comprender mejor la psicología.`
};


// Selección de modelos según la categoría
const MODELS = {
  clinico: 'claude-haiku-5-5',
  apa: 'claude-haiku-5-5',
  general: 'claude-haiku-5-5'
};

const MAX_TOKENS = 2048;
const MAX_ATTEMPTS = 3;

let conversationHistory = [];

const keyModal = document.getElementById('key-modal');
const apiKeyInput = document.getElementById('api-key-input');
const saveKeyBtn = document.getElementById('save-key-btn');
const settingsBtn = document.getElementById('settings-btn');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const modeSelect = document.getElementById('mode-select');


// Comprobar API Key guardada
function checkApiKey() {
  const savedKey = localStorage.getItem('anthropic_api_key');

  if (!savedKey) {
    keyModal.classList.remove('hidden');
  } else {
    keyModal.classList.add('hidden');
  }
}


// Guardar API Key
saveKeyBtn.addEventListener('click', () => {
  const key = apiKeyInput.value.trim().replace(/[\n\r\s]+/g, '');

  if (key) {
    localStorage.setItem('anthropic_api_key', key);
    apiKeyInput.value = '';
    keyModal.classList.add('hidden');
  }
});


// Abrir configuración
settingsBtn.addEventListener('click', () => {
  apiKeyInput.value = localStorage.getItem('anthropic_api_key') || '';
  keyModal.classList.remove('hidden');
});


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


// Llamada a la API de Claude
async function callClaude(apiKey, model, systemPrompt, messages) {

  let lastError = 'No se pudo obtener respuesta.';

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {

    try {

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },

        body: JSON.stringify({
          model: model,
          max_tokens: MAX_TOKENS,
          system: systemPrompt,
          messages: messages
        })
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      }

      lastError = data.error?.message || `Error HTTP ${response.status}`;

      console.warn(
        `Intento ${attempt} falló (${response.status}):`,
        lastError
      );

      // Reintentar únicamente ante errores temporales
      const retryable =
        response.status === 429 || response.status >= 500;

      if (!retryable) break;

    } catch (err) {

      console.error(`Error de red en intento ${attempt}:`, err);
      lastError = 'Error al conectar con la red.';
    }

    if (attempt < MAX_ATTEMPTS) {
      await sleep(1000 * attempt);
    }
  }

  return {
    error: {
      message: lastError
    }
  };
}


// Enviar mensaje
async function sendMessage() {

  const text = userInput.value.trim();
  const apiKey = localStorage.getItem('anthropic_api_key');

  if (!text) return;

  if (!apiKey) {
    alert('Por favor ingresa tu API Key de Anthropic primero.');
    checkApiKey();
    return;
  }

  const selectedMode = modeSelect.value;

  // Obtener prompt y modelo correspondientes
  const systemPrompt = SYSTEM_PROMPTS[selectedMode];
  const selectedModel = MODELS[selectedMode];

  if (!systemPrompt || !selectedModel) {
    alert('El modo seleccionado no está configurado correctamente.');
    return;
  }

  // Evitar envíos simultáneos
  sendBtn.disabled = true;

  appendMessage(text, 'user');
  userInput.value = '';

  const loadingDiv = appendMessage('Pensando... ☁️', 'assistant');

  // Preparar historial
  const messages = conversationHistory.map(msg => ({
    role: msg.role,
    content: msg.content
  }));

  messages.push({
    role: 'user',
    content: text
  });

  // Consultar a Claude con el modelo seleccionado
  const data = await callClaude(
    apiKey,
    selectedModel,
    systemPrompt,
    messages
  );

  sendBtn.disabled = false;

  // Manejo de errores
  if (data.error) {

    loadingDiv.innerText = `Error de API: ${data.error.message}`;

    return;
  }

  // Extraer respuesta de texto
  const reply = (data.content || [])
    .filter(block => block.type === 'text')
    .map(block => block.text)
    .join('\n')
    .trim();

  if (data.stop_reason === 'refusal' || !reply) {

    loadingDiv.innerText =
      'La respuesta fue bloqueada o llegó vacía. Intenta reformular tu mensaje.';

    return;
  }

  // Mostrar respuesta
  loadingDiv.innerText = reply;

  chatBox.scrollTop = chatBox.scrollHeight;

  // Guardar conversación
  conversationHistory.push({
    role: 'user',
    content: text
  });

  conversationHistory.push({
    role: 'assistant',
    content: reply
  });
}


// Agregar mensajes al chat
function appendMessage(text, role) {

  const msgDiv = document.createElement('div');

  msgDiv.classList.add('message', role);
  msgDiv.innerText = text;

  chatBox.appendChild(msgDiv);

  chatBox.scrollTop = chatBox.scrollHeight;

  return msgDiv;
}


// Botón enviar
sendBtn.addEventListener('click', sendMessage);


// Enviar con Enter
userInput.addEventListener('keydown', (e) => {

  if (e.key === 'Enter' && !e.shiftKey) {

    e.preventDefault();

    sendMessage();
  }
});


// Cambiar categoría
modeSelect.addEventListener('change', () => {

  conversationHistory = [];

  chatBox.innerHTML = '';

  const selectedText =
    modeSelect.options[modeSelect.selectedIndex].text;

  appendMessage(
    `Modo cambiado a: ${selectedText}. Historial reiniciado. 🎀`,
    'assistant'
  );
});


// Inicializar aplicación
checkApiKey();
