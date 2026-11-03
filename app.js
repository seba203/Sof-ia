// =========================
// CONFIGURACIÓN Y PROMPTS
// =========================

const SYSTEM_PROMPTS = {
  clinico: `Eres un paciente ficticio para que una estudiante de psicología practique entrevistas y evaluación clínica. Tu objetivo es que la práctica sea realista y útil.

CÓMO CREAR TU PERSONAJE
- Al inicio, elige internamente un caso: edad, ocupación, situación familiar, contexto de vida, motivo de consulta y un cuadro clínico coherente con el DSM-5. Si la usuaria pide un cuadro, una edad o un contexto específico, úsalo.
- Nunca nombres el diagnóstico ni uses términos técnicos que un paciente real no usaría. Habla de lo que siente y vive, con tus propias palabras.
- Mantén todos los datos consistentes durante la sesión.

CÓMO RESPONDER
- Habla siempre en primera persona, en español natural y coloquial.
- Respuestas cortas o medianas (2 a 5 frases), no monólogos.
- Revela información de forma progresiva.
- Si las preguntas son cerradas, sugestivas o juzgadoras, responde de forma breve o evasiva.
- Incluye síntomas, pensamientos y conductas de manera sutil y realista.
- Puedes añadir gestos breves entre paréntesis.

SI APARECEN TEMAS SENSIBLES
- Si tu personaje tiene ideación suicida o autolesiones, exprésalo sin detalles ni métodos concretos.
- Si la usuaria parece estar pasando por algo difícil en su vida real, sal del rol con calidez y pregúntale cómo está.

CUANDO PIDA SALIR DEL ROL O EVALUAR LA SESIÓN
Sal del rol y entrega retroalimentación con esta estructura:
1. Lo que hizo bien.
2. Lo que puede mejorar.
3. Qué cuadro clínico simulabas y qué síntomas dejaste ver.
4. Qué preguntas o áreas faltó explorar.
5. Una o dos sugerencias para la próxima práctica.

Cuando termines, ofrece empezar un caso nuevo.

FORMATO
Escribe en texto plano, sin markdown.`,

  apa: `Eres una tutora académica experta en normas APA 7ma edición y redacción científica en psicología.

QUÉ HACER
- Revisa citas en el texto, referencias, formato general y estilo de redacción académica.
- Corrige errores de citación, referencias, DOI, URL, cursivas y redacción.
- Adapta las reglas al idioma del texto.

CÓMO RESPONDER
Siempre en este orden:
1. Versión corregida: texto listo para copiar.
2. Cambios realizados: explica cada corrección y la regla APA applied.
3. Observaciones: sugerencias y datos faltantes.

REGLAS IMPORTANTES
- Nunca inventes datos bibliográficos.
- Si falta información, indícala entre corchetes.
- No inventes referencias ni afirmes que una fuente existe si no estás segura.
- Si el texto ya está bien, dilo sin hacer cambios innecesarios.
- Mantén un tono amable y profesional.

FORMATO
Puedes utilizar markdown para organizar las respuestas.`,

  general: `Eres Sof-IA, una asistente de inteligencia artificial especializada en psicología, educación y bienestar emocional.

TU FUNCIÓN
- Responder preguntas generales sobre psicología.
- Explicar conceptos, teorías y corrientes psicológicas.
- Ayudar a comprender conceptos del DSM-5 sin realizar diagnósticos.
- Ayudar con dudas académicas relacionadas con psicología.
- Proporcionar orientación psicoeducativa basada en conocimientos científicos.
- Explicar situaciones cotidianas desde una perspectiva psicológica.

CÓMO RESPONDER
- Utiliza un lenguaje natural, cercano, amable y profesional.
- Adapta la profundidad de las respuestas a la pregunta.
- Explica conceptos complejos con ejemplos cotidianos.
- Distingue entre evidencia científica, teorías e hipótesis.
- Utiliza markdown para organizar las respuestas cuando sea útil.
- Responde directamente a lo que pregunta la usuaria.
- Si no estás segura de algo, reconócelo y no inventes información.

LÍMITES IMPORTANTES
- No realices diagnósticos psicológicos o psiquiátricos.
- No sustituyas la evaluación de un profesional.
- No presents tus respuestas como terapia psicológica.
- No inventes estudios, autores ni estadísticas.
- Si detectas una situación de riesgo o crisis emocional, responde con empatía y recomienda buscar ayuda profesional o servicios de emergencia cuando corresponda.

TONO
Sé cercana, comprensiva, paciente y educativa.`
};

// MODELOS
const MODELS = {
  clinico: 'claude-3-haiku-20240307',
  apa: 'claude-3-5-sonnet-20241022',
  general: 'claude-3-haiku-20240307'
};

const MAX_TOKENS = 2048;

