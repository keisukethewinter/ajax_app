function check(){//checkという名前で関数を定義。DOMの取得からエンドポイントへのリクエストなどは、すべてこのcheck関数へ記述することにします。
  const posts = document.getElementsByClassName("post");//投稿のDOMを取得//postをクラス名にもつ要素を全て取得しpostsに代入(HTMLcollectionnの形式)。
  postA = Array.from(posts);//Array.fromメソッドを使用して、HTMLcollectionを配列へ変換。これでforEach文が使える

  postA.forEach(function (post){//forEachメソッドを使用して、繰り返し処理を記述します。postsAは配列に変換されているため、先ほどのようなエラーは出現しません。
    if (post.getAttribute("data-load") != null){
      return null;
    }//1度でも読み込んでいればpost.setAttribute("data-load", "true");を実行しdata-loadという要素を追加しています。
    post.setAttribute("data-load","true");//2回目以降はdata-loadがnullではないもの、すなわち読み込まれたことのある投稿の場合には、処理を中断させる記述をします。
    post.addEventListener("click", (e) =>{//引数にclickの指定をする事でクリックした時の動作を設定 => はfunctionの代わり ////これで、「要素を1つずつに対して、『クリック』」した際に動作するイベント駆動」を設定することができました。
      console.log("OK!!");
      const postId = post.getAttribute("data-id");//どの投稿をクリックしたのか、カスタムデータを利用して取得している//post要素のdata-id属性の値を取得。このidは後ほど、URLパラメーターでサーバーにパラメーターとして送ります
      const XHR = new XMLHttpRequest();//エンドポイントを呼び出すために、XMLHttpRequestを使用してHTTPリクエストを行います。まず、これで変数XHRから、XMLHttpRequestのメソッドを使用できるようになります。
      XHR.open("GET",`/posts/${postId}`,true);//openは、XMLHttpRequestで定義されている初期化を行うメソッド。第一引数にはHTTPメソッド、第二引数にはパス、第三引数には非同期通信であるかをbooleanで記述します。
      XHR.responseType = "json";//responseTypeとは、XMLHttpRequestで定義されているメソッドで、レスポンスの形式を指定するメソッドですHTMLではなくJSON形式でクライアントにレスポンスするための記述。
      XHR.send();//sendとは、XMLHttpRequestで定義されているメソッドで、sendメソッドを記述する事で初めてリクエストを送信することができます。openメソッドで非同期通信をtrueにしている場合は、すぐにレスポンスが返却されます。引数の指定はとくに必要ありません
      XHR.onload = () => { //リクエストが完了した時
        const item = XHR.response.post;//XHR.responseでレスポンスされてきたJSONにアクセスできます。controllerのcheckアクションで返却したitemもXHR.response.postで取得。
        if (item.checked === true){
          post.setAttribute("data-check","true");//既読であれば灰色に変わるCSSを適用するために先ほどHTMLに定義した属性であるdata-check="true"をセットします。
       }else if (item.checked === false){
         post.removeAttribute("data-check");//逆に未読であればdata-checkは属性ごと削除する記述。
       }//これでレスポンスに対応する記述が完了しました。
       if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);//// レスポンスのHTTPステータス(200かどうか)を解析し、該当するエラーメッセージをアラートで表示するようにしている
        } else {
          return null;
        } 
      };//しかし、checkedアクションの処理が正常ではない場合に正常にデータが返却されず、エラーとして返却されることがあります。したがって、レスポンスが正常なのかエラーなのか、どちらも想定して処理を記述する必要があります。
      XHR.onerror = () => { //onerrorを使用して、リクエストが失敗してJSONが受信できなかった場合にはアラートを表示する処理を記述
        alert("Request failed");
      };
    e.preventDefault();//// イベントをキャンセルして、処理が重複しないようにしている
  });
  });
};

setInterval(check, 1000);//第一引数に実行する関数を指定し、第二引数に時間（ミリ秒）を指定
//window.addEventListener("load",check);//window（ページ）をload（読み込んだ時）に実行するようにします。
