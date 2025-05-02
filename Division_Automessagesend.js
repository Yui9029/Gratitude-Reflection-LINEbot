// // LINE Developersに書いてあるChannel Access Token
// var access_token = "pr1tzZtcsrwlcakHoLGHYKB20lulJZblBtLfGKl64PkAdlqbn97tPvIj4K8oqsBPxykjkUTHZKhgzi5U8BdK6brD6+UNotdafDLjQxira0pDICZCeTBIB5ZSvKaxDlH8iSMZQ/8d2iK+xWwZl95yUwdB04t89/1O/w1cDnyilFU=";

// // スプレッドシートのIDを指定します
// var spreadsheetId = "1qfcwv_rQb5nMkOS-939NhlrheTa3uaXntwiDFSRvCho";

// // シート名
// var SheetName = "userlist";

//　トリガー一時停止用関数
function triggerStop() {
  Logger.log('トリガー、一時停止中');
}

// // 各グループに30人ずつメッセージを送信する関数を作成します。
// // それぞれの関数が異なるグループにメッセージを送信します。

// // 1番目のグループ（1〜30人）にメッセージを送信する関数（遅延なし）
// function sendMessagesToGroup1() { 
//   sendMessagesToGroup(0, 30); 
// }

// // 2番目のグループ（31〜60人）にメッセージを送信する関数。実行前に1分の遅延を挿入
// function sendMessagesToGroup2() { 
//   Utilities.sleep(60000 * 1); 
//   sendMessagesToGroup(30, 60); 
// }

// // 3番目のグループ（61〜90人）にメッセージを送信する関数。実行前に2分の遅延を挿入
// function sendMessagesToGroup3() { 
//   Utilities.sleep(60000 * 2); 
//   sendMessagesToGroup(60, 90); 
// }

// // 4番目のグループ（91〜120人）にメッセージを送信する関数。実行前に3分の遅延を挿入
// function sendMessagesToGroup4() { 
//   Utilities.sleep(60000 * 3); 
//   sendMessagesToGroup(90, 120); 
// }


// // 指定した範囲（開始インデックスから終了インデックスまで）のユーザーにメッセージを送信する関数
// function sendMessagesToGroup(startIndex, endIndex) {
//   // スプレッドシートから全ユーザーIDを取得
//   var userIds = getUserIdsFromSpreadsheet();
  
//   // 指定した範囲のユーザーIDを取得し、userGroupに格納
//   var userGroup = userIds.slice(startIndex, endIndex);

//   // 各ユーザーにメッセージを送信するループ処理
//   for (var i = 0; i < userGroup.length; i++) {
//     var userId = userGroup[i];
//     createMessageAndSend(userId);
//   }
// }

// // スプレッドシートから全ユーザーIDを取得する関数
// function getUserIdsFromSpreadsheet() {
//   // 指定したスプレッドシートとシートを開く
//   var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(SheetName);
  
//   // シート内の最終行を取得
//   var lastRow = sheet.getLastRow();
  
//   // userIDが記載されている範囲（B2列から最終行まで）を取得
//   var userIdRange = sheet.getRange("B2:B" + lastRow);
  
//   // 2次元配列を1次元配列に変換してuserIdsに格納
//   var userIds = userIdRange.getValues().flat();
//   return userIds;
// }

// // メッセージを作成して指定したユーザーに送信する関数
// function createMessageAndSend(userId) {
//   // 送信するメッセージ内容を定義
//   var message = "本日の感謝の振り返りを一緒に行いましょう😊\n今日，感謝したいことは何かありますか？";
  
//   // push関数を使ってメッセージを送信
//   push(message, userId);
// }

// // 実際にLINE APIを使ってメッセージを送信する関数
// function push(text, userId) {
//   // LINE APIのプッシュメッセージ用URL
//   var url_push = "https://api.line.me/v2/bot/message/push";
  
//   // HTTPリクエストのヘッダー設定
//   var headers = {
//     "Content-Type": "application/json; charset=UTF-8",
//     "Authorization": "Bearer " + access_token,
//   };

//   // POSTデータを構成
//   var postData = {
//     "to": userId,
//     "messages": [
//       {
//         "type": "text",
//         "text": text,
//       }
//     ]
//   };

//   // HTTPリクエストのオプション設定
//   var options = {
//     "method": "post",
//     "headers": headers,
//     "payload": JSON.stringify(postData)
//   };

//   // LINE APIにリクエストを送信
//   return UrlFetchApp.fetch(url_push, options);
// }
