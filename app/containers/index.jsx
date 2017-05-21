import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import LocalStore from '../util/localStore'
import {CITYNAME} from '../config/localStoreKey'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as userInfoActionsFromOtherFile from '../actions/userinfo'

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      initDone: false
    }
  }
  render() {
    return (
        <div>
          {
            this.state.initDone
            ? this.props.children
            : <div>加载中...</div>
          }
        </div>
    )
  }
  componentDidMount() {
    // localStorage 获取城市
    let cityName = LocalStore.getItem(CITYNAME);
    if (cityName == null) {
      cityName = '北京'
    }

    // 将城市信息存储到 Redux
    this.props.userInfoActions.update({
      cityName: cityName
    })

    this.setState({
      initDone: true
    })
  }
}

function mapStateToProps(state) {
  return {}
}
function mapDispatchToProps(dispatch) {
  return {
    userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
