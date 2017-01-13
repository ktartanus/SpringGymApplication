package gym.utlis;

import java.util.ArrayList;
import java.util.List;

public class EnumConverter {

    public static <I> List<String> convertEnumListToStringList(List<I> list){
        List<String> stringList = new ArrayList<String>();
        for (I element: list){
            stringList.add(element.toString());
        }
        return stringList;
    }
}
