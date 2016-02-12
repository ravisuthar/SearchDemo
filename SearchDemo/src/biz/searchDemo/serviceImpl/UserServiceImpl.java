package biz.searchDemo.serviceImpl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import biz.searchDemo.bean.User;
import biz.searchDemo.repository.IUserRepository;
import biz.searchDemo.service.IUserService;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired(required = true)
    IUserRepository userRepository;

    @Override
    public String getMessage() {
        return userRepository.getMessage();
    }

    @Override
    public List<User> getSearchData(String filterValue) {
        return userRepository.getSearchData(filterValue);
    }

    @Override
    public int insertDetail(Map<String, Object> delail) {
        return userRepository.insertDetail(delail);
    }

    @Override
    public int editDetail(Map<String, Object> detail) {
        return userRepository.editDetail(detail);
    }

    @Override
    public User getUserById(int userId) {
        return userRepository.getUserById(userId);
    }

    @Override
    public int deleteData(int idNumber) {
        return userRepository.deleteData(idNumber);
    }

    @Override
    public User getUserByIdSPCall(int userId) {
        return userRepository.getUserByIdSPCall(userId);
    }

}
