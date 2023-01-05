class ExamplesController < ApplicationController
  # Avoid CSRF protection as it makes the reproduction unnecessarily complex
  skip_before_action :verify_authenticity_token

  def instructions
  end

  def page_b
  end

  def page_a
  end

  def redirect_back_to_a
    flash[:redirection_message] = "FLASH_FROM_REDIRECT_ACTION"
    redirect_to '/page_a'
  end

  def set_the_flash
    flash[:the_flash_message] = "THIS_SHOULD_BE_VISIBLE_AFTER_BUTTON_CLICK"
    return head :no_content
  end
end
