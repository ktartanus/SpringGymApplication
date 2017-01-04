package gym.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "USER")
public class User implements Serializable {

	private static final long serialVersionUID = 1213121L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)    
    @Column(name="USER_ID")
    private Long userId;

	@Column(name = "USERNAME")
    private String userName;   

	@Column(name = "PASSWORD")
    private String password;   

	@Column(name = "EMAIL")
    private String email;
    
	@Column(name ="ENABLED")
	private int enabled;


	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "USER_TO_TRAINING_ID")
	private List<Training> trainingList;

	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "USER_TO_ROLE_ID")
	private List<UserRole> userRoleList;

	public User(){
		super();
	}
	
	public User(User user) {
	        this.userId = user.userId;
	        this.userName = user.userName;
	        this.email = user.email;       
	        this.password = user.password;
	        this.enabled=user.enabled;
	        this.userRoleList=user.userRoleList;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getEnabled() {
		return enabled;
	}

	public void setEnabled(int enabled) {
		this.enabled = enabled;
	}

	public List<Training> getTrainingList() {
		return trainingList;
	}

	public void setTrainingList(List<Training> trainingList) {
		this.trainingList = trainingList;
	}

	public List<UserRole> getUserRoleList() {
		return userRoleList;
	}

	public void setUserRoleList(List<UserRole> userRoleList) {
		this.userRoleList = userRoleList;
	}
}