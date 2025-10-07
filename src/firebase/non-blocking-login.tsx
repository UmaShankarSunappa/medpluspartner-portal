'use client';
import {
  Auth, // Import Auth type for type hinting
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // Assume getAuth and app are initialized elsewhere
} from 'firebase/auth';
import {toast} from '@/hooks/use-toast';

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  // CRITICAL: Call signInAnonymously directly. Do NOT use 'await signInAnonymously(...)'.
  signInAnonymously(authInstance).catch(error => {
    console.error("Anonymous sign-in error:", error);
    toast({
      variant: "destructive",
      title: "Authentication Error",
      description: "Could not sign in anonymously. Please try again.",
    });
  });
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): void {
  // CRITICAL: Call createUserWithEmailAndPassword directly. Do NOT use 'await createUserWithEmailAndPassword(...)'.
  createUserWithEmailAndPassword(authInstance, email, password).catch(error => {
    console.error("Sign-up error:", error);
    toast({
      variant: "destructive",
      title: "Sign-up Failed",
      description: "Could not create an account. The email might be in use.",
    });
  });
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  // CRITICAL: Call signInWithEmailAndPassword directly. Do NOT use 'await signInWithEmailAndPassword(...)'.
  signInWithEmailAndPassword(authInstance, email, password).catch(error => {
     if (error.code === 'auth/invalid-credential') {
        toast({
            variant: "destructive",
            title: "Login Failed",
            description: "Incorrect email or password. Please try again.",
        });
     } else {
        console.error("Sign-in error:", error);
        toast({
            variant: "destructive",
            title: "Login Failed",
            description: "An unexpected error occurred. Please try again.",
        });
     }
  });
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}
