/**
 * Created by bll on 16/6/1.
 */
import { Table ,QueueAnim,Icon} from 'antd';
import {BtnPass,BtnRecover,BtnRemove,BtnEdit} from '../global/cus_components'
function getDate(){
    var myDate = new Date();
    return {
        y:myDate.getFullYear(), //获取完整的年份(4位,1970-????)
    }
}
function currentCreateTimeObj(){
    for(var i=1;i<=12;i++){
        var t={text: `${y}-${i}`, value: `${y}-${i}`};
        currentCreateTime.push(t)
    }
}
function getUnixTime(dateStr) {
    var newstr = dateStr.replace(/-/g,'/');
    var date =  new Date(newstr);
    var time_str = date.getTime().toString();
    return time_str.substr(0, 10);
}
var y=getDate().y,m=getDate().m,currentCreateTime=[];
currentCreateTimeObj();
var type=parseInt(window.location.search.split("=").pop());
function onChange(pagination, filters, sorter) {
    // 点击分页、筛选、排序时触发
    console.log('各类参数是', pagination, filters, sorter);
}
const columns1 = [
{
    title:"编号",
    dataIndex:"index"
},
{
    title:"ID",
    dataIndex:"id",
    sorter:(a, b) => a.id- b.id
},{
    title: '文章标题',
    dataIndex: 'title',
},
{
    title: '作者',
    dataIndex: 'author',
    sorter: (a, b) => a.age - b.age,
},{
    title: '创作时间',
    dataIndex: 'create_time',
    filters: currentCreateTime,
    onFilter: (value, record) => {
        return record.create_time.indexOf(value) === 0
    },
    sorter: (a, b) => {
        return getUnixTime(a.create_time)-getUnixTime(b.create_time)
    }
}, {
    title: '点赞数',
    dataIndex: 'good_job_count',
    sorter: (a, b) => a.good_job_count - b.good_job_count,
}, {
    title: '收藏数',
    dataIndex: 'like_count',
    sorter: (a, b) => a.like_count - b.like_count,
},
 {
    title: '来源',
    dataIndex: 'from',
},{
    title:"操作",
    dataIndex:"do",
    render(text){
        return (
            <div>
                <BtnEdit cid={text.cid} ctype={type}>{text.edit}</BtnEdit>
                <BtnRemove cid={text.cid} ctype={type}>{text.remove}</BtnRemove>
            </div>
        )
    }
}];
const data1= [];
for (let i = 1; i <= 12; i++) {
    data1.push({
        key: i,
        index:i,
        id:i,
        title: 'react-native的来临',
        author:'小胖子',
        create_time:`2016-${i}-10`,
        good_job_count:`${i*10}`,
        like_count: `${i*10}`,
        from:'来源于网络',
        do:{
            edit:'查看详情/编辑',
            remove:'删除',
            cid:i
        }
    });
}
const pagination = {
    total: data1.length,
    showSizeChanger: true,
    onShowSizeChange(current, pageSize) {
        console.log('Current: ', current, '; PageSize: ', pageSize);
    },
    onChange(current) {
        console.log('Current: ', current);
    }
};
var TableOne=React.createClass({
    getInitialState() {
        return {
            data: [],
            pagination: {},
            loading: false,
        };
    },
    //handleTableChange(pagination, filters, sorter) {
    //    const pager = this.state.pagination;
    //    pager.current = pagination.current;
    //    this.setState({
    //        pagination: pager,
    //    });
    //    this.fetch({
    //        pageSize: pagination.pageSize,
    //        currentPage: pagination.current,
    //        sortField: sorter.field,
    //        sortOrder: sorter.order,
    //        //...filters,
    //    });
    //},
    //fetch(params = {}) {
    //    console.log('请求参数：', params);
    //    this.setState({ loading: true });
    //    reqwest({
    //        url: '/components/table/demo/data.json',
    //        method: 'get',
    //        data: params,
    //        type: 'json',
    //        success: (result) => {
    //            const pagination = this.state.pagination;
    //            pagination.total = result.totalCount;
    //            this.setState({
    //                loading: false,
    //                data: result.data,
    //                pagination,
    //            });
    //        },
    //    });
    //},
    //componentDidMount() {
    //    this.fetch();
    //},
//<Table columns={columns} dataSource={data} pagination={pagination} loading={this.state.loading}
//       onChange={this.handleTableChange}/>
    render(){
        return(
            <div>
                <QueueAnim className="demo-content"  type={['right', 'left']}
                           ease={['easeOutQuart', 'easeInOutQuart']}>
                    <div key="a">
                        <Table columns={columns1} dataSource={data1} onChange={onChange} pagination={pagination}/>
                    </div>
                </QueueAnim>
            </div>
        )
    }
});
const columns2 = [
    {
        title:"编号",
        dataIndex:"index"
    },
    {
        title:"ID",
        dataIndex:"id",
        sorter:(a, b) => a.id- b.id
    },{
        title: '文章标题',
        dataIndex: 'title',
    },
    {
        title: '作者',
        dataIndex: 'author',
        sorter: (a, b) => a.age - b.age,
    },{
        title: '创作时间',
        dataIndex: 'create_time',
        filters: currentCreateTime,
        onFilter: (value, record) => {
            return record.create_time.indexOf(value) === 0
        },
        sorter: (a, b) => {
            return getUnixTime(a.create_time)-getUnixTime(b.create_time)
        }
    },
    {
        title: '来源',
        dataIndex: 'from',
    },{
        title:"操作",
        dataIndex:"do",
        render(text){
            return (
                <div>
                    <BtnPass cid={text.cid} ctype={type}>{text.pass}</BtnPass>
                    <BtnRemove cid={text.cid} ctype={type}>{text.remove}</BtnRemove>
                </div>
            )
        }
    }];
