package gym.model;

import gym.model.enums.Excercise;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Repository
public interface TrainingRepository extends CrudRepository<Training, Long> {

    public List<Training> findByUser(User user);

    public List<Training> findByExcerciseAndTrainingDate(Excercise excercise, Date date);

    @Transactional
    Long deleteByTrainingId(Long id);
}

