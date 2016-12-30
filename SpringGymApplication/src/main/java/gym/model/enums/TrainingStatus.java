package gym.model.enums;

/**
 * Created by Tarti on 2016-12-29.
 */
public enum TrainingStatus
{
    DONE ,
    FAILED,
    IN_PROGRESS;
    public static boolean contains(String value) {

        for (Excercise e : Excercise.values()) {
            if (e.name().equals(value)) {
                return true;
            }
        }
        return false;
    }
}