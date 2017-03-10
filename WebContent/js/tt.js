{
		shadow:true,
//		anchor:'100% 85%',
//		height:300,
		viewConfig:{
			forceFit:true
		},
		store:store,
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
		columns:[
			new Ext.grid.CheckboxSelectionModel(),
			new Ext.grid.RowNumberer(),
			{header:'id', dataIndex:'id',width:50,hidden:true},
			{header:'合同代码', dataIndex:'contractCode', align:"center", width:70},
			{header:'合同时间', dataIndex:'contractDate', align:"center", width:50},
			{header:'供应商代码', dataIndex:'providerCode', align:"center", width:50, renderer:Ext.util.Format.comboRenderer(combox1)},
			{header:'供应商地址1', dataIndex:'customerCode',  align:"center", width:90}
		],
		stripeRows: true,
		frame: true,
		style:{
//			'border':'1px solid red'
		},
		bbar : new Ext.PagingToolbar({
		pageSize : pageSize,
		store:store,
		displayInfo : true,
		displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
		emptyMsg : '没有记录'
		}),
		tbar:[
			{
				text:'增加记录',	
				icon:'../images/add.png',
				handler:function() {
					var node = grid.getStore().recordType;
					var newnode = new node({
						id:'',
						contractCode:'',
						contractDate:'',
						providerCode:'',
						customerCode:''
					});
					grid.stopEditing();
					store.insert(0,newnode);
					grid.getView().refresh();
				}
			},  {
				text:"删除记录2--contract--",
				icon:'../images/bullet_cross.png',
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
	}
	
	
	
	
	// ====== 新的 =====
	{
 	shadow:true,
    enableColumnMove: false, //禁止拖放列
     enableColumnResize: false,  //禁止改变列的宽度
     stripeRows: true,  //斑马线效果
     loadMask: true,  //读取数据时的遮罩和提示功能
     tbar : [toolbar,deleBar],
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
    }
	
	
	
	
	
	
	
	