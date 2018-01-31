package com.snsoft.framework.web.init;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.util.StringUtils;

public class ControllerGen {

    private static Pattern pattern = Pattern.compile("\\{(.*?)\\}");
    private static Matcher matcher;

    public static void main(String[] args) {
        System.out.println("All the existing Controllers in the path will be overwritten. Do you want to continue? (y/n)");
        try {
            InputStreamReader is_reader = new InputStreamReader(System.in);
            String str = new BufferedReader(is_reader).readLine();
            if (!str.equalsIgnoreCase("y") && !str.equalsIgnoreCase("yes")) {
                return;
            }
            System.out.println("Please input the application name:");

        } catch (IOException e) {
            return;
        }

        String basePath = "." + File.separator + "src" + File.separator + "main" + File.separator;

        genIUrlDef(basePath);
        genControllerAndService(basePath);

    }
    

    private static void genControllerAndService(String basePath) {
        // 生成controller和service文件
        System.out.println("generating: Controllers and Services ...");
        String packagePath = basePath + "java" + 
        		File.separator + "com" +
        		File.separator + "snsoft" + 
                File.separator + "ydsn" + 
                File.separator;

        String controllerPath = packagePath + "controller" + File.separator;
        String servicePath = packagePath + "service" + File.separator;

        String urlsPath = basePath + "resources" + File.separator + "webapp" + File.separator + "urls.properties";
        try {
            System.out.println("Please input the url's key:");
            InputStreamReader is_reader = new InputStreamReader(System.in);
            String urlKey = new BufferedReader(is_reader).readLine();
            if (StringUtils.isEmpty(urlKey)) {
            	System.out.println("Your inputed context err!!");
            	return;
            }
            
            FileReader reader = new FileReader(urlsPath);
            BufferedReader br = new BufferedReader(reader);
            PrintStream p = null;
            PrintStream ps = null;
            String str = null;
            
            while ((str = br.readLine()) != null) {
                if (str.length() > 0 && !str.startsWith("#")) {
                	String key = str.substring(0, str.indexOf("="));
                	if(!key.equals(urlKey)){
                		continue;
                	}
                	String value = str.substring(str.indexOf("=") + 1);
                	String[] vals = value.split("\\|");
                	
                	if (!filteMethod(vals[2], vals[3].split(","))) {
                		System.out.println("The '" + key + "' line has wrong methods, please check it !");
                		continue;
                	}
                	
                	StringBuffer javaName = new StringBuffer();
                	String[] javaNameParts = key.split("_");
                	if(javaNameParts.length>1){
                		for (int i = 1; i < javaNameParts.length; i++) {
                			if (javaNameParts[i].length() > 0) {
                				javaName.append(StringUtils.capitalize(javaNameParts[i]));
                			}
                		}
                	}else{
                		javaName.append(StringUtils.capitalize(javaNameParts[0]));
                	}
                	
                	matcher = pattern.matcher(vals[0]);
                	
                	String controllerFullPath = controllerPath + javaName.toString() + "Controller.java";
                	FileOutputStream controllerOut = new FileOutputStream(controllerFullPath);
                	p = new PrintStream(controllerOut, false, "utf-8");
                	p.println("package com.snsoft.ydsn.controller;");
                	p.println("");
                	p.println("import java.lang.reflect.InvocationTargetException;");
                	p.println("import java.util.HashMap;");
                	p.println("import java.util.Map;");
                	p.println("import javax.servlet.http.HttpServletRequest;");
                	p.println("import javax.servlet.http.HttpServletResponse;");
                	p.println("import org.springframework.beans.factory.annotation.Autowired;");
                	p.println("import org.springframework.stereotype.Controller;");
                	p.println("import org.springframework.ui.Model;");
                	p.println("import org.springframework.web.bind.annotation.RequestMapping;");
                	p.println("import org.springframework.web.bind.annotation.RequestMethod;");
                	p.println("import org.springframework.web.bind.annotation.ResponseBody;");
                	p.println("import com.snsoft.framework.web.IUrlDef;");
                	p.println("import com.snsoft.ydsn.service." + javaName.toString() + "Service;");
                	p.println("import com.snsoft.framework.web.controller.BaseController;");
                	p.println("");
                	p.println("/*");
                	p.println(" * 此代码由 \"controller-gen\" 生成，请不要修改. ");
                	p.println(" * This class is generated by \"controller-gen\". ");
                	p.println(" * Do not modify it.");
                	p.println(" */");
                	p.println("");
                	p.println("@Controller");
                	p.println("@RequestMapping(IUrlDef." + key + ")");
                	p.println("public class " + javaName.toString() + "Controller" + " extends BaseController {");
                	p.println("    private static final String URL_NAME = \"" + key + "\";");
                	p.println("");
                	p.println("    @Autowired");
                	p.println("    private " + javaName.toString() + "Service service;");
                	p.println("");
                	for (String method : "get,post".split(",")) {
                		genControllerMethod(p, vals[0], method);
                	}
                	p.println("}");
                	
                	// 生成service
                	String serviceFullPath = servicePath + javaName.toString() + "Service.java";
                	boolean isExist = new File(serviceFullPath).exists();
                	if (!isExist) {
                		FileOutputStream serviceOut = new FileOutputStream(serviceFullPath);
                		ps = new PrintStream(serviceOut, false, "utf-8");
                		ps.println("package com.snsoft.ydsn.service;");
                		ps.println("");
                		ps.println("import java.util.Map;");
                		ps.println("import javax.servlet.http.HttpServletRequest;");
                		ps.println("import javax.servlet.http.HttpServletResponse;");
                		ps.println("import org.springframework.security.core.userdetails.UserDetails;");
                		ps.println("import org.springframework.stereotype.Service;");
                		ps.println("import com.snsoft.framework.web.service.BaseService;");
                		ps.println("import com.snsoft.framework.web.utils.Constants;");
                		ps.println("");
                		ps.println("@Service");
                		ps.println("public class " + javaName.toString() + "Service extends BaseService {");
                		
                		for (String method : vals[3].split(",")) {
                			genServiceMethod(ps, vals[0], method);
                		}
                		ps.println("}");
                	}
                	
                }
            }
            if (p != null) {
                p.close();
            }
            if (ps != null) {
                ps.close();
            }
            if (br != null) {
                br.close();
            }
            if (reader != null) {
                reader.close();
            }
        } catch (FileNotFoundException e) {
        	e.printStackTrace();
        } catch (IOException e) {
        	e.printStackTrace();
        }
        System.out.println("generating Controllers and Services success !");
    }

