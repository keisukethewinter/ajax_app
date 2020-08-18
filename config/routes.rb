Rails.application.routes.draw do
  root to: 'posts#index'
  post 'posts', to: 'posts#create'
  #  For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # get 'posts', to: 'posts#checked'#queryパラメータで記述。既読機能に必要なパラメーターは、「どのメモを既読したか」を判別するためのメモのidです。
                                    #メモのidを取得できるようにルーティングに設定します。
                                    # queryパラメーターを使用すると、/posts/?id=1とリクエストを行うと、params[:id]としてパラメーターを取得することができます。
  get 'posts/:id', to:'posts#checked'#pathパラメータで記述。今回のように、postのidであれば'posts/:id'のように記載するpathパラメーターの方が認識もしやすく、記述も単純です。
end
