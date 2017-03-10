// 全局的路径地址
var path = '/esy/';
// 系统配置导航根节点id
var configroot = 'node1453093865263';
// 静态资源导航根节点id
var staticroot = 'static20160123164520';
// 合同管理根节点
var contractroot = "cont20160123205322";
//将14位字符串解析成yyyy-mm-dd hh:mm:ss
var parsede = function(v) {
	if(v && (v.length == 14)) {
		var d = Date.parseDate(v, "YmdHis", true);
		v = d.format('Y-m-d H:i:s');
	}
	return v;
}
//grid表格显示下拉框
Ext.util.Format.comboRenderer = function(combo){
    return function(value){
        var record = combo.findRecord(combo.valueField, value);
        return record ? record.get(combo.displayField) : value;
    };
	};