// =========================
// CONFIGURACIÓN DE SUPABASE
// =========================

const SUPABASE_URL = 'https://ffigaaodrwahtrnbturh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmaWdhYW9kcndhaHRybmJ0dXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM3MzA4MjQsImV4cCI6MjEwOTMwNjgyNH0.rfeNYPD66vwWy7soK55gct2QDCI0FxFgjahfUPh_5aM';

const supabaseClient = window.supabase
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// VARIABLES GLOBALES
let conversationHistory = [];
let currentConversationId = null;
let currentUserId = null;

// ELEMENTOS HTML
const keyModal = document.getElementById('key-modal');
const saveKeyBtn = document.getElementById('save-key-btn');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const modeSelect = document.getElementById('mode-select');
const themeToggle = document.getElementById('theme-toggle');

// =========================
// MARKDOWN
// =========================

function renderMarkdown(element, text) {
  if (typeof marked !== 'undefined' && typeof DOMPurify !== 'undefined') {
    const html = marked.parse(text, {
      gfm: true,
      breaks: true
    });
    element.innerHTML = DOMPurify.sanitize(html);
  } else {
    element.textContent = text;
  }
}

// =========================
// GESTIÓN DE SESIÓN Y LOGIN
// =========================

function checkUserSession() {
  const savedUserId = localStorage.getItem('sofia_user_id');

  if (!savedUserId) {
    keyModal?.classList.remove('hidden');
  } else {
    keyModal?.classList.add('hidden');
    currentUserId = savedUserId;
  }
}

// Evento de Iniciar Sesión con Animación
saveKeyBtn?.addEventListener('click', async () => {
  const username = document.getElementById('login-username')?.value.trim();
  const code = document.getElementById('login-code')?.value.trim();
  const errorDiv = document.getElementById('login-error');

  if (errorDiv) errorDiv.style.display = 'none';

  if (!username || !code) {
    if (errorDiv) {
      errorDiv.textContent = 'Por favor, completa el usuario y el código de acceso.';
      errorDiv.style.display = 'block';
    }
    return;
  }

  // Validar usuario en Supabase
  if (supabaseClient) {
    const { data: profile, error } = await supabaseClient
      .from('profiles')
      .select('id, username')
      .eq('username', username)
      .eq('access_code', code)
      .maybeSingle();

    if (error || !profile) {
      if (errorDiv) {
        errorDiv.textContent = 'Usuario o código de acceso incorrectos.';
        errorDiv.style.display = 'block';
      }
      return;
    }

    // Credenciales correctas: guardar sesión local
    currentUserId = profile.id;
    localStorage.setItem('sofia_user_id', profile.id);
    localStorage.setItem('sofia_user_name', profile.username);
  }

  // Animación de desvanecimiento
  keyModal?.classList.add('fade-out');

  setTimeout(async () => {
    keyModal?.classList.add('hidden');
    keyModal?.classList.remove('fade-out');

    if (currentUserId && modeSelect) {
      await loadOrCreateConversation(modeSelect.value);
    }
  }, 400);
});

async function initSupabaseSession() {
  const savedUserId = localStorage.getItem('sofia_user_id');

  if (savedUserId) {
    currentUserId = savedUserId;
    if (modeSelect) {
      await loadOrCreateConversation(modeSelect.value);
    }
  } else {
    checkUserSession();
  }
}

// Evento para Cerrar Sesión
document.getElementById('logout-btn')?.addEventListener('click', () => {
  localStorage.removeItem('sofia_user_id');
  localStorage.removeItem('sofia_user_name');
  window.location.reload();
});

// =========================
// BASE DE DATOS (HISTORIAL)
// =========================

async function loadOrCreateConversation(mode) {
  if (!supabaseClient || !currentUserId) return;

  chatBox.innerHTML = '';
  conversationHistory = [];

  const { data: existingConv } = await supabaseClient
    .from('conversations')
    .select('id')
    .eq('user_id', currentUserId)
    .eq('mode', mode)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existingConv) {
    currentConversationId = existingConv.id;
    await loadMessagesFromSupabase(currentConversationId);
  } else {
    const { data: newConv, error } = await supabaseClient
      .from('conversations')
      .insert([{ user_id: currentUserId, mode: mode, title: `Chat ${mode}` }])
      .select()
      .single();

    if (!error && newConv) {
      currentConversationId = newConv.id;
    }
  }
}

async function loadMessagesFromSupabase(conversationId) {
  if (!supabaseClient) return;

  const { data: dbMessages, error } = await supabaseClient
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (error || !dbMessages) return;

  dbMessages.forEach(msg => {
    appendMessage(msg.content, msg.sender);
    conversationHistory.push({ role: msg.sender, content: msg.content });
  });
}

