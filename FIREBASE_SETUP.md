# Firebase Setup Instructions

## Problem
The app doesn't save data because Firebase is not configured. The environment file contains placeholder values.

## Solution

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

### Step 2: Enable Firestore Database

1. In your Firebase project, go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for development)
4. Select a location for your database
5. Click **Enable**

### Step 3: Get Your Firebase Configuration

1. In Firebase Console, click the gear icon ⚙️ next to "Project Overview"
2. Select **Project settings**
3. Scroll down to **Your apps** section
4. Click the **Web** icon `</>` to add a web app
5. Register your app (give it a nickname)
6. Copy the Firebase configuration object

### Step 4: Update Environment File

Open `src/enviroments/enviroment.ts` and replace the placeholder values with your actual Firebase config:

```typescript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSy...",  // Your actual API key
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
  }
};
```

### Step 5: Set Firestore Security Rules (Important!)

In Firebase Console → Firestore Database → Rules, update the rules to allow read/write:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{document=**} {
      allow read, write: if true;  // For development only
    }
  }
}
```

**⚠️ Warning:** The above rule allows anyone to read/write. For production, implement proper authentication rules.

### Step 6: Test the Connection

1. Restart your Angular development server
2. Open browser console (F12)
3. Try adding a todo item
4. Check Firebase Console → Firestore Database to see if data appears

## Troubleshooting

- **Error: "Firebase connection error"** - Check that your Firebase config values are correct
- **Error: "Permission denied"** - Update Firestore security rules
- **Data not appearing** - Check browser console for errors
- **Still not working** - Verify Firestore is enabled in Firebase Console

