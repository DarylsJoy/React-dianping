import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getListData} from '../../../fetch/home/home'
import ListComponent from '../../../components/List/index'
import LoadMore from '../../../components/LoadMore/index'
import './style.less'

class List extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      data: [],   // 存储数据
      hasMore: false,   // 是否有更多数据
      isLoadingMore: false,    // 是否正在加载
      page: 1    // 下一页页码，初始首页为0
    }
  }

  render() {
    return (
        <div className="List">
          <h2 className="home-list-title">猜你喜欢</h2>
          {
            this.state.data.length
            ? <ListComponent data={this.state.data}/>
            : <div>加载中...</div>
          }
          {
            this.state.hasMore
            ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
            : ''
          }
        </div>
    )
  }

  componentDidMount() {
    this.loadFirstPageData()
  }

  // 获取首页数据
  loadFirstPageData() {
    const cityName = this.props.cityName;
    const result = getListData(cityName, 0);
    this.resultHandle(result)
  }

  // 加载更多
  loadMoreData() {
    // 记录状态
    this.setState({
      isLoadingMore: true    // 按钮变为加载中..。
    });
    const cityName = this.props.cityName;
    const page = this.state.page;   // 下一页页码
    const result = getListData(cityName, page);
    this.resultHandle(result)

    this.setState({
      isLoadingMore: false,
      page: page + 1
    })
  }

  // 数据处理
  resultHandle(result) {
    result.then((res) => {
      return res.json()
    }).then((json) => {
      const hasMore = json.hasMore;
      const data = json.data;
      // 存储
      this.setState({
        data: this.state.data.concat(data),
        hasMore: hasMore
      })
    })
  }
}

export default List
