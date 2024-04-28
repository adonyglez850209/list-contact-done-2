import Image from "next/image";

export default async function Page() {
  return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-4/5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Resumen</h5>
            </a>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              </p>            
              <ul>
                <li>Para registrar contactos: En la pagina de <strong>Candidatos</strong>, descarga (forzada) el avatar y registre usuarios randoms segun convenga.</li>
                <li>Para gestionar contactos: En el menu principal ubicado en el encabezado opcion <strong>Contactos</strong>.</li>
                <li>Para gestionar tipos: En el menu principal ubicado en el encabezado opcion <strong>Tipos</strong>.</li>
                <li>Para DONAR: En <strong>Contactos</strong> opcion <strong>Pending</strong> en la columna <strong>Estado de la donacion</strong>.</li>                
                <li>Para consultar reportes: En el menu principal ubicado en el encabezado opcion <strong>Reportes</strong>.</li>
              </ul>
        </div>
      </div>        
  );
}