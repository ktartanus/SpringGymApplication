package gym.model;

import gym.model.enums.Role;

import javax.persistence.*;

@Entity
@Table(name="USER_ROLES")
public class UserRole {
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)    
    @Column(name="USER_ROLE_ID")
	private Long userRoleId;
	
	@Column(name="ROLE")
	@Enumerated(EnumType.STRING)
	private Role role;

	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "USER_TO_ROLE_ID")
	private User user;

	public Long getUserRoleId() {
		return userRoleId;
	}

	public void setUserRoleId(Long userRoleId) {
		this.userRoleId = userRoleId;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
