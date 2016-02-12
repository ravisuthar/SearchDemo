package biz.searchDemo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import biz.searchDemo.bean.User;
import biz.searchDemo.service.IUserService;

@Controller
@RequestMapping(value = "/user")
public class UserController {

    @Autowired(required = true)
    IUserService userService;

    @RequestMapping(value = "/list")
    public String getSearchPage(HttpServletRequest request) {
        return "users/empProfile";
    }

    @RequestMapping(value = "/add")
    public String add(HttpServletRequest request) {
        return "users/add";
    }

    @RequestMapping(value = "/edit")
    public ModelAndView edit(HttpServletRequest request, @RequestParam Map<String, Object> param) {

        Map<String, Object> data = new HashMap<String, Object>();
        data.put("editId", Integer.parseInt(String.valueOf(param.get("id"))));
        ModelAndView modelView = new ModelAndView("users/edit", "data", data);
        return modelView;
    }

    @RequestMapping(value = "/getUserById")
    public @ResponseBody Map<String, Object> getUserData(@RequestParam Map<String, Object> param) {
        Map<String, Object> data = new HashMap<String, Object>();
        int id = 0;
        if (param.containsKey("id")) {
            id = Integer.parseInt(String.valueOf(param.get("id")));
        }
        // User user=testServiceInt.getUserById(id);
        User user = userService.getUserByIdSPCall(id);
        data.put("user", user);
        return data;
    }

    @RequestMapping(value = "/getSearchData", method = RequestMethod.POST)
    public @ResponseBody Map<String, Object> getDataForStore(HttpServletRequest req, @RequestParam Map<String, Object> param) {

        Map<String, Object> data = new HashMap<String, Object>();
        data.put("message", "hello world");
        List<User> items = new ArrayList<User>();
        List<User> items_new = new ArrayList<User>();

        String filterValue = param.containsKey("searchParam") ? param.get("searchParam").toString() : "";

        items = userService.getSearchData(filterValue);
        int start = 0;
        int limit = 10;

        if (param.get("start") != null) {
            start = Integer.parseInt(param.get("start").toString());
        }
        if (param.get("limit") != null) {
            limit = Integer.parseInt(param.get("limit").toString());
        }

        int item_size = items.size();
        for (int i = start; i < start + limit; i++) {
            if (i < item_size) {
                items_new.add(items.get(i));
            }
        }

        data.put("start", start);
        data.put("limit", limit);
        data.put("data", items_new);
        data.put("total", items.size());
        data.put("success", "true");

        return data;
    }

    @RequestMapping(value = "/insertData", method = RequestMethod.POST)
    public @ResponseBody int insertEmployeeData(@RequestParam Map<String, Object> param) {
        System.out.println(param.get("firstName"));
        System.out.println(param.get("lastName"));
        System.out.println(param.get("email"));
        System.out.println(param.get("age"));
        System.out.println(param.get("registrationDate"));
        System.out.println(param.get("project"));
        System.out.println(param.get("status"));
        int result = userService.insertDetail(param);
        return (result);

    }

    @RequestMapping(value = "/editData", method = RequestMethod.POST)
    public @ResponseBody int editEmployeeData(@RequestParam Map<String, Object> param) {
        int result = userService.editDetail(param);
        return (result);

    }

    @RequestMapping(value = "/deleteData", method = RequestMethod.POST)
    public @ResponseBody int deleteEmployeeData(@RequestParam Map<String, Object> param) {
        int id = 0;
        int result = 0;
        if (param.containsKey("id")) {
            id = Integer.parseInt(String.valueOf(param.get("id")));
            result = userService.deleteData(id);
        }

        return (result);

    }

}