const data2= [];
for (let i = 1; i <= 12; i++) {
    data2.push({
        key: i,
        index:i,
        id:i,
        title: 'react-native的来临',
        author:'小胖子',
        create_time:`2016-${i}-10`,
        from:'来源于网络',
        do:{
            pass:'通过',
            remove:'删除',
            cid:i
        }
    });
}

var TableTwo=React.createClass({
    getInitialState() {
        return {
            data: [],
            pagination: {},
            loading: false,
        };
    },
    //handleTableChange(pagination, filters, sorter) {
    //    const pager = this.state.pagination;
    //    pager.current = pagination.current;
    //    this.setState({
    //        pagination: pager,
    //    });
    //    this.fetch({
    //        pageSize: pagination.pageSize,
    //        currentPage: pagination.current,
    //        sortField: sorter.field,
    //        sortOrder: sorter.order,
    //        //...filters,
    //    });
    //},
    //fetch(params = {}) {
    //    console.log('请求参数：', params);
    //    this.setState({ loading: true });
    //    reqwest({
    //        url: '/components/table/demo/data.json',
    //        method: 'get',
    //        data: params,
    //        type: 'json',
    //        success: (result) => {
    //            const pagination = this.state.pagination;
    //            pagination.total = result.totalCount;
    //            this.setState({
    //                loading: false,
    //                data: result.data,
    //                pagination,
    //            });
    //        },
    //    });
    //},
    //componentDidMount() {
    //    this.fetch();
    //},
//<Table columns={columns} dataSource={data} pagination={pagination} loading={this.state.loading}
//       onChange={this.handleTableChange}/>
    render(){
        return(
            <div>
                <QueueAnim className="demo-content"  type={['right', 'left']}
                           ease={['easeOutQuart', 'easeInOutQuart']}>
                    <div key="a">
                        <Table columns={columns2} dataSource={data2} onChange={onChange} pagination={pagination}/>
                    </div>
                </QueueAnim>
            </div>
        )
    }
});
const columns3 = [
    {
        title:"编号",
        dataIndex:"index"
    },
    {
        title:"ID",
        dataIndex:"id",
        sorter:(a, b) => a.id- b.id
    },{
        title: '文章标题',
        dataIndex: 'title',
    },
    {
        title: '作者',
        dataIndex: 'author',
        sorter: (a, b) => a.age - b.age,
    },{
        title: '创作时间',
        dataIndex: 'create_time',
        filters: currentCreateTime,
        onFilter: (value, record) => {
            return record.create_time.indexOf(value) === 0
        },
        sorter: (a, b) => {
            return getUnixTime(a.create_time)-getUnixTime(b.create_time)
        }
    }, {
        title: '点赞数',
        dataIndex: 'good_job_count',
        sorter: (a, b) => a.good_job_count - b.good_job_count,
    }, {
        title: '收藏数',
        dataIndex: 'like_count',
        sorter: (a, b) => a.like_count - b.like_count,
    },
    {
        title: '来源',
        dataIndex: 'from',
    },{
        title:"操作",
        dataIndex:"do",
        render(text){
            return (
                <div>
                    <BtnRecover cid={text.cid} ctype={type}>{text.recover}</BtnRecover>
                </div>
            )
        }
    }];
