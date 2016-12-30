package gym.utlis;

import gym.model.enums.Role;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Tarti on 2016-12-29.
 */
public class EnumConverter {

    public static <I> List<String> convertEnumListToStringList(List<I> list){
        List<String> stringList = new ArrayList<String>();
        for (I element: list){
            stringList.add(element.toString());
        }
        return stringList;
    }
}
