let str = `<!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                      href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400&display=swap"
                      rel="stylesheet"
                    />
                    <title>ํํ</title>
                    <style>
                      h1 {
                        font-size: 1.4rem;
                        padding-bottom: 10px;
                        border-bottom: 5px solid #171d6b;
                      }
                      body {
                        border: 1px solid #cdcdcd;
                        padding: 15px;
                        border-radius: 12px;
                        font-family: "Noto Sans KR";
                      }
                    </style>
                  </head>
                  <body>
                    <h1>๐ ๊ทธ๋ฃน๋ณ ์ฃผ๊ฐ ๋ถ์๋ณด๊ณ ์</h1>
                    <p>๊ทธ๋ฃน ์ด๋ฆ : "${event.name}"</p>
                    <p>๊ทธ๋ฃน ๊ณต์ง์ฌํญ : ${event.noti}</p>
                    <p>ํด๋น ์ ์ ์ ๊ทธ๋ฃน ๋ด ๋์  ์ถ์ ์ผ์ : ${event.date}์ผ</p>
                    <p>ํด๋น ์ ์ ๊ฐ ์ถ์ ๋ฌธ์ ์ค ํด๊ฒฐํ์ง ๋ชปํ ๋ฌธ์ ๋ค : ${event.prob}</p>
                    <p>ํด๋น ์ ์ ์ ๊ทธ๋ฃน ๋ด ๋ญํน : ${event.rank}๋ฑ</p>
                  </body>
                </html>
`;
