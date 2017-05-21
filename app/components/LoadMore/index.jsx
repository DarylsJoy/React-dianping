import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class LoadMore extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
        <div className="load-more" ref="wrapper">
          {
            this.props.isLoadingMore
            ? <span>加载中...</span>
            : <span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>
          }
        </div>
    )
  }

  loadMoreHandle() {
    this.props.loadMoreFn()
  }

  componentDidMount() {
    const loadMoreFn = this.props.loadMoreFn;
    const wrapper = this.refs.wrapper;
    // 节流处理
    let timeoutId;
    function callback() {
      const top = wrapper.getBoundingClientRect().top;
      const windowHeight = window.screen.height;
      if (top && top < windowHeight) {
        // 当 wrapper 滚到到页面可视范围之内时触发数据加载
        loadMoreFn();
      }
    }

    window.addEventListener('scroll', function () {
      if (this.props.isLoadingMore) {   // 正在加载中，不做处理
        return
      }
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(callback, 50)
    }.bind(this), false)
  }
}

export default LoadMore
