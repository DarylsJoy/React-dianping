import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getInfoData} from '../../../fetch/detail/detai'
import DetailInfo from '../../../components/DetailInfo'

class Info extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      info: ''
    }
  }

  render() {
    return (
        <div>
          {
            this.state.info
            ? <DetailInfo data={this.state.info}/>
            : ''
          }
        </div>
    )
  }

  componentDidMount() {
    // 凭借商品ID fetch获取信息
    let id = this.props.id;
    let result = getInfoData(id);
    result.then((res) => {
      return res.json()
    }).then((json) => {
      this.setState({
        info: json
      })
    })
  }
}

export default Info