import { RootState } from "@infrastructure/store/store";
import { updateCurrentAmount } from "../../../presentation/storage/savingsSlice";
import { WebViewMessageEvent } from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";


export const useWebAppContainerViewModel = (webViewRef: React.RefObject<any>, goalId: string | null) => {

    const dispatch = useDispatch();
    
    // Leemos la meta actual directamente de Redux
    const goal = useSelector((state: RootState) =>
        state.savings.goals.find((g) => g.id === goalId)
    );

    //Función que recive la data cuando el webview emite un evento
    const handleWebMessage = (event: WebViewMessageEvent) => {
        // Validamos que webViewRef esté definido antes de pasar el evento
        if (webViewRef) {
            //handleWebMessage(event, webViewRef);
            const rawData = JSON.parse(event.nativeEvent.data);
            console.log(" data received ", rawData);
            if (rawData && rawData.type === "READY") {

                const message = {
                    type: "SAY_SON_GOKU",
                    payload: goal,
                };

                webViewRef.current?.postMessage(
                    JSON.stringify(message)
                );
            }

            if (rawData && rawData.type === "RECORD_PAYMENT") {
                dispatch(updateCurrentAmount({ goalId: rawData.payload.goalId, amount: rawData.payload.amount }));
            }
        }
    }



    const sendUserToWeb = () => {
    };

    return {
        goal,
        handleWebMessage,
        sendUserToWeb
    }
}