import tkinter as tk
from tkinter import filedialog, ttk
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import numpy as np
import scipy.signal as signal
from scipy.io import arff
import pandas as pd

# ---------------------- Funciones ----------------------

def cargar_datos():
    filepath = filedialog.askopenfilename(filetypes=[("ARFF files", "*.arff")])
    if not filepath:
        return
    data, meta = arff.loadarff(filepath)
    df = pd.DataFrame(data)
    df = df.applymap(lambda x: x.decode() if isinstance(x, bytes) else x)
    df.dropna(inplace=True)
    global eeg_df
    eeg_df = df.astype(float)
    canales = [col for col in eeg_df.columns if col != 'eyeDetection']
    combo_canal['values'] = canales
    combo_canal.set(canales[0])
    label_estado.config(text=f"Archivo cargado: {len(df)} muestras")
    graficar_senal()

def graficar_senal():
    if eeg_df is None:
        return
    canal = combo_canal.get()
    señal = eeg_df[canal].values
    tiempo = np.arange(len(señal)) / fs
    fig.clear()
    ax = fig.add_subplot(111)
    ax.plot(tiempo, señal, label=f"Canal {canal}")
    ax.set_title("Señal EEG sin filtrar")
    ax.set_xlabel("Tiempo [s]")
    ax.set_ylabel("Amplitud")
    ax.legend()
    canvas.draw()

def aplicar_filtro_banda(banda):
    if eeg_df is None:
        return
    canal = combo_canal.get()
    señal = eeg_df[canal].values
    low, high = bandas[banda]
    b, a = signal.butter(4, [low, high], btype='bandpass', fs=fs)
    señal_filtrada = signal.filtfilt(b, a, señal)
    
    potencia = np.mean(señal_filtrada**2)
    umbral = 1e5  # Ajusta esto según tus datos
    resultado = "ALTA Atención" if potencia > umbral else "BAJA Atención"
    color = "green" if potencia > umbral else "red"

    ventana.configure(bg=color)
    label_estado.config(text=f"{banda} - {resultado} - Potencia: {potencia:.2f}")
    indicador_estado.config(text=f"🔋 Activación: {resultado}", fg=color)

    # Mover el círculo horizontalmente según la potencia
    mover_objeto(potencia, umbral)

    tiempo = np.arange(len(señal)) / fs
    fig.clear()
    ax = fig.add_subplot(111)
    ax.plot(tiempo, señal_filtrada, label=f"{banda} filtrado")
    ax.set_title(f"Señal EEG - Banda {banda}")
    ax.set_xlabel("Tiempo [s]")
    ax.set_ylabel("Amplitud")
    ax.legend()
    canvas.draw()

def mover_objeto(potencia, umbral):
    canvas_tk.delete("circle")
    max_x = 400
    min_x = 50
    pos_x = int(min_x + (max_x - min_x) * min(potencia / umbral, 1.5))  # limitar rango
    pos_x = min(pos_x, 450)
    canvas_tk.create_oval(pos_x, 30, pos_x + 30, 60, fill="blue", tags="circle")

# ---------------------- Interfaz ----------------------

ventana = tk.Tk()
ventana.title("🧠 BCI Simulado Mejorado")
ventana.geometry("900x750")

fs = 128  # Frecuencia de muestreo fija
bandas = {
    "Delta (0.5–4 Hz)": (0.5, 4),
    "Theta (4–8 Hz)": (4, 8),
    "Alpha (8–12 Hz)": (8, 12),
    "Beta (13–30 Hz)": (13, 30)
}

frame_superior = tk.Frame(ventana)
frame_superior.pack(pady=10)

btn_cargar = tk.Button(frame_superior, text="📂 Cargar archivo ARFF", command=cargar_datos)
btn_cargar.grid(row=0, column=0, padx=10)

combo_canal = ttk.Combobox(frame_superior, state="readonly")
combo_canal.grid(row=0, column=1, padx=10)

btn_graficar = tk.Button(frame_superior, text="📈 Graficar canal", command=graficar_senal)
btn_graficar.grid(row=0, column=2, padx=10)

frame_botones = tk.Frame(ventana)
frame_botones.pack(pady=5)

for i, banda in enumerate(bandas.keys()):
    tk.Button(frame_botones, text=f"🎚 {banda}", command=lambda b=banda: aplicar_filtro_banda(b)).grid(row=0, column=i, padx=5)

label_estado = tk.Label(ventana, text="Estado: Esperando archivo...")
label_estado.pack(pady=10)

indicador_estado = tk.Label(ventana, text="🔋 Activación: ---", font=("Arial", 14))
indicador_estado.pack(pady=5)

# Área de canvas visual para mover objeto
canvas_tk = tk.Canvas(ventana, width=500, height=100, bg="white")
canvas_tk.pack(pady=10)
canvas_tk.create_line(50, 45, 450, 45, fill="gray", dash=(4, 2))  # línea base

fig = plt.Figure(figsize=(8, 4), dpi=100)
canvas = FigureCanvasTkAgg(fig, master=ventana)
canvas.get_tk_widget().pack()

eeg_df = None

ventana.mainloop()
