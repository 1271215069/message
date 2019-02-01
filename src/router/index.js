import Vue from 'vue'
import Router from 'vue-router'
import importVue from 'import-vue'
import Layout from '../views/Layout/index'
import FAQ from '../views/FAQ/FAQ'
import Console from '../views/Console/Console'

Vue.use(Router);
const title = "易网互联-短信平台-";
export default new Router({
  routes: [
      { path: '*', redirect: '/'},
      importVue("Login/Login","/Login",`${title}登录`),
      importVue("Register/Register","/Register",`${title}注册`),
      importVue("Register/RegisterEmail","/RegisterEmail",`${title}邮箱注册`),
      importVue("Forget/Forget","/Forget",`${title}忘记密码`),
      importVue("Forget/ForgetEmail","/ForgetEmail",`${title}邮箱找回`),
      importVue({
          name: 'Layout/index',
          // path: '/Layout',
          component:Layout,
          title:"官网布局",
          redirect: '/',
          children: [
              importVue("Home/Home","/",`${title}官网`,{
                  meta:{
                      footerShow:false,
                  }
              }),
              importVue("Api/Api","/Api",`${title}api数据平台`,{
                  meta:{
                      menus:"api"
                  }
              }),
              importVue("Developer/Developer","/Developer",`${title}开发者中心`,{
                  meta:{
                      menus:"developer",
                      footerShow:false,
                  }
              }),
              importVue("About/about","/About",`${title}关于我们`,{
                  meta:{
                      menus:"About",
                  }
              }),
              importVue("Service/service","/service",`${title}产品与服务`,{
                meta:{
                    menus:"service",
                }
            }),
              importVue("soluTIon/soluTIon","/soluTIon",`${title}解决方案`,{
                  meta:{
                      menus:"soluTIon",
                      footerShow:false,
                  }
              }),
              importVue("Partners/Partners","/Partners",`${title}合作伙伴`,{
                  meta:{
                      menus:"Partners",
                  }
              }),
              importVue({
                  name: 'FAQ/FAQ',
                  component:FAQ,
                  title:"常见问题布局",
                  redirect: '/FAQ',
                  children:[
                      importVue("FAQ/Pages/index","/FAQ",`${title}常见问题`,{
                          meta:{
                              menus:"developer",
                              FAQ:"FAQ",
                          },
                      }),
                  ]
              }),
              importVue("Docs/Docs","/Docs",`${title}文档中心`,{
                  meta:{
                      menus:"Docs",
                      Docs:"Docs",
                  }
              }),
          ]
      }),
      importVue({
          name: 'Console/Console',
          // path: '/Layout',
          meta:{
              isLogin:true,
          },
          component:Console,
          title:"控制台布局",
          redirect: '/UserInfo',
          children: [
              importVue("Console/Pages/UserInfo/UserInfo", "/UserInfo", `${title}个人中心-我的信息`, {
                  meta: {ConsoleLayout: {keyName: "UserInfo"}}
              }),
              importVue("Console/Pages/UserApp/UserData","/UserData",`${title}应用管理-我的收藏`,{
                  meta:{ ConsoleLayout:{ keyName: "UserData" }}
              }),
              importVue("Console/Pages/UserApp/AddData","/AddData",`${title}个人中心-申请数据`,{
                  meta:{ ConsoleLayout:{ keyName: "UserData" }}
              }),
              importVue("Console/Pages/UserApp/UserApp","/UserApp",`${title}个人中心-我的应用`,{
                  meta:{ ConsoleLayout:{ keyName: "UserApp" }}
              }),
              importVue("Console/Pages/UserApp/UserEditApp","/UserEditApp",`${title}应用管理-应用编辑`,{
                  meta:{ ConsoleLayout:{ keyName: "UserApp" }}
              }),
              importVue("Console/Pages/MyBalance/Balance","/Balance",`${title}个人中心-我的余额`,{
                  meta:{ ConsoleLayout:{ keyName: "Balance" }}
              }),
              importVue("Console/Pages/Authentication/Realname","/Realname",`${title}个人中心-实名认证`,{
                  meta:{ ConsoleLayout:{ keyName: "Realname" }}
              }),
              importVue("Console/Pages/Rechargerecord/Rechargelist","/Rechargelist",`${title}充值记录-充值记录`,{
                  meta:{ ConsoleLayout:{ keyName: "Rechargelist" }}
              }),
              importVue("Console/Pages/MyCollection/MyCollection","/MyCollection",`${title}数据市场-我的收藏`,{
                meta:{ ConsoleLayout:{ keyName: "MyCollection" }}
              }),
              importVue("Console/Pages/MyCollection/Mydatapacket","/Mydatapacket",`${title}数据市场-我的数据包`,{
                meta:{ ConsoleLayout:{ keyName: "Mydatapacket" }}
              }),
              importVue("Console/Pages/SecurityCenter/Verification","/Verification",`${title}安全中心-二次验证`,{
                meta:{ ConsoleLayout:{ keyName: "Verification" }}
              }),
              importVue("Console/Pages/SecurityCenter/Psdedit","/Psdedit",`${title}安全中心-密码修改`,{
                meta:{ ConsoleLayout:{ keyName: "Psdedit" }}
              }),
              importVue("Console/Pages/SecurityCenter/Phonemanage","/Phonemanage",`${title}安全中心-预警手机号码管理`,{
                meta:{ ConsoleLayout:{ keyName: "Phonemanage" }}
              }),
              importVue("Console/Pages/ConRecords/ConRecords","/ConRecords",`${title}消费记录-消费记录`,{
                meta:{ ConsoleLayout:{ keyName: "ConRecords" }}
              }),
              importVue("Console/Pages/MyWorklist/MyWorklist","/MyWorklist",`${title}我的工单-工单列表`,{
                meta:{ ConsoleLayout:{ keyName: "MyWorklist" }}
              }),
              importVue("Console/Pages/MyWorklist/AddWorklist","/AddWorklist",`${title}我的工单-添加工单`,{
                meta:{ ConsoleLayout:{ keyName: "MyWorklist" }}
              }),
              importVue("Console/Pages/Yzmtzdx/Uinfo","/Uinfo",`${title}个人中心-控制台`,{
                meta:{ ConsoleLayout:{ keyName: "Uinfo" }}
              }),
              importVue("Console/Pages/Yzmtzdx/Cpgk","/Cpgk",`${title}平台短信-产品概况`,{
                meta:{ ConsoleLayout:{ keyName: "Cpgk" }}
              }),
              importVue("Console/Pages/Yzmtzdx/Ptgk","/Ptgk",`${title}平台短信-平台概况`,{
                meta:{ ConsoleLayout:{ keyName: "Ptgk" }}
              }),
              importVue("Console/Pages/Yzmtzdx/Sxfs","/Sxfs",`${title}平台短信-短信发送`,{
                meta:{ ConsoleLayout:{ keyName: "Sxfs" }}
              }),
              importVue("Console/Pages/Yzmtzdx/Blfs","/Blfs",`${title}平台短信-变量发送`,{
                meta:{ ConsoleLayout:{ keyName: "Blfs" }}
              }),
              importVue("Console/Pages/Yzmtzdx/Qmgl","/Qmgl",`${title}平台短信-签名管理`,{
                meta:{ ConsoleLayout:{ keyName: "Qmgl" }}
              }),
              importVue("Console/Pages/Yzmtzdx/Addqm","/Addqm",`${title}平台短信-添加签名`,{
                meta:{ ConsoleLayout:{ keyName: "Addqm" }}
              }),
              importVue("Console/Pages/Yzmtzdx/Mbgl","/Mbgl",`${title}平台短信-模板管理`,{
                meta:{ ConsoleLayout:{ keyName: "Mbgl" }}
              }),
              importVue("Console/Pages/Yzmtzdx/Txl","/Txl",`${title}平台短信-通讯录`,{
                meta:{ ConsoleLayout:{ keyName: "Txl" }}
              }),
              importVue("Console/Pages/Yzmtzdx/Addmb","/Addmb",`${title}平台短信-添加模板`,{
                meta:{ ConsoleLayout:{ keyName: "Addmb" }}
              }),
              importVue("Console/Pages/Yzmtzdx/Dsgl","/Dsgl",`${title}平台短信-定时管理`,{
                meta:{ ConsoleLayout:{ keyName: "Dsgl" }}
              }),
              importVue("Console/Pages/Yzmtzdx/Fsjl","/Fsjl",`${title}平台短信-发送记录`,{
                meta:{ ConsoleLayout:{ keyName: "Fsjl" }}
              }),
              importVue("Console/Pages/Yzmtzdx/Hfjl","/Hfjl",`${title}平台短信-回复记录`,{
                meta:{ ConsoleLayout:{ keyName: "Hfjl" }}
              }),
              importVue("Console/Pages/Yzmtzdx/Dxjl","/Dxjl",`${title}平台短信-短信记录`,{
                meta:{ ConsoleLayout:{ keyName: "Dxjl" }}
              }),
              importVue("Console/Pages/Yzmtzdx/Cwfx","/Cwfx",`${title}平台短信-错误分析`,{
                meta:{ ConsoleLayout:{ keyName: "Cwfx" }}
              }),
              importVue("Console/Pages/Yzmtzdx/Sjfx","/Sjfx",`${title}平台短信-数据分析`,{
                meta:{ ConsoleLayout:{ keyName: "Sjfx" }}
              }),
              importVue("Console/Pages/Yzmtzdx/Fssj","/Fssj",`${title}平台短信-发送数据`,{
                meta:{ ConsoleLayout:{ keyName: "Fssj" }}
              }),
              importVue("Console/Pages/Yzmtzdx/Bmd","/Bmd",`${title}平台短信-白名单`,{
                meta:{ ConsoleLayout:{ keyName: "Bmd" }}
              }),
              importVue("Console/Pages/Yzmtzdx/Ipbd","/Ipbd",`${title}平台短信-IP绑定`,{
                meta:{ ConsoleLayout:{ keyName: "Ipbd" }}
              }),
              importVue("Console/Pages/Yzmtzdx/Sjts","/Sjts",`${title}平台短信-数据推送`,{
                meta:{ ConsoleLayout:{ keyName: "Sjts" }}
              }),
              importVue("Console/Pages/Yzmtzdx/Yetx","/Yetx",`${title}平台短信-余额提醒`,{
                meta:{ ConsoleLayout:{ keyName: "Yetx" }}
              }),
              importVue("Console/Pages/Yzmtzdx/Mgxxbh","/Mgxxbh",`${title}平台短信-敏感信息保护`,{
                meta:{ ConsoleLayout:{ keyName: "Mgxxbh" }}
              }),
              importVue("Console/Pages/Yzmtzdx/Shhfsz","/Shhfsz",`${title}平台短信-上行回复设置`,{
                meta:{ ConsoleLayout:{ keyName: "Shhfsz" }}
              }),
              importVue("Console/Pages/Yzmtzdx/Czjl","/Czjl",`${title}充值管理-充值记录`,{
                meta:{ ConsoleLayout:{ keyName: "Czjl" }}
              }),
              importVue("Console/Pages/Yzmtzdx/Zhcz","/Zhcz",`${title}充值管理-账户充值`,{
                meta:{ ConsoleLayout:{ keyName: "Zhcz" }}
              }),



              importVue("Console/Pages/Apisend/Apisend","/Apisend",`${title}接口短信-接口概况`,{
                meta:{ ConsoleLayout:{ keyName: "Apisend" }}
              }),
              importVue("Console/Pages/Apisend/Fsjl","/ApiFsjl",`${title}接口短信-发送记录`,{
                meta:{ ConsoleLayout:{ keyName: "ApiFsjl" }}
              }),
              importVue("Console/Pages/Apisend/Bmd","/ApiBmd",`${title}接口短信-白名单`,{
                meta:{ ConsoleLayout:{ keyName: "ApiBmd" }}
              }),
              importVue("Console/Pages/Apisend/Ipbd","/ApiIpbd",`${title}接口短信-IP绑定`,{
                meta:{ ConsoleLayout:{ keyName: "ApiIpbd" }}
              }),
              importVue("Console/Pages/Apisend/Yetx","/ApiYetx",`${title}接口短信-余额提醒`,{
                meta:{ ConsoleLayout:{ keyName: "ApiYetx" }}
              }),

              importVue("Console/Pages/Apisend/Mbgl","/ApiMbgl",`${title}接口短信-模板管理`,{
                meta:{ ConsoleLayout:{ keyName: "ApiMbgl" }}
              }),
              importVue("Console/Pages/Apisend/Addmb","/ApiAddmb",`${title}接口短信-添加模板`,{
                meta:{ ConsoleLayout:{ keyName: "ApiAddmb" }}
              }),
              importVue("Console/Pages/Apisend/Qmgl","/ApiQmgl",`${title}接口短信-签名管理`,{
                meta:{ ConsoleLayout:{ keyName: "ApiQmgl" }}
              }),
              importVue("Console/Pages/Apisend/Addqm","/ApiAddqm",`${title}接口短信-添加签名`,{
                meta:{ ConsoleLayout:{ keyName: "ApiAddqm" }}
              }),



              importVue("Console/Pages/Plug/Plug","/Plug",`${title}插件中心-空号检测`,{
                meta:{ ConsoleLayout:{ keyName: "Plug" }}
              }),
              importVue("Console/Pages/SystemMessage/SystemMessage","/SystemMessage",`${title}帮助中心-系统消息`,{
                meta:{ ConsoleLayout:{ keyName: "SystemMessage" }}
              }),
              importVue("Console/Pages/Point/Point","/PointShop",`${title}积分管理-积分商城`,{
                meta:{ ConsoleLayout:{ keyName: "PointShop" }}
              }),
              importVue("Console/Pages/Point/GiftDetails","/GiftDetails",`${title}积分管理-礼品详情`,{
                meta:{ ConsoleLayout:{ keyName: "PointShop" }}
              }),
              importVue("Console/Pages/Point/ForRecord","/ForRecord",`${title}积分管理-兑换记录`,{
                meta:{ ConsoleLayout:{ keyName: "ForRecord" }}
              }),
              importVue("Console/Pages/Financial/OrderDetails","/OrderDetails",`${title}财务管理-订单明细`,{
                meta:{ ConsoleLayout:{ keyName: "OrderDetails" }}
              }),
              importVue("Console/Pages/Financial/bOFp","/bOFp",`${title}财务管理-收支明细`,{
                meta:{ ConsoleLayout:{ keyName: "bOFp" }}
              }),
              importVue("Console/Pages/Financial/Invoice","/Invoice",`${title}财务管理-发票管理`,{
                meta:{ ConsoleLayout:{ keyName: "Invoice" }}
              }),
              importVue("Console/Pages/Financial/Contract","/Contract",`${title}财务管理-合同管理`,{
                meta:{ ConsoleLayout:{ keyName: "Contract" }}
              }),
              importVue("Console/Pages/Account/AccountInfo","/AccountInfo",`${title}账户管理-账户信息`,{
                meta:{ ConsoleLayout:{ keyName: "AccountInfo" }}
              }),
              importVue("Console/Pages/Account/Security","/AccountSecurity",`${title}账户管理-账户安全`,{
                meta:{ ConsoleLayout:{ keyName: "AccountSecurity" }}
              }),
              importVue("Console/Pages/Account/AccountAddress","/AccountAddress",`${title}账户管理-我的地址`,{
                meta:{ ConsoleLayout:{ keyName: "AccountAddress" }}
              }),
              importVue("Console/Pages/Account/AccountDownload","/AccountDownload",`${title}账户管理-下载中心`,{
                meta:{ ConsoleLayout:{ keyName: "AccountDownload" }}
              }),
          ]
      })
  ]
})
