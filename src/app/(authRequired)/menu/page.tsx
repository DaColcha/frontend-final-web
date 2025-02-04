import Menu from "@/components/menu";

const MenuPage: React.FC = () => {
  return (
    <div>
      <div className="container mx-auto mt-8">
        <h1 className="text-4xl font-bold mb-8">Menú</h1>
        <Menu />
      </div>
    </div>
  );
};

export default MenuPage;
