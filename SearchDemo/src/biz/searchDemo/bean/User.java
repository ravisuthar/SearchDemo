package biz.searchDemo.bean;

import java.util.Date;

public class User {

	private int id;
	private String firstName;
	private String lastName;
	private String email;
	private int age;
	private Date registrationDate;
	private String project;
	private int status;

	
	public User() {
		super();
	}

	public User(int id, String firstName, String lastName, String email,
			int age, Date registrationDate, String project, int status) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.age = age;
		this.registrationDate = registrationDate;
		this.project = project;
		this.status = status;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = Math.abs(status);
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project.trim().substring(0, 1).toUpperCase() + project.trim().substring(1);
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = Math.abs(id);
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email.trim();
	}

	public int getAge() {
		return Math.abs(age);
	}

	public void setAge(int age) {
		this.age = age;
	}

	public Date getRegistrationDate() {
		return registrationDate;
	}

	public void setRegistrationDate(Date registrationDate) {
		this.registrationDate = registrationDate;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		// TO-DO add StringUtils.isEmpty method to check null
		this.firstName = firstName.trim().substring(0, 1).toUpperCase() + firstName.trim().substring(1);
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		//TO-DO add StringUtils.isEmpty method to check null
		this.lastName = lastName.trim().substring(0, 1).toUpperCase() + lastName.trim().substring(1);
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + age;
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result
				+ ((firstName == null) ? 0 : firstName.hashCode());
		result = prime * result + id;
		result = prime * result
				+ ((lastName == null) ? 0 : lastName.hashCode());
		result = prime * result + ((project == null) ? 0 : project.hashCode());
		result = prime
				* result
				+ ((registrationDate == null) ? 0 : registrationDate.hashCode());
		result = prime * result + status;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (age != other.age)
			return false;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (firstName == null) {
			if (other.firstName != null)
				return false;
		} else if (!firstName.equals(other.firstName))
			return false;
		if (id != other.id)
			return false;
		if (lastName == null) {
			if (other.lastName != null)
				return false;
		} else if (!lastName.equals(other.lastName))
			return false;
		if (project == null) {
			if (other.project != null)
				return false;
		} else if (!project.equals(other.project))
			return false;
		if (registrationDate == null) {
			if (other.registrationDate != null)
				return false;
		} else if (!registrationDate.equals(other.registrationDate))
			return false;
		if (status != other.status)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Customer [age=" + age + ", email=" + email + ", firstName="
				+ firstName + ", id=" + id + ", lastName=" + lastName
				+ ", project=" + project + ", registrationDate="
				+ registrationDate + ", status=" + status + "]";
	}

}
