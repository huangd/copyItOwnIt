package models

import anorm._
import anorm.SqlParser._
import play.api.db.DB
import play.api.Play.current
import org.apache.commons.codec.digest.DigestUtils
import java.util.Date
import java.text.SimpleDateFormat
import play.api.libs.json._

/**
 * User: huangd
 * Date: 3/8/14
 * Time: 3:21 PM
 */

case class Post(id: Pk[String], content: String)

object Post {

  implicit val writes = new Writes[Post] {
    def writes(post: Post): JsValue = {
      Json.obj(
        "id" -> post.id.toString,
        "content" -> post.content
      )
    }
  }

  /**
   * Parse a Post from ResultSet
   */
  val simple = {
    get[Pk[String]]("post.id") ~
      get[String]("post.content") map {
      case id ~ content => Post(id, content)
    }
  }


  /**
   * Get a list of Post given a user's email
   * @param email
   * @return
   */
  def getPosts(email: String): List[Post] = {
    DB.withTransaction {
      implicit connection =>
        SQL(
          """
            select POST.id, POST.content
            from POST, POST_USER
            where POST.id = POST_USER.post_id
            and POST_USER.user_email = {email}
            order by POST.create_date desc
          """
        ).on(
          'email -> email
        )().map(row =>
          Post(row[Pk[String]]("id"), row[String]("content"))
        ).toList
    }
  }

  /**
   * Add a post
   */
  def add(post: Post, email: String): Post = {
    DB.withTransaction {
      implicit connection =>
      // Get the post id
        val id: String = post.id.getOrElse {
          DigestUtils.md5Hex(post.content)
        }

        val currentTime: String = getCurrentMySqlDateTime()
        // Insert the post
        SQL(
          """
            insert into POST (id, content, create_date) values (
              {id}, {content}, {create_date}
            )
          """
        ).on(
          'id -> id,
          'content -> post.content,
          'create_date -> currentTime
        ).executeUpdate()

        // Link post to user
        linkPostToUser(id, email)

        //return added post
        post.copy(id = Id(id))
    }
  }

  /**
   * Add entry to POST_USER table
   * @param postId post id
   * @param email user id which is user's email
   */
  private def linkPostToUser(postId: String, email: String) {
    DB.withTransaction {
      implicit connection =>
      // Insert to POST_USER
        SQL(
          """
            insert into POST_USER (post_id, user_email) values (
              {postId}, {email}
            )
          """
        ).on(
          'postId -> postId,
          'email -> email
        ).executeUpdate()
    }
  }

  private def getCurrentMySqlDateTime(): String = {
    val date: Date = new java.util.Date()
    val simpleDateFormat: SimpleDateFormat = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
    simpleDateFormat.format(date)
  }
}
