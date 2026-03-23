/**
 * SOCORRO TEEN - LOGIC
 * Organizado por funcionalidade
 */

// --- SELETORES DE ELEMENTOS (DOM) ---
const elements = {
  hamburger:      document.getElementById('hamburger'),
  mobileMenu:     document.getElementById('mobileMenu'),
  loginForm:      document.getElementById('loginForm'),
  emailInput:     document.getElementById('email'),
  emailError:     document.getElementById('emailError'),
  passwordInput:  document.getElementById('password'),
  passwordError:  document.getElementById('passwordError'),
  togglePassword: document.getElementById('togglePassword'),
  iconShow:       document.getElementById('iconShow'),
  iconHide:       document.getElementById('iconHide'),
  submitBtn:      document.getElementById('submitBtn'),
  btnContent:     document.getElementById('btnContent'),
  btnLoading:     document.getElementById('btnLoading')
};

// --- 1. MENU MOBILE ---
elements.hamburger.addEventListener('click', () => {
  const isOpen = elements.mobileMenu.classList.toggle('active');
  elements.hamburger.classList.toggle('open', isOpen);
});

// --- 2. VISIBILIDADE DA SENHA ---
elements.togglePassword.addEventListener('click', () => {
  const isPassword = elements.passwordInput.type === 'password';
  
  elements.passwordInput.type = isPassword ? 'text' : 'password';
  elements.iconShow.style.display = isPassword ? 'none' : 'block';
  elements.iconHide.style.display = isPassword ? 'block' : 'none';
});

// --- 3. VALIDAÇÃO E ERROS ---
const setError = (input, errorEl, message) => {
  errorEl.textContent = message;
  message 
    ? input.classList.add('input-error') 
    : input.classList.remove('input-error');
};

const validateForm = () => {
  let isValid = true;
  const emailVal = elements.emailInput.value.trim();
  const passVal = elements.passwordInput.value;

  // Validação de E-mail
  if (!emailVal) {
    setError(elements.emailInput, elements.emailError, 'O e-mail é obrigatório.');
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
    setError(elements.emailInput, elements.emailError, 'Informe um e-mail válido.');
    isValid = false;
  } else {
    setError(elements.emailInput, elements.emailError, '');
  }

  // Validação de Senha
  if (!passVal) {
    setError(elements.passwordInput, elements.passwordError, 'A senha é obrigatória.');
    isValid = false;
  } else if (passVal.length < 6) {
    setError(elements.passwordInput, elements.passwordError, 'A senha deve ter pelo menos 6 caracteres.');
    isValid = false;
  } else {
    setError(elements.passwordInput, elements.passwordError, '');
  }

  return isValid;
};

// Limpar erros enquanto o usuário digita
elements.emailInput.addEventListener('input', () => setError(elements.emailInput, elements.emailError, ''));
elements.passwordInput.addEventListener('input', () => setError(elements.passwordInput, elements.passwordError, ''));

// --- 4. ENVIO DO FORMULÁRIO (SIMULAÇÃO) ---
elements.loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  // Estado de carregamento (Loading)
  elements.submitBtn.disabled = true;
  elements.btnContent.style.display = 'none';
  elements.btnLoading.style.display = 'flex';

  // Simulação de API
  setTimeout(() => {
    elements.submitBtn.disabled = false;
    elements.btnContent.style.display = 'flex';
    elements.btnLoading.style.display = 'none';
    alert('Login realizado com sucesso!');
  }, 1200);
});