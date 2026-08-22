import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { styles } from './pop-up-style';

// Interfaces con tipado estricto para las Props del componente
export interface AbonoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (monto: number) => void;
}

export const PopUpAbono: React.FC<AbonoModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [monto, setMonto] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Manejo y validación estricta del cambio en el input
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    // Validación: Solo permitir números y un único punto decimal
    if (value !== '' && !/^\d*\.?\d*$/.test(value)) {
      setError('Solo se permiten números.');
      return;
    }

    const numericValue = parseFloat(value);

    // Validación de valor mayor a 0
    if (value !== '' && (!isFinite(numericValue) || numericValue <= 0)) {
      setError('El monto ingresado debe ser mayor a 0.');
    } else {
      setError(null);
    }

    setMonto(value);
  };

  const numericMonto = parseFloat(monto);
  const isValid = monto.trim() !== '' && !isNaN(numericMonto) && numericMonto > 0;

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!isValid) {
      alert(error || 'Por favor ingresa un monto válido.');
      return;
    }
    onSubmit(numericMonto);
    setMonto('');
    setError(null);
  };

  return (
    <div style={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose} aria-label="Cerrar modal">
          ✕
        </button>
        
        <h2 style={styles.title}>Abona a:</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="montoInput" style={styles.label}>
              Monto del abono
            </label>
            <input
              id="montoInput"
              type="text"
              inputMode="decimal"
              value={monto}
              onChange={handleChange}
              placeholder="0.00"
              style={{
                ...styles.input,
                ...(error ? styles.inputError : {}),
              }}
            />
            {error && <div style={styles.alertText}>{error}</div>}
          </div>

          <button
            type="submit"
            disabled={!isValid}
            style={{
              ...styles.submitBtn,
              ...(!isValid ? styles.submitBtnDisabled : {}),
            }}
          >
            Agregar abono
          </button>
        </form>
      </div>
    </div>
  );
};