const data3= [];
for (let i = 1; i <= 12; i++) {
    data3.push({
        key: i,
        index:i,
        id:i,
        title: 'react-native的来临',
        author:'小胖子',
        create_time:`2016-${i}-10`,
        good_job_count:`${i*10}`,
        like_count: `${i*10}`,
        from:'来源于网络',
        do:{
            recover:'恢复',
            cid:i
        }
    });
}

var TableThree=React.createClass({
    getInitialState() {
        return {
            data: [],
            pagination: {},
            loading: false,
        };
    },
    //handleTableChange(pagination, filters, sorter) {
    //    const pager = this.state.pagination;
    //    pager.current = pagination.current;
    //    this.setState({
    //        pagination: pager,
    //    });
    //    this.fetch({
    //        pageSize: pagination.pageSize,
    //        currentPage: pagination.current,
    //        sortField: sorter.field,
    //        sortOrder: sorter.order,
    //        //...filters,
    //    });
    //},
    //fetch(params = {}) {
    //    console.log('请求参数：', params);
    //    this.setState({ loading: true });
    //    reqwest({
    //        url: '/components/table/demo/data.json',
    //        method: 'get',
    //        data: params,
    //        type: 'json',
    //        success: (result) => {
    //            const pagination = this.state.pagination;
    //            pagination.total = result.totalCount;
    //            this.setState({
    //                loading: false,
    //                data: result.data,
    //                pagination,
    //            });
    //        },
    //    });
    //},
    //componentDidMount() {
    //    this.fetch();
    //},
    render(){
        return(
            <div>
                <QueueAnim className="demo-content"  type={['right', 'left']}
                           ease={['easeOutQuart', 'easeInOutQuart']}>
                    <div key="a">
                        <Table columns={columns3} dataSource={data3} onChange={onChange} pagination={pagination}/>
                    </div>
                </QueueAnim>
            </div>
        )
    }
});


var Tabs=React.createClass({
    showTabOne(){
        this.props.actions.toTabOne()
    },
    showTabTwo(){
        this.props.actions.toTabTwo()
    },
    showTabThree(){
        this.props.actions.toTabThree()
    },
    render(){
        var {actions,current_tab}=this.props,c1,c2,c3;
        switch (current_tab){
            case 1:
                c1='active';
                break;
            case 2:
                c2='active'
                break;
            case 3:
                c3='active'
                break;
        }
        return (
            <ul className="tabs clearfix">
                <li className={c1} onClick={this.showTabOne}>正常</li>
                <li className={c2} onClick={this.showTabTwo}>未审核</li>
                <li className={c3} onClick={this.showTabThree}>删除</li>
            </ul>
        )
    }
});
var PortletTitle=React.createClass({
    render(){
        return (
            <header className="portlet-title">
                <div className="search-input">
                    <input type="text"/>
                        <span className="search-icon">
                            <Icon type="search" />
                        </span>
                </div>
            </header>
        )
    }
});
var AllTable=React.createClass({
    render(){
        var {actions,current_tab}=this.props,tab;
        console.log(current_tab);
        switch (current_tab){
            case 1:
                tab= <TableOne/>;
                break;
            case 2:
                tab= <TableTwo/>;
                break;
            case 3:
                tab= <TableThree/>;
                break;
        }
        return(
            <div>
                <PortletTitle/>
                <div className="table-data">
                    <Tabs actions actions={actions} current_tab={current_tab}/>
                    {tab}
                </div>
            </div>
        )
    }
});
//ReactDOM.render(
//    <AllTable/>,
//    document.getElementById('table-data')
//)
export default AllTable;
