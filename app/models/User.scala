package models

import play.api.db._
import play.api.Play.current

import anorm._
import anorm.SqlParser._

/**
 * User: huangd
 * Date: 3/6/14
 * Time: 8:30 PM
 */

case class User(email: String, name: String, password: String)

object User {

  /**
   * Parse a User from a ResultSet
   */
  val simple = {
    get[String]("user.email") ~
      get[String]("user.name") ~
      get[String]("user.password") map {
      case email ~ name ~ password => User(email, name, password)
    }
  }

  /**
   * Retrieve a User from email
   * @param email
   * @return
   */
  def findByEmail(email: String): Option[User] = {
    DB.withConnection {
      implicit connection =>
        SQL("select * from USER where email = {email}").on(
          'email -> email
        ).as(User.simple.singleOpt)
    }
  }

  /**
   * Authenticate a User
   * @param email
   * @param password
   * @return
   */
  def authenticate(email: String, password: String): Option[User] = {
    DB.withConnection {
      implicit connection =>
        SQL(
          """
          select * from USER where
          email = {email} and password = {password}
          """
        ).on(
          'email -> email,
          'password -> password
        ).as(User.simple.singleOpt)
    }
  }

}
