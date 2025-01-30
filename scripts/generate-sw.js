const fs = require("fs");
const path = require("path");
require('dotenv').config();
const firebaseConfig = {
    apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_apiKey}`,
    authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_authDomain}`,
    projectId: `${process.env.NEXT_PUBLIC_FIREBASE_projectId}`,
    storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_storageBucket}`,
    messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_messagingSenderId}`,
    appId: `${process.env.NEXT_PUBLIC_FIREBASE_appId}`,
    measurementId: `${process.env.NEXT_PUBLIC_FIREBASE_measurementId}`
};

const generateServiceWorker = () => {
    const swTemplatePath = path.join(__dirname, '../public/firebase-messaging-sw-template.js');
    const swOutputPath = path.join(__dirname, '../public/firebase-messaging-sw.js');
  
    let swContent = fs.readFileSync(swTemplatePath, 'utf-8');
    swContent = swContent.replace('{FIREBASE_CONFIG}', JSON.stringify(firebaseConfig, null, 2));
  
    fs.writeFileSync(swOutputPath, swContent, 'utf-8');
    console.log('Service worker generated successfully!');
};

// Generate immediately on startup
generateServiceWorker();