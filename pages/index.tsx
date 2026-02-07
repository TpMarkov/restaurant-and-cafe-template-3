export default function Home() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Aurora & Co.</title>
      </head>
      <body>
        <main style={{ fontFamily: "sans-serif", padding: 40 }}>
          <h1>Aurora & Co.</h1>
          <p>
            This is a minimal fallback page to ensure the root route is present
            for deployments.
          </p>
          <p>
            If you see this, the deployment routing is working — the app router
            will still serve `/` when available.
          </p>
        </main>
      </body>
    </html>
  );
}
