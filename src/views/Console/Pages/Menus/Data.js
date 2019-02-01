export default [
    // {name:"我的信息",icon:"&#xe60b;",fontSize:"16px",select:true,link:"/UserInfo",keyName:"UserInfo"},
    // {name:"应用管理",icon:"&#xe63f;",fontSize:"18px",children:[
    //     {name:"我的应用",link:"/UserApp",keyName:"UserApp"},
    //     {name:"我的收藏",link:"/UserData",keyName:"UserData"},
    // ]},
    // {name:"数据市场",icon:"&#xe694;",fontSize:"16px",children:[
    //     {name:"我的数据包",link:"/Mydatapacket",keyName:"Mydatapacket"},
    //     {name:"我的收藏",link:"/MyCollection",keyName:"MyCollection"},
    // ]},
    // {name:"安全中心",icon:"&#xe723;",fontSize:"16px",children:[
    //     {name:"IP白名单",link:"/Balance",keyName:"Balance"},
    //     {name:"二次验证",link:"/Verification",keyName:"Verification"},
    //     {name:"密码修改",link:"/Psdedit",keyName:"Psdedit"},
    //     {name:"预警号码",link:"/Phonemanage",keyName:"Phonemanage"},
    // ]},
    // {name:"短信发送",icon:"&#xe737;",fontSize:"20px",link:"/Balance",keyName:"Balance"},
    // {name:"我的余额",icon:"&#xe613;",link:"/Balance",keyName:"Balance"},
    // {name:"充值记录",icon:"&#xe645;",fontSize:"18px",link:"/Rechargelist",keyName:"Rechargelist"},
    // {name:"消费记录",icon:"&#xe638;",fontSize:"20px",link:"/ConRecords",keyName:"ConRecords"},
    // {name:"我的工单",icon:"&#xe614;",fontSize:"18px",link:"/Balance",keyName:"Balance"},
    // {name:"用户中心",icon:"&#xe6b9;",fontSize:"16px",children:[
    //     {name:"账号信息",link:"/Realname",keyName:"Realname"},
    //     {name:"实名认证",link:"/Realname",keyName:"Realname"},
    //     {name:"会员特权",link:"/Realname",keyName:"Realname"},
    //     {name:"积分中心",link:"/Realname",keyName:"Realname"},
    //     {name:"优惠券",link:"/Realname",keyName:"Realname"},
    // ]},















     //{name:"首页",icon:"&#xe652;",fontSize:"16px",link:"/UserInfo",keyName:"UserInfo"},
    // {name:"财务管理",icon:"&#xe690;",children:[
    //         {name:"订单明细",link:"/OrderDetails",keyName:"OrderDetails"},
    //         {name:"收支明细",link:"/bOFp",keyName:"bOFp"},
    //         {name:"发票管理",link:"/Invoice",keyName:"Invoice"},
    //         {name:"合同管理",link:"/Contract",keyName:"Contract"},
    // ]},
    //  {name:"账户管理",icon:"&#xe684;",children:[
    //      {name:"账户信息",link:"/AccountInfo",keyName:"AccountInfo"},
    //     {name:"账户安全",link:"/AccountSecurity",keyName:"AccountSecurity"},
    //     {name:"我的地址",link:"/AccountAddress",keyName:"AccountAddress"},
    //     {name:"下载中心",link:"/AccountDownload",keyName:"AccountDownload"},
    // ]},
    // {name:"积分管理",icon:"&#xe678;",fontSize:"16px",children:[
    //         {name:"积分商城",link:"/PointShop",keyName:"PointShop"},
    //         {name:"兑换记录",link:"/ForRecord",keyName:"ForRecord"},
    //  ]},
    // {name:"帮助中心",icon:"&#xe678;",fontSize:"16px",children:[
    //         {name:"系统消息",link:"/SystemMessage",keyName:"SystemMessage"},
    //         {name:"问题反馈",link:"/MyWorklist",keyName:"MyWorklist"},
    //         {name:"Q&A",link:"//FAQ",keyName:"FAQ"},
    //         {name:"接入指南",link:"//FAQ",keyName:"/FAQ"},
    //  ]},
    // {name:"插件中心",icon:"&#xe760;",fontSize:"16px",children:[
    //         {name:"空号检测",link:"/Plug",keyName:"Plug"},
    //  ]},
    {data:{name:"个人中心",icon:"&#xe760;",fontSize:"16px",},children:[
        {data:{name:"账号信息",link:"/Uinfo",keyName:"Uinfo"}},
        {data:{name:"实名认证",link:"/Realname",keyName:"Realname"}},
    ]},
    {data:{name:"短信发送",icon:"&#xe760;",fontSize:"16px",},children:[
            //{data:{name:"产品概况",link:"/Cpgk",keyName:"Cpgk"}},
            {data:{name:"短信编辑",icon:"",fontSize:"16px"},children:[
                {data:{name:"平台概况",link:"/Ptgk",keyName:"Ptgk"}},
                {data:{name:"短信发送",link:"/Sxfs",keyName:"Sxfs"}},
                {data:{name:"变量发送",link:"/Blfs",keyName:"Blfs"}},
                {data:{name:"发送记录",link:"/Fsjl",keyName:"Fsjl"}},
                
                {data:{name:"签名管理",link:"/Qmgl",keyName:"Qmgl"}},
                {data:{name:"模板管理",link:"/Mbgl",keyName:"Mbgl"}},
                //{data:{name:"通讯录",link:"/Txl",keyName:"Txl"}},
                {data:{name:"定时管理",link:"/Dsgl",keyName:"Dsgl"}},
            ]},
            {data:{name:"短信设置",icon:"",fontSize:"16px"},children:[
                {data:{name:"白名单",link:"/Bmd",keyName:"Bmd"}},
                {data:{name:"Ip绑定",link:"/Ipbd",keyName:"Ipbd"}},
                //{data:{name:"数据推送",link:"/Sjts",keyName:"Sjts"}},
                {data:{name:"余额提醒",link:"/Yetx",keyName:"Yetx"}},
                //{data:{name:"敏感信息保护",link:"/Mgxxbh",keyName:"Mgxxbh"}},
                //{data:{name:"上行回复设置",link:"/Shhfsz",keyName:"Shhfsz"}},
            ]},
        ]},
    {data:{name:"接口短信",icon:"&#xe760;",fontSize:"16px"},children:[
        {data:{name:"短信编辑",icon:"",fontSize:"16px"},children:[
            {data:{name:"接口概况",link:"/Apisend",keyName:"Apisend"}},
            {data:{name:"发送记录",link:"/ApiFsjl",keyName:"ApiFsjl"}},
            {data:{name:"模板管理",link:"/ApiMbgl",keyName:"ApiMbgl"}},
            {data:{name:"签名管理",link:"/ApiQmgl",keyName:"ApiQmgl"}},
        ]},
        {data:{name:"短信设置",icon:"",fontSize:"16px"},children:[
            {data:{name:"白名单",link:"/ApiBmd",keyName:"ApiBmd"}},
            {data:{name:"IP绑定",link:"/ApiIpbd",keyName:"ApiIpbd"}},
            {data:{name:"余额提醒",link:"/ApiYetx",keyName:"ApiYetx"}},
        ]}

    ]},
    {data:{name:"数据统计",icon:"&#xe760;",fontSize:"16px"},children:[
        {data:{name:"短信记录",link:"/Dxjl",keyName:"Dxjl"}},
        {data:{name:"回复记录",link:"/Hfjl",keyName:"Hfjl"}},
        {data:{name:"发送数据",link:"/Fssj",keyName:"Fssj"}},
        {data:{name:"数据分析",link:"/Sjfx",keyName:"Sjfx"}},
        //{data:{name:"上行回复",link:"/Shhfsz",keyName:"Shhfsz"}},
        //{data:{name:"错误分析",link:"/Cwfx",keyName:"Cwfx"}},
    ]},
    {data:{name:"充值管理",icon:"&#xe760;",fontSize:"16px"},children:[
        {data:{name:"账户充值",link:"/Zhcz",keyName:"Zhcz"}},
        {data:{name:"充值记录",link:"/Czjl",keyName:"Czjl"}},
    ]}
]