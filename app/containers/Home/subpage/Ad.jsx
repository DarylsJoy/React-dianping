import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import HomeAd from '../../../components/HomeAd/index'
import {getAdData} from '../../../fetch/home/home'

class Ad extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      data: []
    }
  }

  render() {
    return (
        <div>
          {
            this.state.data.length
            ? <HomeAd data={this.state.data}/>
            : <div>加载中...</div>
          }
        </div>
    )
  }

  componentDidMount() {
    // fetch获取数据
    const result = getAdData();
    result.then((res) => {
      return res.json()
    }).then((json) => {
      const data = json;
      if (data.length) {
        this.setState({
          data: data
        })
      }
    })
  }
}

export default Ad