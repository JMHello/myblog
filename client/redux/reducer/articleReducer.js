// 初始状态
const initialState = {
  articleList: [], // 文章列表
  articleDetail: {}, // 文章细节
  currentPage: 1, // 当前页
  total: 0, // 文章总数
  newArticleData: {
    title: '', // 文章标题
    content: '', // 文章内容
    Tag_id: 1, // 文章标签
    Category_id: 1, // 文章类别
    id: '', // 文章ID
    imgSrc: '', // 文章列表要展示的图片地址
    foreword: '' // 文章前言
  }
}

// ation: 表示改变状态的意图
export const actionTypes = {
  GET_ALL_ARTICLES: 'GET_ALL_ARTICLES', // 获取所有文章
  RESPONSE_ALL_ARTICLES: 'RESPONSE_ALL_ARTICLES', // 响应所有文章数据
  GET_ARTICLE_DETAIL: 'GET_ARTICLE_DETAIL', // 获取文章细节
  RESPONSE_ARTICLE_DETAIL: 'RESPONSE_ARTICLE_DETAIL', // 响应文章细节
  GET_IS_OR_NOT_PUBLISHED_ARTICLES: 'GET_IS_OR_NOT_PUBLISHED_ARTICLES', // 获取已发布或者未发布的文章
  RESPONSE_IS_OR_NOT_PUBLISHED_ARTICLES: 'RESPONSE_IS_OR_NOT_PUBLISHED_ARTICLES', // 响应已发布或者未发布的文章
  GET_ISNOTPUBLISHED_ARTICLES: 'GET_ISNOTPUBLISHED_ARTICLES', // 获取取消发布的文章
  RESPONSE_ISNOTPUBLISHED_ARTICLES: 'RESPONSE_ISNOTPUBLISHED_ARTICLES', // 响应取消发布的文章

  // SET_ARTICLE_ID: 'SET_ARTICLE_ID', // 设置文章ID
  POST_SAVE_ARTICLE: 'POST_SAVE_ARTICLE', // 保存文章
  POST_PUBLISH_ARTICLE: 'POST_PUBLISH_ARTICLE', // 发布文章
  POST_CANCEL_ARTICLE: 'POST_CANCEL_ARTICLE', // 取消文章

  PUT_MODIFY_ARTICLE: 'PUT_MODIFY_ARTICLE', // 修改文章

  DELETE_ARTICLE: 'DELETE_ARTICLE', // 删除文章

  UPDATING_TITLE: 'UPDATING_TITLE', // 更新标题
  UPDATING_CONTENT: 'UPDATING_CONTENT', // 更新内容
  UPDATING_TAG: 'UPDATING_TAG', // 更新标签
  UPDATING_Category: 'UPDATING_Category', // 更新类别
  UPDATING_SHOWED_IMG_URL: 'UPDATING_SHOWED_IMG_URL', // 更新文章列表要展示的图片地址
  UPDATING_FOREWORD: 'UPDATING_FOREWORD', // 更新文章前言

}

