import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# 1. Generar puntos 3D (cubo)
def generar_cubo(size=1):
    vertices = np.array([
        [-1,-1,-1], [1,-1,-1], [1,1,-1], [-1,1,-1],
        [-1,-1,1], [1,-1,1], [1,1,1], [-1,1,1]
    ]) * size/2
    return vertices.T

# 2. Matrices de proyección
def matriz_ortografica():
    return np.array([
        [1,0,0,0],
        [0,1,0,0],
        [0,0,0,1]
    ])

def matriz_perspectiva(d=2):
    return np.array([
        [1,0,0,0],
        [0,1,0,0],
        [0,0,1,0],
        [0,0,1/d,0]
    ])

# 3. Función de proyección
def proyectar(puntos, matriz):
    homogeneas = np.vstack((puntos, np.ones(puntos.shape[1])))
    proy = matriz @ homogeneas
    return proy[:-1] / proy[-1] if matriz.shape[0] == 4 else proy

# Visualización
fig = plt.figure(figsize=(12,5))
cubo = generar_cubo()

# Proyección Ortográfica
ax1 = fig.add_subplot(121, title='Ortográfica')
ortografica = proyectar(cubo, matriz_ortografica())
ax1.scatter(ortografica[0], ortografica[1])
ax1.axis('equal')

# Proyección Perspectiva
ax2 = fig.add_subplot(122, title=f'Perspectiva (d=2)')
perspectiva = proyectar(cubo, matriz_perspectiva())
ax2.scatter(perspectiva[0], perspectiva[1])
ax2.axis('equal')

plt.tight_layout()
plt.savefig('comparacion_proyecciones.png')
plt.show()