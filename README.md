# 🤖 AI HR Chatbot - Bengkel Oto Prima

A modern, intelligent HR recruitment chatbot designed specifically for Bengkel Oto Prima to streamline the hiring process for automotive technician positions. The system combines a beautiful frontend interface with a powerful n8n backend workflow to automate CV processing, candidate interviews, and evaluation.

## ✨ Features

### 🎯 Core Functionality
- **CV Upload & Processing**: Automated PDF CV extraction and data parsing
- **Intelligent Interview**: AI-powered conversational interview process
- **Data Validation**: Smart validation for phone numbers, addresses, and other critical information
- **Session Management**: Persistent chat sessions with local storage
- **Real-time Communication**: Live chat interface with typing indicators

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Glassmorphic Elements**: Modern UI with backdrop blur effects
- **Gradient Accents**: Beautiful purple-to-pink gradient design system
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Smooth Animations**: Fade-in effects and hover animations

### 🔧 Technical Features
- **PDF Text Extraction**: Automatic extraction of candidate information from CVs
- **Google Sheets Integration**: Real-time data storage and retrieval
- **AI-Powered Analysis**: Google Gemini integration for intelligent responses
- **CORS Support**: Cross-origin request handling
- **Error Handling**: Comprehensive error management and user feedback

## 🏗️ Architecture

### Frontend (This Repository)
- **Pure JavaScript**: Vanilla JS implementation for optimal performance
- **CSS3**: Modern styling with CSS custom properties and flexbox
- **HTML5**: Semantic markup with accessibility features
- **Local Storage**: Client-side session persistence

### Backend (n8n Workflow)
- **Webhook Endpoints**: RESTful API for frontend communication
- **PDF Processing**: Automated CV text extraction
- **AI Integration**: Google Gemini for natural language processing
- **Database**: Google Sheets for data persistence
- **Workflow Automation**: Complete recruitment process automation

## 📁 Project Structure

```
frontend/
├── index.html          # Main HTML structure
├── app.js             # Core JavaScript application
├── style.css          # Complete styling system
├── script.js          # Additional scripts (if needed)
├── design.json        # Design system documentation
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- n8n instance with the provided workflow
- Google Sheets API access
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hr-chatbot.git
   cd hr-chatbot
   ```

2. **Configure the backend**
   - Import the `My workflow 2.json` file into your n8n instance
   - Set up Google Sheets API credentials
   - Configure Google Gemini API credentials
   - Update webhook URLs in `app.js` if needed

3. **Deploy the frontend**
   - Upload files to your web server
   - Ensure CORS is properly configured
   - Test the webhook connection

### Configuration

Update the webhook URL in `app.js`:
```javascript
// Line 293 and 336 - Update with your n8n webhook URL
const res = await fetch('YOUR_N8N_WEBHOOK_URL', {
  // ... rest of the configuration
});
```

## 🔧 Technical Details

### Frontend Technologies
- **JavaScript ES6+**: Modern JavaScript features
- **CSS Custom Properties**: Dynamic theming system
- **Fetch API**: Modern HTTP client
- **FormData API**: File upload handling
- **SessionStorage**: Session management
- **LocalStorage**: Data persistence

### Backend Integration
- **n8n Workflow**: Complete automation pipeline
- **Google Sheets**: Data storage and retrieval
- **Google Gemini**: AI language processing
- **PDF Processing**: Text extraction from CVs

### Design System
The project includes a comprehensive design system documented in `design.json`:
- **Color Palette**: Purple-pink gradient theme
- **Typography**: Inter font family with proper scaling
- **Spacing**: 4px base unit system
- **Components**: Reusable UI components
- **Animations**: Smooth transitions and effects

## 📊 Data Flow

1. **User Uploads CV**: PDF file sent to n8n webhook
2. **PDF Processing**: Text extraction and data parsing
3. **AI Analysis**: Google Gemini processes and structures data
4. **Data Storage**: Information saved to Google Sheets
5. **Interview Process**: AI conducts structured interview
6. **Evaluation**: Automated candidate assessment
7. **Results**: Final evaluation stored and displayed

## 🎯 Use Cases

### For HR Teams
- **Automated Screening**: Initial candidate filtering
- **Standardized Interviews**: Consistent questioning process
- **Data Collection**: Structured candidate information gathering
- **Evaluation Reports**: Automated assessment scoring

### For Candidates
- **Easy Application**: Simple CV upload process
- **Interactive Interview**: Natural conversation flow
- **Real-time Feedback**: Immediate responses and guidance
- **Mobile Friendly**: Access from any device

## 🔒 Security & Privacy

- **CORS Protection**: Proper cross-origin request handling
- **Data Validation**: Input sanitization and validation
- **Session Management**: Secure session handling
- **Error Handling**: No sensitive data exposure in errors

## 🌐 Browser Support

- **Chrome**: 80+
- **Firefox**: 75+
- **Safari**: 13+
- **Edge**: 80+

## 📱 Responsive Design

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🚀 Performance

- **Lightweight**: No external dependencies
- **Fast Loading**: Optimized CSS and JavaScript
- **Efficient Rendering**: Minimal DOM manipulation
- **Caching**: Local storage for session persistence

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Development**: Modern UI/UX implementation
- **Backend Integration**: n8n workflow automation
- **AI Integration**: Google Gemini implementation

## 📞 Support

For support and questions:
- Create an issue in this repository
- Contact the development team
- Check the n8n workflow documentation

## 🔄 Version History

- **v1.0.0**: Initial release with core functionality
  - CV upload and processing
  - AI-powered interview system
  - Google Sheets integration
  - Modern responsive UI

## 🎉 Acknowledgments

- **n8n**: Workflow automation platform
- **Google Gemini**: AI language processing
- **Google Sheets**: Data storage solution
- **Modern Web APIs**: Fetch, FormData, Storage APIs

---
