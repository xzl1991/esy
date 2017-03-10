Ext.onReady(function() {
	fn1();	
});

var fn1 = function() {
	
	var form = new Ext.FormPanel({
		labelAlign:"right",
		frame:true,
//		enctype: 'multipart/form-data', 
		fileUpload : true,
		labelWidth:80,
		url:'fileinput',
		labelSeparator:':',
		items:[
		{
			xtype:'button',
			text:'模板下载',
			style:'margin:0px 0px 5px 25px;',
			handler:function() {
				window.location.href = 'fileoutput';
			}
		},
			{
				xtype:'textfield',
				name:'upfile',
				id:'up-file',
				fieldLabel:'上传文件',
				inputType:'file'
			}
		], buttons:[
			{
				text:'提交',
				handler:function() {
					form.getForm().submit({
										waitMsg:'正在登录，请稍后...',
										waitTitle:'正在验证',
										method:'post',
										success:function(form, action) {
											Ext.getCmp('up-file').reset();
											Ext.example.msg1("数据导入成功");
										},failure:function() {
											Ext.getCmp('up-file').reset();
											Ext.example.msg1("数据导入失败");
										}
									
					});
				}
			}
		]
	});
	
	
	var win = new Ext.Window({
		title:"数据导入",
		modal:true,
		layout:'fit',
		width:300,
		height:150,
		closeAction:'hide',
		defaults:{
			bodyStyle:'margin:5px'
		},
		items:form
	});
	win.on("beforehide", function() {
		Ext.getCmp('up-file').reset();
	});
	
	
	var btn = new Ext.Button({
		text:'数据导入'
		,renderTo:Ext.getBody(),
		handler:function() {
			win.show();
		}
	});
}