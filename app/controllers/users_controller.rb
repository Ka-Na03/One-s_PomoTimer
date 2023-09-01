class UsersController < ApplicationController
  def create
    @user = User.new(user_name: params[:user_name], email: params[:email], password: params[:password])
    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path, notice: "サインアップしました"
    else
      flash.now[:alert] = "サインアップできませんでした"
      render :new
    end
  end

  def show
    @user = User.find(session[:user_id])
  end
end
