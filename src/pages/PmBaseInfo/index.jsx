import React, { Component } from 'react';
import { withRouter } from 'umi';
import { connect } from 'dva';
import { Input , DatePicker, Row, Col, Button,Tag,message  } from 'antd';
import { ExtTable, ExtIcon, ComboList, Space,utils, YearPicker } from 'suid';
import { constants,exportXlsx } from '@/utils';
import EditModal from './EditModal';
import ReportEditModal from './ReportEditModal';

import styles from './index.less'
import logo1 from '../../../static/proj-one.png'
import logo2 from '../../../static/proj-two.png'
import logo3 from '../../../static/proj-three.png'
import logo4 from '../../../static/proj-four.png'
import logo5 from '../../../static/proj-five.png'
import logo6 from '../../../static/proj-six.png'
import logo7 from '../../../static/proj-seven.png'
import logo8 from '../../../static/proj-eight.png'
import logo10 from '../../../static/proj-ten.png'

const { PROJECT_PATH } = constants;
const { request } = utils;
@withRouter
@connect(({ pmBaseInfo, loading }) => ({ pmBaseInfo, loading }))
class PmBaseInfo extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    dispatch({
      type: 'pmBaseInfo/getProjectInfo',
      payload:{
        filters:[
          {
            fieldName: 'year',
            operator: 'EQ',
            fieldType: 'String',
            value: new Date().getFullYear(),
          }
        ]
      }
    }).then(res => {
      const { data } = res
      if(res.success){
        this.setState({
          notStartedNum: data.notStartedNum,
          processingNum: data.processingNum,
          finishNum: data.finishNum,
          pauseNum: data.pauseNum,
          sumNum: data.sumNum,
          advanceFinishNum: data.advanceFinishNum,
          preOverTimeNum:data.preOverTimeNum,
          advanceDay:data.advanceDay,
          overTimeDay:data.overTimeDay,
          overTimeNum: data.overTimeNum,
        })
      }
    })

    dispatch({
      type: 'pmBaseInfo/getChildrenNodes',
      payload:{}
    }).then(res => {
      const { data } = res;
      for(let item of data){
        if(item.nodeLevel === 3 || item.name === '系统运维管理部'){
          this.state.orgnameList.push({code:item.code,name:item.name,extorgname:item.extorgname})
        }
      }
    })

  }
