package biz.searchDemo.repository;

import java.util.List;
import java.util.Map;

import biz.searchDemo.bean.User;

public interface IUserRepository {
    public abstract String getMessage();

    public abstract List<User> getSearchData(String filterValue);

    public abstract int insertDetail(Map<String, Object> delail);

    public int editDetail(Map<String, Object> detail);

    public User getUserById(int userId);

    public abstract int deleteData(int idNumber);

    public User getUserByIdSPCall(int userId);

}
