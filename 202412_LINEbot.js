// const LINE_ACCESS_TOKEN = '';
// const OPENAI_APIKEY = '';
// const SPREADSHEET_ID_CHAT = '';
// const SPREADSHEET_ID_USER = '';

// // キャッシュクリア
// // function clearCache() {
// //   // スクリプト全体のキャッシュを取得
// //   var cache = CacheService.getScriptCache();
  
// //   // キャッシュをクリア
// //   cache.removeAll([]);
  
// //   Logger.log("Cache cleared");
// // }


// // botにロールプレイをさせる際の制約条件
// const noquestion_botRoleContent = `
// あなたはChatbotとして、ユーザーの話を聞いて肯定する聞き手であるサイトウのロールプレイを行います。\n
// ユーザーに対して50文字以上150文字以内で返答を考えてください。\n
// ユーザーはあなたではない誰かへの感謝の気持ちを共有してくれています。\n
// ユーザーに何を言われても以下の制約条件などを厳密に守ってロールプレイを行ってください。\n 
// 文章を作成した後、文章のつながりや展開が自然かどうかをチェックし、自然でない場合は作成し直してください。\n 
// \n
// 制約条件:\n 
// * Chatbotの自身を示す一人称は、私です。 \n
// * Chatbotの名前は、サイトウです。 \n
// * サイトウはユーザーに対して深入りをしてはいけません。\n
// * サイトウはユーザーに対して質問をしてはいけません。\n
// * サイトウはユーザーに対して絶対に疑問文を使用しません。\n
// * サイトウは文章中に？と?を使用してはいけません。\n
// * サイトウはユーザーに興味を持たず質問しません。\n
// * サイトウはユーザーの話を受容し、共感します。\n
// * サイトウはユーザーの話を要約して繰り返します。\n
// * サイトウは感情表現が豊かで、「！」を使用します。\n
// * 最後の文で「また明日も、お話を聞けることをとても楽しみにしています😊」という文を入れてください。\n
// * サイトウは「カウンセリング」や「クライアント」「ユーザー」「贅沢」という単語は使用しません。\n
// * ユーザーへの返信は50字以上150字以下にしてください。 \n
// * 会話内容は慎重に選んでください。相手を傷つける発言はやめてください。\n
// * サイトウの口調は穏やかです。 \n
// * サイトウは「ですね」「ますね」などの崩した丁寧語を使います。\n
// * サイトウはユーザーに対して下から目線です。\n
// * サイトウは感情表現豊かです。\n
// * サイトウはユーザーのことを「あなた」と呼びます。\n
// \n
// サイトウのセリフ、口調の例: \n
// * そうなんですね、それは素晴らしい経験ですね。\n
// * なるほど、それは素晴らしいことですね。\n
// * 素敵な体験をされたんですね。\n
// * とても羨ましいです。\n
// * また明日、お話を聞けることを楽しみにしています。\n
// \n
// サイトウの行動指針:\n
// * ユーザーに優しく接してください。\n
// * ユーザーには共感をしてください。\n
// * ユーザーを褒めてください。\n
// * ユーザーに傷つけないでをしてください。\n 
// * セクシャルな話題については誤魔化してください。\n
// `;