static  projectMasterFilter=null;
static memberFilter = null;
static orgnameFilter=null;
static projTypeFilter = null;
  state = {
    year: null,
    orgnameList: [],
    notStartedNum: 0,
    processingNum: 0,
    finishNum: 0,
    pauseNum: 0,
    sumNum: 0,
    advanceFinishNum: 0,
    preOverTimeNum:0,
    advanceDay:0,
    overTimeDay:0,
    overTimeNum: 0,
    delId: null,
    fliterCondition: null,
    nameFilter: null,
   // orgnameFilter: null,
    currentPeriodFilter: null,
   // projectMasterFilter: null,
    dateFilter:null,
    dateYearFilter: null,
    projTypeList: [
      {
        name: 'KPI项目',
        code: 0,
      },
      {
        name: '年度重点项目',
        code: 1,
      },{
        name: '其他项目',
        code: 2,
      },
    ],
    status:[{
      code: 0,
      name: '未结案',
    },
    {
      code: 1,
      name: '项目结案',
    }]
  };
  //组织变更
    //orgChange=item=>{
   // this.orgnameFilter=item;
    // const tableFilters = this.getTableFilters();
    // const { dispatch } = this.props;
    // debugger;
    // dispatch({
    //   type: 'pmBaseInfo/getProjectInfo',
    //   payload:{
    //     filters: tableFilters
    //   }
    // }).then(res => {
    //   const { data } = res
    //   if(res.success){
    //     this.setState({
    //       notStartedNum: data.notStartedNum,
    //       processingNum: data.processingNum,
    //       sumNum: data.sumNum,
    //       advanceFinishNum: data.advanceFinishNum,
    //       preOverTimeNum:data.preOverTimeNum,
    //       advanceDay:data.advanceDay,
    //       overTimeDay:data.overTimeDay,
    //       overTimeNum: data.overTimeNum,
    //     })
    //   }
    // })
 // };
  //主导人变更
  //leaderChange=item=>{
   // this.setState({ projectMasterFilter: item })  ;
  // this.projectMasterFilter=item;
    // const tableFilters = this.getTableFilters();
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'pmBaseInfo/getProjectInfo',
    //   payload:{
    //     filters: tableFilters
    //   }
    // }).then(res => {
    //   const { data } = res
    //   if(res.success){
    //     debugger;
    //     this.setState({
    //       notStartedNum: data.notStartedNum,
    //       processingNum: data.processingNum,
    //       sumNum: data.sumNum,
    //       advanceFinishNum: data.advanceFinishNum,
    //       preOverTimeNum:data.preOverTimeNum,
    //       advanceDay:data.advanceDay,
    //       overTimeDay:data.overTimeDay,
    //       overTimeNum: data.overTimeNum,
    //     })
    //   }
    // })
 // };
  // 钩子函数
  componentDidMount = () => {
    this.setState({
      year: new Date().getFullYear(),
      dateYearFilter: new Date().getFullYear(),
    });
  }

  onDateChange = data => {
    if(data){
      const date = data.format('YYYY-MM-DD');
      this.setState({
        dateFilter: date,
      });
    }else{
      this.setState({
        dateFilter: null,
    });
   }
  };

  dispatchAction = ({ type, payload }) => {
    const { dispatch } = this.props;

    return dispatch({
      type,
      payload,
    });
  };

  refresh = () => {
    if (this.tableRef) {
      this.tableRef.remoteDataRefresh();
    }
  };

  getTableFilters = () => {
    const { nameFilter, currentPeriodFilter, dateFilter, dateYearFilter } = this.state;
   // const{projectMasterFilter}=this.projectMasterFilter;
    const filters = [];
    if (nameFilter !== null) {
      filters.push({
        fieldName: 'sysName',
        operator: 'LK',
        fieldType: 'string',
        value: nameFilter,
      });
    }
    if (currentPeriodFilter) {
      if(currentPeriodFilter === '未结案'){
        filters.push({
          fieldName: 'currentPeriod',
          operator: 'NE',
          fieldType: 'string',
          value: '项目结案',
        });
      }else{
        filters.push({
          fieldName: 'currentPeriod',
          operator: 'LK',
          fieldType: 'string',
          value: currentPeriodFilter,
        });
      }
    }
    if (this.orgnameFilter) {
      filters.push({
        fieldName: 'orgname',
        operator: 'LK',
        fieldType: 'string',
        value: this.orgnameFilter,
      });
    }
    if (this.projTypeFilter != null) {
      filters.push({
        fieldName: 'projectTypes',
        operator: 'EQ',
        fieldType: 'string',
        value: this.projTypeFilter,
      });
    }
    if (this.projectMasterFilter) {
      filters.push({
        fieldName: 'leader',
        operator: 'LK',
        fieldType: 'string',
        value: this.projectMasterFilter,
      });
    }
    if(this.memberFilter){
      filters.push({
        fieldName: 'member',
        operator: 'LK',
        fieldType: 'string',
        value: this.memberFilter,
      });
    }
    if (dateFilter) {
      filters.push({
        fieldName: 'startDate',
        operator: 'GE',
        fieldType: 'date',
        value: dateFilter,
      });
    }
    if (dateYearFilter) {
      filters.push({
        fieldName: 'year',
        operator: 'EQ',
        fieldType: 'String',
        value: dateYearFilter,
      });
    }
    return filters;
  };

  /** 新建项目 */
  openModal = (row,disable) =>{
    this.dispatchAction({
      type: 'pmBaseInfo/updateState',
      payload: {
        modalVisible: true,
        editData: row,
        // disable: disable,
      },
    });
  }

  /** 打开项目进度汇报 */
  openReportModal = () =>{
    this.dispatchAction({
      type: 'pmBaseInfo/updateState',
      payload: {
        reportModalVisible: true,
      },
    });
  }

  handleEvent = (type, row) => {
    switch (type) {
      case 'add':
      case 'edit':
        this.dispatchAction({
          type: 'pmBaseInfo/updateState',
          payload: {
            modalVisible: true,
            editData: row,
          },
        });
        break;
      case 'del':
        this.setState(
          {
            delId: row.id,
          },
          () => {
            this.dispatchAction({
              type: 'pmBaseInfo/del',
              payload: {
                id: row.id,
              },
            }).then(res => {
              if (res.success) {
                this.setState(
                  {
                    delId: null,
                  },
                  () => this.refresh(),
                );
              }
            });
          },
        );
        break;
      default:
        break;
    }
  };

  handleSync = data => {
    this.dispatchAction({
      type: 'pmBaseInfo/syncProjectInfo',
      payload: data,
    }).then(res => {
      if (res.success) {
        this.dispatchAction({
          type: 'pmBaseInfo/updateState',
          payload: {
            modalVisible: false,
          },
        });
        this.refresh();
      }
    });
  };

  handleClose = () => {
    this.dispatchAction({
      type: 'pmBaseInfo/updateState',
      payload: {
        modalVisible: false,
        newProjCode: null,
      },
    });
    this.reloadData()
  };

  handleModalClose = () => {
    this.dispatchAction({
      type: 'pmBaseInfo/updateState',
      payload: {
        reportModalVisible: false,
      },
    });
  };

  renderDelBtn = row => {
    const { loading } = this.props;
    const { delId } = this.state;
    if (loading.effects['pmBaseInfo/del'] && delId === row.id) {
      return <ExtIcon status="error" tooltip={{ title: '删除' }} type="loading" antd />;
    }
    return <ExtIcon status="error" tooltip={{ title: '删除' }} type="delete" antd />;
  };

  getExtableProps = () => {
    const columns = [
      {
        title: '操作',
        key: 'operation',
        width: 100,
        align: 'center',
        dataIndex: 'id',
        className: 'action',
        required: true,
        render: (_, record) => (
          <Space>
            <div style={{color:"#0066FF",cursor:"pointer"}} onClick={() => this.openModal(record,true)}>查看详情</div>
          </Space>
        ),
      },
      {
        title: '系统名称',
        dataIndex: 'sysName',
        width: 200,
        required: true,
      },
      {
        title: '提案名称',
        dataIndex: 'name',
        width: 200,
        required: true,
      },
      {
        title: '主导人',
        dataIndex: 'leader',
        width: 100,
        required: true,
      },
      // {
      //   title: '是否暂停',
      //   dataIndex: 'isPause',
      //   width: 100,
      //   required: true,
      //   render:
      //       tag => {
      //         let color = tag===true ? 'blue' : 'red';
      //         let value=tag===true ? '是' : '否';
      //         return (
      //           <span>
      //           <Tag color={color}>
      //             {value}
      //           </Tag>
      //           </span>
      //         );
      //       }
      // },
      {
        title: '当前进度%',
        dataIndex: 'masterScheduleRate',
        width: 100,
        required: true,
      },
      {
        title: '开始日期',
        dataIndex: 'startDate',
        width: 100,
        required: true,
      },
      {
        title: '计划结案日期',
        dataIndex: 'planFinishDate',
        width: 120,
        required: true,
      },
      {
        title: '人天',
        dataIndex: 'personDay',
        width: 50,
        required: false,
      },
      {
        title: '本周计划',
        dataIndex: 'weekPlan',
        width: 400,
        required: true,
      },
      {
        title: '下周计划',
        dataIndex: 'nextWeekPlan',
        width: 400,
        required: true,
      },
      {
        title: '项目风险',
        dataIndex: 'workRisk',
        width: 100,
        required: true,
      },
      {
        title: '周计划更新时间',
        dataIndex: 'weekPlanUpdate',
        width: 120,
        required: true,
      },
      {
        title: '是否逾期',
        dataIndex: 'isOverdue',
        width: 100,
        required: true,
        render:
            tag => {
              let color = tag===true ? 'blue' : 'red';
              let value=tag===true ? '是' : '否';
              return (
                <span>
                <Tag color={color}>
                  {value}
                </Tag>
                </span>
              );
            }
      },
      {
        title: '逾期天数',
        dataIndex: 'overedDays',
        width: 100,
        required: true,
      },
      {
        title: '是否提前',
        dataIndex: 'isAdvance',
        width: 100,
        required: true,
        render:
            tag => {
              let color = tag===true ? 'blue' : 'red';
              let value=tag===true ? '是' : '否';
              return (
                <span>
                <Tag color={color}>
                  {value}
                </Tag>
                </span>
              );
            }
      },
      {
        title: '提前天数',
        dataIndex: 'advanceDays',
        width: 100,
        required: true,
      },
      {
        title: '备注',
        dataIndex: 'remark',
        width: 100,
        required: true,
      },
      {
        title: '项目类型',
        dataIndex: 'projectTypes',
        width: 100,
        required: true,
      },
      {
        title: '项目编码',
        dataIndex: 'code',
        width: 150,
        required: true,
      },
      {
        title: '科室名称',
        dataIndex: 'orgname',
        width: 200,
        required: true,
      },
      {
        title: '当前阶段',
        dataIndex: 'currentPeriod',
        width: 100,
        required: true,
      },
      {
        title: '实际结案日期',
        dataIndex: 'finalFinishDate',
        width: 120,
        required: true,
      },
      {
        title: '项目天数',
        dataIndex: 'projectDays',
        width: 100,
        required: true,
      },
      {
        title: '是否暂停',
        dataIndex: 'isPause',
        width: 100,
        required: true,
        render:
            tag => {
              let color = tag===true ? 'blue' : 'red';
              let value=tag===true ? '是' : '否';
              return (
                <span>
                <Tag color={color}>
                  {value}
                </Tag>
                </span>
              );
            }
      },
    ];
    const toolBarProps = {
      layout: { leftSpan: 23, rightSpan: 1 },
      left: (
        <Space>
          系统名称：{' '}
          <Input style={{width:"150px"}} onChange={(event) => this.setState({ nameFilter: event.target.value })} allowClear></Input>
          当前阶段：{' '}
          <ComboList
            style={{ width: '150px' }}
            showSearch={false}
            pagination={false}
            dataSource={this.state.status}
            allowClear
            name="name"
            field={['name']}
            afterClear={() => this.setState({ currentPeriodFilter: null })}
            afterSelect={item => this.setState({ currentPeriodFilter: item.name })}
            reader={{
              name: 'name',
              field: ['name'],
            }}
          />
          科室名称：{' '}
          <ComboList
            style={{ width: '150px' }}
            showSearch={false}
            pagination={false}
            dataSource={this.state.orgnameList}
            allowClear
            name="name"
            field={['name']}
            afterClear={item => this.orgnameFilter=null}
            afterSelect={item => this.orgnameFilter=item.name}
            reader={{
              name: 'name',
              field: ['name'],
            }}
          />
          项目类型：{' '}
          <ComboList
            style={{ width: '150px' }}
            showSearch={false}
            pagination={false}
            dataSource={this.state.projTypeList}
            allowClear
            name="name"
            field={['name']}
            afterClear={item => this.projTypeFilter=null}
            afterSelect={item => this.projTypeFilter=item.code}
            reader={{
              name: 'name',
              field: ['name'],
            }}
          />
          主导人：{' '}
          <Input style={{width:"150px"}} onChange={item=>this.projectMasterFilter=item.target.value} allowClear></Input>
          汇报人：{' '}
          <Input style={{width:"150px"}} onChange={item=>this.memberFilter=item.target.value} allowClear></Input>
          开始日期：<DatePicker onChange={item => this.onDateChange(item)} format="YYYY-MM-DD" />
          <Button onClick={this.handlerSearch}>搜索</Button>
          <Button
            key="add"
            type="primary"
            onClick={() => {
              this.openModal({id:'',name:''},false);
            }}
            ignore="true"
          >新建</Button>
          <Button onClick={this.handlerExport}>导出</Button>
        </Space>
      ),
    };
    const filters = this.getTableFilters();
    console.log(filters)
    return {
      refreshButton: 'empty',
      showSearch:false,
      columns,
      bordered: true,
      // toolBar: toolBarProps,
      cascadeParams: {
        filters,
      },
      remotePaging: true ,
      store: {
        type: 'POST',
        url: `${PROJECT_PATH}/pmBaseinfo/findByPage`,
      },

    };

  };
  handlerSearch = () => {
    const tableFilters = this.getTableFilters();
    const { dispatch } = this.props;
    dispatch({
      type: 'pmBaseInfo/getProjectInfo',
      payload:{
        filters: tableFilters
      }
    }).then(res => {
      const { data } = res
      if(res.success){
        this.setState({
          notStartedNum: data.notStartedNum,
          processingNum: data.processingNum,
          sumNum: data.sumNum,
          finishNum: data.finishNum,
          pauseNum: data.pauseNum,
          advanceFinishNum: data.advanceFinishNum,
          preOverTimeNum:data.preOverTimeNum,
          advanceDay:data.advanceDay,
          overTimeDay:data.overTimeDay,
          overTimeNum: data.overTimeNum,
        })
      }
    })
    this.reloadData()
  }
  handlerExport = () => {
    const tableFilters = this.getTableFilters();
    request.post(`${PROJECT_PATH}/pmBaseinfo/export`, { filters: tableFilters }).then(res => {
      const { success, data } = res;
      if (success && data.length > 0) {
        exportXlsx(
          '项目列表',
          [
            '系统名称',
            '提案名称',
            '主导人',
            '当前进度',
            '开始日期',
            '计划结案日期',
            '人天',
            '本周计划',
            '下周计划',
            '项目风险',
            '周计划更新时间',
            '是否逾期',
            '逾期天数',
            '是否提前',
            '提前天数',
            '备注',
            '项目类型',
            '项目编码',
            '科室名称',
            '当前阶段',
            '实际结案日期',
            '项目天数',
            '是否暂停'
          ],
          data,
        );
      } else {
        message.error('没找到数据');
      }
    });
  };
  getEditModalProps = () => {
    const { loading, pmBaseInfo } = this.props;
    const { modalVisible, editData } = pmBaseInfo;

    return {
      editData,
      onSync: this.handleSync,
      visible: modalVisible,
      onClose: this.handleClose,
      sync: loading.effects['pmBaseInfo/syncProjectInfo'],
    };
  };

  getRportEditModalProps = () => {
    const { loading, pmBaseInfo } = this.props;
    const { orgnameList } = this.state
    const { reportModalVisible } = pmBaseInfo;

    return {
      orgnameList,
      onSync: this.handleSync,
      visible: reportModalVisible,
      onClose: this.handleModalClose,
      sync: loading.effects['pmBaseInfo/syncProjectInfo'],
    };
  };

  reloadData = () => {
    if (this.tableRef) {
      this.tableRef.remoteDataRefresh();
    }
  };

  onYearDateChange = (data) => {
    if(data){
      this.setState({
        year: data,
        dateYearFilter: data
      })
    }else{
      this.setState({
        year: null,
        dateYearFilter: null,
      })
    }
  };

  /** 回车触发搜索 */
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handlerSearch();
    }
  };

  render() {
    const { pmBaseInfo } = this.props;
    const { modalVisible, reportModalVisible } = pmBaseInfo;
    
    return (
      <>
        <div className={styles['container']}>
          <Row style={{height:"170px"}} className="row-content">
            <div style={{margin:"9px 12px",background:"white",height:"152px",borderRadius:"4px"}}>
              <div>
              <Col className="col-content">
                  <div className="item item-color3">
                    <div className="item-img">
                      <img src={logo1} width={80} height={80}></img>
                      <div style={{padding:"0 20px"}}>
                        <div className="item-text1">{this.state.sumNum}</div>
                        <div className="item-text2">项目总数</div>
                      </div>
                    </div>
                  </div>
                  </Col>
                <Col className="col-content">
                  <div className="item item-color1">
                    <div className="item-img">
                      <img src={logo2} width={80} height={80}></img>
                      <div style={{padding:"0 20px"}}>
                        <div className="item-text1">{this.state.notStartedNum}</div>
                        <div className="item-text2">未开始</div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="col-content">
                  <div className="item item-color2">
                    <div className="item-img">
                      <img src={logo3} width={80} height={80}></img>
                      <div style={{padding:"0 20px"}}>
                        <div className="item-text1">{this.state.processingNum}</div>
                        <div className="item-text2">进行中</div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="col-content">
                  <div className="item item-color6">
                    <div className="item-img">
                      <img src={logo10} width={80} height={80}></img>
                      <div style={{padding:"0 20px"}}>
                        <div className="item-text1">{this.state.pauseNum}</div>
                        <div className="item-text2">暂停</div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="col-content">
                  <div className="item item-color4">
                    <div className="item-img">
                      <img src={logo4} width={80} height={80}></img>
                      <div style={{padding:"0 20px"}}>
                        <div className="item-text1">{this.state.finishNum}</div>
                        <div className="item-text2">已完成</div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="col-content">
                  <div className="item item-color1">
                    <div className="item-img">
                      <img src={logo5} width={80} height={80}></img>
                      <div style={{padding:"0 20px"}}>
                        <div className="item-text1">{this.state.preOverTimeNum}</div>
                        <div className="item-text2">预逾期</div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="col-content">
                  <div className="item item-color5">
                    <div className="item-img">
                      <img src={logo6} width={80} height={80}></img>
                      <div style={{padding:"0 20px"}}>
                        <div className="item-text1">{this.state.overTimeNum}</div>
                        <div className="item-text2">已逾期</div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="col-content">
                  <div className="item item-color3">
                    <div className="item-img">
                      <img src={logo7} width={80} height={80}></img>
                      <div style={{padding:"0 20px"}}>
                        <div className="item-text1">{this.state.advanceDay}</div>
                        <div className="item-text2">提前天数</div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="col-content">
                  <div className="item item-color4">
                    <div className="item-img">
                      <img src={logo8} width={80} height={80}></img>
                      <div style={{padding:"0 20px"}}>
                        <div className="item-text1">{this.state.overTimeDay}</div>
                        <div className="item-text2">逾期天数</div>
                      </div>
                    </div>
                  </div>
                </Col>
              </div>
            </div>
          </Row>
          <Row style={{height:"50px",margin:"0 12px",padding:"10px 12px 0 12px",backgroundColor:"white"}} className="choose-content">
            <Space>
              <div className='div-text'>系统名称：</div>
              <Input style={{width:"150px"}} onChange={(event) => this.setState({ nameFilter: event.target.value })} allowClear></Input>
              <div className='div-text'>当前阶段：</div>
              <ComboList
                style={{ width: '150px' }}
                showSearch={false}
                pagination={false}
                dataSource={this.state.status}
                allowClear
                name="name"
                field={['name']}
                afterClear={() => this.setState({ currentPeriodFilter: null })}
                afterSelect={item => this.setState({ currentPeriodFilter: item.name })}
                reader={{
                  name: 'name',
                  field: ['name'],
                }}
              />
              <div className='div-text'>科室名称：</div>
              <ComboList
                style={{ width: '150px' }}
                showSearch={false}
                pagination={false}
                dataSource={this.state.orgnameList}
                allowClear
                name="name"
                field={['name']}
                afterClear={item => this.orgnameFilter=null}
                afterSelect={item => this.orgnameFilter=item.name}
                reader={{
                  name: 'name',
                  field: ['name'],
                }}
              />
              <div className='div-text'>项目类型：</div>
              <ComboList
                style={{ width: '150px' }}
                showSearch={false}
                pagination={false}
                dataSource={this.state.projTypeList}
                allowClear
                name="name"
                field={['name']}
                afterClear={item => this.projTypeFilter=null}
                afterSelect={item => this.projTypeFilter=item.code}
                reader={{
                  name: 'name',
                  field: ['name'],
                }}
              />
              <div className='div-text'>开始日期：</div>
              <DatePicker style={{width:"150px"}} onChange={item => this.onDateChange(item)} format="YYYY-MM-DD" />
              <Button onClick={this.handlerSearch}>搜索</Button>
              <Button
                key="add"
                type="primary"
                onClick={() => {
                  this.openModal({id:'',name:''},false);
                }}
                ignore="true"
              >新建</Button>
              <Button onClick={this.handlerExport}>导出</Button>
              {/*<Button*/}
              {/*  key="add"*/}
              {/*  type="primary"*/}
              {/*  onClick={() => {*/}
              {/*    this.openReportModal();*/}
              {/*  }}*/}
              {/*  ignore="true"*/}
              {/*>汇报</Button>*/}
            </Space>
          </Row>
          <Row style={{height:"40px",margin:"0 12px",padding:"0 12px",backgroundColor:"white"}} className="choose-content">
            <Space>
              <div className='div-text'>主导人：</div>
              <Input style={{width:"150px"}} onChange={item=>this.projectMasterFilter=item.target.value} allowClear onKeyPress={this.handleKeyPress}></Input>
              <div className='div-text'>汇报人：</div>
              <Input style={{width:"150px"}} onChange={item=>this.memberFilter=item.target.value} allowClear onKeyPress={this.handleKeyPress}></Input>
              项目年份：
              <YearPicker
                style={{width:"150px"}}
                onChange={this.onYearDateChange}
                allowClear
                value={this.state.year}
                format="YYYY" />
            </Space>
          </Row>
          <Row style={{height:"calc(100% - 272px)",padding:"0 12px"}}>
              <ExtTable onTableRef={inst => (this.tableRef = inst)} {...this.getExtableProps()} />
          </Row>
        </div>
        {modalVisible ? <EditModal {...this.getEditModalProps()} /> : null}
        {reportModalVisible ? <ReportEditModal {...this.getRportEditModalProps()} /> : null}
      </>
    );
  }
}

export default PmBaseInfo;
