Ext.onReady(function() {
			fn1();

		});

var fn2 = function() {

	var form1 = new Ext.FormPanel({
				frame : true,
				buttonAlign : 'center',
				style : 'margin:5px',
				defaults : {
					labelAlign : 'right',
					bodyStyle : 'margin:2px',
					labelWidth : 80
				},
				items : [{
							layout : "column",
							items : [{
										columnWidth : 0.3,
										layout : 'form',
										items : [{
													xtype : "field",
													fieldLabel : "用户名",
													name : 'username'
												}]
									}, {
										layout : 'form',
										columnWidth : 0.3,
										items : [{
													xtype : "field",
													fieldLabel : "密码",
													name : 'password'
												}]
									}, {
										layout : 'form',
										columnWidth : 0.3,
										items : [{
													xtype : "field",
													fieldLabel : "昵称",
													name : 'nickname'
												}]
									}]
						}, {
							layout : "column",
							items : [{
										columnWidth : 0.3,
										layout : 'form',
										items : [{
													xtype : "field",
													fieldLabel : "用户名",
													name : 'username'
												}]
									}, {
										layout : 'form',
										columnWidth : 0.3,
										items : [{
													xtype : "field",
													fieldLabel : "密码",
													name : 'password'
												}]
									}, {
										layout : 'form',
										columnWidth : 0.3,
										items : [{
													xtype : "field",
													fieldLabel : "昵称",
													name : 'nickname'
												}]
									}]
						}, {
							layout : "column",
							items : [{
										columnWidth : 0.3,
										layout : 'form',
										items : [{
													xtype : "field",
													fieldLabel : "用户名",
													name : 'username'
												}]
									}, {
										layout : 'form',
										columnWidth : 0.3,
										items : [{
													xtype : "field",
													fieldLabel : "密码",
													name : 'password'
												}]
									}, {
										layout : 'form',
										columnWidth : 0.3,
										items : [{
													xtype : "field",
													fieldLabel : "昵称",
													name : 'nickname'
												}]
									}]
						}, {
							layout : "column",
							items : [{
										columnWidth : 0.3,
										layout : 'form',
										items : [{
													xtype : "field",
													fieldLabel : "用户名",
													name : 'username'
												}]
									}, {
										layout : 'form',
										columnWidth : 0.3,
										items : [{
													xtype : "field",
													fieldLabel : "密码",
													name : 'password'
												}]
									}, {
										layout : 'form',
										columnWidth : 0.3,
										items : [{
													xtype : "field",
													fieldLabel : "昵称",
													name : 'nickname'
												}]
									}]
						}],
				buttons : [{
							text : '提交',
							handler : function() {
								var vals = form1.getForm().getValues();
								console.log(vals);
							}
						}, {
							text : '重置',
							handler : function() {
								form1.getForm().reset();
							}
						}]
			});

	var win1 = new Ext.Window({
				title : "合同信息",
				height : 500,
				width : 1000,
				modal : true,
				layout : 'fit',
				items : form1
			});
	win1.show();

}

var fn1 = function() {
	var d = Date.parseDate("20160123184042", "YmdHis", true);
	var s = d.format('Y-m-d H:i:s');

	var v = "aaa";
	console.log(v.length);
	var a = null;
	if (!a) {
		console.log(1);
	}

}