'use client';

import { UploadButton } from "@/lib/uploadthing";

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function Card(
  { contacto, newLimit, isLast, registrarcontacto }: { contacto: any, newLimit: any, isLast: any, registrarcontacto: any}
) {
  /**
   * Select the Card component with useRef
   */
  const cardRef = useRef(null);

  const options = {
    allowTaint: true,
    useCORS: true,
    backgroundColor: "rgba(0,0,0,0)",
    removeContainer: true,
  };
  
  const printRef = useRef(null);

  const prepareURL = async (name: string) => {
    const cardElement = printRef.current;

    if (!cardElement) return;

    try {
      // lazy load this package
      const html2canvas = await import(
        /* webpackPrefetch: true */ "html2canvas"
      );

      const result = await html2canvas.default(cardElement, options);

      const asURL = result.toDataURL("image/jpeg");
      // as far as I know this is a quick and dirty solution
      const anchor = document.createElement("a");
      anchor.href = asURL;
      anchor.download = name + ".jpeg";
      anchor.click();
      anchor.remove();
     // maybe this part should set state with `setURLData(asURL)`
     // and when that's set to something you show the download button 
     // which has `href=URLData`, so that people can click on it
    } catch (reason) {
      console.log(reason);
    }
  };

  const userRandomUpdateAvatar = async (email: string, url: string) => {
    const params = {
      correo: email,
      avatarurl: url
    };
    const results = await fetch("/api/randomuserupdateavatar", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    .then((res) => res.json()).catch((error)=>{
      throw error;
    });
    if(results.status === 404)
      throw new Error(results.error);
    if (!results)
      throw new Error("Hubo algun problema en el proceso");
  };

  /**
   * Implement Intersection Observer to check if the last Card in the array is visible on the screen, then set a new limit
   */
  useEffect(() => {
    if (!cardRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
  }, [isLast]);

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" ref={cardRef}>
      <div className="flex justify-first px-4 pt-4"></div>  
      <div className="flex justify-end px-4 pt-4">
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-2xl font-semibold font-sans">$</span>
        <span className="text-3xl font-extrabold tracking-tight font-sans">{contacto.cuota}</span>
      </div>      
      </div>
      <div className="flex flex-col items-center pb-10">
          <div ref={printRef}>
            <Image 
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
              src={contacto.avatarurl} 
              alt={contacto.nombrecontacto} />
          </div>        
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{contacto.nombrecontacto}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">{contacto.correo} {contacto.sexo} {contacto.edad}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{contacto.lista}</span>
          <div className="flex mt-4 md:mt-6">
            <button onClick={()=>prepareURL(contacto.correo)} className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Descargar avatar</button>            
            {
              contacto.status === '' ? 
              <>
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>registrarcontacto(contacto.id)}>Registrar</button>            
              </> : 
              <>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={async (res) => {
                    try {
                      await userRandomUpdateAvatar(contacto.correo, res[0].url);
                      alert("Upload Completed");
                    } catch (error) {
                      alert(error); 
                    }                    
                    // Do something with the response
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />               
              </>
            }
          </div>          
      </div>   
    </div>
  );
}
