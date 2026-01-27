# Deployment Guide

## Production Build

This zip file (`production-build.zip`) contains the complete codebase ready for production deployment.

## Contents

### Frontend
- **dist/**: Production build of the React application (ready to serve)
- **src/**: Source code (for reference or rebuilding)
- **public/**: Static assets (images, videos, favicons)
- **package.json**: Dependencies and build scripts
- **vite.config.js**: Vite configuration

### Backend API
- **api/v1/chat/completions.php**: OpenAI-compatible chat completions API with streaming support
- **api/v1/save-strategy.php**: Strategy submission saving endpoint

### Configuration
- **.gitignore**: Git ignore patterns
- **README.md**: Project documentation

## Deployment Steps

### 1. Extract the Zip
```bash
unzip production-build.zip -d /path/to/production
cd /path/to/production
```

### 2. Install Dependencies
```bash
npm install --production
```

### 3. Build the Application (if needed)
```bash
npm run build
```

### 4. Server Configuration

#### For Frontend (Static Files)
- Point your web server to the `dist/` folder
- Ensure proper routing for React Router (all routes should serve `index.html`)

#### For API Endpoints
- Ensure PHP 7.4+ is installed
- Configure web server to handle PHP files
- Set proper permissions for `api/data/` directory (for saving strategy submissions)
- Ensure Ollama is running on `http://127.0.0.1:11434`

### 5. Environment Variables
Create a `.env` file with:
```
VITE_PORTAL_ID=your_hubspot_portal_id
VITE_FORM_ID=your_hubspot_form_id
VITE_3D_STRATEGY_FORM_ID=your_strategy_form_id
VITE_API_KEY=your_hubspot_api_key
VITE_CLARITY_ID=your_clarity_id
```

### 6. API Configuration
- Ensure `api/v1/chat/completions.php` is accessible at `https://api.3d7tech.com/v1/chat/completions`
- Ensure `api/v1/save-strategy.php` is accessible at `https://api.3d7tech.com/v1/save-strategy.php`
- Create `api/data/` directory with write permissions for saving submissions

### 7. Database/Storage Setup
The API saves data to:
- `api/data/strategy-submissions.csv` - CSV format for easy viewing
- `api/data/strategy-submissions.json` - JSON format with full details

Ensure the `api/data/` directory exists and is writable:
```bash
mkdir -p api/data
chmod 755 api/data
```

## Features Included

1. **3D Strategy Generator (Hero8)**
   - Business strategy generation with AI
   - Streaming responses
   - PDF download and copy functionality
   - Email capture and saving

2. **Chatbot**
   - RAG-based chatbot with website knowledge
   - Streaming responses
   - Available on all pages

3. **API Endpoints**
   - Chat completions with streaming support
   - Strategy submission saving

## Server Requirements

- **PHP**: 7.4 or higher
- **Node.js**: 16+ (for building, not required in production)
- **Web Server**: Apache/Nginx with PHP support
- **Ollama**: Running locally on port 11434 (for AI API)

## Security Notes

- `.env` files are excluded from the zip (create them on the server)
- Ensure proper file permissions on `api/data/` directory
- Configure CORS appropriately in production
- Consider adding authentication to API endpoints

## Troubleshooting

### API Not Working
- Check if Ollama is running: `curl http://127.0.0.1:11434/api/tags`
- Verify PHP error logs
- Check file permissions on `api/data/`

### Frontend Not Loading
- Ensure `dist/` folder is being served correctly
- Check browser console for errors
- Verify all environment variables are set

### Streaming Not Working
- Check if API supports streaming (verify `stream: true` in request)
- Check server configuration for SSE support
- Verify CORS headers are set correctly