    private static boolean filteMethod(String type, String[] method) {
        boolean flag = true;
        String pageMethods = "get,post";
        String apiMethods = "get,post,head,put,delete";
        if (type.equalsIgnoreCase("page")) {
            for (String m : method) {
                if (!pageMethods.contains(m)) {
                    flag = false;
                }
            }
        } else if (type.equalsIgnoreCase("api")) {
            for (String m : method) {
                if (!apiMethods.contains(m)) {
                    flag = false;
                }
            }
        } else {
            flag = false;
        }

        return flag;
    }

    private static void genControllerMethod(PrintStream p, String url, String method){
        String m = method.substring(0, 1).toUpperCase() + method.substring(1).toLowerCase();

        p.println("    @RequestMapping(method = RequestMethod." + method.toUpperCase() + ")");
        p.println("    @ResponseBody");
        p.println("    public Object do" + m + "(HttpServletRequest request,HttpServletResponse response, Model model");
        matcher = pattern.matcher(url);
        while (matcher.find()) {
            p.println("             , @PathVariable String " + matcher.group(1) + " ");
        }
        p.println("             ) throws InvocationTargetException {");
        p.println("        Map<String, Object> params = new HashMap<String, Object>();");
        p.println("        params.put(REQUEST_KEY, request);");
        p.println("        params.put(RESPONSE_KEY, response);");
        p.println("        params.put(URL_NAME_KEY, URL_NAME);");
        matcher = pattern.matcher(url);
        while (matcher.find()) {
            p.println("        params.put(\"" + matcher.group(1) + "\", " + matcher.group(1) + ");");
        }
        p.println("");
        if (method.equalsIgnoreCase("get")){
            p.println("        /* 重载 HTTP GET，根据QueryString中的method判断调用哪种方法。 */");
            p.println("        /* 注意：这里的方法都是“安全”的方法。即方法执行不会造成资源状态的变化。 */");
            p.println("        String method = request.getParameter(HTTP_METHOD_STR) == null ? \"\" : request.getParameter(HTTP_METHOD_STR);");
            p.println("");
            p.println("        if (method.equalsIgnoreCase(HTTP_METHOD_HEAD)) {");
            p.println("            // HEAD");
            p.println("            return response(this.service, HTTP_METHOD_HEAD, params, model);");
            p.println("        } else if (method.equalsIgnoreCase(HTTP_METHOD_OPTIONS)) {");
            p.println("            // OPTIONS");
            p.println("            return response(this.service, HTTP_METHOD_OPTIONS, params, model);");
            p.println("        } else {");
            p.println("            // GET (default)");
            p.println("            return response(this.service, HTTP_METHOD_GET, params, model);");
            p.println("        }");
        } else if (method.equalsIgnoreCase("post")){
            p.println("        /* 重载 HTTP POST，根据QueryString中的method判断调用哪种方法。 */");
            p.println("        /* 注意：put、post、delete都不是“安全”的。 */");
            p.println("        String method = request.getParameter(HTTP_METHOD_STR) == null ? \"\" : request.getParameter(HTTP_METHOD_STR);");
            p.println("");
            p.println("        if (method.equalsIgnoreCase(HTTP_METHOD_PUT)) {");
            p.println("            // PUT");
            p.println("            return response(this.service, HTTP_METHOD_PUT, params, model);");
            p.println("        } else if (method.equalsIgnoreCase(HTTP_METHOD_DELETE)) {");
            p.println("            // DELETE");
            p.println("            return response(this.service, HTTP_METHOD_DELETE, params, model);");
            p.println("        } else {");
            p.println("            // POST (default)");
            p.println("            return response(this.service, HTTP_METHOD_POST, params, model);");
            p.println("        }");
        }
        p.println("    }");
    }

