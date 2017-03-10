package com.esy.action;

import java.io.FileInputStream;
import java.io.PrintWriter;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jxl.Sheet;
import jxl.Workbook;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/subunit")
public class Subunit {
	@RequestMapping("/subunit")
	public String subunit() {
		return "subunit";
	}

	@ResponseBody
	@RequestMapping(value="/fileinput")
	public void abaa02(@RequestParam MultipartFile upfile, HttpServletResponse response) throws Exception{
		Workbook book = Workbook.getWorkbook(upfile.getInputStream());
		int sheetnum = book.getNumberOfSheets();
		Sheet[] sheets = book.getSheets();
		System.out.println(sheetnum);
		
		for(int i = 0; i < sheetnum; i++) {
			Sheet sheet = sheets[i];
			int rows = sheet.getRows();
			int cols = sheet.getColumns();
			for(int j = 0; j < rows; j++) {
				for(int h = 0; h < cols; h++) {
					System.out.println("第" + j  + "行" + "第" + h + "列 = " + sheet.getCell(h, j).getContents());
				}
			}
		}
		book.close();
		PrintWriter out = response.getWriter();
		out.write("{\"success\":true}");
		out.flush();
		out.close();
		
	}
	
	@RequestMapping(value="/fileoutput")
	@ResponseBody
	public void fileoutput(HttpServletRequest request, HttpServletResponse response) throws Exception{
		response.setHeader("Content-Disposition", "attachment;filename="+ "t_node_tree.xls");  
		ServletOutputStream os = response.getOutputStream();
		FileInputStream fis = new FileInputStream("D:/t_node_tree.xls");
		int hasread = 0;
		byte[] buf = new byte[1024];
		while((hasread = fis.read(buf)) > 0) {
			os.write(buf, 0, hasread);
		}
		os.flush();
		os.close();
		fis.close();
	}
}
