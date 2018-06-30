import React, { Component, createElement } from 'react'
import ReactAddonsPureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'

import Pagination from '../pagination'

import style from './index.css'

class Table extends Component {
  constructor (props) {
    super(props)

    this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate

    this.setBodyTd = this.setBodyTd.bind(this)
  }

  static defaultProps = {
    columns: [],
    dataSource: [],
    pagination: {}
  }

  static propTypes = {
    columns: PropTypes.array,
    dataSource: PropTypes.array,
    pagination: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object
    ]),
  }

  /**
   * 设置表头
   * columns 的值
   * @example {
   *  title: '', // 表头的名称
   *  key: '' // 表头对应内容的关键字
   * }
   * @return {XML}
   */
  setHeader () {
    const { columns } = this.props

    return (
      <div className={ style['table-header'] }>
        <div className={ `${style['header-tr']} ${ style['tr'] }` }>
          {
            columns.map((item, i) => {
              return (
                <div className={ style['th'] } key={ item.key }><span>{ item.title }</span></div>
              )
            })
          }
        </div>
      </div>
    )
  }

  /**
   * 设置表格内容
   * 1、先创建行
   * 2、再创建列
   * @return {XML}
   */
  setBody () {
    const { dataSource } = this.props

    return (
      <div className={ style['table-body'] }>
        {
          dataSource.length > 0 ?
            dataSource.map((item, i) => {
              return (
                <div className={ `${ style['body-tr'] } ${style['tr']}` } key={item.key}>
                  { this.setBodyTd(item, i) }
                </div>
              )
            })
             :
            <div className={ style['none'] }>暂无数据</div>
        }
      </div>
    )
  }

  setBodyTd (data, index) {
    const { columns } = this.props

    const bodyTdContent = (render) => {
      return (
        <span>{ render }</span>
      )
    }

    return columns.map((item) => {
      return (
        <div className={ style['td'] } key={`${ item.key }_${ index }`}>
          {
            item.render ?
              bodyTdContent(item.render(data, index)) :
              data[item.key]
          }
        </div>
      )
    })
  }

  render () {
    const { pagination } = this.props

    return (
      <div>
        <div className={ style['table'] }>
          { this.setHeader() }
          { this.setBody() }
        </div>
        {
          pagination == false ?
            '' :
            <Pagination config={ pagination }/>
        }
      </div>
    )
  }
}

export default Table