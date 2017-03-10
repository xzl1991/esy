Ext.onReady(function(){
	Ext.QuickTips.init();
		//表格
	var pageSize = 20;
	var store = new Ext.data.Store({
		remoteSort: true,
		autoLoad: {params:{start:0, limit:pageSize}},
		proxy:new Ext.data.HttpProxy({
			url: path + 'userconfig/userdetail'			
		}),
		reader:new Ext.data.JsonReader({
            totalProperty: 'totalCount',
			root: 'root'},
            [
                {name: 'nickname'},
                {name: 'username'},
                {name: 'createTime'}
            ]
		)
	});
	
	var grid = new Ext.grid.GridPanel({
		viewConfig:{
			forceFit:true
		},
		store:store,
		columns:[
			new Ext.grid.RowNumberer(),
			{header:'昵称', dataIndex:'nickname',width:70},
			{header:'账号', dataIndex:'username',width:50},
			{header:'创建时间', dataIndex:'createTime',width:70}
		],
//		autoHeight:true,
		stripeRows: true,
		frame: true,
		renderTo:Ext.getBody(),
		//grid加入bbar
		bbar : new Ext.PagingToolbar({
		pageSize : pageSize,
		store:store,
		displayInfo : true,
		displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
		emptyMsg : '没有记录'
		}),
		tbar:[
			{
				xtype:'label', text:"账号:"
			}, {
				xtype:'textfield', id:'KeyWord'
				,width:'100'
//				regex:/^[0-9]{6}|$/,
//				regexText:'股票代码为6位数字'
				
			}, {
				xtype:'button',
				width:80,
//				autoShow:true,
//				frame:true,
				icon:'../images/page_white_magnify.png',
				text:'搜索',handler:function() {
					var keyword = Ext.get("KeyWord").getValue();
					store.load({params:{start:0,limit:10,searchText:keyword}});
				}
			},'->',{
				text:'清除条件',
				icon:'../images/erase.png',
				handler:function() {
					Ext.getCmp('KeyWord').setValue("");
					Ext.getCmp('data1').setValue("");
					
				}
			}
		]
	});	
	
	var vp = new Ext.Viewport({
		layout:'fit',
		items:
			grid
		
	});
})
