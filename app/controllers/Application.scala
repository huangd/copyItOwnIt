package controllers

import play.api.mvc._
import play.api.data._
import play.api.data.Forms._

import models._
import views._

object Application extends Controller {

  def index = Action {
    Ok(html.index())
  }

  val loginForm = Form(
    tuple(
      "email" -> text,
      "password" -> text
    ) verifying("Invalid email or password", result => result match {
      case (email, password) => User.authenticate(email, password).isDefined
    })
  )

  /**
   * Logout and clean the session
   * @return
   */
  def login = Action {
    implicit request =>
      Ok(html.login(loginForm));
  }

  def logout = Action {
    Redirect(routes.Application.login).withNewSession.flashing(
      "success" -> "You've been logged out"
    )
  }

  /**
   * Handle login from submission
   */
  def authenticate = Action {
    implicit request =>
      loginForm.bindFromRequest.fold(
        formWithErrors => BadRequest(html.login(formWithErrors)),
        user => Redirect(routes.UserPost.user).withSession("email" -> user._1)
      )
  }
}

trait Secured {

  /**
   * Retrive the connected user email
   * @param request
   * @return
   */
  private def username(request: RequestHeader) = request.session.get("email")

  /**
   * Redirect to login if the user is not authorized
   * @param request
   * @return
   */
  private def onUnauthorized(request: RequestHeader) = Results.Redirect(routes.Application.login)

  /**
   * Action for authenticated users
   * @param f
   * @return
   */
  def isAuthenticated(f: => String => Request[AnyContent] => Result) = Security.Authenticated(username, onUnauthorized) {
    user =>
      Action(request => f(user)(request))
  }
}