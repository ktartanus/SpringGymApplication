package gym.model.enums;

/**
 * Created by Tarti on 2016-12-29.
 */


public enum Excercise {
    BRZUSZKI ,
    HANTLE,
    KLATA,
    PODCIAGANIE,
    DIPSY,
    ZOLNIERSKIE;

    public static boolean contains(String value) {

        for (Excercise e : Excercise.values()) {
            if (e.name().equals(value)) {
                return true;
            }
        }
        return false;
    }
}