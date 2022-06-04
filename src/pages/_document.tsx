import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)

  //   return initialProps
  // }

  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;500&display=swap"
            rel="stylesheet"
          />
          {/* <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/constant.png" /> */}
          {/* <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/constant.png" /> */}
          {/* <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/constant.png" /> */}
          {/* <link rel="manifest" href="/static/favicons/site.webmanifest" /> */}
          <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" content="#000000" />
          {/* <link rel="alternate" type="application/rss+xml" href="/feed.xml" /> */}
        </Head>
        <body className="">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
