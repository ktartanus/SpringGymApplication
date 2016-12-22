package gym.Validations;

@SuppressWarnings("serial")
public class UserExistsException extends Throwable {

    public UserExistsException(final String message) {
        super(message);
    }

}