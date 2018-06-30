/**
 * CSRF - 跨站伪造请求 【用户登录A网站，A网站确认身份，B网站带着用户身份请求A网站】
 * // ===
 * 1. 危害
   1.1 利用用户登录态：盗取用户资金 （转账/消费）
   1.2 用户不知情：比如冒充用户发帖子
   1.3 完成业务请求：损坏网站名誉
 * 2. 攻击特征 + 防御手段
   2.1 B网站向A网站请求, 带A网站的cookie ==》 samesite
   2.2 绕过A网站前端，直接发送请求给后端 ==》 在前端页面加入验证信息 - 验证码（ccap模块实现） / csrf_token(随机值)
   2.3 referer为B网站 ==》 验证referer
 * === //
 */

/**
 * Cookies
 * // ===
 * 1. 使用特性
   1.1 前端存储数据，可读可写
   1.2 后端通过http头设置：Set-Cookie
   1.3 发送请求时，可以通过http头发送给后端
   1.4 遵守同源策略
 * 2. 代码特性 -- 域名, 有效期, 路径, httpOnly, sameSite, secure
 * 3. 作用
   3.1 存储个性化设置
   3.2 存储未登录时用户的唯一标识
   3.3 存储已登录用户的凭证
   3.4 存储其他业务数据
 * 4. 登录用户凭证
   步骤：前端提交用户名和密码 -> 后端验证用户名和密码 -> 后端通过http头设置用户凭证 -> 后续访问时后端先验证用户凭证
   方式: 用户ID: uid / 用户ID + 签名: uid + sign / sessionId 持久化 / token
 * 5. Cookies 与 XSS的关系:
   XSS可能偷取Cookies：httpOnly防御
 * 6. Cookies 与 CSRF的关系
   6.1 CSRF利用了用户Cookies
   6.2 攻击站点无法读写Cookies
   6.3 最好能阻止第三方使用Cookies
 * 7. 安全策略
   7.1 签名防篡改
   7.2 私有变换(加密)
   7.3 httpOnly / sameSite / secure
 * === //
 */

const crypt = require("./crypt")
const jsonwebtoken = require("jsonwebtoken")
const config = require("../../config")

exports.userAuth =  async function (ctx) {
  try {
    // referer验证
    // await _refererAuth(ctx)

    // csrf token验证
    await _csrfAuth(ctx)

    // 登录验证
    await _accessAuth(ctx)

  } catch (err) {
    let code = err.status || err.statusCode || 500
    let msg = err.message
    if (/TokenExpiredError|JsonWebTokenError/.test(err.name)) {
      code = 401
    }
    ctx.throw(code, msg)
  }
}

exports.csrfAuth = async function (ctx, next) {
  _csrfAuth(ctx)
}

exports.refererAuth =  async function (ctx) {
  _refererAuth(ctx)
}

/**
 * csrf token 验证
 * @param ctx
 * @private
 */
function _csrfAuth (ctx) {
  // 获取用户传来的csrf token
  const csrfToken = ctx.request.body.csrfToken || ctx.query.csrfToken || ctx.headers['x-csrf-token']
  
  // 获取cookie中存储的csrf token
  const c_csrfToken = ctx.cookies.get('CSRF_TOKEN')

  // csrfToken不存在 或者 c_csrfToken不存在 或者 csrfToken与c_csrfToken不想等，则抛出错误
  if (!csrfToken || !c_csrfToken || csrfToken !== c_csrfToken) {
    ctx.throw(403, 'FORBIDDEN: NO CSRF_TOKEN')
  }
}

/**
 * referer验证
 * @param ctx
 * @private
 */
function _refererAuth (ctx) {
  // referer 验证
  if (!/^https?:\/\/127\.0\.0\.1:8080/.test(ctx.headers['referer'])) {
    ctx.throw(403, 'FORBIDDEN: REFERER WRONG')
  }
}

/**
 * 登录验证
 * @param ctx
 * @private
 */
function _accessAuth (ctx) {
  // 获取 access token 的渠道：query/body/x-access-token
  // const accessToken = ctx.request.body.accessToken || ctx.query.accessToken || ctx.headers['x-access-token']
  let accessToken = ctx.headers['authorization'] ? ctx.headers['authorization'].split(' ')[1] : ''

  // 解码access token
  let d_accessToken = jsonwebtoken.verify(accessToken, config.auth.CMS_ACCESS_TOKEN)

  if (!(d_accessToken && d_accessToken.exp * 1000 > Date.now())) {
    ctx.throw(401, 'jwt is expired')
  }

  // 获取 cookie USER_SIGN
  const userSign = ctx.cookies.get('USER_SIGN')

  // 解码 cookie USER_SIGN，获取用户id
  const d_id = parseInt(crypt.decrypt(userSign))
  if (!accessToken || !d_accessToken || d_accessToken.id !== d_id) {
    ctx.throw(401, 'UNAUTHORIZED: NO ACCESS AUTHRIZATION')
  }
}