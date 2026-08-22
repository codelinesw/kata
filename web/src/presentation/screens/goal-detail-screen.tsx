import { useState } from "react";
import { PopUpAbono } from "../components/pop-up/pop-up-component";
import type { GoalDetailProps } from "../props/gaol-detail";
import { styles } from "./goal-detail-style";


export const GoalDetailScreen: React.FC<GoalDetailProps> = ({
    name,
    currentAmount,
    targetAmount
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div style={styles.body}>
            <h2>Detalle de tu ahorro</h2>
            <div style={styles.containerItem}>
                <h3>Meta: {name || ""}</h3>
                <p>Ahorrado actualmente: <strong>${currentAmount || "0"}</strong></p>
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
                onSubmit={() => {
                    alert("la freezer")
                    setIsOpen(false)
                }} 
            />
        </div>
    )
}