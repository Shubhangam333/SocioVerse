const Gallery = () => {
  return (
    <div className="grid grid-cols-3 gap-2 my-8 ">
      <div className="w-full h-48">
        <img
          src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full h-48">
        <img
          src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full h-48">
        <img
          src="https://images.pexels.com/photos/17676464/pexels-photo-17676464/free-photo-of-a-house-on-a-hill-between-trees-in-the-countryside.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full h-full">
        <img
          src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Gallery;
