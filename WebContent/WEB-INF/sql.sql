CREATE TABLE `t_contract` (
  `id` varchar(30) NOT NULL,
  `contract_code` varchar(40) DEFAULT NULL,
  `contract_date` varchar(20) DEFAULT NULL,
  `provider_code` varchar(20) DEFAULT NULL,
  `customer_code` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `t_node_tree` (
  `id` varchar(20) NOT NULL,
  `text` varchar(20) DEFAULT NULL,
  `leaf` varchar(4) DEFAULT '0' COMMENT '是否为叶子节点1是0否',
  `pid` varchar(20) DEFAULT NULL COMMENT '父亲节点',
  `url` varchar(30) DEFAULT NULL COMMENT '路径相对于整个项目',
  `pcname` varchar(20) DEFAULT NULL,
  `pename` varchar(20) DEFAULT NULL,
  `ename` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `t_provider` (
  `id` varchar(30) NOT NULL,
  `provider_code` varchar(20) DEFAULT NULL COMMENT '供应商代码',
  `provider_name` varchar(30) DEFAULT NULL COMMENT '供应商名称',
  `provider_type` varchar(20) DEFAULT NULL COMMENT '供应商类型',
  `provider_address` varchar(50) DEFAULT NULL COMMENT '供应商地址',
  `provider_phone1` varchar(20) DEFAULT NULL,
  `provider_phone2` varchar(20) DEFAULT NULL,
  `provider_phone3` varchar(20) DEFAULT NULL,
  `create_name` varchar(20) DEFAULT NULL,
  `create_code` varchar(20) DEFAULT NULL,
  `create_time` varchar(20) DEFAULT NULL,
  `update_code` varchar(20) DEFAULT NULL,
  `update_name` varchar(20) DEFAULT NULL,
  `update_time` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='供应商信息维护';

CREATE TABLE `t_user` (
  `id` varchar(30) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(40) NOT NULL,
  `create_time` varchar(20) DEFAULT NULL,
  `nickname` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `i_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `t_contract` VALUES ('10p1', 'cdfdf', '2016-01-24', 'esy', 'aa');
INSERT INTO `t_contract` VALUES ('11p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('12p1', 'cdfdf', '2016-01-24', 'esy', 'aa');
INSERT INTO `t_contract` VALUES ('18p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('20p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('21p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('27p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('28p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('29p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('30p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('31p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('32p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('33p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('34p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('35p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('36p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('37p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('38p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('39p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('3p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('40p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('41p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('42p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('4p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('5p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('6p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('7p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('8p1', 'cdfdf', '2016-01-24', 'aa', 'aa');
INSERT INTO `t_contract` VALUES ('9p1', 'cdfdf', '2016-01-24', 'aa', 'aa');


INSERT INTO `t_node_tree` VALUES ('node14530938652634', '菜单配置', '1', 'node1453093865263', 'systemconfig/menuconfig', NULL, NULL, NULL);
INSERT INTO `t_node_tree` VALUES ('node20160123164757', '供应商维护', '1', 'static20160123164520', 'provider/toprovider', NULL, NULL, NULL);
INSERT INTO `t_node_tree` VALUES ('node20160124084204', '合同管理', '1', 'cont20160123205322', 'contract/tocontract', '', NULL, '');
INSERT INTO `t_node_tree` VALUES ('node20160125163222', '组件模板', '1', 'node1453093865263', 'subunit/subunit', '', NULL, '');


INSERT INTO `t_provider` VALUES ('provider20160123184042', 'esy', '捷思源', '信息科技', '上海宝山', '185', '1122', '234', '轻风无言', NULL, '20160123184042', 'admin', '轻风无言', '20160123184113');
INSERT INTO `t_provider` VALUES ('provider20160123184958', 'fdaf', 'fda ', '', '', '', '', '', '轻风无言', 'admin', '20160123184958', NULL, '', '');
INSERT INTO `t_user` VALUES ('fddfdf', 'admin', '21232f297a57a5a743894a0e4a801fc3', NULL, '轻风无言');
