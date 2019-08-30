import React, { Component } from 'react';
import Socket  from './socket';
import { Badge ,notification } from 'antd'
import styles from './Header.less'
class Websocket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noticeNum: 0,
      
    };
  }
  componentDidMount =()=>{
    let token = localStorage.getItem('Authorization');
    let newToken = token.split(" ");
    console.log(newToken[1])

    let dataArr = [];
    let timer;
    this.socket = new Socket({
      // socketUrl: "ws://101.201.77.210/api/sh-tms/owner/websocket/"+newToken[1],
      socketUrl: "ws://101.201.77.210/api/sh-tms/owner/websocket/"+token,
      // socketUrl: "ws://192.168.1.165/api/sh-tms/owner/websocket/"+newToken[1],
      timeout: 5000,
      socketMessage: (receive) => {
        console.log(receive);
           //后端返回的数据，渲染页面
           let nweData = JSON.parse(receive.data);
           if(nweData.orderNo){
              clearInterval(timer)
              dataArr.push(nweData);
              timer=setInterval(()=>{
                this.setState({
                  noticeNum:dataArr[0].count
                 })
                notification.open({
                    message: '报警通知',
                    description:`订单号：${dataArr[0].orderNo},报警类型：${dataArr[0].alarmType}`,
                    onClick: () => {
                      // this.props.linkToAlarm()
                      },
                    });
                    dataArr.shift();
                    if(dataArr.length<1){
                      clearInterval(timer)
                    }
                  },5000)  
              }else{
                this.setState({
                  noticeNum:nweData.count
                })
              }
            },
      socketClose: (msg) => {
          console.log(msg);
      },
      socketError: () => {
          console.log(this.state.taskStage + '连接建立失败');
      },
      socketOpen: () => {
          console.log('连接建立成功');
          // 心跳机制 定时向后端发数据
          this.taskRemindInterval = setInterval(() => {
              this.socket.sendMessage({ "msgType": 0 })
          }, 30000)
      }
  });
　　　　//　重试创建socket连接
  try {
      this.socket.connection();
  } catch (e) {
      // 捕获异常，防止js error
      // donothing
  }
  }
  render() {
    return (
      <div className={styles.notice} onClick={this.props.linkToAlarm}>
      <Badge count={this.state.noticeNum} ><span style={{paddingRight:'8px'}}>通知</span>
        <a href="#"></a>
      </Badge>
    </div>
    );
  }
}


export default Websocket;
