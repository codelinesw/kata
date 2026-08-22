import { useRef, useState } from "react";
import { PopUpAbono } from "../components/pop-up/pop-up-component";
import type { GoalDetailProps } from "../props/gaol-detail";
import { styles } from "./goal-detail-style";


export const GoalDetailScreen: React.FC<GoalDetailProps> = ({
    name,
    currentAmount,
    targetAmount,
    addPayment
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const currentAmountRef = useRef<HTMLSpanElement>(null);
    const updateCurrentAmountDOM = (newTarget: number) => {
        if (currentAmountRef.current) {
            let _currentAmountRef = Number(currentAmountRef.current?.textContent.replaceAll("$","") || '0');
            if (_currentAmountRef > 0) {
                currentAmountRef.current.innerText = `$${_currentAmountRef+newTarget}`;
            } else {
                currentAmountRef.current.innerText = `$${currentAmount+newTarget}`;
            }    
        }
    };
    return (
        <div style={styles.body}>
            <h2>Detalle de tu ahorro</h2>
            <div style={styles.containerItem}>
                <h3>Meta: {name || ""}</h3>
                <p>Ahorrado actualmente:
                    <strong ref={currentAmountRef}>
                        ${currentAmount || "0"}
                    </strong>
                </p>
                <p>Meta total: <strong>${targetAmount || "0"}</strong></p>
                <button onClick={() => {
                    setIsOpen(true)
                }}>Agregar abono</button>
            </div>
            <PopUpAbono
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false)
                }}
                onSubmit={(amount: number) => {
                    addPayment(amount);
                    updateCurrentAmountDOM(amount);
                    setIsOpen(false);
                    alert("El abono se agregó con exíto")
                }}
            />
        </div>
    )
}