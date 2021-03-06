 Ext.onReady(function(){
      Ext.QuickTips.init();
	  Ext.form.Field.prototype.msgTarget = 'side';
		//表格
	var stor_com = new Ext.data.JsonStore({
		autoDestroy: true,
		url: path + 'provider/queryComBo',
		root: 'images',
		fields:[
			'providerCode', 'providerName'
		]
	});
	stor_com.load();
	//下拉框供应商
	var combox1 = new Ext.form.ComboBox({
		valueField: 'providerCode',
   	 	displayField: 'providerName',
   	 	triggerAction: 'all',
	    lazyRender:true,
	    fieldLabel:'供应商',
	    hiddenName:'providerCode',
	    store:stor_com
	});
      	var pageSize = 11;
 		var store = new Ext.data.Store(
		{	
			baseParams:{start:0, limit:pageSize},
			remote:true,
	   		proxy:new Ext.data.HttpProxy({
	   			url:path+'/getUser'
	   		}),
	   		reader:new Ext.data.JsonReader({
            totalProperty: 'total',
			root: 'root'},
            [
                {name: 'id'},
                {name: 'contractCode'},
                {name: 'contractDate'},
                {name: 'providerCode'},
                {name: 'customerCode'}
            ]
		)
//			reader : new Ext.data.JsonReader({
//				idProperty : 'id',
//				total : 'total',
//				root : "root",
//				totalProperty : "total",
//				fields : 
//				[ 
//				{name:'id'},
//				{name:'nickname'},{name:'password'},{name:'username'},{name:'nickname'},{name:'username'},
//				{
//					name : "createTime1",
//					type : "date",
//					dateFormat : "time"
//		  		},
//				{name: "createTime", type: 'date',dateFormat: 'Y-m-d TH:i:s'}
//
//				]
//			})
		}
		);
  		store.load();
		//2.复选框
		var comBox = new Ext.grid.CheckboxSelectionModel({singleSelect:true,selectAll:function(){}});
        //3.标题列 ColumnModel
		//显示行号 new Ext.grid.RowNumberer()
        var column = new Ext.grid.ColumnModel({
        	columns:[
        	comBox,
        	  new Ext.grid.RowNumberer(),
        	 {
								header : "id",
								dataIndex : "id",
								hidden : false
							}//, 
							, {
								header : "姓名",
								dataIndex : "username"
//								dataindex : "password"
							},
							 {
								header : "姓名1",
								dataIndex : "nickname"
//								dataindex : "password"
							},
							 {
								header : "昵称",
//								dataIndex : "username"
								dataIndex : "nickname"
							},
							 {
								header : "密码",
//								dataIndex : "nickname"
								dataIndex : "password",
								width : 400
							}
							,{header:'创建时间',dataIndex:'createTime'
							,width:400,
							renderer : function(value) {
											if (value == null || value == 0) {
												return "2010";
											} else {
												return Ext.util.Format.date(
														value, "Y-m-d TH:i:s");
											}
										}
							}
							
        	]
        });
        var grid = new Ext.grid.GridPanel({
 	shadow:true,
    enableColumnMove: false, //禁止拖放列
     enableColumnResize: false,  //禁止改变列的宽度
     stripeRows: true,  //斑马线效果
     loadMask: true,  //读取数据时的遮罩和提示功能
//     tbar : [toolbar,deleBar],
    bbar : new Ext.PagingToolbar({
		pageSize : pageSize,
		store:store,
		displayInfo : true,
		displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
		emptyMsg : '没有记录'
		}),
//     renderTo:Ext.getBody(),
//     ds:data,
     store:store,
     cm:column,
//     sm:comBox,
     sm:new Ext.grid.CheckboxSelectionModel({
			singleSelect:true,
//			checkOnly:false
			 listeners: {
                        rowselect: function(sm, row, rec) {
                            Ext.getCmp("company-form").getForm().loadRecord(rec);
                        }
                    }
		}),
		listeners: {
                    viewready: function(g) {
                        g.getSelectionModel().selectRow(0);
                    } // Allow rows to be rendered.
                },
        stripeRows: true,
		frame: true,
//     width:300,
     autoHeight:true,
     //height:80,
        
     //初始化一些字段名称后的参数。。。
     viewConfig: {
            columnsText: '隐藏/显示列',  //设置下拉菜单提示文字
            scrollOffset: 15,    //设置右侧滚动条的预留宽度
            sortAscText: '升序',    //设置下拉菜单提示文字
            sortDescText: '降序',   //设置下拉菜单提示文字
            forceFit: true   //自动延展每列的长度
        }
    });
        ////对表格填充数据 
        var data = [['1','111','11111','xxxx'],['2','222','22221','xxx']];
        //
      var gridform = new Ext.FormPanel({
		layout:"border",
		frame: true,
		id: 'company-form',
        labelAlign: 'left',
        url: path + "contract/addcontract",
        title: '合同数据1',
		anchor:'100% 85%',
		items:[
			{    
				region:'center'
				,layout:'fit',
				items:
				grid
			},
			{
			region:'east',
//			width:500,
//			layout:'fit',
            xtype: 'fieldset',
            labelWidth: 90,
            title:'合同详情1---数据下的-item',
            defaults: {width: 340},    // Default config options for child items
            defaultType: 'textfield',
            autoHeight: true,
            buttonAlign:'center',
             style: {
                "margin-left": "10px", // when you add custom margin in IE 6...
                "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0"  // you have to adjust for it somewhere else
            }
            }
			] });
	var deleBar = new Ext.Toolbar({
		height:30,
		items:[
		{
		
				text:"删除记录2--contract--",
//				icon:'../images/bullet_cross.png',
				handler:function() {
					var sm = grid.getSelectionModel().getSelections();
					var smlength = sm.length;
					if(smlength == 0) {
						Ext.Msg.alert('提示', '删除记录不能为空');	
					}
					var dataArray = [];
					for(var i = 0; i < smlength; i++) {
						store.remove(sm[i]);
						dataArray[i] = Ext.encode(sm[i].data);
					}
					Ext.Ajax.request({
						url:path + 'contract/deletecontract'	 //页面保存数据后台处理
						,failure:function(response) {
							Ext.Msg.alert("error!", response.responseText);
						},params:{param:dataArray},
						success:function() {
							store.reload();
						}
					});
					
				}
			}
		]
	}); 
    var toolbar = new Ext.Toolbar({//定义按钮功能
							height : 30,
							items : [{
								text : "新增",
//								icon:'../images/add.png',
								iconCls : "btn-add",
//								hidden : !isGranted("rc_addTestPage"),
								scope : this,
								handler : function(){//按钮功能
								   alert("999");
									new Ext.form.FormPanel({
								  		width : 650,
									autoHeight : true,
									region : "south",
									frame : true,
									layout : "form", // 整个大的表单是form布局
									labelWidth : 65,
									labelAlign : "right",
									items : [{
												layout : "column", // 从左往右的布局
											 items :[{
											 	xtype : "textfield",
												name : 'enName',
												 allowBlank : false,
												 fieldLabel : '英文名称',
												 width : 120
											 }]															
									}]
								  })
								}
							}]
						});
var form = new Ext.FormPanel({
		title:'查询区域--FormPanel2',
		anchor:'100% 15%',
		frame:true,
		labelSeparator:':',
		labelWidth:100,
		labelAlign:"right",
		/*buttons:[
			{text:'清除条件', handler:function() {
				form.getForm().reset();
			}}
		],*/
		defaults:{
//			bodyStyle:'padding:10px'
		},items:[{
			style:{
				'padding':'10px'
			},
			layout:'column',
			items:[
			{
				columnWidth:.2,
				layout:'form',
				items:[
				{xtype:"textfield",
					name:'providerCode',
					id:'providerCode',
					fieldLabel:'供应商代码'}
					]
			},
			{
				columnWidth:.2,
					layout:'form',
					items:[
					{
						xtype:"textfield",
					name:'providerName',
					id:'providerName',
					fieldLabel:'供应商名称'
					}]
			},
			{
				columnWidth:.2,
					layout:'form',
					items:[
					{
					xtype:"textfield",
					name:'providerAddress',
					id:'providerAddress',
					fieldLabel:'供应商地址'
					}]
			},
			{
				columnWidth:.2,
					layout:'form',
					items:[
					{
						xtype:"button",
						text:'搜索'
						,width:50,
						style:{
							'margin-left':'15px'
						},
						icon:'../images/page_white_magnify.png'
						,handler:function(){
							var providerAddress = Ext.getDom('providerAddress').value;
							var providerName = Ext.getDom("providerName").value;
							var providerCode = Ext.getDom("providerCode").value;
							store.reload({
								params:{
									providerAddress : providerAddress
									,providerName:providerName,
									providerCode:providerCode
								}
							});
						}
					}]
			}
			]}
		]
	});
	//4.创建 Panel    
	/**
	 * pner 里面放 gridpanel
	 * */
	/**
	 * view 里面 放 panel--->gridPanel
	 * */
	var panel = new Ext.Panel({
		layout:'anchor',
		items:[
//			form,grid
			form, gridform
		]
	});
	var vp = new Ext.Viewport({
		layout:'fit',
		items:
			panel
		
	});
//       Ext.MessageBox.alert("哈哈哈","测试")
      }
    );
