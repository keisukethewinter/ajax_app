class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")#新しいメモが一番上に表示されるように
  end

  def create
    Post.create(content: params[:content])
    redirect_to ation: :index#メモを保存した後にトップページへリダイレクトされるように追記
  end
end
