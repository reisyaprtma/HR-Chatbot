# Cursor Prompt for Building Interactive AI Chatbot

## Project Overview
I need you to create a fully functional, interactive AI chatbot interface that matches the provided design system. The chatbot should have a modern, minimal design with purple-pink gradient accents, similar to popular AI chat interfaces.

## Core Requirements

### 1. HTML Structure
Create a semantic HTML structure with:
- A main container with proper sections for header, chat area, and input area
- Welcome screen that shows when no conversation exists
- Chat message container that scrolls properly
- Sticky input area at the bottom
- Responsive layout that works on mobile and desktop

### 2. CSS Styling (Use the Design System)
Apply these specific design tokens from the JSON design system:
- **Colors**: White background (#FFFFFF), light gray for AI messages (#F9FAFB), dark gray for user messages (#1F2937)
- **Gradient**: Purple to pink (from #9333EA to #EC4899) for AI avatar and accent elements
- **Typography**: Use system fonts with 15px base size for messages
- **Spacing**: 16px padding standard, 12px gap between messages
- **Border Radius**: 18px for message bubbles, 12px for buttons and inputs
- **Shadows**: Subtle shadows (0 2px 8px rgba(0, 0, 0, 0.06)) for depth
- **Effects**: Glassmorphism for header (backdrop-filter: blur(20px))

### 3. JavaScript Functionality
Implement these interactive features:

```javascript
// Core features to implement:
1. Message sending and receiving
2. Auto-scroll to latest message
3. Typing indicator animation
4. Message timestamps
5. Keyboard shortcuts (Enter to send, Shift+Enter for new line)
6. Local storage for conversation history
7. Message animations (fade in, slide up)
8. Dynamic textarea height adjustment
9. Empty state handling
10. Error state handling
```

### 4. Specific Components to Build

#### Welcome Component
- Show gradient logo/avatar (80px size)
- Display greeting: "Hi there, [User]"
- Subtitle: "How can I help you today?"
- 3 suggestion cards with hover effects
- Fade out when conversation starts

#### Message Component
```javascript
// Message object structure
{
  id: unique_id,
  type: 'user' | 'ai',
  content: string,
  timestamp: Date,
  status: 'sending' | 'sent' | 'error',
  avatar: optional_url
}
```

#### Input Component
- Textarea that grows with content (max 5 lines)
- Send button with gradient background
- Placeholder: "Ask me anything..."
- Disabled state while AI is responding
- Character counter (optional)

#### AI Response Simulation
- Add 3-dot typing indicator during response
- Simulate response delay (1-2 seconds)
- Stream text effect (optional - characters appear progressively)
- Support markdown formatting in responses

### 5. Interactive Features

#### User Actions
```javascript
// Implement these user interactions:
- Send message (Enter key or button click)
- Edit last message (Up arrow key)
- Clear conversation (with confirmation)
- Copy message to clipboard
- Regenerate AI response
- Stop generating (during streaming)
```

#### Visual Feedback
```javascript
// Add these visual responses:
- Button hover states (transform: translateY(-1px))
- Message fade-in animation (opacity 0 to 1, translateY 10px to 0)
- Typing indicator pulse animation
- Send button state changes (active/disabled)
- Focus states with purple outline (#8B5CF6)
- Smooth scrolling to new messages
```

### 6. Advanced Features

#### Conversation Management
```javascript
class ChatBot {
  constructor() {
    this.messages = [];
    this.isTyping = false;
    this.conversationId = generateId();
  }
  
  // Methods to implement:
  - sendMessage(text)
  - receiveMessage(text)
  - deleteMessage(id)
  - editMessage(id, newText)
  - clearConversation()
  - saveToLocalStorage()
  - loadFromLocalStorage()
  - exportConversation()
}
```

#### AI Response Generator
```javascript
// Create a mock AI response system:
- Array of contextual responses
- Detect question types (greeting, question, statement)
- Random delay between 800-2000ms
- Support for suggested follow-up questions
- Error handling with retry mechanism
```

### 7. Responsive Design
Implement breakpoints:
- Mobile (< 768px): Full width, smaller fonts, compact spacing
- Tablet (768px - 1024px): Centered container with padding
- Desktop (> 1024px): Max width 800px for chat area

### 8. Accessibility
- ARIA labels for all interactive elements
- Keyboard navigation support
- Screen reader announcements for new messages
- Focus management after sending messages
- Minimum touch target size of 44px
- Color contrast ratio of at least 4.5:1

### 9. Performance Optimizations
- Lazy load older messages (virtual scrolling for 100+ messages)
- Debounce input events
- Throttle scroll events
- Use CSS transforms for animations (not position)
- Minimize reflows during message additions

### 10. Error Handling
```javascript
// Handle these error cases:
- Network failures (show retry button)
- Empty message validation
- Maximum message length (2000 characters)
- Session timeout
- Local storage quota exceeded
```

## File Structure
```
project/
├── index.html
├── styles/
│   ├── main.css
│   ├── components.css
│   └── animations.css
├── scripts/
│   ├── app.js
│   ├── chatbot.js
│   ├── ui-controller.js
│   └── utils.js
└── assets/
    └── icons/
```

## Testing Checklist
- [ ] Messages send and display correctly
- [ ] Conversation persists on page reload
- [ ] Animations are smooth (60fps)
- [ ] Works on mobile devices
- [ ] Keyboard shortcuts function properly
- [ ] AI responses appear natural
- [ ] Error states display appropriately
- [ ] Accessibility features work
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari, Edge)

## Example Code Structure to Start With

```javascript
// Initialize the chatbot
document.addEventListener('DOMContentLoaded', () => {
  const chatBot = new ChatBot({
    container: '.chat-container',
    inputSelector: '.message-input',
    sendButton: '.send-button',
    messagesArea: '.messages-area',
    welcomeScreen: '.welcome-screen',
    typingIndicator: '.typing-indicator'
  });
  
  // Load previous conversation
  chatBot.loadConversation();
  
  // Set up event listeners
  chatBot.initializeEventListeners();
  
  // Show welcome screen if no messages
  chatBot.checkEmptyState();
});
```

## Additional Notes
- Use vanilla JavaScript for better performance (no framework required)
- Implement smooth animations using CSS transitions and transforms
- Add subtle micro-interactions for better UX
- Consider adding sound effects for message sent/received (optional)
- Implement auto-save every 5 seconds
- Add "New Chat" button to start fresh conversation
- Consider dark mode support using CSS custom properties

## Design System Reference
Use the provided JSON design system for all visual specifications including colors, spacing, typography, shadows, and component styles. The gradient should be prominent but not overwhelming - use it strategically for the AI avatar, send button, and accent elements.

Remember: The goal is to create a polished, professional AI chat interface that feels responsive, modern, and delightful to use. Every interaction should feel smooth and intentional.