(() => {
  const SELECTORS = {
    messages: '#messages-area',
    welcome: '#welcome-screen',
    input: '#message-input',
    inputArea: '#input-wrapper',
    send: '#send-button',
    typing: '#typing-indicator',
    suggestions: '.suggestion-card',
    charCounter: '#char-counter',
    cvInput: '#cv',
    cv:'#cv',
    btnUpload: '#btn-upload'
  };

  const MAX_LEN = 2000;


  // Session UUID (ssid) persisted in sessionStorage
  const generateUUID = () =>
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });

  const getSessionId = () => {
    let id = sessionStorage.getItem('sessionUUID');
    if (!id) {
      id = generateUUID();
      sessionStorage.setItem('sessionUUID', id);
    }
    return id;
  };

  class ChatBot {
    constructor(){
      this.messages = [];
      this.isTyping = false;
      this.conversationId = this.generateId();
      this.dom = this.cacheDom();
      this.initializeEventListeners();
      this.loadFromLocalStorage();
      this.checkEmptyState();
      this.updateCharCounter();
    }

    cacheDom(){
      return {
        messages: document.querySelector(SELECTORS.messages),
        welcome: document.querySelector(SELECTORS.welcome),
        input: document.querySelector(SELECTORS.input),
        inputArea: document.querySelector(SELECTORS.inputArea),
        send: document.querySelector(SELECTORS.send),
        typing: document.querySelector(SELECTORS.typing),
        charCounter: document.querySelector(SELECTORS.charCounter),
        suggestionCards: Array.from(document.querySelectorAll(SELECTORS.suggestions)),
        cvInput: document.querySelector(SELECTORS.cvInput),
        cv: document.querySelector(SELECTORS.cv),
        btnUpload: document.querySelector(SELECTORS.btnUpload)
      };
    }

    generateId(){
      return 'c_' + Math.random().toString(36).slice(2, 10);
    }

    // checkEmptyState(){
    //   const isEmpty = this.messages.length === 0;
    //   this.dom.welcome.style.display = isEmpty ? 'flex' : 'none';
    // }

    initializeEventListeners(){
      const { input, send, suggestionCards, cvInput, btnUpload } = this.dom;

      // New Chat button
      const newChatBtn = document.querySelector('#new-chat');
      if (newChatBtn) {
        newChatBtn.addEventListener('click', () => this.clearChat());
      }

      // Send via button
      send.addEventListener('click', () => this.handleSend());
      btnUpload.addEventListener('click', () => this.handleUpload());
      if (cvInput) {
        cvInput.addEventListener('change', () => {
          // optional: show filename in chat
          const file = cvInput.files && cvInput.files[0];
          if (file) {
            const note = `File dipilih: ${file.name}`;
            const msg = this.createMessage('user', note);
            this.messages.push(msg);
            this.appendMessage(msg);
          }
        });
      }

      // Keyboard shortcuts
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.handleSend();
        } else if (e.key === 'ArrowUp' && this.messages.length) {
          // Edit last user message
          const lastUser = [...this.messages].reverse().find(m => m.type === 'user');
          if (lastUser) {
            input.value = lastUser.content;
            this.updateCharCounter();
            this.autoResize();
          }
        }
      });

      // Dynamic height and counter
      input.addEventListener('input', () => {
        this.updateCharCounter();
        this.autoResize();
      });

      // Suggestion cards
      suggestionCards.forEach(btn => btn.addEventListener('click', () => {
        this.dom.input.value = btn.textContent;
        this.updateCharCounter();
        this.autoResize();
        this.handleSend();
      }));
    }

    autoResize(){
      const { input } = this.dom;
      input.style.height = 'auto';
      const maxHeight = 24 + (15 * 1.6 + 12) * 5; // approx for 5 lines
      input.style.height = Math.min(input.scrollHeight, maxHeight) + 'px';
    }

    updateCharCounter(){
      const len = this.dom.input.value.length;
      this.dom.charCounter.textContent = `${len}/${MAX_LEN}`;
    }

    clearChat(){
      // Clear localStorage
      localStorage.removeItem('chat_messages');
      
      // Generate new session ID and update sessionStorage
      const newSessionId = generateUUID();
      sessionStorage.setItem('sessionUUID', newSessionId);
      
      // Refresh browser to ensure complete reset
      window.location.reload();
    }

    saveToLocalStorage(){
      try{
        localStorage.setItem('chat_messages', JSON.stringify(this.messages));
      }catch(err){
        console.error('Local storage error', err);
      }
    }

    loadFromLocalStorage(){
      try{
        const raw = localStorage.getItem('chat_messages');
        if(raw){
          this.messages = JSON.parse(raw);
          this.renderAll();
          const inputArea = document.querySelector('.input-area');
          if (inputArea) inputArea.style.display = 'block';
        }
      }catch(err){
        console.error('Load error', err);
      }
    }


    async handleSend(){
      const text = this.dom.input.value.trim();
      if(!text) return;
      if(text.length > MAX_LEN) return alert('Message too long');

      this.dom.input.value = '';
      this.updateCharCounter();
      this.autoResize();

      const userMessage = this.createMessage('user', text);
      this.messages.push(userMessage);
      this.appendMessage(userMessage);
      this.saveToLocalStorage();
      this.scrollToBottom();

      // AI typing indicator
      this.setTyping(true);
      try{
        const aiText = await this.fetchAIResponse(text);
        const aiMessage = this.createMessage('ai', aiText);
        this.messages.push(aiMessage);
        this.appendMessage(aiMessage);
        this.saveToLocalStorage();
      }catch(err){
        const errorMessage = this.createMessage('ai', 'Sorry, something went wrong. Please try again.');
        errorMessage.status = 'error';
        this.messages.push(errorMessage);
        this.appendMessage(errorMessage);
      }finally{
        this.setTyping(false);
        this.scrollToBottom();
      }
    }

    handleUpload(){
      const { cvInput } = this.dom;
      if(!cvInput){
        alert('Input file tidak ditemukan');
        return;
      }
      const file = cvInput.files && cvInput.files[0];
      if(!file){
        // if no file selected yet, open chooser
        cvInput.click();
        return;
      }
      if(file.type !== 'application/pdf'){
        alert('Mohon unggah file PDF');
        return;
      }
      this.uploadCv(file);
    }

    createMessage(type, content){
      return {
        id: this.generateId(),
        type,
        content,
        timestamp: new Date().toISOString(),
        status: 'sent'
      };
    }

    appendMessage(msg){
      const row = document.createElement('div');
      row.className = `message ${msg.type}`;
      const avatar = document.createElement('div');
      avatar.className = `avatar ${msg.type}`;
      const bubble = document.createElement('div');
      bubble.className = `bubble ${msg.type}`;
      bubble.innerText = msg.content;
      const meta = document.createElement('div');
      meta.className = 'meta';
      meta.innerText = new Date(msg.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});

      if(msg.type === 'ai'){
        row.appendChild(avatar);
        row.appendChild(bubble);
      }else{
        row.appendChild(bubble);
      }
      row.appendChild(meta);
      this.dom.messages.appendChild(row);
    }

    renderAll(){
      this.dom.messages.innerHTML = '';
      this.messages.forEach(m => this.appendMessage(m));
      this.scrollToBottom();
    }

    scrollToBottom(){
      requestAnimationFrame(() => {
        window.scrollTo({top: document.body.scrollHeight, behavior:'smooth'});
      });
    }

    setTyping(state){
      this.isTyping = state;
      this.dom.typing.style.display = state ? 'inline-flex' : 'none';
      this.dom.send.disabled = state;
      this.dom.input.disabled = state;
    }
    async uploadCv(file){
      const startMsg = this.createMessage('user', `Mengunggah file: ${file.name}`);
      this.messages.push(startMsg);
      this.appendMessage(startMsg);
      this.scrollToBottom();
      this.setTyping(true)

      const formData = new FormData();
      // Field name 'file' umum untuk webhook; ganti jika n8n Anda mengharuskan nama lain
      formData.append('file', file, file.name);
      // Sertakan ssid untuk pelacakan sesi di n8n
      formData.append('ssid', getSessionId());

      try{
        const res = await fetch('https://peterparker662.app.n8n.cloud/webhook/c6fae05f-0d24-416a-9af0-2811ef2c1fa7',{
          method:'POST',
          body: formData,
          mode:'cors'
        });
        const text = await res.text();
        if(!res.ok){
          throw new Error(text || `HTTP ${res.status}`);
        }
        let reply = 'CV berhasil diunggah ke server.';
        try{ 
          const json = JSON.parse(text); 
          if(json){
            if(typeof json.message === 'string') reply = json.message;
            else if(typeof json.reply === 'string') reply = json.reply;
            else if(typeof json.status === 'string') reply = json.status;
          }
        }catch(_){ /* not JSON, ignore */ }
        const okMsg = this.createMessage('ai', reply);
        this.messages.push(okMsg);
        this.appendMessage(okMsg);
        this.saveToLocalStorage();
        // Hide CV input area and show chat input area
        const cvInputArea = document.querySelector('.cv-input');
        if (cvInputArea) cvInputArea.style.display = 'none';
        const inputArea = document.querySelector('.input-area');
        if (inputArea) inputArea.style.display = 'block';

      }catch(err){
        console.error('Upload error', err);
        const errMsg = this.createMessage('ai', 'Maaf, gagal mengunggah CV. Pastikan URL webhook aktif dan mengizinkan CORS.');
        errMsg.status = 'error';
        this.messages.push(errMsg);
        this.appendMessage(errMsg);
      }finally{
        this.setTyping(false);
        this.scrollToBottom();
      }
    }
    async fetchAIResponse(text){
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);
      try{
        const res = await fetch('https://peterparker662.app.n8n.cloud/webhook/c6fae05f-0d24-416a-9af0-2811ef2c1fa7',{
          method:'POST',
          headers:{'Content-Type':'application/json','Accept':'application/json'},
          mode:'cors',
          body: JSON.stringify({ message:text, ssid: getSessionId() }),
          signal: controller.signal
        });
        if(!res.ok){
          let errMsg = `HTTP ${res.status}`;
          try { const e = await res.json(); if(e && e.error) errMsg = e.error; } catch(_){ /* ignore */ }
          throw new Error(errMsg);
        }
        // Some n8n nodes may return text or JSON; handle both
        const textBody = await res.text();
        let messageOut = null;
        try{
          const data = JSON.parse(textBody);
          // Expected shape: { complete: boolean|string, message: string }
          if (data && typeof data.message === 'string') {
            messageOut = data.message;
          } else if (typeof data.reply === 'string') {
            messageOut = data.reply;
          }
          
          
        }catch(_){ /* not JSON, treat as plain text */ }
        if(!messageOut){
          messageOut = textBody && textBody.trim().length ? textBody : '...';
        }
        return messageOut;
      } finally {
        clearTimeout(timeoutId);
      }
    }

  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    window.chatBot = new ChatBot();
  });
  
})();

