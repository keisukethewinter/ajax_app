class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")#新しいメモが一番上に表示されるように
  end

  def create
    post = Post.create(content: params[:content],checked: false)
    render json: {post: post}
    #既読や未読の情報を追加したため「メモ作成時に「未読」という情報を保存するようにしたこと」と、Ajaxを実現するため「レスポンスをJSONに変更したこと」
  end

  def checked #checkedアクションは、「既読」の操作を行ったときに実行されるアクションです。

    post = Post.find(params[:id])#先ほど設定したURLパラメーターから、既読したメモのidが渡されるように設定するので、そのidを使用して該当するレコードを取得しています。
    if post.checked #checkedはカラム名。if文で、post.checkedという既読したか否かを判定するプロパティを指定し、既読していれば「既読を解除するためにfalseへ変更」し、既読していなければ「既読にするためtrueへ変更」します。
      post.update(checked: false)#この時はupdateというActiveRecordのメソッドを使用して更新しています。
    else
      post.update(checked: true)
    end

    item = Post.find(params[:id])#更新したレコードをitem = Post.find(params[:id])で取得し直す
    render json: { post: item }#JSON形式（データ）としてchecked.jsに返却しています。
  end
end
