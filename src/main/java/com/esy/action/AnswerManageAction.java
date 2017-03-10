//package com.whaty.platform.entity.web.action.wechat;
//
//import java.io.File;
//import java.io.FileInputStream;
//import java.io.FileOutputStream;
//import java.io.IOException;
//import java.sql.PreparedStatement;
//import java.sql.Timestamp;
//import java.util.Date;
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.Random;
//
//import javax.xml.bind.annotation.XmlElementDecl.GLOBAL;
//
//import org.apache.commons.lang.StringUtils;
//import org.hibernate.criterion.DetachedCriteria;
//
//import com.ibm.icu.text.SimpleDateFormat;
//import com.opensymphony.xwork2.ActionContext;
//import com.whaty.platform.entity.bean.EnumConst;
//import com.whaty.platform.entity.bean.PeKey;
//import com.whaty.platform.entity.bean.PeQuestion;
//import com.whaty.platform.entity.bean.PeQuestionCategory;
//import com.whaty.platform.entity.bean.PeStudent;
//import com.whaty.platform.entity.bean.PrQuestionKey;
//import com.whaty.platform.entity.exception.EntityException;
//import com.whaty.platform.entity.web.action.MyBaseAction;
//import com.whaty.platform.sso.web.action.SsoConstant;
//import com.whaty.platform.sso.web.servlet.UserSession;
//import com.whaty.platform.util.Const;
//import com.whaty.util.FileOperate;
//
///**
// * 统考成绩
// * @author 李冰
// * actionId=unifiedScore
// */
//public class AnswerManageAction extends MyBaseAction {
//	private String answer;//回复的内容
//	private File picture;
//	private String keyType;
//	private String keyType1;
//	private String maxSize;
//	private String uploadFileName;
//	private String uploadContentType;
//	private String savePath;
//	private String titles;
//	private java.sql.Date vaildStartDate;
//	private java.sql.Date vaildEndDate;
//	private String categoryId;
//	private String keyId;
//	private List<PeQuestionCategory> categoryList = new ArrayList<PeQuestionCategory>();
//	private List<PeKey> categoryList1 = new ArrayList<PeKey>();
//	private List categoryList2=new ArrayList();
//	private PeQuestion peQuestion;
//	private PrQuestionKey prQuestionKey;
//	private PeKey peKey;
//	private String readonly;
//	public String getUploadFileName() {
//		return uploadFileName;
//	}
//	public void setUploadFileName(String uploadFileName) {
//		this.uploadFileName = uploadFileName;
//	}
//	public String getUploadContentType() {
//		return uploadContentType;
//	}
//	public void setUploadContentType(String uploadContentType) {
//		this.uploadContentType = uploadContentType;
//	}
//	public String getSavePath() {
//		return savePath;
//	}
//	public void setSavePath(String savePath) {
//		this.savePath = savePath;
//	}
//	public List getCategoryList2() {
//		return categoryList2;
//	}
//	public void setCategoryList2(List categoryList2) {
//		this.categoryList2 = categoryList2;
//	}
//	public PrQuestionKey getPrQuestionKey() {
//		return prQuestionKey;
//	}
//	public void setPrQuestionKey(PrQuestionKey prQuestionKey) {
//		this.prQuestionKey = prQuestionKey;
//	}
//	public String getKeyId() {
//		return keyId;
//	}
//	public File getPicture() {
//		return picture;
//	}
//	public void setPicture(File picture) {
//		this.picture = picture;
//	}
//	public String getMaxSize() {
//		return maxSize;
//	}
//	public void setMaxSize(String maxSize) {
//		this.maxSize = maxSize;
//	}
//	public String getKeyType() {
//		return keyType;
//	}
//	public void setKeyType(String keyType) {
//		this.keyType = keyType;
//	}
//	public void setKeyId(String keyId) {
//		this.keyId = keyId;
//	}
//	public String getKeyType1() {
//		return keyType1;
//	}
//	public void setKeyType1(String keyType1) {
//		this.keyType1 = keyType1;
//	}
//	public PeKey getPeKey() {
//		return peKey;
//	}
//	public void setPeKey(PeKey peKey) {
//		this.peKey = peKey;
//	}
//	public List<PeKey> getCategoryList1() {
//		return categoryList1;
//	}
//	public void setCategoryList1(List<PeKey> categoryList1) {
//		this.categoryList1 = categoryList1;
//	}
//	public java.sql.Date getVaildEndDate() {
//		return vaildEndDate;
//	}
//	public void setVaildEndDate(java.sql.Date vaildEndDate) {
//		this.vaildEndDate = vaildEndDate;
//	}
//	public java.sql.Date getVaildStartDate() {
//		return vaildStartDate;
//	}
//	public void setVaildStartDate(java.sql.Date vaildStartDate) {
//		this.vaildStartDate = vaildStartDate;
//	}
//	public String getAnswer() {
//		return answer;
//	}
//
//	public void setAnswer(String answer) {
//		this.answer = answer;
//	}
//
//	public String getTitles() {
//		return titles;
//	}
//	public void setTitles(String titles) {
//		this.titles = titles;
//	}
//	public String getCategoryId() {
//		return categoryId;
//	}
//
//
//	public void setCategoryId(String categoryId) {
//		this.categoryId = categoryId;
//	}
//
//
//	public PeQuestion getPeQuestion() {
//		return peQuestion;
//	}
//
//	public void setPeQuestion(PeQuestion peQuestion) {
//		this.peQuestion = peQuestion;
//	}
//
//	public String getReadonly() {
//		return readonly;
//	}
//
//	public void setReadonly(String readonly) {
//		this.readonly = readonly;
//	}
//	
//
//	@Override
//	public void setServletPath() {
//		this.servletPath = "/entity/wechat/answerManage";
//	}
//	 
//	@Override
//	public void setEntityClass() {
//		this.entityClass=PeQuestion.class;
//		
//	}
//	
//	
//	public void setBean(PeQuestion peQuestionn) {
//		super.superSetBean(peQuestionn);
//	}
//	
//	public PeQuestion getBean() {
//		return (PeQuestion)super.superGetBean();
//	}
//	//选择要显示的列
//	@Override
//	public void initGrid() {
//		this.getGridConfig().setCapability(false, true, false);
//		this.getGridConfig().setTitle(this.getText("问题答案管理"));
//		this.getGridConfig().addColumn(this.getText("ID"), "id", false);
//		this.getGridConfig().addColumn(this.getText("问题"), "title",  true, true, true, "TextField", true, 500);
//		this.getGridConfig().addColumn(this.getText("是否有效"), "flagIsValid.name",true, false, true, "TextField", true, 50);
//		this.getGridConfig().addColumn(this.getText("开始时间"), "vaildStartDate",  true, true, true, "TextField", true, 50); 
//		this.getGridConfig().addColumn(this.getText("结束时间"), "vaildEndDate",  true, true, true, "TextField", true, 50);
//		this.getGridConfig().addColumn(this.getText("问题类别"), "peQuestionCategory.name",  true, true, true, "TextField", true, 50);
//		this.getGridConfig().addColumn(this.getText("答案"), "answer",  true, true, false, "TextEditor", true, 1000);
//		this.getGridConfig().addColumn(this.getText("创建人"), "createUser", true, false, true, "TextField", true, 50);
//		this.getGridConfig().addColumn(this.getText("创建时间"), "createDate",  true, false, true, "TextField", true, 50);
//		this.getGridConfig().addColumn(this.getText("修改人"), "updateUser", true, false, true, "TextField", true, 50);
//		this.getGridConfig().addColumn(this.getText("修改时间"), "updateDate",  true, false, true, "TextField", true, 50);
//		this.getGridConfig().addMenuFunction(this.getText("设为有效"), "flagIsValid",this.getMyListService().getEnumConstByNamespaceCode("FlagIsvalid", "1").getId());
//		this.getGridConfig().addMenuFunction(this.getText("设为无效"), "flagIsValid",this.getMyListService().getEnumConstByNamespaceCode("FlagIsvalid", "0").getId());
//		this.getGridConfig().addRenderFunction(this.getText("查看详情"), "<a href=\"/entity/wechat/answerManage_view.action?bean.id=${value}\" target=\"_blank\">查看详情</a>", "id");
//		this.getGridConfig().addRenderFunction(this.getText("回复问题"), "<a href=\"/entity/wechat/answerManage_edit.action?bean.id=${value}\" target=\"_blank\">修改</a>", "id");
//		this.getGridConfig().addRenderFunction(this.getText("设置标签"), "<a href=\"/entity/wechat/keyWordManage.action?flag=setkey&&questionid=${value}\" >设置标签</a>", "id");
//		this.getGridConfig().addRenderFunction(this.getText("查看标签"), "<a href=\"/entity/wechat/keyWordManage.action?flag=lookkey&&questionid=${value}\" >查看标签</a>", "id");
//		this.getGridConfig().addMenuScript(this.getText("添加"), "{window.location='/entity/wechat/answerManage_addAnswer.action';}");
//	}
//	public  String view(){
//		try {
//			this.setBean((PeQuestion)this.getGeneralService().getById(this.getBean().getId()));
//		} catch (EntityException e) {
//			this.setMsg(this.getText("未找到"));
//			this.setTogo("back");
//			return "msg";
//		}
//		 return "view";
//	}
//	/**
//	 * 修改问题 获取问题类型
//	 * @return
//	 */
//	public String edit(){
//		try {
//			this.setBean((PeQuestion)this.getGeneralService().getById(this.getBean().getId()));
//			String hql = " select id,name from  PeQuestionCategory";
//			categoryList = this.getGeneralService().getByHQL(hql);
//		} catch (EntityException e) {
//			e.printStackTrace();
//		}
//		return "edit";
//	}
//	public List<PeQuestionCategory> getCategoryList() {
//		return categoryList;
//	}
//
//	public void setCategoryList(List<PeQuestionCategory> categoryList) {
//		this.categoryList = categoryList;
//	}
//  public String addbox(){
//	  try {
//		  this.setBean((PeQuestion)this.getGeneralService().getById(this.getBean().getId()));
//		  StringBuffer hql1=new StringBuffer();
//		  hql1.append("select pk.id,pk.key from  Pe_Key pk where  pk.key not in(");
//			hql1.append("select pk.key from pe_key pk where  pk.id in(select prk.fk_key_id as pkd from pr_question_key prk");
//			hql1.append(" where prk.fk_question_id = '" );
//			hql1.append(this.getBean().getId()+"'))");
//			StringBuffer hql2=new StringBuffer();
//				hql2.append("select id,pk.key from Pe_Key pk where  pk.id in(");
//                hql2.append("select prk.fk_key_id as pkd from Pr_Question_Key prk where prk.fk_question_id ='"+this.getBean().getId()+"'and prk.fk_key_id is not null)");
//			categoryList1 = this.getGeneralService().getBySQL(hql1.toString());
//			categoryList2 = this.getGeneralService().getBySQL(hql2.toString());
//		} catch (Exception e) {
//			this.setMsg(this.getText("出现异常"));
//			this.setTogo("back");
//			return "msg";
//		}
//		 return "addbox";
//  }
//	public  String addAnswer(){
//		try {
//			String hql = " select id,name from  PeQuestionCategory";
//			categoryList = this.getGeneralService().getByHQL(hql);
//			String hql1 = " select id,key from  PeKey";
//			categoryList1 = this.getGeneralService().getByHQL(hql1);
//		} catch (Exception e) {
//			this.setMsg(this.getText("未找到"));
//			this.setTogo("back");
//			return "msg";
//		}
//		 return "add";
//	}
//	public  String saveComment() throws EntityException{
//		ActionContext ctx= ActionContext.getContext();
//		UserSession userSession = (UserSession)ctx.getSession().get(SsoConstant.SSO_USER_SESSION_KEY);
//		String createUser= userSession.getLoginId();
//		try{
//			this.getBean().setUpdateDate(new Date());
//			this.getBean().setAnswer(answer);
//			this.getBean().setUpdateUser(createUser);
//			this.getGeneralService().save(this.getBean());
//			this.setMsg("成功");
//		}catch(Exception e){
//			this.setMsg(this.getText("回复失败"));
//			this.setTogo("back");
//			e.printStackTrace();
//		}
//		return "msg";
//	}
//	public  String addquestion() throws EntityException{
//		ActionContext ctx= ActionContext.getContext();
//		UserSession userSession = (UserSession)ctx.getSession().get(SsoConstant.SSO_USER_SESSION_KEY);
//		String createUser= userSession.getLoginId();
//		try{
//			if ( this.getPicture()!= null) {
//				if(!FileOperate.checkFileSize(this.getPicture(), Integer.parseInt(this.getMaxSize()) )  ){
//					this.setMsg("请检查图片大小，图片最大为"+this.getMaxSize()+"KB！");
//					return "upload";
//				}
//			} else {
//				this.setMsg("提交图片失败,请重新上传！");
//				return "upload";
//			}
//			Map<String,String> suffixMap=new HashMap<String,String>();
//			suffixMap.put("jpg", "jpg");
//			suffixMap.put("png", "png");
//			suffixMap.put("gif", "gif");
//			suffixMap.put("bmp", "bmp");
//			if(!FileOperate.checkFileSuffix(this.getUploadFileName(), suffixMap)){
//				this.setMsg("文件类型错误,请重新上传！");
//				return "uploadLyric";
//			}
//			String	path = uploadFile( "picture",this.getUploadFileName(), this.getPicture());
//			if (StringUtils.isBlank(path)) {
//				this.setMsg("保存图片失败,请重新上传！");
//				return "msg";
//			}
//			PeQuestion peQuestion = new PeQuestion();
//			peQuestion.setCreateDate(new Date());
//			peQuestion.setCreateUser(createUser);
//			peQuestion.setTitle(titles);
//			peQuestion.setAnswer(answer);
//			PeQuestionCategory peQuestionCategory = (PeQuestionCategory)this.getGeneralService().getById(PeQuestionCategory.class, categoryId);
//			peQuestion.setPeQuestionCategory(peQuestionCategory);
//			peQuestion.setVaildStartDate(vaildStartDate);
//			peQuestion.setVaildEndDate(vaildEndDate);
//			peQuestion.setPicture(savePath);
//			peQuestion.setUpdateDate(new Date());
//			peQuestion.setUpdateUser(createUser);
//			EnumConst flagIsValid = this.getMyListService().getEnumConstByNamespaceCode("FlagIsvalid", "1");
//			peQuestion.setFlagIsValid(flagIsValid);
//			peQuestion = (PeQuestion)this.getGeneralService().save(peQuestion);
//			this.setMsg("成功添加");
//			this.setTogo("/entity/wechat/answerManage.action");
//		}catch(Exception e){e.printStackTrace();
//			this.setMsg("失败");
//			this.setTogo("back");
//		}
//		return "msg";
//	}
//	
//	
//	/**
//	 * @param peQuestion
//	 *            问题实体
//	 * @param savePath
//	 *            相对路径
//	 * @param fileName
//	 *            文件名
//	 * @param uploadFile
//	 *            文件
//	 * @return 文件保存的相对路径
//	 * @throws IOException
//	 */
//	public String uploadFile( String savePath,
//			String fileName, File uploadFile)  {
//		String fileTrueSavePath = getFileTrueSavePath(savePath);
//		String fileSavePath = getFileSavePath(savePath);
//		String path = saveFile(fileTrueSavePath, fileSavePath, fileName,
//				"qpicture", uploadFile);
//		return path;
//
//	}
//
//	/**
//	 * 保存文件
//	 * 
//	 * @param fileTruePath
//	 *            绝对（真实）路径
//	 * @param filePath
//	 *            相对路径
//	 * @param fileName
//	 *            文件名
//	 * @param newName
//	 * @param file
//	 *            文件
//	 * @return 文件保存的相对路径
//	 * @throws IOException
//	 */
//	public String saveFile(String fileTruePath, String filePath,
//			String fileName, String newName, File file) {
//		File rootFile = new File(fileTruePath);
//		if (!rootFile.exists()) {
//			// 如果目录不存在，创建目录
//			rootFile.mkdirs();
//		}
//		newName = reName(fileName, newName);
//		String truePath = (fileTruePath.endsWith(File.separator) ? fileTruePath
//				: fileTruePath + File.separator) + newName;
//		String path = (filePath.endsWith("/") ? filePath : filePath + "/")
//				+ newName;
//		File fileTo = new File(truePath);
//		byte[] b = new byte[1024];
//		int len = 0;
//		FileInputStream in = null;
//		FileOutputStream fout = null;
//		try {
//			in = new FileInputStream(file);
//			fout = new FileOutputStream(fileTo);
//			while ((len = in.read(b)) != -1) {
//				fout.write(b, 0, len);
//			}
//
//		} catch (IOException e) {
//			e.printStackTrace();
//			return null;
//		} finally {
//			try {
//				if (in != null) {
//					in.close();
//				}
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//			try {
//				if (fout != null) {
//					fout.close();
//				}
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//		}
//		return path;
//	}
//
//	/**
//	 * 获取文件的保存路径（绝对路径）
//	 * 
//	 * @return
//	 */
//	public String getFileTrueSavePath(String savePath) {
//		String fileTrueSavePath = "";
//		String path = Const.getAbsolutePath(this.getSavePath());
//		fileTrueSavePath = path.endsWith(File.separator) ? path : path
//				+ File.separator;
//		fileTrueSavePath += savePath + File.separator;
//		return fileTrueSavePath;
//	}
//
//	/**
//	 * 获取文件的保存路径（相对路径）
//	 * 
//	 * @return
//	 */
//	public String getFileSavePath(String savePath) {
//		String fileSavePath = "";
//		fileSavePath = this.getSavePath().endsWith("/") ? this.getSavePath()
//				: this.getSavePath() + "/";
//		fileSavePath += savePath + "/";
//		return fileSavePath;
//	}
//	/**
//	 * 重命名文件
//	 * 
//	 * @param fileName
//	 * @param newName
//	 * @return
//	 */
//	public String reName(String fileName, String newName) {
//		String repath = "";
//		Random rnd = new Random();
//		String time = new SimpleDateFormat("yyyMMddHHmmssSSS").format(
//				new Date()).toString()
//				+ rnd.nextInt(10);
//		int flength = fileName.lastIndexOf(".");
//		repath = newName + time + fileName.substring(flength).toLowerCase();
//		return repath;
//	}
//	@Override
//	public void checkBeforeAdd() throws EntityException{
//		ActionContext ctx= ActionContext.getContext();
//		UserSession userSession = (UserSession)ctx.getSession().get(SsoConstant.SSO_USER_SESSION_KEY);
//		String createUser= userSession.getLoginId();
//		EnumConst flagIsValid = this.getMyListService().getEnumConstByNamespaceCode("FlagIsvalid", "1");
//		this.getBean().setCreateDate(new Date());
//		this.getBean().setCreateUser(createUser);
//		this.getBean().setFlagIsValid(flagIsValid);
//	}
//	@Override
//	public void checkBeforeUpdate() throws EntityException {
//		ActionContext ctx= ActionContext.getContext();
//		UserSession userSession = (UserSession)ctx.getSession().get(SsoConstant.SSO_USER_SESSION_KEY);
//		String updateUser= userSession.getLoginId();
//		this.getBean().setUpdateDate(new Date());
//		this.getBean().setUpdateUser(updateUser);
//	}
//	@Override
//	public DetachedCriteria initDetachedCriteria() {
//		DetachedCriteria dc = DetachedCriteria.forClass(PeQuestion.class);
//		dc.createCriteria("peQuestionCategory", "peQuestionCategory",DetachedCriteria.LEFT_JOIN);
//		dc.createCriteria("flagIsValid","flagIsValid",DetachedCriteria.LEFT_JOIN);
//		return dc;
//	}
//	
//
//}
