import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import HomeHeader from '../../components/HomeHeader'  // 头部
import Category from '../../components/Category'    // 轮播图
import Ad from './subpage/Ad'   // 超值特惠
import List from './subpage/List'   // 猜你喜欢

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
        <div>
          <HomeHeader cityName={this.props.userinfo.cityName}/>
          <Category/>
          <Ad/>
          <List cityName={this.props.userinfo.cityName}/>
        </div>
    )
  }
}



function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}
function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
