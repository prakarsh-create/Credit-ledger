# Lucknow Artisan Credit Ledger
> **Avadh Alternate Credit Underwriting & Swarozgar Digital Passbook Protocol**

Lucknow Artisan Credit Ledger is an AI-powered alternative credit scoring and financial onboarding platform designed specifically for Lucknow's traditional craft MSMEs (such as **Chikankari hand embroiderers** and **Zardozi gold-thread artisans**). 

By analyzing non-traditional operational logs (e.g., UPI digital transaction ratios, workgroup/karigar headcount consistency, Delivery/Dispatch delays, and B2B boutique customer retention indices), this platform bypasses traditional land collateral requirements, allowing master craftsmen to access institutional credit from SIDBI, mudra schemes, and cooperative banking blocks.

---

## 🌟 Key Capabilities & Features

### 1. Swarozgar Digital Credit Passbook & Certificate
* **Official Alternate Certificate ID**: Automatically issues secure verification credentials (`LAL-UP-*`) containing verified micro-enterprise parameters.
* **Double-Border Print Layout**: Custom styled CSS for a beautiful physical certification document—fully matching actual state government credentials.
* **Instant Sharing & Verification**: Generate localized verification URL links copyable to the clipboard.

### 2. Live Conversational Voice Assistant
* **Multilingual AI Dialect Core**: Seamless support for **Hindi (हिन्दी)**, **Hinglish**, and **English**.
* **Real-time Speech Recognition & Synthesis**: Direct vocal input commands allowing craftsmen to set parameters (e.g., *"Set loan to 5 Lakhs"* or *"Boost digital ratio to 90%"*) and hear parsed updates immediately in clear spoken Indian-accented voices.
* **Simulated Interactive Prompts**: A failsafe set of buttons that ensures 100% testability of voice routines under sandboxed iframe contexts.

### 3. Gemini-Powered Alternate Underwriting Counselor
* **Detailed Microeconomic Auditing API**: Integrates Gemini models server-side to provide tailored step-by-step credit enhancement suggestions based on the handicraft MSME's parameters.
* **Cultural Context Preservation**: Respectfully references traditional handcraft centers such as Chowk, Nakhas, Aminabad, and Kakori weavers.
* **Anti-Collateral Guidance**: Practical, targeted strategies to bypass land registry blockages and maximize credit eligibility.

### 4. Enterprise Stress Tester & Simulator
* **What-If Parametric Analysis**: Sliders for monthly rent, cash-to-digital transaction percentages, material cost buffers, and weaver size to instantly recalculate the predicted alternative score.
* **Interactive Recharts Gauge**: High-fidelity dynamic score chart visualizer reflecting immediate credit readiness.

---

## 🛠️ Technology Stack

* **Frontend Framework**: React 18+ with Vite (TypeScript)
* **Animation & UI Physics**: `motion/react` (for smooth tab transitions and modal fades)
* **Tailwind & Themes**: Custom Cashmere Ivory Linen backdrop paired with Royal Emerald Jade accents for an artisanal feel
* **Backend Runtime**: High-performance Node.js & Express server with Vite Middleware proxying
* **Core AI Modeling**: `@google/genai` SDK using server-directed proxies for absolute API key protection
* **Data Visualizations**: Recharts with SVG-centered scoring needle indicator

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v18 or higher)
* NPM

### 1. Configure Secrets & Environment
Create a `.env` file at the root level (see `.env.example` as reference):
```env
GEMINI_API_KEY=your_google_ai_studio_api_key_here
```

### 2. Install Dependencies
Install all required node models:
```bash
npm install
```

### 3. Start Development Mode
Boot up the integrated Express + Vite dev proxy environment:
```bash
npm run dev
```
The developer applet will be accessible at: `http://localhost:3000`

### 4. Compile & Build for Production
To bundle and optimize the application into client-side asset binaries and a unified Node server file:
```bash
npm run build
```

The server can be launched directly using:
```bash
npm run start
```

---

## 📂 Repository Structure

* `/server.ts` - Core full-stack backend Express server handling API endpoints and proxying Gemini.
* `/src/App.tsx` - Main Application React core serving the interactive layout router.
* `/src/components/VoiceAssistant.tsx` - Rich conversational microphone voice controller.
* `/src/components/SwarozgarPassbook.tsx` - PDF Printable alternate credit ledger certificate.
* `/src/components/AICopilot.tsx` - Interactive sidebar chatbot assistant.
* `/src/index.css` - Global cashmere-textured themed styling sheet.
