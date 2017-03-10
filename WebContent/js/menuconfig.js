Ext.onReady(function(){
	Ext.QuickTips.init();
		//表格
	var pageSize = 20;
	var store = new Ext.data.Store({
		remoteSort: true,
		autoLoad: {params:{start:0, limit:pageSize}},
		proxy:new Ext.data.HttpProxy({
			url: path + 'systemconfig/menudetail'			
		}),
		reader:new Ext.data.JsonReader({
            totalProperty: 'totalCount',
			root: 'root'},
            [
                {name: 'id'},
                {name: 'ename'},
                {name: 'text'},
                {name: 'leaf'},
                {name: 'url'},
                {name: 'pid'},
                {name: 'pcname'}
            ]
		)
	});
	
	Ext.util.Format.comboRenderer = function(combo){
    return function(value){
        var record = combo.findRecord(combo.valueField, value);
        return record ? record.get(combo.displayField) : combo.valueNotFoundText;
    };
	};


	//是否叶子节点的下拉框
	var isLeaf = new Ext.form.ComboBox({
	    triggerAction: 'all',
    	mode: 'local',
    	hiddenValue:'value',
		store:new Ext.data.ArrayStore({
			fields:[
				'value', 'text'
			],
			data:[['1','true'], ['0','false']]
		}),
		valueField: 'value',
	    displayField: 'text'

		
	});
	
	var grid = new Ext.grid.EditorGridPanel({
		anchor:'100% 85%',
		viewConfig:{
			forceFit:true
		},
		clicksToEdit:1,
		store:store,
		sm:new Ext.grid.CheckboxSelectionModel({
			singleSelect:false,
			checkOnly:false
		}),
		columns:[
			new Ext.grid.CheckboxSelectionModel(),
			new Ext.grid.RowNumberer(),
			{header:'id', dataIndex:'id'},
			{header:'英文名称', dataIndex:'ename',width:40, editor:true},
			{header:'页面名称', dataIndex:'text',width:40, editor:true},
			{header:'叶子节点', dataIndex:'leaf', width:30, editor:isLeaf, renderer:Ext.util.Format.comboRenderer(isLeaf)},
			{header:'url', dataIndex:'url', editor:true},
			{header:'pid', dataIndex:'pid',  editor:true},
			{header:'父节页面名称', dataIndex:'pcname', width:40}
		],
//		autoHeight:true,
		stripeRows: true,
		frame: true,
//		renderTo:Ext.getBody(),
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
				text:'增加记录',	
				icon:'../images/add.png',
				handler:function() {
					var node = grid.getStore().recordType;
					var newnode = new node({
						id:'',
						ename:'',
						text:'',
						leaf:'',
						url:'',
						pid:'',
						pcname:''
					});
					grid.stopEditing();
					store.insert(0,newnode);
					grid.startEditing(0,0);
					grid.getView().refresh();
				}
			}, {
				text:'保存',
				icon:'../images/accept.png',
				handler:function() {
					var sm = grid.getSelectionModel();
					var selections = sm.getSelections();
					var selectedLength = selections.length;
					if(selectedLength == 0) {
						Ext.Msg.alert("提示", "请选择需要提交的数据！");
						return;
					}
					var dataArray = [];
					for(var i = 0; i < selectedLength; i++) {
						dataArray[i] = Ext.encode(selections[i].data);	
					}
//					var jsonData = Ext.util.JSON.encode(dataArray);
					Ext.Ajax.request({
						url:path + 'systemconfig/addNode'	 //页面保存数据后台处理
						,success: function(response, b) {
							store.reload();
							var text = response.responseText;
						}
						,failure:function(response) {
							Ext.Msg.alert("error!", response.responseText);
						},params:{param:dataArray}
					});	
					
				}
			}, {
				text:"删除记录21",
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
						url:path + 'systemconfig/deleteNode'	 //页面保存数据后台处理
						,failure:function(response) {
							Ext.Msg.alert("error!", response.responseText);
						},params:{param:dataArray}
					});
					
				}
			}
		]
	});	
	
		var form = new Ext.FormPanel({
		title:'查询区域--menu',
//		height:300,
//		width:300,
		anchor:'100% 15%',
		frame:true,
		labelSeparator:':',
		labelWidth:60,
		labelAlign:"right",
/*		buttons:[
			{text:'清除条件', handler:function() {
				form.getForm().reset();
			}}
		],*/
		defaults:{
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
					name:'ename',
					id:'node_ename',
					fieldLabel:'英文名称'}
					]
			},
			{
				columnWidth:.2,
					layout:'form',
					items:[
					{
						xtype:"textfield",
					name:'id',
					id:'node_id',
					fieldLabel:'节点ID'
					}]
			},
			{
				columnWidth:.2,
					layout:'form',
					items:[
					{
					xtype:"textfield",
					name:'pid',
					id:'node_pid',
					fieldLabel:'父节点ID'
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
						icon:'../images/page_white_magnify.png'
						,handler:function(){
							var node_ename = Ext.getDom('node_ename').value;
							var node_id = Ext.getDom("node_id").value;
							var node_pid = Ext.getDom("node_pid").value;
							store.reload({
								params:{
									start:0,
									limit:10,
									ename : node_ename
									,id:node_id,
									pid:node_pid
								}
							});
						}
					}]
			}
			]}
		]
	});
	
	var panel = new Ext.Panel({
		layout:'anchor',
		items:[
			form,grid
		]
	});
	var vp = new Ext.Viewport({
		layout:'fit',
		items:
			panel
		
	});
});
