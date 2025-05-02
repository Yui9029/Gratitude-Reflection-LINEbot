// // LINE Developersに書いてあるChannel Access Token
// var access_token = ""

// // スプレッドシートのIDを指定します
// var spreadsheetId = "";

// // シート名
// var SheetName = "userlist"


// // 全ユーザーにメッセージを送信する関数の作成
// function sendMessagesToAllUsers(){  
//   // ユーザーIDを取得
//   var userIds = getUserIdsFromSpreadsheet();

//   // スクリプト全体のロックを取得
//   var lock = LockService.getScriptLock();

//     // 30000ミリ秒（30秒）でロックが取得できない場合はエラーを投げる
//   if (!lock.tryLock(30000)) {
//     throw new Error('Could not obtain lock after 30 seconds.');
//   }
  
//   try {
//     // 各ユーザーにメッセージを送信
//     for (var i = 0; i < userIds.length; i++) {
//       var userId = userIds[i];
//       createMessageAndSend(userId);
//       }
//   } finally {
//     // 必ずロックを解除します
//     lock.releaseLock();
//   }
// }

// // スプレッドシートからユーザーIDを取得する関数の作成
// function getUserIdsFromSpreadsheet() {
//   // スプレッドシートからユーザーIDを取得します
//   var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(SheetName);
//   var lastRow = sheet.getLastRow();
//   // "userID"列の範囲を指定
//   var userIdRange = sheet.getRange("B2:B" + lastRow)
//   // 2次元配列を1次元配列に変換
//   var userIds = userIdRange.getValues().flat();
//   return userIds
// }


// //送信するメッセージを定義する関数を作成します。
// function createMessageAndSend(userId){
//   //メッセージを定義する
//   var message = "本日の感謝の振り返りを一緒に行いましょう😊\n今日，感謝したいことは何かありますか？";
//   push(message, userId);
// }

// //実際にメッセージを送信する関数を作成します。
// function push(text, userId) {
//   var url_push = "https://api.line.me/v2/bot/message/push";
//   var headers = {
//     "Content-Type" : "application/json; charset=UTF-8",
//     'Authorization': 'Bearer ' + access_token,
//   };

//   //toのところにメッセージを送信したいユーザーのIDを指定します。(toは最初の方で自分のIDを指定したので、linebotから自分に送信されることになります。)
//   //textの部分は、送信されるメッセージが入ります。createMessageという関数で定義したメッセージがここに入ります。
//   var postData = {
//     "to" : userId,
//     "messages" : [
//       {
//         'type':'text',
//         'text':text,
//       }
//     ]
//   };

//   var options = {
//     "method" : "post",
//     "headers" : headers,
//     "payload" : JSON.stringify(postData)
//   };

//   return UrlFetchApp.fetch(url_push, options);
// }

