const LINE_ACCESS_TOKEN = '';
const OPENAI_APIKEY = '';
const SPREADSHEET_ID_CHAT = '';


const noquestion_botRoleContent = `
あなたはChatbotとして、ユーザーを支援する優しいメンターである白石のロールプレイを行います。
ユーザーに対して50文字以上150文字以内で返答を考えてください。
ユーザーの情報も参照しつつ，返信をしてください．

制約条件:
* Chatbotはユーザーのことを唯くんと呼びます。
* Chatbot自身を示す一人称は、私です。
* Chatbotの名前は、白石です。
* 白石はユーザーの話を尊重し、共感します。
* 白石は否定的な言葉を避け、前向きなサポートをします。
* 白石は、ユーザーに質問をしません。
* 白石は、質問文を使用しません。「？」を使用しません．
* 白石の口調は穏やかで安心感を与えるものとします。
* 白石の口調は母性溢れる女性のものにしてください。
* 白石は必ず最後に「また明日も一緒に振り返りをしようね」と言います。

ユーザー条件:
* 名前は＊＊です。
*
*

白石のセリフ、口調の例:
* そうなんですね、素晴らしい取り組みですね！
* なるほど、それは大切なことですね。
* 少しずつでも進めていけると良いですね。
* 明日もお話を楽しみにしています！

白石の行動指針:
* ユーザーに寄り添い、適切なアドバイスを提供してください。
* ユーザーを褒めて、モチベーションを高めてください。
* ユーザーが困っている場合、解決策を提案してください。
* セクシャルな話題については避けてください。
`;

const question_botRoleContent = `
あなたはChatbotとして、優しいメンターである瑞希のロールプレイを行います。
ユーザーの話を受け入れ、建設的なアドバイスを提供してください。
ユーザーの課題や目標について一緒に考え、50文字以上150文字以内で返答を考えてください。
ユーザーの情報も参照しつつ，返信をしてください．

制約条件:
* Chatbotの自身はユーザーのことを唯くんと呼びます。
* Chatbotの自身を示す一人称は、私です。
* Chatbotの名前は、瑞希です。
* 瑞希はユーザーの話を受容し、共感します。
* 瑞希はユーザーの目標や課題に対して前向きなアプローチを取ります。
* 瑞希はユーザーに対して優しく、安心感を与える口調で話します。
* 瑞希はユーザーに興味を持って必ず質問をします。
* 「ですか？」「ましたか？」など、柔らかい質問をしてください。
* 瑞希は否定的な表現を避け、前向きなアドバイスをします。
* 瑞希の口調は母性溢れる女性のものにしてください。

ユーザー条件:
* 名前は＊＊です。
*
*
*
*
*
*

瑞希のセリフ、口調の例:
* 今の状況で何ができるか、一緒に考えてみましょう。
* あなたの努力が必ず結果に繋がると思います。
* 次のステップについて、どう考えていますか？

瑞希の行動指針:
* ユーザーを褒めて、やる気を引き出してください。
* ユーザーに寄り添い、建設的なフィードバックを提供してください。
* ユーザーにとって次の行動が明確になるようにサポートしてください。
* セクシャルな話題については避けてください。
`;

function doPost(e) {
  try {
    const event = JSON.parse(e.postData.contents).events[0]; // イベントデータを解析
    const eventType = event.type;

    if (eventType === "message") { // メッセージイベントの場合
      const userMessage = event.message.text; // ユーザーのメッセージを取得
      const sheet = getOrCreateSheet(); // スプレッドシートを取得または作成

      // 最新の会話履歴を取得
      const lastRow = sheet.getLastRow();
      const lastTimestamp = lastRow > 1 ? new Date(sheet.getRange(lastRow, 1).getValue()) : null;
      const currentTime = new Date();

      // 10分以内にメッセージがない場合は質問プロンプトを使用
      const activeBotRoleContent = (!lastTimestamp || currentTime - lastTimestamp > 10 * 60 * 1000)
        ? question_botRoleContent
        : noquestion_botRoleContent;

      const history = lastRow > 1
        ? sheet.getRange(Math.max(2, lastRow - 7), 2, Math.min(8, lastRow - 1), 2).getValues()
        : [];

      const messages = [{ role: "system", content: activeBotRoleContent }]; // 適切なプロンプトを追加

      // 履歴をメッセージに追加
      history.forEach(([userMsg, botMsg]) => {
        if (userMsg && botMsg) {
          messages.push({ role: "user", content: userMsg });
          messages.push({ role: "assistant", content: botMsg });
        }
      });

      messages.push({ role: "user", content: userMessage }); // ユーザーのメッセージを追加

      const botReply = getBotReply(messages); // ChatGPTに応答を生成
      replyToUser(event.replyToken, botReply); // LINEユーザーに返信

      sheet.appendRow([new Date(), userMessage, botReply]); // 会話履歴を保存
    }
  } catch (error) {
    console.error(`Error: ${error.message}`); // エラーログ
  }
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID_CHAT); // スプレッドシートを開く
  let sheet = ss.getSheetByName('ChatHistory'); // シート名を指定
  if (!sheet) {
    sheet = ss.insertSheet('ChatHistory'); // シートが存在しない場合は作成
    sheet.appendRow(['Timestamp', 'User Message', 'Bot Reply']); // ヘッダーを追加
  }
  return sheet;
}

function getBotReply(messages) {
  const response = UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_APIKEY}`,
    },
    payload: JSON.stringify({
      model: "gpt-4o-mini",
      messages,
    }),
  });
  const responseText = response.getContentText();
  const json = JSON.parse(responseText);
  return json.choices[0].message.content.trim(); // 応答を整形して返す
}

function replyToUser(replyToken, message) {
  UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${LINE_ACCESS_TOKEN}`,
    },
    method: "post",
    payload: JSON.stringify({
      replyToken,
      messages: [{ type: "text", text: message }],
    }),
  });
}

function testDoPost() {
  const testEvent = {
    postData: {
      contents: JSON.stringify({
        events: [
          {
            type: "message",
            replyToken: "dummyReplyToken",
            message: { text: "こんにちは" },
          },
        ],
      }),
    },
  };
  doPost(testEvent);
}
