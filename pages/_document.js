import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="manifest"
          crossorigin="use-credentials"
          href="manifest.json"
        />
        <link rel="apple-touch-icon" href="favicon.ico" />
        <meta name="theme-color" content="#055CA8"></meta>
        {/* <script
          src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
          crossorigin="anonymous"
        ></script> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
