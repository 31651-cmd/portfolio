/**
 * PORTFÓLIO PESSOAL — ENRICO PEREIRA BONATO
 * Arquivo: js/main.js
 * Funcionalidades:
 *  1. Cursor customizado com anel fluido (Lusion Labs)
 *  2. Revelação suave de elementos durante a rolagem (Bleibtgleich)
 *  3. Microinterações em palavras-chave destacadas (NOTH.IN)
 *  4. Navegação suave e destaque da seção ativa no menu
 *  5. Menu responsivo para dispositivos móveis
 *  6. Filtros e modal de demonstração na galeria de projetos
 *  7. Formulário de contato com validação e feedback transparente
 *  8. Cópia rápida de e-mail com toast notification
 *  9. Relógio local em tempo real
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. CURSOR PERSONALIZADO (Inspirado em Lusion Labs)
     ========================================================================== */
  const customCursor = document.getElementById('customCursor');
  const cursorDot = customCursor ? customCursor.querySelector('.cursor-dot') : null;
  const cursorRing = customCursor ? customCursor.querySelector('.cursor-ring') : null;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let isCursorVisible = false;

  // Verifica se o dispositivo possui suporte a ponteiro fino (não touch)
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (customCursor && isFinePointer) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isCursorVisible) {
        customCursor.style.opacity = '1';
        isCursorVisible = true;
      }

      // O ponto acompanha instantaneamente
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    window.addEventListener('mouseleave', () => {
      customCursor.style.opacity = '0';
      isCursorVisible = false;
    });

    window.addEventListener('mouseenter', () => {
      customCursor.style.opacity = '1';
      isCursorVisible = true;
    });

    // Animação contínua e suave para o anel seguidor
    function renderCursor() {
      // Interpolação linear suave (LERP)
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (cursorRing) {
        cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Expansão do cursor ao sobrevoar elementos clicáveis
    const interactiveSelectors = 'a, button, input, textarea, .hover-word, .project-card, .interest-editorial-card, .filter-btn';
    const interactiveElements = document.querySelectorAll(interactiveSelectors);

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  } else if (customCursor) {
    customCursor.style.display = 'none';
  }

  /* ==========================================================================
     2. REVELAÇÃO SUAVE DURANTE A ROLAGEM (Inspirado em Bleibtgleich)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-item');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target); // Revela uma única vez
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el, index) => {
      // Efeito sutil de delay escalonado para elementos próximos
      const delay = (index % 4) * 0.08;
      el.style.transitionDelay = `${delay}s`;
      revealObserver.observe(el);
    });
  } else {
    // Fallback para navegadores sem IntersectionObserver
    revealElements.forEach((el) => el.classList.add('is-revealed'));
  }

  /* ==========================================================================
     3. MICROINTERAÇÕES EM PALAVRAS (Inspirado em NOTH.IN)
     ========================================================================== */
  const hoverWords = document.querySelectorAll('.hover-word');

  hoverWords.forEach((word) => {
    word.addEventListener('mouseenter', () => {
      // Leve pulso de escala tipográfica elegante
      word.style.transform = 'translateY(-2px) scale(1.03)';
    });

    word.addEventListener('mouseleave', () => {
      word.style.transform = '';
    });
  });

  /* ==========================================================================
     4. NAVEGAÇÃO SUAVE E ATUALIZAÇÃO DO MENU ATIVO
     ========================================================================== */
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');
  const header = document.getElementById('header');

  // Adiciona sombra sutil ao header ao rolar a página
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.96)';
      header.style.boxShadow = '0 4px 20px rgba(23, 23, 23, 0.04)';
    } else {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.92)';
      header.style.boxShadow = 'none';
    }
  }, { passive: true });

  // Destaque do link ativo no menu ao rolar
  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  /* ==========================================================================
     5. MENU RESPONSIVO MOBILE
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
  }

  // Fecha o menu ao clicar fora do conteúdo
  if (mobileMenu) {
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        closeMobileMenu();
      }
    });
  }

  // Fecha o menu ao clicar em qualquer link
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Fecha o menu ao pressionar a tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });

  /* ==========================================================================
     6. GALERIA DE PROJETOS: FILTROS E MODAL DE DEMONSTRAÇÃO
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // Modal de Demonstração de Projeto
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDismissBtn = document.getElementById('modalDismissBtn');
  const modalProjTitle = document.getElementById('modalProjTitle');
  const modalProjDesc = document.getElementById('modalProjDesc');
  const demoButtons = document.querySelectorAll('.btn-demo');

  function openProjectModal(title, desc) {
    if (modalProjTitle) modalProjTitle.textContent = title;
    if (modalProjDesc) modalProjDesc.textContent = desc;
    if (projectModal) {
      projectModal.classList.add('is-open');
      projectModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeProjectModal() {
    if (projectModal) {
      projectModal.classList.remove('is-open');
      projectModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  demoButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-proj-title') || 'Demonstração de Projeto';
      const desc = btn.getAttribute('data-proj-desc') || 'Detalhes do projeto em exibição.';
      openProjectModal(title, desc);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeProjectModal);

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('is-open')) {
      closeProjectModal();
    }
  });

  /* ==========================================================================
     7. FORMULÁRIO DE CONTATO COM VALIDAÇÃO REAL E MODAL TRANSPARENTE
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const nomeInput = document.getElementById('nome');
  const emailInput = document.getElementById('email');
  const assuntoInput = document.getElementById('assunto');
  const mensagemInput = document.getElementById('mensagem');
  const charCounter = document.getElementById('charCounter');

  const errorNome = document.getElementById('errorNome');
  const errorEmail = document.getElementById('errorEmail');
  const errorMensagem = document.getElementById('errorMensagem');

  const groupNome = document.getElementById('groupNome');
  const groupEmail = document.getElementById('groupEmail');
  const groupMensagem = document.getElementById('groupMensagem');

  // Modal de Feedback de Envio
  const formFeedbackModal = document.getElementById('formFeedbackModal');
  const btnFeedbackClose = document.getElementById('btnFeedbackClose');
  const feedbackSummary = document.getElementById('feedbackSummary');

  // Contador de Caracteres em tempo real para a Mensagem
  if (mensagemInput && charCounter) {
    mensagemInput.addEventListener('input', () => {
      const len = mensagemInput.value.length;
      charCounter.textContent = `${len} / 600`;
      if (len >= 550) {
        charCounter.style.color = '#B2533E';
      } else {
        charCounter.style.color = 'var(--color-text-muted)';
      }
    });
  }

  // Validação do Nome
  function validateNome() {
    const val = nomeInput.value.trim();
    if (!val) {
      setFieldError(groupNome, errorNome, 'Por favor, informe seu nome.');
      return false;
    }
    if (val.length < 2) {
      setFieldError(groupNome, errorNome, 'O nome deve conter pelo menos 2 caracteres.');
      return false;
    }
    clearFieldError(groupNome, errorNome);
    return true;
  }

  // Validação do E-mail com formato seguro
  function validateEmail() {
    const val = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!val) {
      setFieldError(groupEmail, errorEmail, 'Por favor, informe seu endereço de e-mail.');
      return false;
    }
    if (!emailRegex.test(val)) {
      setFieldError(groupEmail, errorEmail, 'Insira um formato de e-mail válido (ex: seu@email.com).');
      return false;
    }
    clearFieldError(groupEmail, errorEmail);
    return true;
  }

  // Validação da Mensagem
  function validateMensagem() {
    const val = mensagemInput.value.trim();
    if (!val) {
      setFieldError(groupMensagem, errorMensagem, 'Por favor, escreva uma mensagem.');
      return false;
    }
    if (val.length < 10) {
      setFieldError(groupMensagem, errorMensagem, 'A mensagem deve conter pelo menos 10 caracteres.');
      return false;
    }
    clearFieldError(groupMensagem, errorMensagem);
    return true;
  }

  function setFieldError(group, errorElement, message) {
    group.classList.add('has-error');
    group.classList.remove('is-valid');
    if (errorElement) errorElement.textContent = message;
  }

  function clearFieldError(group, errorElement) {
    group.classList.remove('has-error');
    group.classList.add('is-valid');
    if (errorElement) errorElement.textContent = '';
  }

  // Validação contínua ao sair dos campos (blur)
  if (nomeInput) nomeInput.addEventListener('blur', validateNome);
  if (emailInput) emailInput.addEventListener('blur', validateEmail);
  if (mensagemInput) mensagemInput.addEventListener('blur', validateMensagem);

  // Submissão do Formulário
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNomeValid = validateNome();
      const isEmailValid = validateEmail();
      const isMensagemValid = validateMensagem();

      if (!isNomeValid || !isEmailValid || !isMensagemValid) {
        // Foca no primeiro campo com erro
        if (!isNomeValid) nomeInput.focus();
        else if (!isEmailValid) emailInput.focus();
        else if (!isMensagemValid) mensagemInput.focus();
        return;
      }

      // Dados validados com integridade
      const formData = {
        nome: nomeInput.value.trim(),
        email: emailInput.value.trim(),
        assunto: (assuntoInput ? assuntoInput.value.trim() : '') || 'Sem assunto específico',
        mensagem: mensagemInput.value.trim(),
        timestamp: new Date().toLocaleString('pt-BR')
      };

      // Apresenta resumo claro e honesto no modal
      if (feedbackSummary) {
        feedbackSummary.innerHTML = `
          <p><strong>Remetente:</strong> ${escapeHtml(formData.nome)} (${escapeHtml(formData.email)})</p>
          <p><strong>Assunto:</strong> ${escapeHtml(formData.assunto)}</p>
          <p><strong>Data/Hora:</strong> ${escapeHtml(formData.timestamp)}</p>
          <p style="margin-top: 6px;"><strong>Prévia da Mensagem:</strong> <em>"${escapeHtml(formData.mensagem.slice(0, 140))}${formData.mensagem.length > 140 ? '...' : ''}"</em></p>
        `;
      }

      if (formFeedbackModal) {
        formFeedbackModal.classList.add('is-open');
        formFeedbackModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }

      // Limpa os campos após confirmação
      contactForm.reset();
      if (charCounter) charCounter.textContent = '0 / 600';
      [groupNome, groupEmail, groupMensagem].forEach((g) => {
        g.classList.remove('is-valid', 'has-error');
      });
    });
  }

  function closeFeedbackModal() {
    if (formFeedbackModal) {
      formFeedbackModal.classList.remove('is-open');
      formFeedbackModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (btnFeedbackClose) btnFeedbackClose.addEventListener('click', closeFeedbackModal);

  if (formFeedbackModal) {
    formFeedbackModal.addEventListener('click', (e) => {
      if (e.target === formFeedbackModal) closeFeedbackModal();
    });
  }

  function escapeHtml(string) {
    return String(string)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ==========================================================================
     8. CÓPIA RÁPIDA DE E-MAIL COM TOAST NOTIFICATION
     ========================================================================== */
  const btnCopyEmail = document.getElementById('btnCopyEmail');
  const copyEmailText = document.getElementById('copyEmailText');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  const emailToCopy = 'enricobonato@exemplo.com';

  function showToast(message) {
    if (!toastNotification) return;
    if (toastMessage) toastMessage.textContent = message;
    toastNotification.classList.add('is-visible');

    setTimeout(() => {
      toastNotification.classList.remove('is-visible');
    }, 3200);
  }

  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailToCopy).then(() => {
          if (copyEmailText) copyEmailText.textContent = 'E-mail Copiado!';
          showToast(`E-mail ${emailToCopy} copiado!`);
          setTimeout(() => {
            if (copyEmailText) copyEmailText.textContent = 'Copiar E-mail';
          }, 2400);
        }).catch(() => {
          fallbackCopyText(emailToCopy);
        });
      } else {
        fallbackCopyText(emailToCopy);
      }
    });
  }

  function fallbackCopyText(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      if (copyEmailText) copyEmailText.textContent = 'E-mail Copiado!';
      showToast(`E-mail ${text} copiado!`);
      setTimeout(() => {
        if (copyEmailText) copyEmailText.textContent = 'Copiar E-mail';
      }, 2400);
    } catch (err) {
      showToast(`E-mail: ${text}`);
    }
    document.body.removeChild(tempInput);
  }

  /* ==========================================================================
     9. RELÓGIO LOCAL EM TEMPO REAL (HORÁRIO DE BRASÍLIA)
     ========================================================================== */
  const localTimeDisplay = document.getElementById('localTimeDisplay');

  function updateLocalTime() {
    if (!localTimeDisplay) return;
    const now = new Date();
    // Formata com fuso horário de São Paulo
    const timeString = now.toLocaleTimeString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    localTimeDisplay.textContent = `${timeString} BRT`;
  }

  updateLocalTime();
  setInterval(updateLocalTime, 1000);

  /* ==========================================================================
     10. ANO ATUAL AUTOMÁTICO NO RODAPÉ
     ========================================================================== */
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     11. EFEITO INTERATIVO DE INCLINAÇÃO SUAVE 3D (TILT) NAS IMAGENS
     Inspirado em Lusion Labs — natural, elegante e discreto
     ========================================================================== */
  if (isFinePointer) {
    const tiltCards = document.querySelectorAll(
      '.interest-editorial-card, .project-card, .hero-image-frame, .photo-frame'
    );

    tiltCards.forEach((card) => {
      card.style.transition = 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.35s ease';
      card.style.transformStyle = 'preserve-3d';

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Limita a inclinação a no máximo 3.5 graus para manter a elegância minimalista
        const rotateX = ((y - centerY) / centerY) * -3.5;
        const rotateY = ((x - centerX) / centerX) * 3.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  /* ==========================================================================
     12. SINTETIZADOR DE ACORDE DE PIANO VIA WEB AUDIO API
     Sem arquivos externos pesados — som calmo e acústico em tempo real
     ========================================================================== */
  const btnPlayPiano = document.getElementById('btnPlayPiano');

  function playHarmonicPianoChord() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      const audioCtx = new AudioCtx();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // Notas do acorde Dó Maior com Sétima e Nona (Cmaj9: C4, E4, G4, B4, D5)
      // Frequências exatas das teclas de piano (Hz)
      const chordFrequencies = [261.63, 329.63, 392.00, 493.88, 587.33];
      const startTime = audioCtx.currentTime;

      chordFrequencies.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        // Timbre híbrido suave entre senoide e triângulo para calor de piano
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, startTime + idx * 0.05);

        // Curva ADSR acústica e relaxante (ataque suave e decaimento natural)
        const noteStart = startTime + idx * 0.05;
        gainNode.gain.setValueAtTime(0.0001, noteStart);
        gainNode.gain.exponentialRampToValueAtTime(0.08 / (idx * 0.4 + 1), noteStart + 0.04);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, noteStart + 2.8);

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 2.9);
      });

      if (typeof showToast === 'function') {
        showToast('♩ Acorde suave (Cmaj9) reproduzido no piano');
      }
    } catch (err) {
      console.log('Audio Context não pôde ser iniciado:', err);
    }
  }

  if (btnPlayPiano) {
    btnPlayPiano.addEventListener('click', (e) => {
      e.stopPropagation();
      playHarmonicPianoChord();
    });
  }
});
