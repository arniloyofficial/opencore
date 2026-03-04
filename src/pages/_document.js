import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="OpenCore — A free, open-source mental health self-assessment tool. Answer 56 questions across 8 dimensions and get a detailed wellbeing report." />
        <meta property="og:title" content="OpenCore — Mental Health Assessment" />
        <meta property="og:description" content="A free, anonymous mental health self-assessment. Understand your wellbeing across 8 dimensions." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
