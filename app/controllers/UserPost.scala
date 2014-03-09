package controllers

import play.api.mvc.Controller
import play.api.libs.json.Json._
import play.api.data._
import play.api.data.Forms._
import anorm._

import views.html
import models._


/**
 * User: huangd
 * Date: 3/7/14
 * Time: 6:15 PM
 */

object UserPost extends Controller with Secured {

  def user = isAuthenticated {
    email => _ =>
      User.findByEmail(email).map {
        user =>
          Ok(
            html.user(user)
          )

      }.getOrElse(Forbidden)
  }

  def posts = isAuthenticated {
    email => _ =>
      User.findByEmail(email).map {
        user =>
          Ok(toJson(
            Post.getPosts(email)
          ))
      }.getOrElse(Forbidden)
  }

  def addPost = isAuthenticated {
    email => implicit request =>
      Form("aPost" -> nonEmptyText).bindFromRequest.fold(
        errors => BadRequest,
        content => {
          Post.add(Post(NotAssigned, content), email)
          Ok
        }
      )
  }
}