// action creator：创建action的函数
export const actions = {
  /**
   * @example {
 *    pageNum: paramsObj.pageNum,
      pageSize: paramsObj.pageSize,
      tag: paramsObj.tag,
      category: paramsObj.category
 * }
   * @type {{get_all_articles: actions.get_all_articles, get_article_detail: actions.get_article_detail}}
   */
  get_all_articles: function (paramsObj) {
    return {
      type: actionTypes.GET_ALL_ARTICLES,
      paramsObj
    }
  },
  /**
   * 获取已发布或者未发布的文章
   * @param {Object} paramsObj
   * @example {
   *  pageNum: paramsObj.pageNum,
      pageSize: paramsObj.pageSize,
      isPublished: 1(已发布) 0（未发布）
   * }
   * @return {{type: string, paramsObj: *}}
   */
  get_is_or_not_pubished_articles: function (paramObj) {
    return {
      type: actionTypes.GET_IS_OR_NOT_PUBLISHED_ARTICLES,
      paramObj
    }
  },
  /**
   * 获取文章细节的 action creator
   * @param id
   * @return {{type: string, id: *}}
   */
  get_article_detail: function (id) {
    return {
      type: actionTypes.GET_ARTICLE_DETAIL,
      id
    }
  },
  /**
   * 更新标题
   * @param title
   * @return {{type: string}}
   */
  update_title: function (title) {
    return {
      type: actionTypes.UPDATING_TITLE,
      title
    }
  },
  /**
   * 更新图片地址
   * @param imgSrc
   * @return {{type: string}}
   */
  update_showed_img_url: function (imgSrc) {
    return {
      type: actionTypes.UPDATING_SHOWED_IMG_URL,
      imgSrc
    }
  },
  /**
   * 更新前言
   * @param foreword
   * @return {{type: string}}
   */
  update_foreword: function (foreword) {
    return {
      type: actionTypes.UPDATING_FOREWORD,
      foreword
    }
  },
  /**
   * 更新内容
   * @param content
   * @return {{type: string, content: *}}
   */
  update_content: function (content) {
    return {
      type: actionTypes.UPDATING_CONTENT,
      content
    }
  },
  /**
   * 更新标签
   * @param Tag_id
   * @return {{type: *, tag: *}}
   */
  update_tag:function (Tag_id) {
    return{
      type:actionTypes.UPDATING_TAG,
      Tag_id
    }
  },
  /**
   * 更新类别
   * @param Category_id
   * @return {{type: string, category: *}}
   */
  update_category:function (Category_id) {
    return{
      type:actionTypes.UPDATING_Category,
      Category_id
    }
  },
  /**
   * 保存文章
   * @param data
   * @param csrfToken
   * @example {
   * articleData: {}
   * }
   * @return {{type: string, data: *}}
   */
  save_article: function (postData) {
    return {
      type:actionTypes.POST_SAVE_ARTICLE,
      data: postData
    }
  },
  /**
   * 修改文章
   * @param postData
   * @example {
   * articleData: {}
   * }
   * @return {{type: string, data: *}}
   */
  modify_article: function (pageNum, pageSize, postData) {
    return {
      type:actionTypes.PUT_MODIFY_ARTICLE,
      data: postData,
      pageNum,
      pageSize
    }
  },
  /**
   * 删除文章
   * @param id
   * @param pageNum
   * @param pageSize
   * @return {{type: string, id: *, pageSize: *, pageNum: *}}
   */
  delete_an_article: function (id, pageNum, pageSize) {
    return {
      type:actionTypes.DELETE_ARTICLE,
      id,
      pageNum,
      pageSize
    }
  }
}

/**
 * reducer
 * @param state
 * @param action
 * @return {*}
 */
export function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.RESPONSE_ALL_ARTICLES:
      return {
        articleList: action.data,
        total: action.total
      }
    case actionTypes.RESPONSE_ARTICLE_DETAIL:
      return {
        articleDetail: action.data
      }
    case actionTypes.RESPONSE_IS_OR_NOT_PUBLISHED_ARTICLES:
      return {
        articleList: action.data
      }
    case actionTypes.UPDATING_TITLE:
      return {
        newArticleData: Object.assign({}, state.newArticleData, {
          title: action.title
        })
      }
    case actionTypes.UPDATING_FOREWORD:
      return {
        newArticleData: Object.assign({}, state.newArticleData, {
          foreword: action.foreword
        })
      }
    case actionTypes.UPDATING_SHOWED_IMG_URL:
      return {
        newArticleData: Object.assign({}, state.newArticleData, {
          imgSrc: action.imgSrc
        })
      }
    case actionTypes.UPDATING_CONTENT:
      return {
        newArticleData: Object.assign({}, state.newArticleData, {
          content: action.content
        })
      }
    case actionTypes.UPDATING_TAG:
      return {
        newArticleData: Object.assign({}, state.newArticleData, {
          Tag_id: action.Tag_id
        })
      }
    case actionTypes.UPDATING_Category:
      return {
        newArticleData: Object.assign({},state.newArticleData, {
          Category_id: action.Category_id
        })
      }
    default:
      return state
  }
}
