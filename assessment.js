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
    encodeURIComponent('あなたにおすすめの夕飯') +
    '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたにおすすめの夕飯';
  tweetDivided.appendChild(anchor);

  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};

const answers = [
  '{userName}におすすめなのは肉じゃがです。ジャガイモはお腹にたまるのでおすすめ。',
  '{userName}におすすめなのはカレーです。{userName}は無印に寄って帰りましょう。',
  '{userName}におすすめなのはすき家の牛丼です。{userName}はすき家は好きですか？。',
  '{userName}におすすめなのは松屋の牛丼です。{userName}は松屋派ですか？すき家派ですか？',
  '{userName}におすすめなのは吉野家の牛丼です。今元気が足りていない{userName}には肉が必要です。',
  '{userName}におすすめなのは白米。{userName}さんなら白米に何を乗せて食べますか？',
  '{userName}におすすめなのはパンです。{userName}の好きなパンはなんですか？',
  '{userName}におすすめなのはチャーハンです。卵にご飯を混ぜて焼くだけで作れますよ。',
  '{userName}におすすめなのは王将の餃子です。{userName}は大阪出身ですか？大阪王将と餃子の王将は間違えないでくださいね！',
  '{userName}におすすめなのは卵かけご飯です。{userName}は卵かけご飯に何をかけますか？',
  '{userName}におすすめなのはフレンチトーストです。{userName}の心に余裕があるなら、1時間卵液につけてから焼くことをお勧めします！',
  '{userName}におすすめなのは豚汁です。{userName}は豚汁に何を合わせますか？白米？。',
  '{userName}におすすめなのはおかゆです。忙しい{userName}にお勧め。米にお湯入れて煮立てれば完成です！',
  '{userName}におすすめなのは麻婆豆腐。{userName}は辛い食べ物はお好みですか？。',
  '{userName}におすすめなのはラーメン。チェーン店のラーメンも意外と美味しいですよ。',
  '{userName}におすすめなのは唐揚げです。スーパーで買って帰りましょう。'
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