    private static void genServiceMethod(PrintStream p, String url, String method){
        String m = method.substring(0, 1).toUpperCase() + method.substring(1).toLowerCase();

        p.println("");
        p.println("    @Override");
        p.println("    public Object do" + m + "(HttpServletRequest request, HttpServletResponse response, UserDetails user,");
        p.println("            Map<String, String> reqParams) {");
        p.println("");
        p.println("");
        p.println("        // TODO: implement the method.");
        p.println("");
        p.println("        // 以 Rock Framework 的标准 JSON 格式返回对象");
        p.println("        return jsonResponse(null, Constants.CODE_SUCCESS, Constants.JSON_SUCCESS);");
        p.println("");
        p.println("    }");
    }

    private static void genIUrlDef(String basePath) {
        // 生成IUrlDef文件
        System.out.println("generating: IUrlDef ...");

        String fullPath = basePath + "java" + File.separator + "com"
                + File.separator + "snsoft" + File.separator + "framework"
                + File.separator + "web" + File.separator + "IUrlDef.java";
        String urlsPath = basePath + "resources" + File.separator + "webapp"
                + File.separator + "urls.properties";

        FileOutputStream out;
        try {
            out = new FileOutputStream(fullPath);
            PrintStream p = new PrintStream(out, false, "utf-8");
            p.println("package com.snsoft.framework.web;");
            p.println("");
            p.println("public interface IUrlDef {");
            p.println("");
            p.println("    /*");
            p.println("     * 此代码由 \"controller-gen\" 根据 urls.properties 中的定义生成.");
            p.println("     * This file is generated by \"controller-gen\".");
            p.println("     * You should define urls in the urls.properties first.");
            p.println("     * ");
            p.println("     * ===== 注意： =====");
            p.println("     *     在这里定义的url千万不能以/结尾，否则当输入不以/结尾的url时无法访问。 ");
            p.println("     *     但是在urls.properties中强烈建议url以/结尾，这样可以避免服务器端重定向。");
            p.println("     *     另外，对于前端开发而言，所有js请求的url也建议以/结尾，否则会收到  HTTP 307 重定向的响应（虽然浏览器通常也能正常处理，但增加了请求的数量）。");
            p.println("     * ===============");
            p.println("     */");
            p.println("");

            FileReader reader = new FileReader(urlsPath);
            BufferedReader br = new BufferedReader(reader);

            String str = null;

            while ((str = br.readLine()) != null) {
                if (str.trim().length() > 0 && !str.startsWith("#")) {
                    String key = str.substring(0, str.indexOf("="));
                    String value = str.substring(str.indexOf("=") + 1);
                    String urlValue = value.substring(0, value.indexOf("|"));
                    if (urlValue.length() > 1 && urlValue.endsWith("/")) {
                    	urlValue = urlValue.substring(0, urlValue.length() - 1);
                    }
                    p.println("    public String " + key + " = \""  + urlValue + "\";");
                }
            }
            p.println("}");
            p.close();

            br.close();
            reader.close();
        } catch (FileNotFoundException e) {
        	e.printStackTrace();
        } catch (IOException e) {
        	e.printStackTrace();
        }
        System.out.println("generating IUrlDef success !");
    }
}
