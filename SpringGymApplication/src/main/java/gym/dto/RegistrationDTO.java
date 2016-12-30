package gym.dto;


import gym.validations.VPasswordMatches;
import gym.validations.VEmail;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by Tarti on 2016-12-22.
 */
@VPasswordMatches
public class RegistrationDTO {


    @NotNull
    @NotEmpty
    @Size(min=6, max=30)
    //@Pattern(regexp = "[a-zA-Z]*")
    private String accountName;

    @NotNull
    @VEmail
    private String email;

    @NotNull
    @NotEmpty
    private String password;

    @NotNull
    @NotEmpty
    private String passwordRepeat;

    public String getPasswordRepeat() {
        return passwordRepeat;
    }

    public void setPasswordRepeat(String passwordRepeat) {
        this.passwordRepeat = passwordRepeat;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String toString() {
        return "Person(Name: " + this.accountName + ", email: " + this.email + ")";
    }
}
