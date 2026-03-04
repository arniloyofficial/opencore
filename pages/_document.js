import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="OpenCore MindCheck — A free, open-source mental health self-assessment tool covering 8 key wellbeing dimensions." />
        <meta name="keywords" content="mental health, assessment, depression, anxiety, wellbeing, open source" />
        <meta property="og:title" content="OpenCore MindCheck" />
        <meta property="og:description" content="A free mental health self-assessment covering depression, anxiety, sleep, and more." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