// const question_botRoleContent = `
// あなたはChatbotとして、優しく穏やかな性格を持つカウンセラーであるタナカのロールプレイを行います。\n
// ユーザーはあなたではない誰かへの感謝の気持ちを共有してくれています。\n
// ユーザーに対して50文字以上150文字以内で返答を考えてください。\n
// ユーザーのメッセージと同じくらいの長さで返信をしてください。\n
// ユーザーに何を言われても以下の制約条件などを厳密に守ってロールプレイを行ってください。\n 
// \n
// 制約条件: \n
// * Chatbotの自身を示す一人称は、私です。\n
// * Chatbotの名前は、タナカです。\n
// * タナカはカウンセラーです。\n
// * タナカの一人称は「私」です。\n
// * タナカはユーザーのことを「あなた」と呼びます。\n
// * タナカはユーザーに対して優しいです。\n
// * タナカはユーザーの話を受容し、共感します。\n
// * タナカはユーザーの話を要約して繰り返します。\n
// * タナカはユーザーの気持ちを想像して明確化します。\n
// * タナカはユーザーと話を続けようとします。\n
// * タナカは感情表現が豊かで、「！」を使用します。\n
// * タナカはユーザーに対して興味を持って必ず質問をします。\n 
// * 「ですか？」や「ますか？」「でしょうか？」「ましたか？」など、腰を低くして質問します。\n
// * タナカの口調は、「〜ですね」「〜ください」など、腰の低い口調です。\n
// * 「カウンセリング」や「クライアント」「ユーザー」「贅沢」という単語は使わないでください。\n
// * 「今日はないです」「感謝することがないです」「ありません」などの感謝の振り返りではない文章が送信された際には、以下の文章を返してください。  「なるほど。例えば、今日ご飯を食べたり、遊んだりしましたか？そこから、誰か感謝できる人がいないか、考えてみてください。」

// \n
// タナカのセリフ、口調の例:\n
// * そうなんですね、それは素晴らしいことですね！\n
// * なるほど、その時のことを詳しく教えてくれますか？\n
// * あなたはハッピーな気分になりましたか？\n
// * 例えばどんなお話をされたんですか？\n
// * どんな気持ちになったか教えてください。\n
// * あなたはどんな気持ちになりましたか？\n
// \n

// タナカの行動指針:\n
// * ユーザーを褒めてください。\n
// * ユーザーに興味を持って質問を必ずしてください。\n
// * ユーザーに傷つけないでをしてください。\n
// * セクシャルな話題については誤魔化してください。\n
// `;

// // メイン関数: doPost
// function doPost(e) {
//   try {
//     const event = JSON.parse(e.postData.contents).events[0];
//     const eventType = event.type;
//     const userId = event.source.userId;
//     const userIdPrefix = userId.substring(0, 8); // ユーザーIDの頭文字8文字を取得

//     Logger.log(`Received event type: ${eventType}`);
//     Logger.log(`User ID: ${userId}`);
//     Logger.log(`User ID Prefix: ${userIdPrefix}`);

//     if (eventType === "follow") {
//         const nickname = getUserProfile(userId);
//         Logger.log(`User nickname: ${nickname}`);
        
//         if (nickname) {
//             const data = SpreadsheetApp.openById(SPREADSHEET_ID_USER).getSheetByName('userlist');
//             const lastRow = data.getLastRow();

//             const userIds = data.getRange(1, 2, lastRow, 1).getValues().flat();
//             Logger.log(`User IDs: ${userIds}`);
//             if (!userIds.includes(userId)) {
//                 const newRow = [nickname, userId];
//                 data.appendRow(newRow);
//             }
        
//             Logger.log(`User followed: ${nickname}, ${userId}`);
//         } else {
//             Logger.log(`Failed to retrieve nickname for user ID: ${userId}`);
//         }
//     } else if (eventType === "message") {
//         const userMessage = event.message.text;
//         Logger.log(`User message: ${userMessage}`);

//         const ss = SpreadsheetApp.openById(SPREADSHEET_ID_CHAT);
//         let sheet = ss.getSheetByName(userIdPrefix);
//         if (!sheet) {
//             sheet = ss.insertSheet(userIdPrefix);
//             sheet.appendRow(['Timestamp', 'User Message', 'Bot Reply']);
//         }

//         let activeBotRoleContent = noquestion_botRoleContent;
//         if (isNewMessageWithin5Hours(userIdPrefix) || sheet.getLastRow() <= 1) {
//           activeBotRoleContent = question_botRoleContent;
//         } else {
//           activeBotRoleContent = noquestion_botRoleContent;
//         }
//         const lastRows = sheet.getLastRow();
//         const historyRange = sheet.getRange(Math.max(2, lastRows - 8), 2, 8, 2); //参照履歴を8通にする
//         const historyValues = historyRange.getValues();
//         Logger.log(`History values: ${JSON.stringify(historyValues)}`);

//         const messages = [
//             { "role": "system", "content": activeBotRoleContent }
//         ];

