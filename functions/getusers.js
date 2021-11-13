// exports.handler = function (event, context, callback) {
//   const { name } = JSON.parse(event.body);

//   callback(null, {
//     statusCode: 200,
//     body: JSON.stringify({ message: "Hello " + name })
//   });
// }
const axios = require('axios');
require('dotenv').config();

exports.handler = function (event, context, callback) {
  const { API_URL, API_CLIENT_ID, API_CLIENT_SECRET } = process.env;

  const URL = `${API_URL}?client_id=${API_CLIENT_ID}&client_secret=${API_CLIENT_SECRET}`;

  // 调用API
  const getUsers = async () => {
    const data = await axios.get(URL)
      .then(res => send(res.data))
      .catch(err => send(err));
  }
  // 发送响应
  const send = body => {
    callback(null, {
      statusCode: 200,
      // 本地调试开启CORS
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Access-Control-ALlow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      // },
      body: JSON.stringify(body)
    })
  };

  // 确保请求方法是GET
  if (event.httpMethod === 'GET') {
    getUsers();
  }
}