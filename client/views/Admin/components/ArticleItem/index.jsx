import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import style from './style.css'

import { actions as ArticleReducer }  from '../../../../redux/reducer/articleReducer'

const { delete_an_article } = ArticleReducer

class ArticleItem extends Component {
  constructor (props) {
    super(props)
  }

  /**
   * 删除文章
   * @param id
   */
  deleteAnArticle (id) {
    this.props.delete_an_article(id)
  }

  render () {
    const { title, foreword } = this.props.data
    return (
      <div className={ style['article-item']} >
        <div className={ style['article-ti'] }>
          { title }
        </div>
        <div className={ style['visit-total'] }>
          访问数
        </div>
        <div className={ style['comment-total'] }>
          评论数
        </div>
        <div className={ style['article-opt'] }>
          <button type="button" className={ style.btn }>查看</button>
          <button type="button" className={ style.btn }>修改</button>
          <button type="button" className={ style.btn }>删除</button>
          <button type="button" className={ style.btn }>发表</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const {articleList, total} = state.articles
  return {
    articleList,
    total
  }
}

function mapDispatchToProps (dispatch) {
  return {
    delete_an_article: bindActionCreators(delete_an_article, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleItem)