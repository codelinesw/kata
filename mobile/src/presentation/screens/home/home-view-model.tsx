import { RootState } from "@infrastructure/store/store";
import { selectGoal } from "../../../presentation/storage/savingsSlice";
import { useDispatch, useSelector } from "react-redux";


export const useHomeViewModel = (onSelectGoal: (id: string) => void) => {
    const goals = useSelector((state: RootState) => state.savings.goals);
    const dispatch = useDispatch();

    const handlePressGoal = (goalId: string) => {
        dispatch(selectGoal(goalId));
        onSelectGoal(goalId); // Abre el WebView o detalle
    };

    return {
        goals,
        dispatch,
        handlePressGoal
    }
}