package gym.model.enums;

public enum TrainingStatus
{
    DONE ,
    FAILED,
    IN_PROGRESS;

    public static boolean contains(String value) {

        for (TrainingStatus t : TrainingStatus.values()) {
            if (t.name().equals(value)) {
                return true;
            }
        }
        return false;
    }
}