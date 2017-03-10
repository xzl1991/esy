Ext.onReady(function(){
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
	//用户登录弹出窗口
	var form = new Ext.FormPanel({
		url: path + 'userconfig/in_user',
		frame: true,
		defaultType: 'textfield',
		labelWidth:90,
		labelAlign:'right',
		style: 'margin:10px',
		buttonAlign:'center',
		items:[{
			width: 140,
            allowBlank: false,
            maxLength: 20,
            name: 'username',
            fieldLabel: '用户名',
            blankText: '请输入用户名',
            maxLengthText: '用户名不能超过20个字符'
		},{
			width: 140,
            allowBlank: false,
            maxLength: 20,
            name: 'nickname',
            fieldLabel: '用户昵称',
            blankText: '请输入昵称',
            maxLengthText: '昵称不能超过20个字符'
		},{
			width: 140,
			id:'ex_password',
			allowBlank: false,
			maxLength: 20,
			inputType: 'password',
			name: 'password',
			fieldLabel: '密 码-0-',
			blankText: '请输入密码',
			maxLengthText: '密码不能超过20个字符---'
		},{
			width: 140,
			allowBlank: false,
			maxLength: 20,
			id:'ext_passwordre',
			inputType: 'password',
			name: 'passwordre',
			fieldLabel: '重新输入密 码',
			blankText: '请输入密码',
			maxLengthText: '密码不能超过20个字符'
		}
		]
	});

//	登录状态
	var login_in_status = {
		id:'login_in',
		text:'登录',
		icon:'../images/page_white_magnify.png'
	};
	var login_off_status = {
		id:'login_off',
		icon:'../images/status_offline.png',
		text:'未登录1'
	};
	Ext.Ajax.request({
	   url: path + 'login/check_session',
	   success: function(response) {
			var text = response.responseText;
			if(text != '0') {
				var logincmp = Ext.getCmp("login_off");
				logincmp.setText(text);
				logincmp.setIcon('../images/status_online.png');
			}
			
	   }
	});

	var p1 = new Ext.Panel({
		region:'north',
		frame:true,
		html:'<h1><font color="##0033CC"style="margin-left:20px" size="+1">E_SiYuan业务平台</font><h1>',
		height:60,
		baseCls: 'my-panel-no-border',
		bbar:[
			'', '',
			login_off_status
			,
			"->",
			{
				text:'注册',
				icon:'../images/user_add.png',
				handler:function(){
					var login = new Ext.Window({
						title: '用户注册',
		                iconCls:'my-icon',
		                closeAction:'hide',
		                width: 350,
		                height: 200,
		                resizable: true,
		                modal: true,
		                closable: true,
		                buttonAlign: 'center',
		                items: form,
						buttons:[
							{
								'text':'提交',
								handler:function(){
									var values = form.getForm().getValues(true);
									if(!form.getForm().isValid()) {
										Ext.example.msg("错误","验证失败！");
										return;
									}
									var pass1 = Ext.getDom("ex_password").value;
									var pass2 = Ext.getDom("ext_passwordre").value;
									if(pass1 != pass2) {
										Ext.Msg.alert("提示","两次输入密码不同！");
										return ;
									}
									//	alert(Ext.encode(values));
									form.getForm().submit({
										waitMsg:'正在登录，请稍后...',
										waitTitle:'正在验证',
										method:'post',
										success:function(form, action) {
//											console.log(form, action.result.info);
											var info =  action.result.info;
											if(info == 1) {
												form.getForm().reset();
												Ext.Msg.alert("提示","用户名已存在");
											} else {
												Ext.example.msg1("注册成功！")
												login.hide();
											}
										},failure:function() {
											form.getForm().reset();
										}
									});
								}
							},{
								'text':'重置',
								handler:function() {
									form.getForm().reset();
								}
							}
						]		                
		                
					});
					login.show();
				}
			}, {
				text:'退出',
				icon:'../images/lorry_go.png',
				handler:function() {
					Ext.Ajax.request({
	   				url: path + 'login/remove_session',
	   				
	   			 success: function() {
	   				window.location.href = path +'login/fsindex';
//	   					contextPath + '/common/homepage/gotoHome.html' ;
//	   				window.location.href = 'http://localhost:8080/esy/login/fsindex';
	   				}
	   				
					});
					vp.destroy();
				}
			}
		]
	});
	
		
	/*var p2 = new Ext.Panel({
		region:'south',
		title:'南',
		height:50
	});*/
	var p4_1 = new Ext.Panel({
		title:'主页',
		html: '<iframe id="orgSet" name="orgSet" src="'+ path +'html/showtime.html" frameborder="0" width="100%" height="100%"></iframe>'
	});
//	中间tab页面
	var p4 = new Ext.TabPanel({
		defaults:{
			bodyStyle:'padding:5px'
		},
		region:'center'
		,items:[
			//p4_1
		],
		activeTab: 0
//		listeners:{remove:function(tp,c){
//  		c.hide();
//		} }
		
	});
	//综合查询页面
	/*var pid1 = new Ext.Panel({
		id:'id1',
		title:'综合查询',
		closeAction:'close',
		closable:true,
//		height:350,
//		width:600,
		layout:'fit',
		html: '<iframe id="orgSet" name="orgSet" src="TabTest.jsp" frameborder="0" width="100%" height="100%"></iframe>'
	});*/
	var tabpanel;
	//点击导航菜单触发
	var nodeclick = function(node, e) {
		var id = node.attributes.id;
		if(!id)return;
		var leaf = node.attributes.leaf;
		if(!leaf) { //非叶子节点加载导航
//			p3_1.load();
			return ;
		}
		var comp = p4.getComponent(id);
		
		if(!comp) {
			var url = path + node.attributes.url;
			tabpanel = new Ext.Panel({
				id:id,
				title:node.attributes.text,
				closable:true,
				layout:'fit',
				html: '<iframe id="orgSet" name="orgSet" src="'+ url +'" frameborder="0" width="100%" height="100%"></iframe>'
			});
			p4.add(tabpanel).show();
		}else {
			p4.setActiveTab(comp);
		}
			
	};
//	页面导航
	var leftTree = new Ext.tree.TreePanel({
		title:'合同管理1',
//		root:nodes,
		root:new Ext.tree.AsyncTreeNode({
			id:contractroot,
			text:'目录'
		}),
		rootVisible:true,
		loader:new Ext.tree.TreeLoader({
			dataUrl:path + 'systemconfig/tree',
			baseParams:{id:''}
		}),
		listeners:{
			'click': nodeclick,
			'beforeload':function(node){
				alert(node);
				this.loader.baseParams.id = node.attributes.id;
			}
		}
	});
	var p3_1 = new Ext.tree.TreePanel({
		title:'菜单管理'
		,root:new Ext.tree.AsyncTreeNode({
			id: configroot,
			id:contractroot,
			text:'页面配置'
		})
		,rootVisible:true,
		loader:new Ext.tree.TreeLoader({
			dataUrl:path + 'systemconfig/tree',
			baseParams:{id:''}
		}),
		listeners:{
			'click': nodeclick,
			'beforeload':function(node){
				this.loader.baseParams.id = node.attributes.id;
			}
		}
	});
	
	var p3_2 = new Ext.tree.TreePanel({
		title:'静态资源'
		,root:new Ext.tree.AsyncTreeNode({
			id:staticroot,
			text:'资源维护'
		})
		,rootVisible:true,
		loader:new Ext.tree.TreeLoader({
			dataUrl:path + 'systemconfig/tree',
			baseParams:{id:''}
		}),
		listeners:{
			'click': nodeclick,
			'beforeload':function(node){
				this.loader.baseParams.id = node.attributes.id;
			}
		}
	});
	//西，系统菜单板块
	var p3 = new Ext.Panel({
		region:'west',
		collapsible : true,		// 是否可以折叠
		title:'系统菜单1',
		width:150,
		layout:'accordion',
		items:[leftTree,p3_1, p3_2]
		
	});
	
	var vp = new Ext.Viewport({
		id:'main_page',
		layout:'border',
		items:[p1, p3, p4]
	});
})

