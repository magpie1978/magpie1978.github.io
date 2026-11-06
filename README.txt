Upload all files in this ZIP to the root of your GitHub Pages repository.
index.html = login; zulu.html = dashboard.
login.js redirects to ./zulu.html; dashboard-auth.js redirects to ./index.html.
Use one canonical host (www or non-www) so Supabase browser sessions are stored consistently.
Note: client-side authentication does not protect the static HTML or links from direct access.
