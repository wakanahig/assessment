'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て除去する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
  while (element.firstChild) {
    // 子どもの要素があるかぎり除去
    element.removeChild(element.firstChild);
  }
}

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    // 名前が空の時は処理を終了する
    return;
  }

  // 診断結果表示エリアの作成
  removeAllChildren(resultDivided);
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  // ツイートエリアの作成
  removeAllChildren(tweetDivided);
  const anchor = document.createElement('a');
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたのいいところ') +
    '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたのいいところ';
  tweetDivided.appendChild(anchor);

  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};

const answers = [
  '{userName}におすすめなのは肉じゃがです。{userName}の特徴的な声はみなを惹きつけ、心に残ります。',
  '{userName}におすすめなのはカレーです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}におすすめなのはすき家の牛丼です。{userName}の情熱に周りの人は感化されます。',
  '{userName}におすすめなのは松屋の牛丼です。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}におすすめなのは吉野家の牛丼です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}におすすめなのは白米。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}におすすめなのはパンです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}におすすめなのはチャーハンです。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}におすすめなのは王将の餃子です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}におすすめなのは卵かけご飯です。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}におすすめなのはフレンチトーストです。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}におすすめなのは肉じゃがです。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}におすすめなのは肉じゃがです。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}におすすめなのは肉じゃがです。{userName}の配慮が多くの人を救っています。',
  '{userName}におすすめなのは肉じゃがです。ありのままの{userName}自身がいいところなのです。',
  '{userName}におすすめなのは肉じゃがです。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfcharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfcharCode % answers.length;
  let result = answers[index];

  result = result.replace(/{userName}/g, userName);
  return result;
}

// テストコード
console.assert(
  assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
  assessment('太郎') === assessment('太郎'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
