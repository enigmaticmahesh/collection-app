export const FB_CONFIGS = {
    FB_CONFIG_OBJECT: {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,

        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,

        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,

        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,

        appId: import.meta.env.VITE_FIREBASE_APP_ID,
    },
    COLLECTION: {
        NAMES: 'names',
        COLLECTION_TOTALS: 'collection-totals',
    },
} as const