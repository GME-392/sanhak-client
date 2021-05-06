//처음에 넣을 때 쓰는 함수
//모든 데이터를 받아서 한번에 처리해준다.
//예측으로는 ID, PW, bojName, email이 4가지만 들어온다.

let AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-northeast-2",
  endpoint: "http://dynamodb.ap-northeast-2.amazonaws.com",
});

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  let userId = event ? event.userid : "default";
  let userPw = event ? event.userpw : "default";
  let bojName = event ? event.bojname : "default";
  let userEmail = event ? event.useremail : "default";

  if (
    userId == "default" ||
    userPw == "default" ||
    bojName == "default" ||
    userEmail == "default" ||
    userId == "" ||
    userPw == "" ||
    bojName == "" ||
    userEmail == ""
  ) {
    console.log("userId, userPw, bojName, userEmail: ", userId, userPw, bojName, userEmail);
    let response = {
      statusCode: 400,
      headers: { post: "fail" },
      body: JSON.stringify({ message: "missing content" }),
      isBase64Encoded: false,
    };
    callback(null, response);
    return;
  }

  const params = {
    TableName: "ACTIVE_USER",
    Item: {
      user_id: userId,
      user_pw: userPw,
      boj_name: bojName,
      created_at: `${new Date()}`,
      group_auth: [false],
      group_name: ["default"],
      problem_num: [-1],
      problem_solved: [false],
      user_email: userEmail,
      user_level: 0,
      user_rank: -1,
      user_status: true,
    },
  };

  let failResponse = {
    statusCode: 400,
    headers: { post: "fail" },
    body: JSON.stringify({ message: "error occured when putting item" }),
    isBase64Encoded: false,
  };

  dynamo.put(params, function (err, data) {
    if (err) {
      console.log("Error", err);
      callback(null, failResponse);
    } else {
      console.log("Success", data);
      let responseBody = { message: "puttinf item success" };
      let response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Max-Age": "3600",
          "Access-Control-Allow-Headers":
            "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization",
          post: "success",
        },
        body: JSON.stringify(responseBody),
        isBase64Encoded: false,
      };
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(responseBody),
      });
    }
  });
};
