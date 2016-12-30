package gym.model;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * Created by Tarti on 2016-12-29.
 */
@Repository
public interface TrainingRepository extends CrudRepository<Training, Long> {

    public List<Training> findByUser(User user);
}