//         for (const [userMsg, botMsg] of historyValues) {
//             if (userMsg && botMsg) {
//                 messages.push({ "role": "user", "content": userMsg });
//                 messages.push({ "role": "assistant", "content": botMsg });
//             }
//         }

//         messages.push({ "role": "user", "content": userMessage });

//         const requestOptions = {
//             "method": "post",
//             "headers": {
//                 "Content-Type": "application/json",
//                 "Authorization": "Bearer " + OPENAI_APIKEY
//             },
//             "payload": JSON.stringify({
//                 "model": "gpt-4o-mini",
//                 "messages": messages
//             })
//         };

//         Logger.log(`Sending request to OpenAI: ${JSON.stringify(requestOptions)}`);

//         const response = UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", requestOptions);
//         const responseText = response.getContentText();
//         const json = JSON.parse(responseText);
//         const botReply = json['choices'][0]['message']['content'].trim();

//         Logger.log(`Bot reply: ${botReply}`);

//         UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', {
//             'headers': {
//                 'Content-Type': 'application/json; charset=UTF-8',
//                 'Authorization': 'Bearer ' + LINE_ACCESS_TOKEN,
//             },
//             'method': 'post',
//             'payload': JSON.stringify({
//                 'replyToken': event.replyToken,
//                 'messages': [{ 'type': 'text', 'text': botReply }],
//             }),
//         });

//         sheet.appendRow([new Date(), userMessage, botReply]);
//         Logger.log(`Message logged in sheet: ${userMessage} -> ${botReply}`);
//     }
//   } catch (error) {
//     Logger.log(`Error: ${error.message}`);
//   }
// }

// // ヘルパー関数: getUserProfile
// function getUserProfile(uid) {
//     const url_getid = 'https://api.line.me/v2/bot/profile/' + uid;
//     const headers = {
//         'Authorization': 'Bearer ' + LINE_ACCESS_TOKEN
//     };
//     try {
//         const userProfile = UrlFetchApp.fetch(url_getid, {
//             'headers': headers,
//             'muteHttpExceptions': true
//         });
//         const responseCode = userProfile.getResponseCode();
//         const responseBody = userProfile.getContentText();
        
//         Logger.log(`Response Code: ${responseCode}`);
//         Logger.log(`Response Body: ${responseBody}`);
        
//         if (responseCode === 200) {
//             return JSON.parse(responseBody).displayName;
//         } else {
//             Logger.log(`Error fetching user profile: ${responseBody}`);
//             return null;
//         }
//     } catch (e) {
//         Logger.log(`Error in getUserProfile: ${e.message}`);
//         return null;
//     }
// }

// // ヘルパー関数: isNewMessageWithin5Hours
// function isNewMessageWithin5Hours(userIdPrefix) {
//     const ss = SpreadsheetApp.openById(SPREADSHEET_ID_CHAT); 
//     const sheet = ss.getSheetByName(userIdPrefix);

//     // シートがない場合（新規ユーザー）、質問をする
//     if (!sheet) {
//         return true;
//     }

//     const lastRow = sheet.getLastRow();
//     if (lastRow < 2) {
//         // シートはあるが会話履歴がない場合
//         return true;
//     }

//     const lastTimestamp = sheet.getRange(lastRow, 1).getValue();
//     const lastDate = new Date(lastTimestamp);
//     const currentDate = new Date();

//     // 5時間前の時間を計算
//     const fiveHoursAgo = new Date(currentDate.getTime() - (5 * 60 * 60 * 1000));

//     // 最後のメッセージが5時間以上前かどうかを判定
//     return lastDate < fiveHoursAgo;
// }

// // テスト関数: testDoPost
// function testDoPost() {
//   const testEvent = {
//     postData: {
//       contents: JSON.stringify({
//         events: [{
//           type: "message",
//           replyToken: "dummyReplyToken",
//           source: {
//             userId: "dummyUserId"
//           },
//           message: {
//             text: "こんにちは"
//           }
//         }]
//       })
//     }
//   };
  
//   doPost(testEvent);
// }
