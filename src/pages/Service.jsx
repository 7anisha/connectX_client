// import { useEffect, useState } from "react";
// import {useAuth} from "../store/auth"
// // import axios from "axois";


// export const Service = () => {
//   const { services } = useAuth();
//   console.log(services);

//     const [product,setProducts]=useState([])
//     const [filterProducts,setFilterProducts]=useState([]);
//     const [minPrice,setMinprice]=useState('');
//     const [maxPrice,setMaxPrice]=useState('');

//     const getProducts =async()=>{
//       try{
//         const product=await services();
//         setProducts(product);
//         setFilterProducts(product);

//       }
//       catch(error){
//         console.log(error);
//       }
//     }

//     const filter=()=>{
//       const filterd=products.filter((product)=>{
//         const price=parseFloat(product.price);
//         const min=minPrice? parseFloat(minPrice):0;
//         const max= maxPrice? parseFloat(maxPrice):Infinity;
//         return price >=min && price <=max;
//       });
//       setFilterProducts(filterd);
//     }

//     useEffect(()=>{
//       filter();
//     },[minPrice,maxPrice]);


//   return (
//     <section className="section-services">
//       <div className="container">
//         <h1 className="main-heading">Services </h1>
//       </div>

//       <div>
//         <input
//         type="number" placeholder="min price" value={minPrice} onChange={(e)=>setMinprice(e.target.value)}>
//         </input>
//         <input type="number" placeholder="max price" value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)}></input>
//       </div>


//       <div className="container grid grid-three-cols">
//         {/* {services.map((curElem, index) => {
//           return (
//             <div className="card" key={index}>
//               <div className="card-img">
//                 <img src="/images/design.png" alt="desginer" width="200" />
//               </div>
//               <div className="card-details">
//                 <div className="grid grid-two-cols">
//                   <p>{curElem.provider}</p>
//                   <p>{curElem.price}</p>

//                 </div>
//                 <h2>{curElem.service}</h2>
//                 <p>{curElem.description}</p>

//               </div>
//             </div>
//           ); */}
//         {/* })} */}
//         <ul>
//         {filterProducts.map((curElem, index) => (
//           <li key={index}> {curElem.service}-${curElem.price}</li>

//         ))}
//         </ul>


//       </div>
//     </section>
//   );
// };



import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const Service = () => {
  const { services } = useAuth(); // services is now an array, not a function
  console.log("Services:", services);

  const [filterProducts, setFilterProducts] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Filter products based on price range
  const filter = () => {
    if (!services) return; // Ensure services is defined before filtering
    const filtered = services.filter((service) => {
      const price = parseFloat(service.price); // Ensure price is parsed as a number
      const min = minPrice ? parseFloat(minPrice) : 0;
      const max = maxPrice ? parseFloat(maxPrice) : Infinity;
      return price >= min && price <= max;
    });
    setFilterProducts(filtered);
  };

  // Trigger filtering when price inputs change
  useEffect(() => {
    filter();
  }, [minPrice, maxPrice, services]); // Also trigger filtering when services are fetched

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>

      {/* Price range inputs */}
      <div style={{marginLeft:'18rem' , marginTop:"2rem"}}>
      
        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          style={{ marginRight: '1rem' }} 
        />
        
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* Display filtered products */}
      {/* <div className="container grid grid-three-cols"> */}

        <div className="container grid grid-three-cols">
          {filterProducts.map((curElem, index) => {
            return (
              <div className="card" key={index}>
                <div className="card-img">
                  <img src="/images/design.png" alt="desginer" width="200" />
                </div>
                <div className="card-details">
                  <div className="grid grid-two-cols">
                    <p>{curElem.provider}</p>
                    <p>${curElem.price} </p>

                  </div>
                  <h2>{curElem.service}</h2>
                  <p>{curElem.desc}</p>

                </div>
              </div>
            );
          })}
        </div>
    </section>
  );
};




{/* <ul>
          {filterProducts.length > 0 ? (
            filterProducts.map((curElem, index) => (
              <li key={index}>
                {curElem.service} - ${curElem.price}
              </li>
            ))
          ) : (
            <li>No services found within the price range</li>
          )}
        </ul> */}
{/* </div>
    </section>
  );
}; */}
