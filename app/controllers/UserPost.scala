package controllers

import play.api.mvc.{Action, Controller}
import play.api.libs.json.Json._

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
            html.user()
          )

      }.getOrElse(Forbidden)
  }


  def posts = Action {
    Ok(toJson(
      List("Di Huang", "Di Zhu", "Aaron Huang")
    ))
  }
}
