package biz.searchDemo.repositoryImpl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import biz.searchDemo.bean.User;
import biz.searchDemo.repository.IUserRepository;
import biz.searchDemo.util.DBconnection;

@Repository
public class UserRepositoryImpl implements IUserRepository {

    static List<User> items;

    @Override
    public String getMessage() {
        return "hello world from service layer";
    }

    @Override
    public int insertDetail(Map<String, Object> detail) {
        Connection connection2 = null;
        PreparedStatement ps2 = null;
        ResultSet rs2 = null;
        String query = "";

        String idString = (String) detail.get("id");
        Integer id = new Integer(idString);

        String ageString = (String) detail.get("age");
        Integer age = new Integer(ageString);

        String statusString = (String) detail.get("status");
        Integer status = new Integer(statusString);

        // long timeStamp = null;
        Timestamp time = new Timestamp(123);

        try {
            query = "INSERT INTO Customer" + "(id, FirstName, LastName, Email, Age, Registration, Project, Status) VALUES" + "(?,?,?,?,?,?,?,?)";
            connection2 = DBconnection.getConnection();
            ps2 = connection2.prepareStatement(query);
            ps2.setInt(1, id);
            ps2.setString(2, (String) detail.get("firstName"));
            ps2.setString(3, (String) detail.get("lastName"));
            ps2.setString(4, (String) detail.get("email"));
            ps2.setInt(5, age);
            ps2.setTimestamp(6, time);
            ps2.setString(7, (String) detail.get("project"));
            ps2.setInt(8, status);
            // execute insert SQL stetement
            ps2.executeUpdate();
        } catch (ClassNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        finally {
            try {
                if (rs2 != null) {
                    rs2.close();
                }
                if (ps2 != null) {
                    ps2.close();
                }
                connection2.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }

        }

        return 0;

    }

    @Override
    public int editDetail(Map<String, Object> detail) {
        Connection connection2 = null;
        PreparedStatement ps2 = null;
        ResultSet rs2 = null;
        String query = "";

        String idString = (String) detail.get("id");
        Integer id = new Integer(idString);

        String ageString = (String) detail.get("age");
        Integer age = new Integer(ageString);

        String statusString = (String) detail.get("status");
        Integer status = new Integer(statusString);

        // long timeStamp = null;
        Timestamp time = new Timestamp(123);

        try {
            /*
             * query = "UPDATE INTO Customer" + "(id, FirstName, LastName, Email, Age, Registration, Project, Status) VALUES" + "(?,?,?,?,?,?,?,?)";
             */
            query = "update Customer set FirstName = ?, LastName = ?, Email = ?, Age = ?, Registration = ?, Project = ?, Status = ? WHERE id = ?";
            connection2 = DBconnection.getConnection();
            ps2 = connection2.prepareStatement(query);
            ps2.setString(1, (String) detail.get("firstName"));
            ps2.setString(2, (String) detail.get("lastName"));
            ps2.setString(3, (String) detail.get("email"));
            ps2.setInt(4, age);
            ps2.setTimestamp(5, time);
            ps2.setString(6, (String) detail.get("project"));
            ps2.setInt(7, status);
            ps2.setInt(8, id);
            // execute insert SQL stetement
            ps2.executeUpdate();
        } catch (ClassNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        finally {
            try {
                if (rs2 != null) {
                    rs2.close();
                }
                if (ps2 != null) {
                    ps2.close();
                }
                connection2.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }

        }

        return 0;

    }

    @Override
    public int deleteData(int idNumber) {
        Connection connection2 = null;
        PreparedStatement ps2 = null;
        ResultSet rs2 = null;
        int result = 0;
        String query = "";
        try {
            query = "DELETE FROM Customer WHERE id = ?";
            connection2 = DBconnection.getConnection();
            ps2 = connection2.prepareStatement(query);
            ps2.setInt(1, idNumber);

            // rs2=ps2.executeQuery();
            ps2.executeUpdate();
            result = 1;
        } catch (ClassNotFoundException e) {
            result = 0;
            e.printStackTrace();
        } catch (SQLException e) {
            result = 0;
            e.printStackTrace();
        } finally {
            try {
                if (rs2 != null) {
                    rs2.close();
                }
                if (ps2 != null) {
                    ps2.close();
                }
                connection2.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }

        }
        return (result);
    }

    @Override
    public List<User> getSearchData(String filterValue) {
        System.out.println("getSearchData() called");
        List<User> userList1 = new ArrayList<User>();
        List<User> userList2 = new ArrayList<User>();

        if (filterValue != null && !filterValue.equalsIgnoreCase("")) {
            Connection connection2 = null;
            PreparedStatement ps2 = null;
            ResultSet rs2 = null;
            String query = "";
            try {
                query = "select * from Customer where FirstName like  ?  or LastName like ? or Email like  ? or Project like ?";
                connection2 = DBconnection.getConnection();
                ps2 = connection2.prepareStatement(query);
                ps2.setString(1, "%" + filterValue + "%");
                ps2.setString(2, "%" + filterValue + "%");
                ps2.setString(3, "%" + filterValue + "%");
                ps2.setString(4, "%" + filterValue + "%");

                rs2 = ps2.executeQuery();

                while (rs2.next()) {
                    User user = new User();
                    user.setFirstName(rs2.getString("FirstName"));
                    user.setLastName(rs2.getString("LastName"));
                    user.setId(rs2.getInt("Id"));
                    user.setEmail(rs2.getString("Email"));
                    user.setAge(rs2.getInt("Age"));
                    // user.setRegistrationDate(rs2.getDate("RegistrationDate"));
                    user.setProject(rs2.getString("Project"));
                    user.setStatus(rs2.getInt("Status"));

                    userList2.add(user);
                }
                System.out.println(userList2);
                return userList2;

            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            } catch (SQLException e) {
                e.printStackTrace();
            } finally {
                try {
                    if (rs2 != null) {
                        rs2.close();
                    }
                    if (ps2 != null) {
                        ps2.close();
                    }
                    connection2.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }

            }

        } else {
            Connection connection1 = null;
            PreparedStatement ps1 = null;
            ResultSet rs1 = null;

            try {

                connection1 = DBconnection.getConnection();
                ps1 = connection1.prepareStatement("select * from Customer order by Id");

                rs1 = ps1.executeQuery();
                while (rs1.next()) {
                    User user = new User();
                    user.setFirstName(rs1.getString("FirstName"));
                    user.setLastName(rs1.getString("LastName"));
                    user.setId(rs1.getInt("Id"));
                    user.setEmail(rs1.getString("Email"));
                    user.setAge(rs1.getInt("Age"));
                    // user.setRegistrationDate(rs1.getDate("RegistrationDate"));
                    user.setProject(rs1.getString("Project"));
                    user.setStatus(rs1.getInt("Status"));
                    userList1.add(user);

                }
                System.out.println(userList1);
                return userList1;

            } catch (Exception e) {

                e.printStackTrace();
            } finally {
                try {
                    rs1.close();
                    ps1.close();
                    connection1.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return null;
    }

    @Override
    public User getUserById(int userId) {
        System.out.println("getSearchData() called");
        List<User> userList = new ArrayList<User>();

        Connection connection2 = null;
        PreparedStatement ps2 = null;
        ResultSet rs2 = null;
        String query = "";
        try {
            query = "select * from Customer where id=?";

            connection2 = DBconnection.getConnection();
            ps2 = connection2.prepareStatement(query);
            ps2.setInt(1, userId);
            rs2 = ps2.executeQuery();

            while (rs2.next()) {
                User user = new User();
                user.setFirstName(rs2.getString("FirstName"));
                user.setLastName(rs2.getString("LastName"));
                user.setId(rs2.getInt("Id"));
                user.setEmail(rs2.getString("Email"));
                user.setAge(rs2.getInt("Age"));
                // user.setRegistrationDate(rs2.getDate("RegistrationDate"));
                user.setProject(rs2.getString("Project"));
                user.setStatus(rs2.getInt("Status"));

                userList.add(user);
            }
            System.out.println(userList);
            return userList.get(0);

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs2 != null) {
                    rs2.close();
                }
                if (ps2 != null) {
                    ps2.close();
                }
                connection2.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }

        }

        return null;
    }

    @Override
    public User getUserByIdSPCall(int userId) {
        System.out.println("getSearchData() called");
        List<User> userList = new ArrayList<User>();

        Connection connection2 = null;
        PreparedStatement ps2 = null;
        ResultSet rs2 = null;
        String query = "";
        CallableStatement callableStmt = null;
        try {

            connection2 = DBconnection.getConnection();
            query = "{CALL SELECT_USER_BY_ID(?)}";
            callableStmt = connection2.prepareCall(query);
            callableStmt.setInt(1, userId);
            rs2 = callableStmt.executeQuery();

            while (rs2.next()) {
                User user = new User();
                user.setFirstName(rs2.getString("FirstName"));
                user.setLastName(rs2.getString("LastName"));
                user.setId(rs2.getInt("Id"));
                user.setEmail(rs2.getString("Email"));
                user.setAge(rs2.getInt("Age"));
                // user.setRegistrationDate(rs2.getDate("RegistrationDate"));
                user.setProject(rs2.getString("Project"));
                user.setStatus(rs2.getInt("Status"));

                userList.add(user);
            }
            System.out.println(userList);
            return userList.get(0);

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (null != callableStmt) {
                    callableStmt.close();
                }
                if (null != rs2) {
                    rs2.close();
                }
                if (null != connection2) {
                    connection2.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }

        }

        return null;
    }

}
