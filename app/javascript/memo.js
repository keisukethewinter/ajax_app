function memo(){ //memoという関数を定義
  const  submit = document.getElementById("submit");//idがありますのでgetElementByIdで取得しましょう。
  submit.addEventListener("click",(e) => {//(e)はeventのe
    const formData = new FormData(document.getElementById("form"));//引数のフォームに入力された値を取得
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);//GETというのはブラウザ⬅︎サーバーにデータを取得（少量ならURLに記述する事で送信も可）、POSTというのは逆にサーバーへデータを送ることであるとされています
    //'/postsURL'をサーバからロード
    XHR.responseType ="json";//省略すると"text"
    XHR.send(formData);
    XHR.onload = () =>{ //onload・・・リクエストが完了した時
      const item = XHR.response.post; //レスポンスとして返却されたメモのレコードデータを取得しています。
      const list = document.getElementById("list");
      const formText = document.getElementById("content");//formTextを取得する理由は、「メモの入力フォーム」をリセットするため(index.htmlにもid: contentを追加)
      const HTML =  //HTMLという変数を描画するような処理を行えば、ここで定義したHTMLが描画されるわけです。
        `<div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
        list.insertAdjacentHTML("afterend",HTML);//指定したHTMLなどを、特定の要素(第一引数)に描画できるメソッド

        formText.value = "";

        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
        }else{
         return null;
        }
    };
    XHR.onerror = function(){
      alert("Request failed");
    };
    e.preventDefault();
  })
}
window.addEventListener("load",memo); //window（ページ）をload（読み込んだ時）に実行