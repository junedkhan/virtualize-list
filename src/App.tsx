import VirtualizeList from "./components/virtualize-list";

import "./styles.css";

const data = Array.from({ length: 1000 }, (_, index) => index);

const Item = ({ data }: { data: number }) => {
  return <div className="list-style">{data}</div>;
};

export default function App() {
  return (
    <div className="App">
      <VirtualizeList
        data={data}
        height={300}
        width={200}
        itemHeight={30}
        ItemComponent={Item}
      />
    </div>
  );
}
