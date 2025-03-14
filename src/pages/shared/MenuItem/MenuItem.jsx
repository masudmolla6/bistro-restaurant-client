const MenuItem = ({ item }) => {
  const { _id, name, recipe, image, price, category } = item;
  return (
    <div className="flex space-x-4">
      <img
        className="w-[120px] rounded-r-full	rounded-b-full"
        src={image}
        alt=""
      />
      <div>
        <h3 className="uppercase">{name}</h3>
        <p>{recipe}</p>
      </div>
      <p className="text-orange-500">${price}</p>
    </div>
  );
};

export default MenuItem;
