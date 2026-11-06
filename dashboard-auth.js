import { supabase } from "./supabaseClient.js";
const loginPage = "./zulu-orchid-falcon.html";
try {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    window.location.replace(loginPage);
  } else {
    document.documentElement.classList.add("authenticated");
    document.getElementById("signOut")?.addEventListener("click", async () => {
      const button = document.getElementById("signOut");
      button.disabled = true;
      button.textContent = "Signing out…";
      const { error } = await supabase.auth.signOut();
      if (error) { alert("Could not sign out. Please try again."); button.disabled = false; button.textContent = "Sign Out"; return; }
      window.location.replace(loginPage);
    });
  }
} catch (error) {
  console.error("Session verification failed", error);
  window.location.replace(loginPage);
}
