function Model({ mode, onGeometryLoad }) {
  const obj = useLoader(OBJLoader, "/model.obj");

  // Pasar geometría una vez que el modelo esté cargado
  useEffect(() => {
    const allGeometries = obj.children.map((child) => child.geometry);
    onGeometryLoad(allGeometries);
  }, [obj, onGeometryLoad]);

  return (
    <group>
      {obj.children.map((child, i) => {
        const geometry = child.geometry;

        return (
          <group key={i}>
            {mode === "faces" && (
              <mesh geometry={geometry}>
                <meshStandardMaterial color="orange" />
              </mesh>
            )}
            {mode === "edges" && (
              <mesh geometry={geometry}>
                <meshStandardMaterial color="black" wireframe />
                <Edges scale={1.05} color="black" />
              </mesh>
            )}
            {mode === "vertices" && (
              <points geometry={geometry}>
                <pointsMaterial size={0.02} color="red" />
              </points>
            )}
          </group>
        );
      })}
    </group>
  );
}
