Ext.onReady(function() {
/**
* 1. Grid
*/
/*Ext.create('Ext.grid.Panel', {
store : Ext.create('Ext.data.ArrayStore', {
fields : [{
name : 'book'
}, {
name : 'author'
}],
data : [['Extjs4:firstBook', 'joms']]
}),
columns : [{
text : 'Book',
flex : 1,
sortable : false,
dataIndex : 'book'
}, {
text : 'Author',
width : 100,
sortable : true,
dataIndex : 'author'
}],
height : 80,
width : 300,
title : 'Simple Grid',
renderTo : 'testG1'
});


// grid2
Ext.define('Book', {
extend : 'Ext.data.Model',
fields : [{
name : 'book'
}, {
name : 'topic',
type : 'string'
}, {
name : 'released',
type : 'boolean'
}, {
name : 'releasedDate',
type : 'date'
}, {
name : 'value',
type : 'number'
}]
});


var store = Ext.create('Ext.data.ArrayStore', {
model : 'Book',
data : [
['Ext JS 4: First Look', 'Ext JS', '4', false, null, 0],
['Learning Ext JS 3.2', 'Ext JS', '3.2', true, '2010/10/01',
40.49],
['Ext JS 3.0 Cookbook', 'Ext JS', '3', true, '2009/10/01',
44.99],
['Learning Ext JS', 'Ext JS', '2.x', true, '2008/11/01', 35.99]]
});
Ext.create('Ext.grid.Panel', {
store : store,
width : 550,
height : 300,
title : 'Extjs Books',
renderTo : 'grid2',
features : [{
groupHeaderTp1 : 'Publisher:{name}'


}],
selModel : Ext.create('Ext.selection.CheckboxModel'),
columns : [Ext.create('Ext.grid.RowNumberer'), {
text : 'Book',
flex : 1,
dataIndex : 'book'
}, {
text : 'Category',
xtype : 'templatecolumn',
width : 100,
tpl : '{topic}{version}'
}, {
text : 'Already Released',
xtype : 'booleancolumn',
width : 100,
dataIndex : 'released',
trueText : 'Yes',
falseText : 'No'
}, {
text : 'Released Date',
xtype : 'datecolumn',
width : 100,
dataIndex : 'releasedDate',
format : 'm-Y'
}, {
text : 'Price',
xtype : 'numbercolumn',
width : 80,
dataIndex : 'value',
renderer : Ext.util.Format.usMoney
}, {
xtype : 'actioncolumn',
width : 50,
items : [{
icon : 'script/checked.gif',
tooltip : 'Edit',
handler : function(grid, rowIndex, colIndex) {
var rec = grid.getStore().getAt(rowIndex);
Ext.MessageBox.alert('Edit', rec
.get('book'));
}
}, {
icon : 'script/scroll-left.gif',
tooltip : 'Delete',
handler : function(grid, rowIndex, colIndex) {
var recs = grid.getStore().getAt(rowIndex);
Ext.MessageBox.alert('Delete', recs
.get('book'))
}
}]
}]
});
*/
/**
* 自定义分组 Ext.grid.feature.Grouping
* 分组总结 Ext.grid.feature.GroupingSummary
*总结所有组 Ext.grid.feature.Summary
* 插件使用
*/


// 定义模型
Ext.define('Book', {
extend : 'Ext.data.Model',
fields : ['name', 'topic']
});
// 创建store
var Books = Ext.Create('Ext.data.Store', {
model : 'Book',
groupField : 'topic',// 按照主题分组
data : [{
name : 'Learning Ext js',
topic : 'Ext JS'
}, {
name : 'Learning Ext js2.0',
topic : 'Ext JS'
}, {
name : 'Learning Ext js3.0',
topic : 'Ext JS'
}, {
name : 'Learning PHP5 Tools',
topic : 'PHP'
}, {
name : 'NetBeans IDE 7 Cookbook',
topic : 'Java'
}, {
name : 'iReport 3.7',
topic : 'Java'
}, {
name : 'Python Multimedia',
topic : 'Python'
}, {
name : 'NHibernate 3.0 Cookbook',
topic : '.NET'
}, {
name : 'ASP.NET MVC 2 Cookbook',
topic : '.NET'
}]
});
// 填充数据给grid
/* Ext.create('Ext.grid.Panel', {
renderTo : 'div3',
frame : true,
store : Books,
width : 350,
height : 400,
title : 'Books',
features : [Ext.create('Ext.grid.feature.Grouping', {// 使用分组插件
groupHeaderTpl : 'topic:{name}({rows.length}Book{[values.rows.length>1?"s":""]})'
})],
columns : [{
text : 'Name',
flex : 1,
dataIndex : 'name'
}, {
text : 'Topic',
flex : 1,
dataIndex : 'topic'
}]
});*/

/*Ext.create('Ext.grid.Panel', {
renderTo : 'div3',
frame : true,
store : Books,
width : 350,
height : 400,
title : 'Books',
features : [{
groupHeaderTpl : 'Topic: {name}',
ftype : 'groupingsummary'//使用分组总结插件
}],
columns : [{
text : 'Name',
flex : 1,
dataIndex : 'name',
summaryType : 'count',
summaryRenderer : function(value) {
return Ext.String.format('{0} book{1}', value,
value !== 1 ? 's' : '');
}
}, {
text : 'Topic',
flex : 1,
dataIndex : 'topic'
}]
});*/

Ext.create('Ext.grid.Panel', {
renderTo :'div3',
frame : true,
store : Books,
width : 350,
height : 300,
title : 'Books',
features : [{
ftype : 'summary'//使用总结插件
}],
columns : [{
text : 'Name',
flex : 1,
dataIndex : 'name',
summaryType : 'count',
summaryRenderer : function(value) {
return Ext.String.format('{0} book{1}', value, value !== 1
? 's'
: '');
}
}, {
text : 'Topic',
flex : 1,
dataIndex : 'topic'
}]
});


/**
* tree的使用
*/

Ext.create('Ext.tree.Panel', {
title : 'Simple Tree',
width : 200,
store : Ext.create('Ext.data.TreeStore', {
root : {
expanded : true,
children : [{
text : "Menu Option 1",
"checked": true,
leaf : true
}, {
text : "Menu Option 2",
//"checked": true,
expanded : true,
children : [{
text : "Sub Menu Option 2.1",
leaf : true,
"checked": true

}, {
text : "Sub Menu Option 2.2",
leaf : true,
"checked": true
}]
}, {
text : "Menu Option 3",
"checked": true,
leaf : true
}]
}
}),
viewConfig : {//树叶拖拽实现
plugins : {
ptype : 'treeviewdragdrop'
}
},
folderSort: true,//排序
sorters: [{
property: 'text',
direction: 'ASC'
}],
rootVisible : false,
renderTo : 'tree1'
});
});