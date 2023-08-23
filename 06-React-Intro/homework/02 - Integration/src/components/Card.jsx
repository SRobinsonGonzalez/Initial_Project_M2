export default function Card(props) {
   const { id, name, status, species, image, gender, origin, onClose } = props;
   return (
      <div>
         <button onClick={() => onClose(id)}>X</button>
         <h2>Name: {name}</h2>
         <h2>Status: {status}</h2>
         <h2>Species: {species}</h2>
         <h2>Gender: {gender}</h2>
         <h2>Origin: {origin}</h2>
         <img src={image} alt={name} />
         {/* <img src='' alt={`Imagen no encontrada de ${props.name}`} /> */}
      </div>
   );
}
