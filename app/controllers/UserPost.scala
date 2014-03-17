package controllers

import play.api.mvc.Controller
import play.api.libs.json.Json._
import play.api.data._
import play.api.data.Forms._
import anorm._

import views.html
import models._
import org.apache.commons.codec.digest.DigestUtils


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
          Ok(toJson(obj(
            "id" -> DigestUtils.md5Hex(content),
            "content" -> content)
          ))
        }
      )
  }

  /**
   * delete a post
   * @return
   */
  def deletePost = isAuthenticated {
    email => implicit request =>
      request.body.asJson.map {
        json =>
          (json \ "postId").asOpt[String].map {
            postId =>
              Post.delete(postId, email)
              Ok(postId)
          }.getOrElse {
            BadRequest("Missing parameter [name]")
          }
      }.getOrElse {
        BadRequest("Expecting Json data")
      }
  }
}
