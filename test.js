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
                    <title>태현</title>
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
                    <h1>📝 그룹별 주간 분석보고서</h1>
                    <p>그룹 이름 : "${event.name}"</p>
                    <p>그룹 공지사항 : ${event.noti}</p>
                    <p>해당 유저의 그룹 내 누적 출석 일수 : ${event.date}일</p>
                    <p>해당 유저가 출석 문제중 해결하지 못한 문제들 : ${event.prob}</p>
                    <p>해당 유저의 그룹 내 랭킹 : ${event.rank}등</p>
                  </body>
                </html>
`;
