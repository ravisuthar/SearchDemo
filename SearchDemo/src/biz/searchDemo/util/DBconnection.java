package biz.searchDemo.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DBconnection {

    private static Connection connnection = null;
    private static String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    private static String USERNAME = "root";
    private static String PASSWORD = "netweb12";
    private static String URL = "jdbc:mysql://localhost:3306/harshil_database1";

    public static Connection getConnection() throws ClassNotFoundException, SQLException {
        try {

            // mysql : Class.forName("com.mysql.jdbc.Driver").newInstance();
            // jdbc odbc: Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
            Class.forName(JDBC_DRIVER).newInstance();

            // jdbc odbc: connnection=DriverManager.getConnection("jdbc:odbc:SearchDb");
            connnection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
        } catch (Exception e) {
            // TODO add logger
            System.out.println("error generated : " + e);
            e.printStackTrace();
        }
        return connnection;
    }

    public static void closeconnection(Connection con) {
        try {
            connnection.close();
        } catch (Exception e) {
            // TODO add logger
            System.out.println(e);
            e.printStackTrace();
        }
    }

    public static void main(String[] args) throws ClassNotFoundException, SQLException {
        Connection con = null;
        Statement stmt = null;
        ResultSet rs = null;
        try {
            // Load the SQLServerDriver class, build the
            // connection string, and get a connection
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            String connectionUrl = "jdbc:sqlserver://localhost:1433;" + "databaseName=BXCONNECT_AFS;" + "user=sa;" + "password=sa@123456";
            con = DriverManager.getConnection(connectionUrl);
            System.out.println("Connected.");

            // Create and execute an SQL statement that returns some data.
            String SQL = "SELECT * from BGX_LANGUAGE_MASTER";
            stmt = con.createStatement();
            rs = stmt.executeQuery(SQL);

            // Iterate through the data in the result set and display it.
            while (rs.next()) {
                System.out.println(rs.getString(1) + " " + rs.getString(2));
            }

        } catch (Exception e) {
            e.printStackTrace();
            System.exit(0);
        } finally {
            rs.close();
            stmt.close();
            con.close();

        }

    }

}
