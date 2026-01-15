export default function AdventistLogo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      {/* Círculo exterior */}
      <circle cx="24" cy="24" r="22" stroke="#0d9488" strokeWidth="2" fill="white" />
      
      {/* Símbolo de la cruz simplificada (centro) */}
      <path
        d="M24 12 L24 36 M12 24 L36 24"
        stroke="#0d9488"
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Adornos en los cuadrantes */}
      <circle cx="18" cy="18" r="2.5" fill="#0d9488" />
      <circle cx="30" cy="18" r="2.5" fill="#0d9488" />
      <circle cx="18" cy="30" r="2.5" fill="#0d9488" />
      <circle cx="30" cy="30" r="2.5" fill="#0d9488" />
      
      {/* Estrella de Belén (símbolo adventista) en la parte superior */}
      <path
        d="M24 8 L26 14 L32 14 L27 18 L29 24 L24 20 L19 24 L21 18 L16 14 L22 14 Z"
        fill="#0d9488"
      />
    </svg>
  );
}