async function saveMessageToSupabase(sender, content) {
  if (!supabaseClient || !currentConversationId) return;

  await supabaseClient.from('messages').insert([
    {
      conversation_id: currentConversationId,
      sender: sender,
      content: content
    }
  ]);
}

// ==========================================
// PETICIÓN A CLAUDE VÍA EDGE FUNCTION SUPABASE
// ==========================================

async function fetchClaudeResponse(systemPrompt, userMessages, selectedModel) {
  if (!supabaseClient) {
    throw new Error('El cliente de Supabase no está configurado correctamente.');
  }

  const { data, error } = await supabaseClient.functions.invoke('chat', {
    body: {
      model: selectedModel,
      max_tokens: MAX_TOKENS,
      system: systemPrompt,
      messages: userMessages
    }
  });

  if (error) {
    throw new Error(error.message || 'Error de comunicación con la Edge Function de Supabase.');
  }

  if (data?.error) {
    throw new Error(typeof data.error === 'string' ? data.error : data.error.message || 'Error retornado por la API de Anthropic.');
  }

  return data;
}

// =========================
// ENVIAR MENSAJES
// =========================

async function sendMessage() {
  const text = userInput.value.trim();

  if (!text || sendBtn.disabled) return;

  const savedUserId = localStorage.getItem('sofia_user_id');
  if (!savedUserId) {
    alert('Por favor, inicia sesión primero.');
    checkUserSession();
    return;
  }

  const selectedMode = modeSelect.value;
  const systemPrompt = SYSTEM_PROMPTS[selectedMode];
  const selectedModel = MODELS[selectedMode];

  if (!systemPrompt || !selectedModel) {
    alert('El modo seleccionado no está configurado correctamente.');
    return;
  }

  sendBtn.disabled = true;

  appendMessage(text, 'user');
  userInput.value = '';
  await saveMessageToSupabase('user', text);

  const loadingDiv = appendMessage('Pensando... ☁️', 'assistant');

  const messagesPayload = [
    ...conversationHistory,
    {
      role: 'user',
      content: text
    }
  ];

  try {
    const data = await fetchClaudeResponse(
      systemPrompt,
      messagesPayload,
      selectedModel
    );

    const reply = (data.content || [])
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n')
      .trim();

    if (data.stop_reason === 'refusal' || !reply) {
      loadingDiv.textContent = 'La respuesta llegó vacía o fue bloqueada. Intenta reformular tu mensaje.';
      return;
    }

    if (selectedMode === 'clinico') {
      loadingDiv.textContent = reply;
    } else {
      renderMarkdown(loadingDiv, reply);
    }

    conversationHistory.push(
      { role: 'user', content: text },
      { role: 'assistant', content: reply }
    );
    await saveMessageToSupabase('assistant', reply);

  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    loadingDiv.textContent = `Error: ${error.message || 'Ocurrió un error inesperado. Intenta nuevamente.'}`;

  } finally {
    sendBtn.disabled = false;
    userInput.focus();
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

// =========================
// AGREGAR MENSAJES AL CHAT
// =========================

function appendMessage(text, role) {
  const msgDiv = document.createElement('div');

  msgDiv.classList.add('message', role);

  const selectedMode = modeSelect ? modeSelect.value : 'general';

  if (role === 'assistant' && selectedMode !== 'clinico') {
    renderMarkdown(msgDiv, text);
  } else {
    msgDiv.textContent = text;
  }

  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  return msgDiv;
}

// =========================
// EVENTOS DEL CHAT
// =========================

sendBtn.addEventListener('click', sendMessage);

userInput.addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

// Cambiar categoría
modeSelect.addEventListener('change', async () => {
  const selectedText = modeSelect.options[modeSelect.selectedIndex].text;

  if (supabaseClient && currentUserId) {
    await loadOrCreateConversation(modeSelect.value);
  } else {
    conversationHistory = [];
    chatBox.innerHTML = '';
  }

  appendMessage(
    `Modo cambiado a: ${selectedText}. Historial actualizado. 🎀`,
    'assistant'
  );
});

// =========================
// TEMA CLARO / OSCURO
// =========================

function updateThemeButton() {
  if (!themeToggle) return;

  const isDark = document.body.classList.contains('dark-mode');

  themeToggle.textContent = isDark ? '☀️' : '🌙';
  themeToggle.title = isDark ? 'Activar modo claro' : 'Activar modo oscuro';
  themeToggle.setAttribute(
    'aria-label',
    isDark ? 'Activar modo claro' : 'Activar modo oscuro'
  );
}

const savedTheme = localStorage.getItem('sofia-theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

updateThemeButton();

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('sofia-theme', isDark ? 'dark' : 'light');

  updateThemeButton();
});

// =========================
// INICIAR APLICACIÓN
// =========================

initSupabaseSession();