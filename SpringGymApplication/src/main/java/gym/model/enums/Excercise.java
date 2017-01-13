package gym.model.enums;

public enum Excercise {
    BRZUSZKI,
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