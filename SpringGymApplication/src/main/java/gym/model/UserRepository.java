package gym.model;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    public User findByUserName(String username);

    public User findByEmail(String email);
    
}