// Public Firebase web configuration (NOT secret - it only identifies your project; the real
// protection is firestore.rules). Fill the values from: Firebase console > Project settings >
// General > Your apps > Web app > "SDK setup and configuration".
// vapidKey: Project settings > Cloud Messaging > Web Push certificates > "Generate key pair".
self.MAHAMI_FIREBASE = {
  apiKey: 'PASTE_API_KEY',
  authDomain: 'PASTE_PROJECT_ID.firebaseapp.com',
  projectId: 'PASTE_PROJECT_ID',
  storageBucket: 'PASTE_PROJECT_ID.firebasestorage.app',
  messagingSenderId: 'PASTE_SENDER_ID',
  appId: 'PASTE_APP_ID',
  vapidKey: 'PASTE_VAPID_PUBLIC_KEY',
};
