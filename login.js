import { supabase } from "./supabaseClient.js";
const form = document.getElementById("loginForm");
const errorBox = document.getElementById("error");
const button = form.querySelector('button[type="submit"]');
const destination = "./index.html";
let pending = false;
// Existing authenticated users do not need to sign in again.
try {
  const { data, error } = await supabase.auth.getUser();
  if (!error && data?.user) window.location.replace(destination);
} catch (error) { console.warn("Session check unavailable", error); }
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (pending) return;
  pending = true;
  button.disabled = true;
  button.textContent = "Signing in…";
  errorBox.textContent = "";
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data?.session) {
      errorBox.textContent = "Incorrect email address or password.";
      return;
    }
    window.location.replace(destination);
  } catch (error) {
    console.error("Authentication failed", error);
    errorBox.textContent = "Could not sign in. Please try again.";
  } finally {
    pending = false;
    button.disabled = false;
    button.textContent = "Sign In";
  }
});
