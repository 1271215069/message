export default (to, from, next)=>{
    return {
        title:to.name,
        path:to.path,
        //页面背景颜色
        bodyBaColor:"#f3f5f8",
        //顶部是否显示
        headerShow:true,
        //菜单选择名称，默认首页
        menus:"home",
        //常见问题，菜单选择名称，默认首页
        FAQ:"FAQ",
        DocsKeyName:"init",
        //尾部是否显示
        footerShow:true,
        //控制台布局参数
        ConsoleLayout:{
            //菜单宽度
            menuWidth:200,
        }
    };
}