'use client';

import Card from '@/app/ui/card';
import { useEffect, useState } from 'react';
import NotFound from '@/app/ui/comunes/not-found';
import Waitinganswer from '@/app/ui/comunes/waitinganswer';

export default function CardInfinityScroll() {
  // ------- States -------
  const [estado, setEstado] = useState(0);
  const [images, setImages] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  // ------- Functions -------
  /**
   * Fetch images from the Unsplash API and append the results to your `images` array
   */
  const fetchImages = async () => {

    const params = {pagina: page, cantidad: 10};
    const results = await fetch("/api/randomuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    .then((res) => res.json()).catch(()=>{
      return null;
    });

    if (results) {      
      setImages((prev) => [...prev, ...results]);
      setEstado(1);      
    }
    else
      setEstado(2);
  };

  /**
   * useEffect to trigger the `fetchImages` function whenever `page` updates
   */
  useEffect(() => {
    fetchImages();
  }, [page]);

  const userRandomRegister = async (objimg: any) => {
    const params = {
      lista: objimg.lista,
      nombrecontacto: objimg.nombrecontacto,
      correo: objimg.correo,
      sexo: objimg.sexo,
      edad: objimg.edad,
      cuota: objimg.cuota,
      fecha: objimg.fecha,
    };
    const results = await fetch("/api/randomuserregister", {
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

  async function registrarcontacto(id: string) {
    let newimages = [...images];
    for (let i = 0; i < newimages.length; i++) {
      if (newimages[i].id === id) {
        try {
          await userRandomRegister(images[i]);
          newimages[i].status = "pending";
          setImages(newimages);
          alert("Se ha registrado correctamente el usuario.\nPor favor, actualice su avatar.");
        } catch (error) {
          alert(error); 
        }
        break;
      }
    }
  }

  // ------- Render -------
  return (
    <>
      { 
      estado === 0 ?
      <Waitinganswer/> 
       : estado === 1 ?      
      <>       
      <div className="p-4 lg:px-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <Card
              key={image.id}
              contacto={image}
              newLimit={() => setPage(page + 1)}            
              isLast={index === images.length - 1}
              registrarcontacto={registrarcontacto}
            />
          ))}
      </div>      
      </>
       :
       <NotFound/>
      }    
    </>
  );
}
